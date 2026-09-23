import type { APIPaginatedPayload, APIPayload, APIUser, APIUserApiKey, APIUserApiKeyRequestEvent, APIUserInfoResponse, APIUserSession, ISODateString, UserLanguage } from "../../v1";
import type { APIWorkspaceResourceFolder, APIWorkspaceResourceOrganization, WorkspaceFolderColor } from "../../v1";

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/users/me
 */
export type RESTGetAPIUserInfoResponse = APIPayload<APIUserInfoResponse>;

/**
 * `POST /v1/users/me/downgrade` — dashboard session only.
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
}
export type RESTPatchAPIUserMeResponse = APIPayload<APIUser>;

export interface RESTPostAPIUserResourceFolderBody {
	name: string;
	color?: WorkspaceFolderColor;
	position?: number;
}
export type RESTPostAPIUserResourceFolderResponse = APIPayload<APIWorkspaceResourceFolder>;
export interface RESTPatchAPIUserResourceFolderBody {
	name?: string;
	color?: WorkspaceFolderColor;
	position?: number;
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
