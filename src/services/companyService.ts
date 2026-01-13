import {supabase} from "../lib/supabaseClient.ts";

interface CompanyFilters {
    Departments?: string[];
    RecruitedYears?: string[];
    Packages?: string[];
}

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

    async getAllByCollegeId(collegeId: string, filters?: CompanyFilters, searchValue?: string) {
        let query = supabase.from('company')
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
            .eq('college_id', collegeId);
        // Apply Departments filter
        // if (filters?.Departments && filters.Departments.length > 0) {
        //     query = query.in('department', filters.Departments);
        // }
        // Apply Recruited Years filter
        if (filters?.RecruitedYears && filters.RecruitedYears.length > 0) {
            query = query.in('last_recruited', filters.RecruitedYears);
        }
        // Apply Packages filter
        if (filters?.Packages && filters.Packages.length > 0) {
            query = query.in('avg_salary', filters.Packages);
        }
        // Apply Search filter
        if (searchValue && searchValue.trim() !== '') {
            query = query.ilike('name', `%${searchValue.trim()}%`);
        }
        const {data, error} = await query.order('created_at', {ascending: false});
        if (error) {
            console.log("Error: ", error);
            throw error
        }
        return data;

        // const {data, error} =
        //     await supabase.from('company')
        //         .select(`
        //             *,
        //             college(*),
        //             companyroles(
        //                 id,
        //                 role_name
        //             ),
        //             recruitmentprocess(
        //                 *,
        //                 recruitmentrounds(*)
        //             )
        //         `)
        //         .eq('college_id', collegeId)
        //         .order('created_at', { ascending: false });
        //
        // if (error) {
        //     console.log("Error: ", error);
        //     throw error
        // }
        // return data;
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
