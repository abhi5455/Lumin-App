export interface IResource {
    id: string;
    title: string;
    content: string;
    is_verified: boolean;
    created_at: string;
    updated_at: string;
    files: any[]; // need to be edited

    company_id: string | null;
    college_id: string;

    college: {
        id: string;
        name: string;
        about: string;
        location: string;
        created_at: string;
    };

    resourcekeywords: {
        keyword: string;
        resource_id: string;
        created_at: string;
    }[];

    student: {
        id: string;
        name: string;
        admission_number: string;
        admission_year: number;
        graduate_year: number;
        status: string;

        email: string;
        phone: string | null;

        auth_email: string;
        college_id: string;
        department_id: string;

        image_url: string | null;
        github_url: string | null;
        linkedin_url: string | null;
        twitter_url: string | null;
        portfolio_url: string | null;

        about: string | null;

        created_at: string;
        updated_at: string;

        password: string | null;
    };

    uploaded_by_student_id: string;
}
