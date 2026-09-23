import type { ISODateString, UserPlan } from "../../v1";
import type { APIApplication, APIDatabase, APIWorkspaceResourceOrganization } from "./index";

/**
 * Dashboard and e-mail language of the account.
 * @see https://docs.vertracloud.app/api-reference/endpoint/users/me
 */
export type UserLanguage = "pt-br" | "en-us" | "es-es";
export const UserLanguage = {
	PT_BR: "pt-br",
	EN_US: "en-us",
	ES_ES: "es-es",
} as const;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/users/me
 */
export interface APIUser {
	id: string;
	name: string;
	email: string;
	plan_id: UserPlan;
	language: UserLanguage;
	/** Accepts workspace invites by e-mail (`WORKSPACE_INVITES_DISABLED` when off). */
	workspace_invites_enabled: boolean;
	created_at: ISODateString;
	updated_at: ISODateString;
}

export interface APIUserConnection {
	provider: string;
	username: string;
	created_at: ISODateString;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/users/me
 */
export interface APIUserInfoResponse extends APIUser {
	plan: APIUserPlan;
	applications: APIApplication[];
	databases: APIDatabase[];
	connections: APIUserConnection[];
	/** Saved resource organization (folders, favorites) of this account. */
	resource_organization: APIWorkspaceResourceOrganization;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/users/me
 */
export interface APIUserPlanMemory {
	limit: number;
	used: number;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/users/me
 */
export interface APIUserPlan {
	id: UserPlan;
	name: string;
	expires_at: ISODateString | null;
	duration: number;
	memory: APIUserPlanMemory;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/users/sessions
 */
export interface APIUserSession {
	id: string;
	user_id: string;
	provider: string;
	ip_address: string | null;
	location: string | null;
	device: string | null;
	expires_at: ISODateString;
	created_at: ISODateString;
	updated_at: ISODateString;
	is_current: boolean;
}

/**
 * Legacy response of `POST /me/generate-api-key` (CLI). Prefer `/me/api-keys`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/users/api-keys/create
 */
export interface APIUserApiKey {
	api_key: string;
}

/**
 * A request made to the API with one of the user's keys. Dashboard only
 * (`GET /v1/users/me/api-key/requests` rejects API key authentication). Kept for 30 days.
 * @see https://docs.vertracloud.app/api-reference/endpoint/users/api-key-requests
 */
export interface APIUserApiKeyRequestEvent {
	id: string;
	/** Public prefix of the key used; `null` if the key has been deleted. */
	api_key_prefix: string | null;
	api_key_id: string | null;
	method: string;
	/** Route pattern (`/v1/apps/:id`). */
	route: string;
	/** Concrete path, without the query string. */
	path: string | null;
	ip: string | null;
	user_agent: string | null;
	status: number;
	duration_ms: number;
	bytes_in: number | null;
	bytes_out: number | null;
	error_code: string | null;
	/** Request/response body, only for routes that carry no secrets (lifecycle, config, snapshots, network); JSON ≤ 4 KB with secrets redacted. `null` for every other route. */
	request_body: string | null;
	response_body: string | null;
	occurred_at: ISODateString;
}
