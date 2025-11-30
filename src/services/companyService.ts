import {supabase} from "../lib/supabaseClient.ts";

export const companyService = {
    async getAll() {
        const {data, error} =
            await supabase.from("company")
                .select(`
                *,
                companyroles(
                    id,
                    role_name
                ),
                recruitmentprocess(
                    *,
                    recruitmentrounds(*)
                )
            `)
                .order('created_at', {ascending: false});

        if (error) {
            console.log("Error: ", error);
            throw error
        }
        return data;
    },

    async getAllByCollegeId(collegeId: string) {
        const {data, error} =
            await supabase.from('company')
                .select(`
                    *, 
                    college(*),
                    companyroles(
                        id,
                        role_name
                    ),
                    recruitmentprocess(
                        *,
                        recruitmentrounds(*)
                    )
                `)
                .eq('college_id', collegeId)
                .order('created_at', { ascending: false });

        if (error) {
            console.log("Error: ", error);
            throw error
        }
        return data;
    },

    async getById(id: string) {
        const {data, error} =
            await supabase.from('company')
                .select(`
                    *, 
                    college(*),
                    companyroles(
                        id,
                        role_name
                    ),
                    recruitmentprocess(
                        *,
                        recruitmentrounds(*)
                    )
                `)
                .eq('id', id)
                .single();

        if (error) {
            console.log("Error: ", error);
            throw error
        }
        return data;
    },
}
