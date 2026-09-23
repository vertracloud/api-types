import type { APIActivity, APIPaginatedPayload, ActivityOrigin, ActivityStatus, ActivityTargetType } from "../../v1";

/** Dashboard session only (not reachable with an API key). */
export interface RESTGetAPIActivitiesQuery {
	page?: number;
	limit?: number;
	target_id?: string;
	target_type?: ActivityTargetType;
	status?: ActivityStatus;
	origin?: ActivityOrigin;
	search?: string;
	workspace_id?: string;
	/** Only applies when `workspace_id` is also provided. */
	author_id?: string;
}

/**
 * A page of activities.
 * Dashboard session only (not reachable with an API key).
 */
export type RESTGetAPIActivitiesResponse = APIPaginatedPayload<APIActivity>;
