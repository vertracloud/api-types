import type { ISODateString, PlanName } from "../../v1";
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
	language: UserLanguage;
	/** Accepts workspace invites by e-mail (`WORKSPACE_INVITES_DISABLED` when off). */
	workspace_invites_enabled: boolean;
	/** Receives promotional e-mails (offers and product announcements). Account notices are always sent. */
	marketing_emails_enabled: boolean;
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
	/** `null` when the account has no plan. */
	plan: APIUserPlan | null;
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
	name: PlanName;
	expires_at: ISODateString;
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

/**
 * High-impact actions that a dashboard session confirms with a code sent by e-mail. Dashboard session only: requests made with an
 * API key never need a code. Ask for the code with `POST /v1/users/me/action-codes`, then send it in the `X-Action-Code` header of
 * the protected route. A code is valid once, for 10 minutes, for one action and one target.
 *
 * - `link_provider`: start linking a sign-in provider (`GET /v1/auth/{google,github,discord}/link`). Target: the provider. For GitHub
 *   the code is only asked while the account has no GitHub connected; once connected, linking a different GitHub account returns 409
 *   `PROVIDER_ALREADY_LINKED` (disconnect it first).
 * - `create_api_key`: `POST /v1/users/me/api-keys`. No target.
 * - `downgrade`: `POST /v1/users/me/downgrade`. No target.
 * - `remove_card`: `DELETE /v1/users/me/cards/:cardId`. Target: the card id.
 * - `disable_renewal`: `PATCH /v1/users/me/billing/renewal` with `auto_renew: false`. No target.
 * - `delete_workspace`: `DELETE /v1/workspaces/:id`. Target: the workspace id.
 * - `reset_database_password`: `POST /v1/databases/:id/credentials/reset`. Target: the database id.
 */
export type APIActionCodeAction = "link_provider" | "create_api_key" | "downgrade" | "remove_card" | "disable_renewal" | "delete_workspace" | "reset_database_password";
export const APIActionCodeAction = {
	LINK_PROVIDER: "link_provider",
	CREATE_API_KEY: "create_api_key",
	DOWNGRADE: "downgrade",
	REMOVE_CARD: "remove_card",
	DISABLE_RENEWAL: "disable_renewal",
	DELETE_WORKSPACE: "delete_workspace",
	RESET_DATABASE_PASSWORD: "reset_database_password",
} as const;

/** Sign-in providers that `link_provider` targets. */
export type APIActionCodeProvider = "google" | "github" | "discord";
export const APIActionCodeProvider = {
	GOOGLE: "google",
	GITHUB: "github",
	DISCORD: "discord",
} as const;

/** Name of the request header that carries the confirmation code. */
export const ACTION_CODE_HEADER = "X-Action-Code";

/** A confirmation code was sent to the account e-mail. The code itself only travels by e-mail. */
export interface APIActionCodeRequested {
	/** When the code stops working (10 minutes after the request). */
	expires_at: ISODateString;
}
