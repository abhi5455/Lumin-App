interface INumber {
    _id: string;
    number: string;
    provider: string;
    country: string;
    expiresAt: string; // ISO date string
    owned_by: string;
    plivoNumberId: string;
    monthlyCost: number;
    billingStart: string;
    nextRenewal: string;
    active: boolean;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface IAddedBy {
    _id: string;
    name: string;
    email: string;
}

interface IWorkingHours {
    from: number; // minutes since midnight
    to: number;   // minutes since midnight
}

interface ISchedulingTime {
    from: number;
    to: number;
}

interface ISchedulingDate {
    from: string; // ISO date string
    to: string;   // ISO date string
}

interface IScheduling {
    date: ISchedulingDate;
    time: ISchedulingTime;
}

export interface IAgent {
    _id: string;
    name: string;
    language: string;
    voice: string;
    role: string;
    accent: string;
    number: INumber;
    context: string;
    workingHours: IWorkingHours;
    scheduling: IScheduling;
    added_by: IAddedBy;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
