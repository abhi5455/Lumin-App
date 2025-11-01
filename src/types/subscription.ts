export interface ISubscriptionPlan {
    _id: string;
    title: string;
    benefits: string[];
    credits: number;
    currency: string;
    max_agents: number;
    price_monthly: number;
    price_yearly: number;
    monthly_polar_product_id: string;
    yearly_polar_product_id: string;
    createdAt: string;   // ISO timestamp
    updatedAt: string;   // ISO timestamp
    __v: number;
}
