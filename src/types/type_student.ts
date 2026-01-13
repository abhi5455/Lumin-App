import {IDepartment} from "./type_college.ts";

export interface IStudent {
    id: string;
    name: string;
    email: string;
    auth_email: string;
    phone: string | null;
    image_url: string | null;
    github_url: string | null;
    linkedin_url: string | null;
    portfolio_url: string | null;
    twitter_url: string | null;

    admission_number: string;
    admission_year: number;
    graduate_year: number | null;
    status: "student" | "alumni";

    about: string | null;
    password: string | null;
    created_at: string;
    updated_at: string;

    college_id: string;
    college: ICollege;

    department_id: string;
    department: IDepartment;

    studenteducation: IStudentEducation[];
    rstudentcompany: IStudentCompany[];
}

export interface ICollege {
    id: string;
    name: string;
    about: string;
    location: string;
    created_at: string;
}

export interface IStudentEducation {
    id: string;
    student_id: string;
    is_base_college: boolean;
    institution: string;
    degree_type: string;
    field_of_study: string;
    marks_percent: number | null;
    start_year: number;
    end_year: number | null;
    created_at: string;
}

export interface IStudentCompany {
    company_id: string;
    student_id: string;
    start_year: number;
    end_year: number | null;
    position: string;
    is_current: boolean;
    created_at: string;
    company: ICompany;
}

export interface ICompany {
    id: string;
    name: string;
    industry: string;
    overview: string;
    email: string;
    glassdoor_url: string | null;
    linkedin_url: string | null;
    twitter_url: string | null;
    portfolio_url: string | null;
    logo_url: string | null;

    agreement: number;
    agreement_type: string;
    avg_salary: string;
    college_id: string;
    last_recruited: number;
    total_hires: number;
    created_at: string;
}
