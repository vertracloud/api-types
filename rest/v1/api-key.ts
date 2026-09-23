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
}
export type RESTPostAPIUserApiKeyCreateResponse = APIPayload<APIApiKeyCreated>;

/** Never changes the secret — use `rotate` for that. */
export type RESTPatchAPIUserApiKeyBody = Partial<RESTPostAPIUserApiKeyCreateBody>;
export type RESTPatchAPIUserApiKeyResponse = APIPayload<APIApiKey>;

/** New secret; same `id`, name, scopes and IPs. */
export type RESTPostAPIUserApiKeyRotateResponse = APIPayload<APIApiKeyCreated>;

export type RESTDeleteAPIUserApiKeyResponse = APIPayload<never>;
