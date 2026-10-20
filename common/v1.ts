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

export type EnterprisePlanSizes = 4 | 6 | 8 | 12 | 14 | 16 | 18 | 20 | 22 | 24 | 26 | 28 | 30 | 32;

/**
 * Name of a plan. An account without a plan has no name: the API sends `null`.
 * @see https://docs.vertracloud.app/knowledge-base#plan-names
 */
export type UserPlanName = "economy" | "pro" | "scale" | "intermediary" | `enterprise-${EnterprisePlanSizes}`;

export const UserPlanName = {
	ECONOMY: "economy",
	PRO: "pro",
	SCALE: "scale",
	INTERMEDIARY: "intermediary",

	ENTERPRISE_4: "enterprise-4",
	ENTERPRISE_6: "enterprise-6",
	ENTERPRISE_8: "enterprise-8",
	ENTERPRISE_12: "enterprise-12",
	ENTERPRISE_14: "enterprise-14",
	ENTERPRISE_16: "enterprise-16",
	ENTERPRISE_18: "enterprise-18",
	ENTERPRISE_20: "enterprise-20",
	ENTERPRISE_22: "enterprise-22",
	ENTERPRISE_24: "enterprise-24",
	ENTERPRISE_26: "enterprise-26",
	ENTERPRISE_28: "enterprise-28",
	ENTERPRISE_30: "enterprise-30",
	ENTERPRISE_32: "enterprise-32",
} as const satisfies Record<string, UserPlanName>;
