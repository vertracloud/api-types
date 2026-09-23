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

export type UserPlan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19;

export const UserPlan = {
	FREE: 1,
	ECONOMY: 2,
	PRO: 3,
	SCALE: 4,
	INTERMEDIARY: 9,

	ENTERPRISE_4: 5,
	ENTERPRISE_6: 19,
	ENTERPRISE_8: 6,
	ENTERPRISE_12: 10,
	ENTERPRISE_14: 11,
	ENTERPRISE_16: 7,
	ENTERPRISE_18: 12,
	ENTERPRISE_20: 13,
	ENTERPRISE_22: 14,
	ENTERPRISE_24: 15,
	ENTERPRISE_26: 16,
	ENTERPRISE_28: 17,
	ENTERPRISE_30: 18,
	ENTERPRISE_32: 8,
} as const;
