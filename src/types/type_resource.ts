import {ICompany} from "./typeCompany.ts";
import {IStudent} from "./type_student.ts";

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
    student: IStudent;
    uploaded_by_student_id: string;
    company: ICompany | null;
}
