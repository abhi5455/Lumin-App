import {supabase} from "../lib/supabaseClient.ts";

export const companyService = {
    async getAll(){
        const {data, error} =
        await supabase.from("company")
            .select('*');

        if(error){
            console.log("Error: ", error);
            throw error
        }
        return data;
    },

    async getAllByCollegeId(collegeId: string) {
        const {data, error} =
            await supabase.from('company')
                .select(`*, college(*)`)
                .eq('college_id', collegeId);

        if (error) {
            console.log("Error: ", error);
            throw error
        }
        return data;
    },

    async getAllById(id: string) {
        const {data, error} =
            await supabase.from('company')
                .select(`*, college(*)`)
                .eq('id', id);

        if (error) {
            console.log("Error: ", error);
            throw error
        }
        return data;
    },
}
