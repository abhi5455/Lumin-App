interface IUserType {
    _id: string;
    type_id: number;
    title: string;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface IUserProfile {
    _id: string;
    name: string;
    email: string;
    profile_completed: boolean;
    type: IUserType;
    status: 'active' | 'inactive' | string;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
