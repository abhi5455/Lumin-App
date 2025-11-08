import {supabase} from "../lib/supabaseClient.ts";
import {ICollege} from "../types/type_college.ts";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env';

export const collegeService = {
    async getAll() {
        const {data, error} =
            await supabase.from('college')
                .select('*');

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

    async create(college: Omit<ICollege, 'id' | 'created_at'>) {
        console.log("Creating college: ", college, "\n Url ", SUPABASE_URL, "\n Anon ",SUPABASE_ANON_KEY);
        const {data, error} =
            await supabase.from('college')
                .insert([college])
                .select()
                .single()

        if (error) {
            console.log("Error: ", error);
            throw error
        }
        return data;
    }

}
