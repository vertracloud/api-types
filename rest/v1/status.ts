import type { APIPayload, APIStatus } from "../../v1";

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/status
 */
export type RESTGetAPIStatusResponse = APIPayload<APIStatus>;
