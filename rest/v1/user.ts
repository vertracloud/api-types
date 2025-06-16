import type { APIPayload, APIUser, APIUserInfoResponse } from "../../v1";

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/users
 */
export type RESTGetAPIUserResponse = APIPayload<APIUser>;

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/users
 */
export type RESTGetAPIUserInfoResponse = APIPayload<APIUserInfoResponse>;
