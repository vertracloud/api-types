import type { APIErrorCode } from "../payloads/v1/api-error";

export type SnowFlake = string;

export interface PaginationMeta<T> {
	data: T[];
	total_count: number;
	page: number;
	limit: number;
	total_pages: number;
	has_next_page: boolean;
	has_previous_page: boolean;
}

export interface APIPaginatedPayload<T> {
	response: PaginationMeta<T>;
}

/**
 * Error body: `code` is a stable English sentinel, `details` carries the machine-readable context
 * of the error (e.g. the invalid field's `path` on `VALIDATION_ERROR`).
 */
export interface APIErrorPayload<TErrorCode extends string = APIErrorCode> {
	code: TErrorCode;
	message?: string;
	details?: Record<string, unknown>;
}

/**
 * Envelope of every JSON response: `{ response }` on success — routes with nothing to return send
 * `{ response: null }` (`APIPayload<null>`) — or an `APIErrorPayload`. Narrow with `"code" in body`.
 */
export type APIPayload<T, TErrorCode extends string = APIErrorCode> = { response: T } | APIErrorPayload<TErrorCode>;

/**
 * Query accepted by the application and database routes: the workspace the resource belongs to.
 * Required for a workspace member acting on a resource they do not own; the owner may omit it.
 */
export interface RESTAPIWorkspaceQuery {
	workspace_id?: string;
}

export interface APIPayloadMessageOnly {
	message: string;
}

export interface APIHeaders {
	Authorization: string;
}

export type DeepPartial<T> = T extends object
	? {
			[P in keyof T]?: DeepPartial<T[P]>;
		}
	: T;

export type APIVersion<TVersion extends number> = `v${TVersion}`;

export type ISODateString = string;

/** Plan families of the current grid. */
export type PlanFamily = "starter" | "pro" | "business" | "enterprise";

export const PlanFamily = {
	STARTER: "starter",
	PRO: "pro",
	BUSINESS: "business",
	ENTERPRISE: "enterprise",
} as const satisfies Record<string, PlanFamily>;

/** Memory sizes in GB. */
export type StarterPlanSizes = 1 | 2;
export type ProPlanSizes = 4 | 6 | 8;
export type BusinessPlanSizes = 12 | 16 | 24;
export type EnterprisePlanSizes = 32 | 48 | 64 | 96 | 128 | 160 | 192 | 224 | 256 | 288 | 320 | 384 | 448 | 512;

/**
 * Name of a plan. An account without a plan has no name: the API sends `null`.
 * @see https://docs.vertracloud.app/knowledge-base#plan-names
 */
export type PlanName = `starter-${StarterPlanSizes}` | `pro-${ProPlanSizes}` | `business-${BusinessPlanSizes}` | `enterprise-${EnterprisePlanSizes}`;

/**
 * Plan name constants: `STARTER_*`, `PRO_4`, `PRO_6`, `PRO_8`, `BUSINESS_*` and `ENTERPRISE_32` to `ENTERPRISE_512`.
 */
export const PlanName = {
	STARTER_1: "starter-1",
	STARTER_2: "starter-2",
	PRO_4: "pro-4",
	PRO_6: "pro-6",
	PRO_8: "pro-8",
	BUSINESS_12: "business-12",
	BUSINESS_16: "business-16",
	BUSINESS_24: "business-24",

	ENTERPRISE_32: "enterprise-32",
	ENTERPRISE_48: "enterprise-48",
	ENTERPRISE_64: "enterprise-64",
	ENTERPRISE_96: "enterprise-96",
	ENTERPRISE_128: "enterprise-128",
	ENTERPRISE_160: "enterprise-160",
	ENTERPRISE_192: "enterprise-192",
	ENTERPRISE_224: "enterprise-224",
	ENTERPRISE_256: "enterprise-256",
	ENTERPRISE_288: "enterprise-288",
	ENTERPRISE_320: "enterprise-320",
	ENTERPRISE_384: "enterprise-384",
	ENTERPRISE_448: "enterprise-448",
	ENTERPRISE_512: "enterprise-512",
} as const satisfies Record<string, PlanName>;

/** Billing period in months. */
export type BillingMonths = 1 | 3 | 6 | 12;

export const BillingMonths = {
	ONE: 1,
	THREE: 3,
	SIX: 6,
	TWELVE: 12,
} as const satisfies Record<string, BillingMonths>;
