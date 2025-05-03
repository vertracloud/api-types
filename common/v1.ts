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

export interface APIPaginatedPayload<TResponse> {
	status: APIPayloadStatus;
	response: TResponse;
	meta?: PaginationMeta;
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
	total_count: number;
	page: number;
	limit: number;
	total_pages: number;
	has_next_page: boolean;
	has_previous_page: boolean;
}
