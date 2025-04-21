export type APIPayloadStatus = "error" | "success";

export type SnowFlake = string;

export interface APIPayload<TResponse> {
	status: APIPayloadStatus;
	response: TResponse;
	code?: string;
}

export interface APIPayloadStatusOnly {
	status: APIPayloadStatus;
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

export interface PaginationMeta {
	total: number;
	limit?: number;
	page?: number;
	total_pages?: number;
	before_limit?: number;
	after_limit?: number;
	reference_id?: string;
	returned?: number;
}

export interface PaginatedResponse<T> {
	status: "success" | "error";
	response: T;
	meta?: PaginationMeta;
}

export interface PaginationOptions {
	default_limit?: number;
	max_limit?: number;
}
