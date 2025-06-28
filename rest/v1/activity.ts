import type { APIActivity, APIPayload } from "../../v1";

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/activities
 */
export type RESTGetAPIActivityResponse = APIPayload<APIActivity>;

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/activities
 */
export type RESTGetAPIActivitiesResponse = APIPayload<APIActivity[]>;
