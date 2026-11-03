import type { ISODateString } from "../../common/v1";

/**
 * What the traffic of a site can be broken down and filtered by. Every value is both a key of
 * `APIApplicationAnalyticsTraffic.breakdowns` and the name of a filter of the analytics routes, and the
 * `value` of a breakdown entry can be sent as that filter unchanged. `ANALYTICS_NO_VALUE` (`(none)`)
 * is the value of a request that has nothing for the dimension, and filters for exactly those requests.
 * New values may be added; handle unknown ones.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/analytics/traffic
 */
export type ApplicationAnalyticsDimension = "country" | "edge_location" | "host" | "path" | "method" | "status" | "protocol" | "device" | "os" | "browser" | "referer" | "asn" | "ip" | "content_type" | "cache_status" | "bot";
export const ApplicationAnalyticsDimension = {
	/** Country of the visitor, ISO 3166-1 alpha-2 (`BR`). `(none)` when unknown. */
	COUNTRY: "country",
	/** IATA code of the edge location that answered the visitor (`GRU`). */
	EDGE_LOCATION: "edge_location",
	/** Hostname the visitor asked for: the subdomain of the app or one of its domains. Only hosts of the app are accepted. */
	HOST: "host",
	/** Path of the request, without the query string. As a filter it is a prefix: `/api` matches `/api`, `/api/users` and `/apix`. */
	PATH: "path",
	/** HTTP method (`GET`, `POST`…). */
	METHOD: "method",
	/** HTTP status the visitor received (`404`). As a filter it also accepts a class: `2xx`, `3xx`, `4xx` or `5xx`. */
	STATUS: "status",
	/** HTTP version (`HTTP/1.1`, `HTTP/2`, `HTTP/3`). */
	PROTOCOL: "protocol",
	/** Kind of device (`desktop`, `mobile`, `tablet`). */
	DEVICE: "device",
	/** Operating system of the visitor (`Windows`, `iOS`…). */
	OS: "os",
	/** Browser of the visitor (`Chrome`, `Safari`…). */
	BROWSER: "browser",
	/** Host of the page that linked to the request (`google.com`). `(none)` = direct visit, with no referer. */
	REFERER: "referer",
	/** Autonomous system number of the visitor's network (`28573`); the entry `label` has the network name. */
	ASN: "asn",
	/** IP address of the visitor. */
	IP: "ip",
	/** Kind of content answered (`html`, `json`, `css`, `js`, `png`…). */
	CONTENT_TYPE: "content_type",
	/** Whether the edge answered from its cache (`hit`, `miss`, `dynamic`, `bypass`, `expired`, `revalidated`…). */
	CACHE_STATUS: "cache_status",
	/** Category of a verified bot (`Search Engine Crawler`…). `(none)` = not a verified bot. */
	BOT: "bot",
} as const satisfies Record<string, ApplicationAnalyticsDimension>;

/**
 * Value of a dimension for a request that has nothing for it (no referer, not a bot, unknown country…).
 * Accepted as a filter value.
 */
export const ANALYTICS_NO_VALUE = "(none)" as const;

/** Kind of device of the visitor. New values may be added; handle unknown ones. */
export type ApplicationAnalyticsDevice = "desktop" | "mobile" | "tablet" | (string & {});
export const ApplicationAnalyticsDevice = {
	DESKTOP: "desktop",
	MOBILE: "mobile",
	TABLET: "tablet",
} as const satisfies Record<string, ApplicationAnalyticsDevice>;

/** HTTP method of a request. New values may be added; handle unknown ones. */
export type ApplicationAnalyticsHTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "OPTIONS" | (string & {});
export const ApplicationAnalyticsHTTPMethod = {
	GET: "GET",
	POST: "POST",
	PUT: "PUT",
	PATCH: "PATCH",
	DELETE: "DELETE",
	HEAD: "HEAD",
	OPTIONS: "OPTIONS",
} as const satisfies Record<string, ApplicationAnalyticsHTTPMethod>;

/** HTTP version of a request. New values may be added; handle unknown ones. */
export type ApplicationAnalyticsProtocol = "HTTP/1.0" | "HTTP/1.1" | "HTTP/2" | "HTTP/3" | (string & {});
export const ApplicationAnalyticsProtocol = {
	HTTP_1_0: "HTTP/1.0",
	HTTP_1_1: "HTTP/1.1",
	HTTP_2: "HTTP/2",
	HTTP_3: "HTTP/3",
} as const satisfies Record<string, ApplicationAnalyticsProtocol>;

