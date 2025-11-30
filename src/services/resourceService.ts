import {supabase} from "../lib/supabaseClient.ts";
import {IResource} from "../types/type_resource.ts";

export const resourceService = {
    async getAll() {
        const {data, error} = await supabase
            .from('resources')
            .select(`
                *, 
                student:uploaded_by_student_id(*), 
                college:college_id(*), 
                files(*), 
                resourcekeywords(*)
            `)
            .order('created_at', { ascending: false });

        if (error) {
            console.log("Error: ", error);
            throw error;
        }
        return data;
    },

    async getAllByCollegeId(collegeId: string, searchValue?: string) {
        const {data, error} = await supabase
            .from('resources')
            .select(`
                *, 
                student:uploaded_by_student_id(*), 
                college:college_id(*), 
                files(*), 
                resourcekeywords(*)
            `)
            .eq('college_id', collegeId)
            .order('created_at', { ascending: false });

        if (error) {
            console.log("Error: ", error);
            throw error;
        }
        return data;
    },

    async getAllByCollegeNCompanyId(collegeId: string, companyId: string) {
        const {data, error} = await supabase
            .from('resources')
            .select(`
                *, 
                student:uploaded_by_student_id(*), 
                college:college_id(*), 
                files(*), 
                resourcekeywords(*)
            `)
            .eq('college_id', collegeId)
            .eq('company_id', companyId)
            .order('created_at', { ascending: false });

        if (error) {
            console.log("Error: ", error);
            throw error;
        }
        return data;
    },

    async getAllByStudentId(studentId: string) {
        const {data, error} = await supabase
            .from('resources')
            .select(`
                *, 
                student:uploaded_by_student_id(*), 
                college:college_id(*), 
                files(*), 
                resourcekeywords(*)
            `)
            .eq('uploaded_by_student_id', studentId)
            .order('created_at', { ascending: false });

        if (error) {
            console.log("Error: ", error);
            throw error;
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
                resourcekeywords(*)
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

    async update(resource: Omit<IResource, 'updated_at'>) {
        const {keywords, files, ...resourceData} = resource;

        const {data, error} = await supabase
            .from('resources')
            .update(resourceData)
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
                const {id, created_at, ...keywordData} = kw; // Omit id and created_at
                return {
                    resource_id: resource.id,
                    ...keywordData
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
        await supabase
            .from('files')
            .delete()
            .eq('resource_id', resource.id);

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
