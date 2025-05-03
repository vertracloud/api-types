import type {
	APIDatabase,
	APIDatabaseMetrics,
	APIDatabaseStatus,
	APIDatabaseStatusShort,
	APIPayload,
} from "../../v1";

/**
 * @see https://docs.coffelify.com/api-reference/endpoint/databases
 */
export type RESTGetAPIDatabaseResponse = APIPayload<APIDatabase>;

/**
 * @see https://docs.coffelify.com/api-reference/endpoint/databases
 */
export type RESTGetAPIDatabaseStatusResponse = APIPayload<APIDatabaseStatus>;

/**
 * @see https://docs.coffelify.com/api-reference/endpoint/databases
 */
export type RESTGetAPIDatabaseStatusShortResponse =
	APIPayload<APIDatabaseStatusShort>;

/**
 * @see https://docs.coffelify.com/api-reference/endpoint/databases
 */
export type RESTGetAPIDatabaseLogsResponse = APIPayload<string>;

/**
 * @see https://docs.coffelify.com/api-reference/endpoint/databases
 */
export type RESTGetAPIDatabaseMetricsResponse = APIPayload<
	APIDatabaseMetrics[]
>;
