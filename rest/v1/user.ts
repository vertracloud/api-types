import type { APIPayload, APIUserApiKey, APIUserInfoResponse, APIUserSession } from "../../v1";

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/users/me
 */
export type RESTGetAPIUserInfoResponse = APIPayload<APIUserInfoResponse>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/users/downgrade
 */
export type RESTPostAPIUserDowngradeResponse = APIPayload<APIUserInfoResponse>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/users/api-key
 */
export type RESTPostAPIUserGenerateApiKeyResponse = APIPayload<APIUserApiKey>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/users/sessions
 */
export type RESTGetAPIUserSessionsResponse = APIPayload<APIUserSession[]>;
