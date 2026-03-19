import type { ISODateString } from "../../v1";

export interface APIUserCredits {
	free: number;
	paid: number;
	free_per_week: number;
	free_reset_at: ISODateString;
	paid_expires_at: ISODateString | null;
}

export interface APICreditBalance {
	/** Compute credits (monthly — FREE plan only) */
	free: number;
	/** Compute credits (purchased) */
	paid: number;
	free_per_month: number;
	free_reset_at: ISODateString;
	paid_expires_at: ISODateString | null;
	/** AI credits (monthly — all plans) */
	ai_free: number;
	/** AI credits (purchased) */
	ai_paid: number;
	ai_free_per_month: number;
	ai_free_reset_at: ISODateString;
	ai_paid_expires_at: ISODateString | null;
}

export interface APICreditUsage {
	id: string;
	resource_id: string;
	resource_type: "app" | "database" | "ai";
	resource_name: string | null;
	credit_type: "free" | "paid" | "ai_free" | "ai_paid";
	amount: number;
	description: string | null;
	created_at: ISODateString;
}

export interface APICreditCostEstimate {
	ram_mb: number;
	cost_per_hour: number;
	cost_per_day: number;
	cost_per_week: number;
}
