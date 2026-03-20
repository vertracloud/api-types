import type { ISODateString } from "../../v1";

/** Compute credit balance (for running apps/databases) */
export interface APICreditCompute {
	free: number;
	paid: number;
	free_per_month: number;
	free_reset_at: ISODateString;
	paid_expires_at: ISODateString | null;
}

/** AI credit balance (for AI features) */
export interface APICreditAI {
	free: number;
	paid: number;
	free_per_month: number;
	free_reset_at: ISODateString;
	paid_expires_at: ISODateString | null;
}

/**
 * User credits summary returned in GET /v1/users/@me
 */
export interface APIUserCredits {
	compute: APICreditCompute;
	ai: APICreditAI;
}

/**
 * Full credit balance returned by GET /v1/credits/balance
 */
export interface APICreditBalance {
	compute: APICreditCompute;
	ai: APICreditAI;
}

/**
 * Single credit usage entry returned by GET /v1/credits/usage
 */
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

/**
 * Cost estimation returned by GET /v1/credits/cost?ram={mb}
 */
export interface APICreditCostEstimate {
	ram_mb: number;
	cost_per_day: number;
	cost_per_week: number;
	cost_per_month: number;
}