/** Whether the edge answered a request from its cache. New values may be added; handle unknown ones. */
export type ApplicationAnalyticsCacheStatus = "hit" | "miss" | "dynamic" | "bypass" | "expired" | "revalidated" | (string & {});
export const ApplicationAnalyticsCacheStatus = {
	HIT: "hit",
	MISS: "miss",
	DYNAMIC: "dynamic",
	BYPASS: "bypass",
	EXPIRED: "expired",
	REVALIDATED: "revalidated",
} as const satisfies Record<string, ApplicationAnalyticsCacheStatus>;

/**
 * Size of each point of a time series. Chosen by the API from the length of the window: the shorter
 * the window, the finer the points. New values may be added; handle unknown ones.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/analytics/traffic
 */
export type ApplicationAnalyticsInterval = "1m" | "5m" | "15m" | "1h";
export const ApplicationAnalyticsInterval = {
	ONE_MINUTE: "1m",
	FIVE_MINUTES: "5m",
	FIFTEEN_MINUTES: "15m",
	ONE_HOUR: "1h",
} as const satisfies Record<string, ApplicationAnalyticsInterval>;

/** Class of HTTP status accepted by the `status` filter. New values may be added; handle unknown ones. */
export type ApplicationAnalyticsStatusClass = "2xx" | "3xx" | "4xx" | "5xx";
export const ApplicationAnalyticsStatusClass = {
	SUCCESS: "2xx",
	REDIRECT: "3xx",
	CLIENT_ERROR: "4xx",
	SERVER_ERROR: "5xx",
} as const satisfies Record<string, ApplicationAnalyticsStatusClass>;

/**
 * Type of the value each filter takes, per dimension. Dimensions with a known set of values use an open
 * union (the known ones autocomplete, any other string is accepted, as a value read from a URL or a log
 * entry is a plain string); the rest take a plain string.
 */
export interface ApplicationAnalyticsFilterValues {
	country: string;
	edge_location: string;
	host: string;
	/** Prefix of the path. */
	path: string;
	method: ApplicationAnalyticsHTTPMethod;
	/** A status code (`404`) or a class (`5xx`). */
	status: ApplicationAnalyticsStatusClass | `${number}`;
	protocol: ApplicationAnalyticsProtocol;
	device: ApplicationAnalyticsDevice;
	os: string;
	browser: string;
	referer: string;
	/** The number (`28573`) or `ANALYTICS_NO_VALUE`. */
	asn: `${number}` | typeof ANALYTICS_NO_VALUE;
	ip: string;
	content_type: string;
	cache_status: ApplicationAnalyticsCacheStatus;
	bot: string;
}

/** Compile-time proof that every dimension has a filter value type and the other way around; never used. */
export type ApplicationAnalyticsFilterValuesCheck = [ApplicationAnalyticsDimension] extends [keyof ApplicationAnalyticsFilterValues] ? ([keyof ApplicationAnalyticsFilterValues] extends [ApplicationAnalyticsDimension] ? true : never) : never;

/** Order of the request log by time. */
export type ApplicationAnalyticsOrder = "asc" | "desc";
export const ApplicationAnalyticsOrder = { ASC: "asc", DESC: "desc" } as const satisfies Record<string, ApplicationAnalyticsOrder>;

/**
 * Fields every analytics answer carries. An app with no site published answers `web_published: false`,
 * no `hosts` and empty data, never an error.
 */
export interface APIApplicationAnalyticsMeta {
	/** Start of the window actually read (ISO 8601). It may be rounded from the one asked for. */
	start: ISODateString;
	/** End of the window actually read (ISO 8601). */
	end: ISODateString;
	/** Hostnames of the app that were read: its subdomain and its active domains. */
	hosts: string[];
	/** `false` when the app has no site published: `hosts` is empty and so is the data. */
	web_published: boolean;
	/** `true` when traffic is high enough that the numbers are estimated from a sample (and the request log is a sample). */
	sampled: boolean;
	/** `true` when the latest data could not be read and this is an earlier answer; see `generated_at`. */
	stale: boolean;
	/** When the data was read (ISO 8601). The newest requests take a few minutes to show up. */
	generated_at: ISODateString;
	/** How many days back the plan of the app's owner can read. */
	history_days: number;
}

/** Fields of the answers that carry time series. */
export interface APIApplicationAnalyticsSeriesMeta extends APIApplicationAnalyticsMeta {
	interval: ApplicationAnalyticsInterval;
}

/**
 * The previous period, of the same length and right before the window, sent when `compare=true`.
 * `series` has the same `interval` and number of points as the current one, in the same order.
 */
export interface APIApplicationAnalyticsPeriod<TSummary, TPoint> {
	start: ISODateString;
	end: ISODateString;
	/** `null` when there was no request in the period. */
	summary: TSummary | null;
	series: TPoint[];
}

/**
 * Shape shared by the answers that carry a summary, a time series and, with `compare=true`, the previous period.
 */
