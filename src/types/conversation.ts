export interface IConversation {
    _id: string;
    agent: {
        workingHours: {
            from: number;  // in minutes (e.g., 540 = 9 AM)
            to: number;    // in minutes (e.g., 1020 = 5 PM)
        };
        scheduling: {
            date: {
                from: string; // ISO date string
                to: string;   // ISO date string
            };
            time: {
                from: number; // in minutes
                to: number;   // in minutes
            };
        };
        _id: string;
        name: string;
        language: string;  // reference ID
        voice: string;     // reference ID
        role: string;
        accent: string;    // reference ID
        number: string;    // reference ID
        context: string;
        added_by: string;
        deleted: boolean;
        createdAt: string; // ISO date string
        updatedAt: string; // ISO date string
        __v: number;
    };
    lead: {
        schedule: {
            date: string;     // ISO date string
            startTime: string; // e.g. "17:00"
            endTime: string;   // e.g. "18:00"
        };
        _id: string;
        fullName: string;
        email: string;
        phone: string;
        company: string;
        instruction: string;
        status: string;
        owned_by: string;
        deleted: boolean;
        createdAt: string; // ISO date string
        updatedAt: string; // ISO date string
        __v: number;
    };
    startTime: string;  // ISO date string
    endTime: string;    // ISO date string
    date: string;       // ISO date string
    status: string;     // e.g. "success"
    callType: string;   // "inbound" | "outbound"
    deleted: boolean;
    createdAt: string;  // ISO date string
    updatedAt: string;  // ISO date string
    __v: number;
}
