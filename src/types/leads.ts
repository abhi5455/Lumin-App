interface IOwnedBy {
    _id: string;
    email: string;
}

interface ISchedule {
    date: string;        // ISO date string
    startTime: string;   // "HH:mm" format
    endTime: string;     // "HH:mm" format
}

export interface ILead {
    _id: string;
    company: string;
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
    email: string;
    fullName: string;
    instruction: string;
    owned_by: IOwnedBy;
    phone: string;
    schedule: ISchedule;
    status: string;          // "new" | "in-progress" | etc., if you want to type more strictly
    __v: number;
}
