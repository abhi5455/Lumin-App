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
        let selectQuery = `
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
            `;

        if (filters?.Departments && filters.Departments.length > 0) {
            selectQuery += `, rstudentcompany!inner(student!inner(department!inner(code)))`;
        }

        let query = supabase.from('company')
            .select(selectQuery)
            .eq('college_id', collegeId);

        // Departments filter
        if (filters?.Departments && filters.Departments.length > 0) {
            query = query.in('rstudentcompany.student.department.code', filters.Departments);
        }

        // Recruited Years filter
        if (filters?.RecruitedYears && filters.RecruitedYears.length > 0) {
            const years = filters.RecruitedYears.map(y => parseInt(y)).filter(n => !isNaN(n));
            if (years.length > 0) {
                query = query.in('last_recruited', years);
            }
        }

        // Search filters
        if (searchValue && searchValue.trim() !== '') {
            query = query.ilike('name', `%${searchValue.trim()}%`);
        }

        const {data, error} = await query.order('created_at', {ascending: false});
        if (error) {
            console.log("Error: ", error);
            throw error
        }

        // Packages filters
        if (filters?.Packages && filters.Packages.length > 0 && data) {
            const extractSalary = (s: string | null) => {
                if (!s) return 0;
                // Remove commas and extract first number found
                const cleanS = s.replace(/,/g, '');
                const match = cleanS.match(/(\d+(\.\d+)?)/);
                return match ? parseFloat(match[0]) : 0;
            };

            const packageRanges = filters.Packages.map(p => {
                if (p.includes('+')) {
                    const match = p.match(/(\d+(\.\d+)?)/);
                    const min = match ? parseFloat(match[0]) : 0;
                    return { min, max: Infinity };
                }
                const parts = p.split('-');
                if (parts.length === 2) {
                    const min = parseFloat(parts[0].replace(/[^0-9.]/g, ''));
                    const max = parseFloat(parts[1].replace(/[^0-9.]/g, ''));
                    return { min, max };
                }
                return null;
            }).filter(Boolean);

            return data.filter(company => {
                const salary = extractSalary(company.avg_salary);
                return packageRanges.some(range => range && salary >= range.min && salary <= range.max);
            });
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