export interface APIApplicationAnalyticsReport<TSummary, TPoint> extends APIApplicationAnalyticsSeriesMeta {
	/** `null` when there was no request in the window. */
	summary: TSummary | null;
	series: TPoint[];
	/** `null` unless `compare=true`. */
	previous: APIApplicationAnalyticsPeriod<TSummary, TPoint> | null;
}

/** One entry of a breakdown, ordered by `requests` (highest first). */
export interface APIApplicationAnalyticsBreakdownEntry {
	/** Value of the dimension; send it as the filter of the same name. `(none)` = the request had no value. */
	value: string;
	/** Readable name when `value` is a code (the network name of an `asn`); `null` otherwise. */
	label: string | null;
	requests: number;
	visits: number;
	/** Bytes sent to visitors. */
	bytes: number;
}

/** Totals of the traffic of a period. */
export interface APIApplicationAnalyticsTrafficSummary {
	requests: number;
	/** Page visits: requests that start a visit (a page opened directly or from another site). */
	visits: number;
	/** Bytes sent to visitors. */
	bytes: number;
	/** Requests answered with a 4xx status. */
	errors_4xx: number;
	/** Requests answered with a 5xx status. */
	errors_5xx: number;
	/** `errors_4xx / requests`, from 0 to 1. */
	error_rate_4xx: number;
	/** `errors_5xx / requests`, from 0 to 1. */
	error_rate_5xx: number;
	/** 95th percentile of the edge time (the whole time the visitor waited for the first byte), in milliseconds. */
	edge_time_p95_ms: number;
}

/** One point of the traffic series; `time` is the start of the point. */
export interface APIApplicationAnalyticsTrafficPoint {
	time: ISODateString;
	requests: number;
	visits: number;
	/** Bytes sent to visitors. */
	bytes: number;
	errors_4xx: number;
	errors_5xx: number;
}

/**
 * `GET /v1/apps/:id/analytics`. Traffic of the site, with every filter applied to every part.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/analytics/traffic
 */
export interface APIApplicationAnalyticsTraffic extends APIApplicationAnalyticsReport<APIApplicationAnalyticsTrafficSummary, APIApplicationAnalyticsTrafficPoint> {
	/** Top entries per dimension: only the dimensions asked for in `breakdowns`, or all of them when it is omitted. */
	breakdowns: Partial<Record<ApplicationAnalyticsDimension, APIApplicationAnalyticsBreakdownEntry[]>>;
}

/** Totals of the errors of a period. `errors` and `error_rate` count 4xx only with `include_4xx=true`. */
export interface APIApplicationAnalyticsErrorsSummary {
	requests: number;
	/** `errors_5xx`, plus `errors_4xx` with `include_4xx=true`. */
	errors: number;
	/** `errors / requests`, from 0 to 1. */
	error_rate: number;
	errors_4xx: number;
	errors_5xx: number;
}

/** One point of the errors series; `time` is the start of the point. */
export interface APIApplicationAnalyticsErrorsPoint {
	time: ISODateString;
	requests: number;
	errors_4xx: number;
	errors_5xx: number;
}

/** A value of a dimension with its errors. */
export interface APIApplicationAnalyticsErrorEntry {
	/** Value of the dimension; send it as the filter of the same name. */
	value: string;
	requests: number;
	/** Counts 4xx only with `include_4xx=true`. */
	errors: number;
	/** `errors / requests`, from 0 to 1. */
	error_rate: number;
}

/**
 * `GET /v1/apps/:id/analytics/errors`. 5xx errors, and 4xx with `include_4xx=true`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/analytics/errors
 */
export interface APIApplicationAnalyticsErrors extends APIApplicationAnalyticsReport<APIApplicationAnalyticsErrorsSummary, APIApplicationAnalyticsErrorsPoint> {
	/** Whether 4xx counts as an error in `errors`, `error_rate`, `paths` and `statuses`. */
	include_4xx: boolean;
	/** Paths with the most errors (highest `errors` first); `value` is the path. */
	paths: APIApplicationAnalyticsErrorEntry[];
	/** How the errors spread across status codes (highest `requests` first); `value` is the status, such as `502`. */
	statuses: APIApplicationAnalyticsBreakdownEntry[];
}

/** Average and percentiles of a time, in milliseconds. */
export interface APIApplicationAnalyticsLatency {
	avg_ms: number;
	p50_ms: number;
	p75_ms: number;
	p90_ms: number;
	p95_ms: number;
	p99_ms: number;
	/** 99.9th percentile. */
	p999_ms: number;
}

/** Average and the main percentiles of a time, in milliseconds. */
export interface APIApplicationAnalyticsLatencyBrief {
	avg_ms: number;
	p50_ms: number;
	p95_ms: number;
	p99_ms: number;
}

