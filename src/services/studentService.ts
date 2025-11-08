import {supabase} from "../lib/supabaseClient.ts";
import {IStudent} from "../types/type_student.ts";

export const studentService = {
    async getAll() {
        const {data, error} =
            await supabase.from('student')
                .select('*');

        if (error) {
            console.log("Error: ", error);
            throw error
        }
        return data;
    },

    async getAllByCollegeId(collegeId: string) {
        const {data, error} =
            await supabase.from('student')
                .select(`*, college(*), department(*), RStudentCompany(*, company(*))`)
                .eq('college_id', collegeId);

        if (error) {
            console.log("Error: ", error);
            throw error
        }
        return data;
    },

    async getById(id: string) {
        const {data, error} =
            await supabase.from('student')
                .select(`*, college(*), department(*), RStudentCompany(*, company(*))`)
                .eq('id', id)
                .single();

        if (error) {
            console.log("Error: ", error);
            throw error
        }
        return data;
    },

    async create(student: Omit<IStudent, 'id' | 'created_at' | 'college' | 'department'>) {
        const {data, error} =
            await supabase.from('student')
                .insert([student])
                .select()
                .single();

        if (error) {
            console.log("Error: ", error);
            throw error
        }
        return data;
    },

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
