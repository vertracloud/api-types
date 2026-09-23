import type { APINotification, APIPayload } from "../../v1";

/** Dashboard session only (not reachable with an API key). */
export type RESTGetAPINotificationsResponse = APIPayload<APINotification[]>;
