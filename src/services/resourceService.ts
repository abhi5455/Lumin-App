import {supabase} from "../lib/supabaseClient.ts";
import {IResource} from "../types/type_resource.ts";

export const resourceService = {
    async getAll() {
        const {data, error} =
            await supabase.from('resource')
                .select('*, student(*), college(*), files(*), resourcekeywords(*)')

        if (error) {
            console.log("Error: ", error);
            throw error
        }
        return data;
    },

    async getAllByCollegeId(collegeId: string) {
        const {data, error} =
            await supabase.from('resource')
                .select('*, student(*), college(*), files(*), resourcekeywords(*)')
                .eq('college_id', collegeId);

        if (error) {
            console.log("Error: ", error);
            throw error
        }
        return data;
    },

    async getById(id: string) {
        const {data, error} =
            await supabase.from('resource')
                .select('*, student(*), college(*), files(*), resourcekeywords(*)')
                .eq('id', id)
                .single();

        if (error) {
            console.log("Error: ", error);
            throw error
        }
        return data;
    },

    async create(resource: Omit<IResource, 'id' | 'created_at' | 'updated_at'>) {
        //Creating resource
        const {data, error} =
            await supabase.from('resource')
                .insert([resource])
                .select()
                .single();

        if (error) {
            console.log("Error: ", error);
            throw error
        }
        // return data;

        //creating resource keywords to link keywords to resource
        const resourceKeywords = resource?.keywords.map((keyword) => ({
            resource_id: data?.id,
            ...keyword
        }));

        const {kdata, kerror} =
            await supabase.from('resourcekeywords')
                .insert(resourceKeywords)
        if (kerror) {
            console.log("Keyword Error: ", kerror);
            throw kerror
        }

        //creating files to link files to resource
        const resourceFiles = resource?.files.map((file) => ({
            resource_id: data?.id,
            ...file
        }));
        const {fdata, ferror} =
            await supabase.from('files')
                .insert(resourceFiles)
        if (ferror) {
            console.log("File Error: ", ferror);
            throw ferror
        }

        return data;
    },

    async update(resource: Omit<IResource, 'updated_at'>) {
        const {data, error} =
            await supabase.from('resource')
                .update(resource)
                .eq('id', resource.id)
                .select()
                .single();

        if (error) {
            console.log("Error: ", error);
            throw error
        }

        //updating resource keywords
        const resourceKeywords = resource?.keywords.map((keyword) => ({
            resource_id: resource.id,
            ...keyword
        }));
        const {kdata, kerror} =
            await supabase.from('resourcekeywords')
                .upsert(resourceKeywords)
        if (kerror) {
            console.log("Keyword Error: ", kerror);
            throw kerror
        }

        //updating files
        const resourceFiles = resource?.files.map((file) => ({
            resource_id: resource.id,
            ...file
        }));
        const {fdata, ferror} =
            await supabase.from('files')
                .upsert(resourceFiles)
        if (ferror) {
            console.log("File Error: ", ferror);
            throw ferror
        }

        return data;
    },

    async delete(id: string) {
        const {data, error} =
            await supabase.from('resource')
                .delete()
                .eq('id', id);

        if (error) {
            console.log("Error: ", error);
            throw error
        }
        return data;
    },
}
