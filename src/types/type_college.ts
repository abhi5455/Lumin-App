export interface ICollege{
    id: string;
    name: string;
    about: string;
    location: string;
    created_at: string;
}

export interface IDepartment {
    id: string;
    name: string;
    code: string;
    college_id: string;
    created_at: string;
}
