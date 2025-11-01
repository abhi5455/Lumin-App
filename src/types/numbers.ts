export interface IPhoneNumber {
    _id: string;
    plivoNumberId: string;
    number: string;
    provider: string;
    owned_by: string;
    country: string;
    active: boolean;
    deleted: boolean;
    billingStart: string;   // ISO date string
    expiresAt: string;      // ISO date string
    nextRenewal: string;    // ISO date string
    createdAt: string;      // ISO date string
    updatedAt: string;      // ISO date string
    monthlyCost: number;
    __v: number;
}
