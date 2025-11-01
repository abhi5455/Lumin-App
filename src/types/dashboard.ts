export interface IEvent {
    id: number;
    title: string;
    start: string; // ISO datetime string (e.g. "2025-10-21T09:00:00")
    end: string;   // ISO datetime string
}

export type ICallStatus = 'answered' | 'missed' | 'voicemail' | string;

export interface ICallRecord {
    id?: number;
    from?: string;
    to?: string;
    time?: string;      // ISO datetime or relative string like "2 hours ago"
    duration?: string;  // e.g. "00:05:12"
    status?: ICallStatus;
    [key: string]: any; // allow other fields in recent call objects
}

export interface ICallsSummary {
    answered: number;
    missed: number;
    recent: ICallRecord[];
    totalCalls: number;
}

export interface IChart {
    title: string;
    total: number;
    trend: string;
    rangeLabel: string;
    data: {
        month: string,
        calls: number
    }[];
}

export interface IConversation {
    id: number;
    contact: string;
    topic?: string;
    lastMessage?: string;
    status?: string; // e.g. 'Ongoing' | 'Completed' | 'Pending'
    time?: string;   // e.g. "2 hours ago", "Yesterday"
}

export interface IMetric {
    title: string;
    value: string;   // e.g. "70%"
    trend?: 'up' | 'down' | 'warning' | string;
    color?: string;  // semantic color name like 'emerald' | 'orange' | 'red'
    href?: string;
}

export interface IPlan {
    cta: string;
    features: string[];
    price: string; // keep as string to preserve formats like "$499/month"
    title: string;
    [key: string]: any;
}

export interface IDashboard {
    events: IEvent[];          // corresponds to the array of calendar entries
    calls: ICallsSummary;
    chart: IChart;
    conversations: IConversation[];
    metrics: IMetric[];
    plan: IPlan;
}
