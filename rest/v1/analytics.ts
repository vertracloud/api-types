import type { APIApplicationAnalyticsErrors, APIApplicationAnalyticsPerformance, APIApplicationAnalyticsRequestList, APIApplicationAnalyticsTraffic, APIPayload, ApplicationAnalyticsDimension, ApplicationAnalyticsFilterValues, ApplicationAnalyticsOrder, ISODateString, RESTAPIWorkspaceQuery } from "../../v1";

/**
 * Filters of the analytics routes, one per `ApplicationAnalyticsDimension`; all of them together narrow
 * every part of the answer. Each takes one value, as found in a breakdown entry or a request of the log
 * (`ANALYTICS_NO_VALUE` for requests with no value). `path` is a prefix and `status` also takes a class (`5xx`).
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/analytics/traffic
 */
export type RESTAPIApplicationAnalyticsFilters = { [K in ApplicationAnalyticsDimension]?: ApplicationAnalyticsFilterValues[K] };

/** Query parameters that control the analytics routes. A dimension can never be named after one, because dimensions are also filter parameters. */
export type RESTAPIApplicationAnalyticsControlParam = "start" | "end" | "compare" | "compare_start" | "breakdowns" | "limit" | "include_4xx" | "cursor" | "order" | "workspace_id";

/**
 * Compile-time guard, never used: fails to compile when an `ApplicationAnalyticsDimension` has the name of a
 * control parameter (the filter would shadow it on the query string).
 */
export type RESTAPIApplicationAnalyticsDimensionCollisionCheck<T extends never = Extract<ApplicationAnalyticsDimension, RESTAPIApplicationAnalyticsControlParam>> = T;

/**
 * Window and filters shared by the analytics routes. The window is at most 30 days long and cannot
 * start earlier than the plan's `limits.web_analytics_history_days`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/analytics/traffic
 */
export interface RESTAPIApplicationAnalyticsRangeQuery extends RESTAPIWorkspaceQuery, RESTAPIApplicationAnalyticsFilters {
	/** Start of the window (ISO 8601). Default: 24 hours before `end`. */
	start?: ISODateString;
	/** End of the window (ISO 8601). Default: now. */
	end?: ISODateString;
}

/**
 * `GET /v1/apps/:id/analytics`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/analytics/traffic
 */
export interface RESTGetAPIApplicationAnalyticsQuery extends RESTAPIApplicationAnalyticsRangeQuery {
	/** Also send the previous period of the same length (`previous`). Default `false`. */
	compare?: boolean;
	/** Start of the period to compare with (ISO 8601). Implies `compare=true`. The compared period has the same length as the window, so every point lines up. Default: the period right before the window. */
	compare_start?: ISODateString;
	/** Comma-separated `ApplicationAnalyticsDimension` values to break down by (`country,path`). Omitted: all breakdowns. Empty (`breakdowns=`): none, only the summary and the series (the fastest response). A comma-separated list returns only those breakdowns. An unknown name is a `400 VALIDATION_ERROR`. */
	breakdowns?: "" | ApplicationAnalyticsDimension | (string & {});
	/** Entries per breakdown, 1–25. Default 10. */
	limit?: number;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/analytics/traffic
 */
export type RESTGetAPIApplicationAnalyticsResponse = APIPayload<APIApplicationAnalyticsTraffic>;

/**
 * `GET /v1/apps/:id/analytics/errors`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/analytics/errors
 */
export interface RESTGetAPIApplicationAnalyticsErrorsQuery extends RESTAPIApplicationAnalyticsRangeQuery {
	/** Also send the previous period of the same length (`previous`). Default `false`. */
	compare?: boolean;
	/** Start of the period to compare with (ISO 8601). Implies `compare=true`. The compared period has the same length as the window, so every point lines up. Default: the period right before the window. */
	compare_start?: ISODateString;
	/** Count 4xx as errors too. Default `false`: 4xx is noisy, mostly bots and scanners. */
	include_4xx?: boolean;
	/** Entries in `paths` and `statuses`, 1–25. Default 10. */
	limit?: number;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/analytics/errors
 */
export type RESTGetAPIApplicationAnalyticsErrorsResponse = APIPayload<APIApplicationAnalyticsErrors>;

/**
 * `GET /v1/apps/:id/analytics/performance`. 403 `PLAN_DOES_NOT_SUPPORT_WEB_ANALYTICS_PERFORMANCE` when the plan
 * does not include it.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/analytics/performance
 */
export interface RESTGetAPIApplicationAnalyticsPerformanceQuery extends RESTAPIApplicationAnalyticsRangeQuery {
	/** Also send the previous period of the same length (`previous`). Default `false`. */
	compare?: boolean;
	/** Start of the period to compare with (ISO 8601). Implies `compare=true`. The compared period has the same length as the window, so every point lines up. Default: the period right before the window. */
	compare_start?: ISODateString;
	/** Entries in `countries`, `edge_locations`, `slow_paths` and `path_issues`, 1–25. Default 10. */
	limit?: number;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/analytics/performance
 */
export type RESTGetAPIApplicationAnalyticsPerformanceResponse = APIPayload<APIApplicationAnalyticsPerformance>;

/**
 * `GET /v1/apps/:id/analytics/requests`. 403 `PLAN_DOES_NOT_SUPPORT_WEB_ANALYTICS_REQUESTS` when the plan does
 * not include it.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/analytics/requests
 */
export interface RESTGetAPIApplicationAnalyticsRequestsQuery extends RESTAPIApplicationAnalyticsRangeQuery {
	/** Opaque `cursor` of the previous page. Send it with the same window, filters and order; any other cursor is refused (`VALIDATION_ERROR`). */
	cursor?: string;
	/** By time. Default `desc` (newest first). */
	order?: ApplicationAnalyticsOrder;
	/** 1–100. Default 50. */
	limit?: number;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/analytics/requests
 */
export type RESTGetAPIApplicationAnalyticsRequestsResponse = APIPayload<APIApplicationAnalyticsRequestList>;
