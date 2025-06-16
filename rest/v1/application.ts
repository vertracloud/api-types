import type {
	APIApplication,
	APIApplicationFile,
	APIApplicationFileContent,
	APIApplicationMetrics,
	APIApplicationStatus,
	APIApplicationStatusShort,
	APIPayload,
} from "../../v1";

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/applications
 */
export type RESTGetAPIApplicationResponse = APIPayload<APIApplication>;

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/applications
 */
export type RESTGetAPIApplicationStatusResponse =
	APIPayload<APIApplicationStatus>;

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/applications
 */
export type RESTGetAPIApplicationStatusShortResponse =
	APIPayload<APIApplicationStatusShort>;

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/applications
 */
export type RESTGetAPIApplicationLogsResponse = APIPayload<string>;

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/applications
 */
export type RESTGetAPIApplicationMetricsResponse = APIPayload<
	APIApplicationMetrics[]
>;

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/applications
 */
export type RESTGetAPIApplicationFilesResponse = APIPayload<
	APIApplicationFile[]
>;

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/applications
 */
export type RESTGetAPIApplicationFileContentResponse =
	APIPayload<APIApplicationFileContent>;

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/applications
 */
export type RESTGetAPIApplicationStartResponse = APIPayload<boolean>;

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/applications
 */
export type RESTGetAPIApplicationRestartResponse = APIPayload<boolean>;

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/applications
 */
export type RESTGetAPIApplicationStopResponse = APIPayload<boolean>;
