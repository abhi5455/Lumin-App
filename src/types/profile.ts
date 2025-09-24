interface IUserType {
    __v: number;
    _id: string;
    createdAt: string;
    deleted: boolean;
    title: string;
    type_id: number;
    updatedAt: string;
}

interface ICompany {
    __v: number;
    _id: string;
    aboutCompany: string;
    address: string;
    businessCode: string;
    country: string;
    createdAt: string;
    deleted: boolean;
    name: string;
    registrationNumber: string;
    state: string;
    updatedAt: string;
    zipCode: string;
}

export interface IUserProfile {
    __v: number;
    _id: string;
    company: ICompany | null;
    createdAt: string;
    deleted: boolean;
    designation: string;
    email: string;
    name: string;
    profile_completed: boolean;
    status: 'active' | 'inactive' | string;
    type: IUserType;
    updatedAt: string;
}
