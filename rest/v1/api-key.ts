import type { APIApiKey, APIApiKeyCreated, APIApiKeyScope, APIPayload } from "../../v1";

/**
 * Key management under `/v1/users/me/api-keys`. Dashboard session only: every route rejects API key authentication (`WEBSITE_ONLY`).
 * @see https://docs.vertracloud.app/api-reference/endpoint/users/api-keys/list
 */
export type RESTGetAPIUserApiKeysResponse = APIPayload<APIApiKey[]>;

export interface RESTPostAPIUserApiKeyCreateBody {
	/** 1–40 characters. */
	name: string;
	/** At least one scope. */
	scopes: APIApiKeyScope[];
	/** One IP or CIDR per entry, max. 20. Omitted/empty = any IP. */
	allowed_ips?: string[];
	/**
	 * Restricts the key to one Blob folder: a path that ends in `/`, without `..` or empty segments. Only valid when every scope
	 * is a `blob:*` scope. `null` or absent = the whole Blob. A prefix that is not valid returns `VALIDATION_ERROR`. The S3 credentials
	 * derived from the key inherit the restriction.
	 */
	blob_prefix?: string | null;
}
export type RESTPostAPIUserApiKeyCreateResponse = APIPayload<APIApiKeyCreated>;

/** Never changes the secret — use `rotate` for that. A key created by the platform for a stack (`managed_by`) is refused with `API_KEY_MANAGED`. */
export type RESTPatchAPIUserApiKeyBody = Partial<RESTPostAPIUserApiKeyCreateBody>;
export type RESTPatchAPIUserApiKeyResponse = APIPayload<APIApiKey>;

/** New secret; same `id`, name, scopes and IPs. */
export type RESTPostAPIUserApiKeyRotateResponse = APIPayload<APIApiKeyCreated>;

export type RESTDeleteAPIUserApiKeyResponse = APIPayload<never>;
