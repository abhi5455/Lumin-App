import {supabase} from "../lib/supabaseClient.ts";
import {IFile, IResource} from "../types/type_resource.ts";
import {deleteFileFromBucket} from "../lib/uploadMedia.ts";

export const resourceService = {
    async getAll() {
        const {data, error} = await supabase
            .from('resources')
            .select(`
                *, 
                student:uploaded_by_student_id(*), 
                college:college_id(*), 
                files(*), 
                resourcekeywords(*),
                company:company_id(*)
            `)
            .order('updated_at', {ascending: false});

        if (error) {
            console.log("Error: ", error);
            throw error;
        }
        return data;
    },

    // async getAllByCollegeId(collegeId: string, searchValue?: string) {
    //     console.log("Fetching resources for collegeId: ", collegeId, " with searchValue: ", searchValue);
    //     let query = supabase
    //         .from('resources')
    //         .select(`
    //             *,
    //             student:uploaded_by_student_id(*),
    //             college:college_id(*),
    //             files(*),
    //             resourcekeywords(*),
    //             company:company_id(*)
    //         `)
    //         .eq('college_id', collegeId);
    //
    //     //Apply search filter I need alike on title and student.name
    //     if (searchValue && searchValue.trim() !== '') {
    //         const q = `%${searchValue.trim()}%`
    //
    //         // OR: resource title
    //         query = query.or(`title.ilike.${q}`)
    //
    //         // OR: author name (student table)
    //         query = query.or(`name.ilike.${q}`, { foreignTable: 'student' })
    //
    //         // OR: resource keywords
    //         query = query.or(`keyword.ilike.${q}`, { foreignTable: 'resourcekeywords' })
    //     }
    //
    //
    //
    //     const {data, error} = await query.order('created_at', { ascending: false });
    //     if (error) {
    //         console.log("Error: ", error);
    //         throw error;
    //     }
    //
    //     return data;
    //
    //     // const {data, error} = await supabase
    //     //     .from('resources')
    //     //     .select(`
    //     //         *,
    //     //         student:uploaded_by_student_id(*),
    //     //         college:college_id(*),
    //     //         files(*),
    //     //         resourcekeywords(*),
    //     //         company:company_id(*)
    //     //     `)
    //     //     .eq('college_id', collegeId)
    //     //     .order('created_at', { ascending: false });
    //     //
    //     // if (error) {
    //     //     console.log("Error: ", error);
    //     //     throw error;
    //     // }
    //     // return data;
    // },

    async getAllByCollegeId(collegeId: string, searchValue?: string) {
        console.log("Fetching resources for collegeId: ", collegeId, " with searchValue: ", searchValue);
        let query = supabase
            .from('resources')
            .select(` 
            *,  
            student:uploaded_by_student_id(*),  
            college:college_id(*),  
            files(*),  
            resourcekeywords(*), 
            company:company_id(*) 
        `)
            .eq('college_id', collegeId)
            .order('updated_at', {ascending: false});

        const {data, error} = await query.order('created_at', {ascending: false});

        if (error) {
            console.log("Error: ", error);
            throw error;
        }

        if (searchValue && searchValue.trim() !== '') {
            const searchLower = searchValue.trim().toLowerCase();
            return data.filter(item => {
                const titleMatch = item.title?.toLowerCase().includes(searchLower);

                // Student Name starts With
                const authorMatch = item.student?.name?.toLowerCase().startsWith(searchLower);

                // Keywords starts With
                const keywordMatch = item.resourcekeywords?.some((k: any) =>
                    k.keyword?.toLowerCase().startsWith(searchLower)
                );

                return titleMatch || authorMatch || keywordMatch;
            });
        }

        return data;
    },

    async getAllByCollegeNCompanyId(collegeId: string, companyId: string, searchValue?: string) {
        let query = supabase
            .from('resources')
            .select(`
                *, 
                student:uploaded_by_student_id(*), 
                college:college_id(*), 
                files(*), 
                resourcekeywords(*),
                company:company_id(*)
            `)
            .eq('college_id', collegeId)
            .eq('company_id', companyId)
            .order('updated_at', {ascending: false});

        const {data, error} = await query.order('created_at', {ascending: false});
        if (error) {
            console.log("Error: ", error);
            throw error;
        }

        if (searchValue && searchValue.trim() !== '') {
            const searchLower = searchValue.trim().toLowerCase();
            return data.filter(item => {
                const titleMatch = item.title?.toLowerCase().includes(searchLower);

                // Student Name starts With
                const authorMatch = item.student?.name?.toLowerCase().startsWith(searchLower);

                // Keywords starts With
                const keywordMatch = item.resourcekeywords?.some((k: any) =>
                    k.keyword?.toLowerCase().startsWith(searchLower)
                );

                return titleMatch || authorMatch || keywordMatch;
            });
        }

        return data;
    },

    async getAllByStudentId(studentId: string, searchValue?: string) {
        const {data, error} = await supabase
            .from('resources')
            .select(`
                *, 
                student:uploaded_by_student_id(*), 
                college:college_id(*), 
                files(*), 
                resourcekeywords(*),
                company:company_id(*)
            `)
            .eq('uploaded_by_student_id', studentId)
            .order('updated_at', {ascending: false});

        if (error) {
            console.log("Error: ", error);
            throw error;
        }

        if (searchValue && searchValue.trim() !== '') {
            const searchLower = searchValue.trim().toLowerCase();
            return data.filter(item => {
                const titleMatch = item.title?.toLowerCase().includes(searchLower);

                // Student Name starts With
                const authorMatch = item.student?.name?.toLowerCase().startsWith(searchLower);

                // Keywords starts With
                const keywordMatch = item.resourcekeywords?.some((k: any) =>
                    k.keyword?.toLowerCase().startsWith(searchLower)
                );

                return titleMatch || authorMatch || keywordMatch;
            });
        }

        return data;
    },

    async getById(id: string) {
        const {data, error} = await supabase
            .from('resources')
            .select(`
                *, 
                student:uploaded_by_student_id(*), 
                college:college_id(*), 
                files(*), 
                resourcekeywords(*),
                company:company_id(*)
            `)
            .eq('id', id)
            .single();

        if (error) {
            console.log("Error: ", error);
            throw error;
        }
        return data;
    },

    async create(resource: Omit<IResource, 'id' | 'created_at' | 'updated_at'>) {
        // Separate keywords and files from main resource data
        const {keywords, files, ...resourceData} = resource;

        // Creating resource
        const {data, error} = await supabase
            .from('resources')
            .insert([resourceData])
            .select()
            .single();

        if (error) {
            console.log("Error: ", error);
            throw error;
        }

        // Creating resource keywords
        if (keywords && keywords.length > 0) {
            const resourceKeywords = keywords.map((kw) => {
                // const {id, created_at, ...keywordData} = kw; // Omit id and created_at
                return {
                    resource_id: data.id,
                    keyword: kw
                };
            });

            const {error: keywordError} = await supabase
                .from('resourcekeywords')
                .insert(resourceKeywords);

            if (keywordError) {
                console.log("Keyword Error: ", keywordError);
                throw keywordError;
            }
        }

        // Creating files
        if (files && files.length > 0) {
            const resourceFiles = files.map((file) => {
                const {id, created_at, ...fileData} = file; // Omit id and created_at
                return {
                    resource_id: data.id,
                    ...fileData
                };
            });

            const {error: fileError} = await supabase
                .from('files')
                .insert(resourceFiles);

            if (fileError) {
                console.log("File Error: ", fileError);
                throw fileError;
            }
        }

        return data;
    },

    async update(resource: Omit<IResource, 'updated_at'>, initialAttachedFiles: IFile[], currentAttachedFiles: IFile[]) {
        const {keywords, files, ...resourceData} = resource;

        const {data, error} = await supabase
            .from('resources')
            .update({
                ...resourceData,
                updated_at: new Date().toISOString()
            })
            .eq('id', resource.id)
            .select()
            .single();

        if (error) {
            console.log("Error: ", error);
            throw error;
        }

        // Delete old keywords and insert new ones
        await supabase
            .from('resourcekeywords')
            .delete()
            .eq('resource_id', resource.id);

        if (keywords && keywords.length > 0) {
            const resourceKeywords = keywords.map((kw) => {
                return {
                    resource_id: data.id,
                    keyword: kw
                };
            });

            const {error: keywordError} = await supabase
                .from('resourcekeywords')
                .insert(resourceKeywords);

            if (keywordError) {
                console.log("Keyword Error: ", keywordError);
                throw keywordError;
            }
        }

        // Delete old files and insert new ones
        const removedFiles = initialAttachedFiles.filter(initialFile=>(
            !currentAttachedFiles.some(
                file=> file.id === initialFile.id
            )
        ))

        const removedFileIds = removedFiles.map(file=> file.id)
        await supabase
            .from('files')
            .delete()
            .in('id', removedFileIds);
        // await supabase
        //     .from('files')
        //     .delete()
        //     .eq('resource_id', resource.id);

        //Removing files from bucket
        await Promise.all(
            removedFiles.map(file =>
                deleteFileFromBucket(file.file_url)
            )
        );

        if (files && files.length > 0) {
            const resourceFiles = files.map((file) => {
                const {id, created_at, ...fileData} = file; // Omit id and created_at
                return {
                    resource_id: resource.id,
                    ...fileData
                };
            });

            const {error: fileError} = await supabase
                .from('files')
                .insert(resourceFiles);

            if (fileError) {
                console.log("File Error: ", fileError);
                throw fileError;
            }
        }

        return data;
    },

    async delete(id: string) {
        const {data, error} = await supabase
            .from('resources')
            .delete()
            .eq('id', id);

        if (error) {
            console.log("Error: ", error);
            throw error;
        }
        return data;
    },
};
