import {supabase} from "../lib/supabaseClient.ts";
import {IStudent} from "../types/type_student.ts";

export const studentService = {
    async getAll() {
        const {data, error} =
            await supabase.from('student')
                .select(`*, college(*), department(*), rstudentcompany(*, company(*)), studenteducation(*)`)

        if (error) {
            console.log("Error: ", error);
            throw error
        }
        return data;
    },

    async getAllByCollegeId(collegeId: string) {
        const {data, error} =
            await supabase.from('student')
                .select(`*, college(*), department(*), rstudentcompany(*, company(*)), studenteducation(*)`)
                .eq('college_id', collegeId);

        if (error) {
            console.log("Error: ", error);
            throw error
        }
        return data;
    },

    async getAllAlumniByCollegeId(collegeId: string) {
        const {data, error} =
            await supabase.from('student')
                .select(`*, college(*), department(*), rstudentcompany(*, company(*)), studenteducation(*)`)
                .eq('college_id', collegeId)
                .eq('status', 'alumni');

        if (error) {
            console.log("Error: ", error);
            throw error
        }
        return data;
    },

    async getById(id: string) {
        const {data, error} =
            await supabase.from('student')
                .select(`*, college(*), department(*), rstudentcompany(*, company(*)), studenteducation(*)`)
                .eq('id', id)
                .single();

        if (error) {
            console.log("Error: ", error);
            throw error
        }
        return data;
    },

    // async create(student: Omit<IStudent, 'id' | 'created_at' | 'college' | 'department'>) {
    //     const {data, error} =
    //         await supabase.from('student')
    //             .insert([student])
    //             .select()
    //             .single();
    //
    //     if (error) {
    //         console.log("Error: ", error);
    //         throw error
    //     }
    //     return data;
    // },

    async update(student: Omit<IStudent, 'created_at' | 'college' | 'department' | 'company'>) {
        const {data, error} =
            await supabase.from('student')
                .update(student)
                .eq('id', student.id)
                .select()
                .single();

        if (error) {
            console.log("Error: ", error);
            throw error
        }
        return data;
    },

    async delete(id: string) {
        const {data, error} =
            await supabase.from('student')
                .delete()
                .eq('id', id);

        if (error) {
            console.log("Error: ", error);
            throw error
        }
        return data;
    }
}



async function createStudentWithAuth(studentData, collegeId) {
    const {
        admission_number,
        name,
        email,
        department_code,
        about,
        admission_year,
        graduate_year,
        status,
        phone,
        github_url,
        linkedin_url
    } = studentData;

    try {
        // Step 1: Get department ID
        const { data: department, error: deptError } = await supabase
            .from('department')
            .select('id')
            .eq('code', department_code)
            .eq('college_id', collegeId)
            .single();

        if (deptError || !department) {
            throw new Error(`Department ${department_code} not found`);
        }

        // Step 2: Generate internal auth email
        const authEmail = `${admission_number}@auth.dce.internal`;
        const temporaryPassword = "Test@123";

        // Step 3: Create auth user
        const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
            email: authEmail, // Internal auth email
            password: temporaryPassword,
            email_confirm: true, // Auto-confirm
            user_metadata: {
                role: 'student',
                admission_number: admission_number,
                name: name,
                actual_email: email, // Store real email in metadata
                college_id: collegeId
            }
        });

        if (authError) {
            throw new Error(`Auth user creation failed: ${authError.message}`);
        }

        // Step 4: Insert into Student table
        const { data: student, error: studentError } = await supabase
            .from('student')
            .insert({
                id: authUser.user.id, // Same UUID as auth.users
                admission_number: admission_number,
                name: name,
                email: email, // Real/changeable email
                auth_email: authEmail, // Fixed auth email
                department_id: department.id,
                college_id: collegeId,
                about: about,
                admission_year: admission_year,
                graduate_year: graduate_year,
                status: status,
                phone: phone,
                github_url: github_url,
                linkedin_url: linkedin_url
            })
            .select()
            .single();

        if (studentError) {
            // Rollback: delete auth user if student creation fails
            await supabase.auth.admin.deleteUser(authUser.user.id);
            throw new Error(`Student record creation failed: ${studentError.message}`);
        }

        console.log(`✅ Created student: ${admission_number} (${name})`);

        return {
            success: true,
            student: student,
            credentials: {
                admission_number: admission_number,
                password: temporaryPassword,
                login_method: 'Use admission number or email to login'
            }
        };

    } catch (error) {
        console.error(`❌ Error creating student ${admission_number}:`, error.message);
        return {
            success: false,
            error: error.message
        };
    }
}

/**
 * Batch create multiple students
 */
async function batchCreateStudents(studentsData, collegeId) {
    const results = [];
    const credentials = [];

    for (const studentData of studentsData) {
        const result = await createStudentWithAuth(studentData, collegeId);
        results.push(result);

        if (result.success) {
            credentials.push({
                admission_number: result.credentials.admission_number,
                name: studentData.name,
                password: result.credentials.password
            });
        }

        // Small delay to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    return { results, credentials };
}

// Export functions
export { createStudentWithAuth, batchCreateStudents };
