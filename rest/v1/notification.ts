import type { APINotification, APIPayload } from "../../v1";

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/notifications
 */
export type RESTGetAPINotificationsResponse = APIPayload<APINotification[]>;