/**
 * Times of a period. `edge` is the whole time the visitor waited for the first byte; `container` is the
 * part your app took to answer. `container` is `null` when no request reached the app (all answered by the cache).
 */
export interface APIApplicationAnalyticsPerformanceSummary {
	requests: number;
	edge: APIApplicationAnalyticsLatency;
	container: APIApplicationAnalyticsLatency | null;
}

/** One point of the performance series; `time` is the start of the point. */
export interface APIApplicationAnalyticsPerformancePoint {
	time: ISODateString;
	requests: number;
	edge: APIApplicationAnalyticsLatencyBrief;
	container: APIApplicationAnalyticsLatencyBrief | null;
}

/** A value of a dimension with its times. */
export interface APIApplicationAnalyticsLatencyEntry {
	/** Value of the dimension; send it as the filter of the same name. */
	value: string;
	/** Readable name when `value` is a code; `null` otherwise. */
	label: string | null;
	requests: number;
	edge: APIApplicationAnalyticsLatencyBrief;
	container: APIApplicationAnalyticsLatencyBrief | null;
}

/** Health of a path: traffic, errors and time. */
export interface APIApplicationAnalyticsPathIssue {
	/** The path; send it as the `path` filter. */
	path: string;
	requests: number;
	/** Requests answered with a 5xx status. */
	errors: number;
	/** `errors / requests`, from 0 to 1. */
	error_rate: number;
	/** Average edge time, in milliseconds. */
	avg_ms: number;
	/** 99th percentile of the edge time, in milliseconds. */
	p99_ms: number;
}

/**
 * `GET /v1/apps/:id/analytics/performance`. Edge and container times. Needs a plan with
 * `features.web_analytics_performance`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/analytics/performance
 */
export interface APIApplicationAnalyticsPerformance extends APIApplicationAnalyticsReport<APIApplicationAnalyticsPerformanceSummary, APIApplicationAnalyticsPerformancePoint> {
	/** Times per country of the visitor (highest `requests` first). */
	countries: APIApplicationAnalyticsLatencyEntry[];
	/** Times per edge location (highest `requests` first). */
	edge_locations: APIApplicationAnalyticsLatencyEntry[];
	/** Slowest paths, by the 95th percentile of the edge time (slowest first). Paths with very few requests are left out. */
	slow_paths: APIApplicationAnalyticsLatencyEntry[];
	/** Most requested paths with their errors and times (highest `requests` first). */
	path_issues: APIApplicationAnalyticsPathIssue[];
}

/**
 * One request of the log. Fields named after a dimension hold the same value as that dimension, so any of
 * them can be sent as a filter; `(none)` = the request had no value.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/analytics/requests
 */
export interface APIApplicationAnalyticsRequest {
	/** When the request arrived (ISO 8601). */
	time: ISODateString;
	/** Identifier of the request at the edge; quote it to support. */
	request_id: string;
	host: string;
	path: string;
	/** Query string without the leading `?`; empty when the request had none. */
	query: string;
	method: ApplicationAnalyticsHTTPMethod;
	protocol: ApplicationAnalyticsProtocol;
	/** HTTP status the visitor received. */
	status: number;
	/** HTTP status your app answered; `null` when the request did not reach the app (answered by the cache or the edge). */
	container_status: number | null;
	/** The whole time the visitor waited for the first byte, in milliseconds. */
	edge_time_ms: number;
	/** Time your app took to answer, in milliseconds; `null` when the request did not reach the app. */
	container_time_ms: number | null;
	ip: string;
	/** Autonomous system number of the visitor's network. */
	asn: number;
	/** Name of the visitor's network. */
	asn_name: string;
	country: string;
	edge_location: string;
	/** Host of the referer; `(none)` = direct visit. */
	referer: string;
	/** Full referer URL; `null` when the request had none. */
	referer_url: string | null;
	device: ApplicationAnalyticsDevice;
	os: string;
	browser: string;
	bot: string;
	content_type: string;
	cache_status: ApplicationAnalyticsCacheStatus;
}

/**
 * `GET /v1/apps/:id/analytics/requests`. A page of the request log. Needs a plan with
 * `features.web_analytics_requests`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/analytics/requests
 */
export interface APIApplicationAnalyticsRequestList extends APIApplicationAnalyticsMeta {
	order: ApplicationAnalyticsOrder;
	requests: APIApplicationAnalyticsRequest[];
	/** Pass back as `cursor` for the next page, with the same filters and order; `null` = last page. */
	cursor: string | null;
}

/** `details` of `ANALYTICS_RANGE_EXCEEDS_PLAN`. */
export interface APIApplicationAnalyticsRangeExceedsPlanDetails {
	/** How many days back the plan can read. */
	history_days: number;
	/** Earliest `start` accepted right now (ISO 8601). */
	earliest: ISODateString;
}
