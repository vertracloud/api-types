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

export interface APIPayload<T> {
	response?: T;
	code?: string;
	message?: string;
}

export interface APIReturnService<T> {
	status: number;
	payload: APIPayload<T>;
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

export type UserPlan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export const UserPlan = {
	FREE: 1,
	ECONOMY: 2,
	PRO: 3,
	SCALE: 4,
	ENTERPRISE_4: 5,
	ENTERPRISE_8: 6,
	ENTERPRISE_16: 7,
	ENTERPRISE_32: 8,
} as const;
