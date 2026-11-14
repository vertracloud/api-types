import type { APIActionCodeAction, APIActionCodeRequested, APIPaginatedPayload, APIPayload, APIUser, APIUserApiKey, APIUserApiKeyRequestEvent, APIUserInfoResponse, APIUserSession, ISODateString, UserLanguage } from "../../v1";
import type { APIWorkspaceFolderFlowLayout, APIWorkspaceResourceFolder, APIWorkspaceResourceOrganization, WorkspaceFolderColor } from "../../v1";

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/users/me
 */
export type RESTGetAPIUserInfoResponse = APIPayload<APIUserInfoResponse>;

/**
 * `POST /v1/users/me/downgrade` — dashboard session only: requires `X-Action-Code` (action `downgrade`, see
 * `RESTPostAPIUserActionCodeBody`). Without the header: 403 `ACTION_CODE_REQUIRED`; wrong, expired or already used code: 400
 * `ACTION_CODE_INVALID`; after too many wrong codes: 429 `TOO_MANY_ATTEMPTS` (ask for a new code).
 * @see https://docs.vertracloud.app/plan-downgrade
 */
export type RESTPostAPIUserDowngradeResponse = APIPayload<APIUser>;

/**
 * `PATCH /v1/users/me`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/users/update-me
 */
export interface RESTPatchAPIUserMeBody {
	name?: string;
	language?: UserLanguage;
	workspace_invites_enabled?: boolean;
	marketing_emails_enabled?: boolean;
}
export type RESTPatchAPIUserMeResponse = APIPayload<APIUser>;

export interface RESTPostAPIUserResourceFolderBody {
	name: string;
	color?: WorkspaceFolderColor;
	position?: number;
	/** Free-text notes. `null` removes them (PATCH). */
	notes?: string | null;
	/** Position on the Flow canvas. `null` removes it (PATCH). */
	flow_layout?: APIWorkspaceFolderFlowLayout | null;
}
export type RESTPostAPIUserResourceFolderResponse = APIPayload<APIWorkspaceResourceFolder>;
export interface RESTPatchAPIUserResourceFolderBody {
	name?: string;
	color?: WorkspaceFolderColor;
	position?: number;
	/** Free-text notes. `null` removes them (PATCH). */
	notes?: string | null;
	/** Position on the Flow canvas. `null` removes it (PATCH). */
	flow_layout?: APIWorkspaceFolderFlowLayout | null;
}
export type RESTPatchAPIUserResourceFolderResponse = APIPayload<APIWorkspaceResourceFolder>;
export type RESTDeleteAPIUserResourceFolderResponse = APIPayload<null>;
export interface RESTPutAPIUserResourceFolderResourceBody {
	position?: number;
}
export type RESTPutAPIUserResourceFolderResourceResponse = APIPayload<APIWorkspaceResourceOrganization>;
export type RESTDeleteAPIUserResourceFolderResourceResponse = APIPayload<APIWorkspaceResourceOrganization>;
export interface RESTPutAPIUserFavoriteBody {
	position?: number;
}
export type RESTPutAPIUserFavoriteResponse = APIPayload<APIWorkspaceResourceOrganization>;
export type RESTDeleteAPIUserFavoriteResponse = APIPayload<APIWorkspaceResourceOrganization>;

/**
 * Legacy CLI route; prefer the API key management under `/v1/users/me/api-keys`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/users/api-keys/create
 */
export type RESTPostAPIUserGenerateApiKeyResponse = APIPayload<APIUserApiKey>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/users/sessions
 */
export type RESTGetAPIUserSessionsResponse = APIPayload<APIUserSession[]>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/users/api-key-requests
 */
export interface RESTGetAPIUserApiKeyRequestsQuery {
	/** Filters by key (`APIApiKey.id`). */
	api_key_id?: string;
	from?: ISODateString;
	to?: ISODateString;
	page?: number;
	per_page?: number;
	errors_only?: boolean;
}

export type RESTGetAPIUserApiKeyRequestsResponse = APIPaginatedPayload<APIUserApiKeyRequestEvent>;

/**
 * `POST /v1/users/me/action-codes` — Dashboard session only (API keys get 403 `WEBSITE_ONLY`). Sends a confirmation code to the
 * account e-mail for one high-impact action; the code goes in the `X-Action-Code` header of that action's route. Asking again for
 * the same action and target replaces the previous code.
 *
 * Errors: 400 `VALIDATION_ERROR` (unknown `action`, `target_id` missing for an action that has a target, or sent for one that has
 * none; the field in `details.path`); 404 `CARD_NOT_FOUND`, `WORKSPACE_NOT_FOUND` or `DATABASE_NOT_FOUND` when the target does not
 * exist or is not yours (the same answer for both); 429 `RATE_LIMIT_EXCEEDED` with `details.retry_after` (seconds) when
 * codes are requested too often for the account; 503 `SERVICE_UNAVAILABLE` when the e-mail could not be sent.
 */
export interface RESTPostAPIUserActionCodeBody {
	action: APIActionCodeAction;
	/**
	 * Required for the actions that have a target, absent (or `null`) for the others: the provider for `link_provider`
	 * (`APIActionCodeProvider`), the card id for `remove_card`, the workspace id for `delete_workspace` and the database id for
	 * `reset_database_password`.
	 */
	target_id?: string | null;
}
export type RESTPostAPIUserActionCodeResponse = APIPayload<APIActionCodeRequested>;
