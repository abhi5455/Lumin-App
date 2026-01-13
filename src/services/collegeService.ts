import {supabase} from "../lib/supabaseClient.ts";
import {ICollege} from "../types/type_college.ts";

export const collegeService = {
    async getAll() {
        const {data, error} =
            await supabase.from('college')
                .select('*')
                .order('created_at', { ascending: false });

        if (error) {
            console.log("Error: ", error);
            throw error
        }
        return data;
    },

    async getById(id: string) {
        const {data, error} =
            await supabase.from('college')
                .select('*')
                .eq('id', id)
                .single();

        if (error) {
            console.log("Error: ", error);
            throw error
        }
        return data;
    },

    async getAllDepartmentsByCollegeId(collegeId: string) {
        const {data, error} =
            await supabase.from('department')
                .select('*')
                .eq('college_id', collegeId)
                .order('created_at', { ascending: false });

        if (error) {
            console.log("Error: ", error);
            throw error
        }
        return data;
    },

    async create(college: Omit<ICollege, 'id' | 'created_at'>) {
        const {data, error} =
            await supabase.from('college')
                .insert([college])
                .select()
                .single();

        if (error) {
            console.log("Error: ", error);
            throw error
        }
        return data;
    },

    async update(college: Omit<ICollege, 'created_at'>) {
        const {data, error} =
            await supabase.from('college')
                .update(college)
                .eq('id', college.id)
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
            await supabase.from('college')
                .delete()
                .eq('id', id);

        if (error) {
            console.log("Error: ", error);
            throw error
        }
        return data;
    }
}
