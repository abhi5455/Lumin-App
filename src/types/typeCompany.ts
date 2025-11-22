export interface ICompany {
    id: string;
    name: string;
    industry: string;
    email: string | null;
    overview: string | null;
    glassdoor_url: string | null;
    linkedin_url: string | null;
    twitter_url: string | null;
    portfolio_url: string | null;
    logo_url: string | null;
    total_hires: number | null;
    last_recruited: number | null;
    avg_salary: string | null;
    agreement: number | null;
    agreement_type: "year" | "month" | string;
    college_id: string | null;
    created_at: string;
    location: string | null;
    college?: {
        id: string;
        name: string;
        about: string | null;
        location: string | null;
        avg_salary?: string | null;
        created_at?: string;
    } | null;
    companyroles?: {
        id: string;
        role_name: string;
    }[];
}
