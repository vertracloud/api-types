import type {
	APIDatabase,
	APIDatabaseMetrics,
	APIDatabaseStatus,
	APIDatabaseStatusShort,
	APIPayload,
} from "../../v1";

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases
 */
export type RESTGetAPIDatabaseResponse = APIPayload<APIDatabase>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases
 */
export type RESTGetAPIDatabaseStatusResponse = APIPayload<APIDatabaseStatus>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases
 */
export type RESTGetAPIDatabaseStatusShortResponse =
	APIPayload<APIDatabaseStatusShort>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases
 */
export type RESTGetAPIDatabaseLogsResponse = APIPayload<string>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases
 */
export type RESTGetAPIDatabaseMetricsResponse = APIPayload<
	APIDatabaseMetrics[]
>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases
 */
export type RESTGetAPIDatabaseStartResponse = APIPayload<boolean>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases
 */
export type RESTGetAPIDatabaseRestartResponse = APIPayload<boolean>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases
 */
export type RESTGetAPIDatabaseStopResponse = APIPayload<boolean>;
