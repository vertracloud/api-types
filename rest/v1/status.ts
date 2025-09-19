import type { APIPayload, APIStatus } from "../../v1";

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/status
 */
export type RESTGetAPIStatusResponse = APIPayload<APIStatus>;
