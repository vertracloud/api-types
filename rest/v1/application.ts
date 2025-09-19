import type {
	APIApplication,
	APIApplicationBackup,
	APIApplicationCommit,
	APIApplicationEnvironment,
	APIApplicationFile,
	APIApplicationFileContent,
	APIApplicationMetric,
	APIApplicationStatus,
	APIApplicationStatusShort,
	APIGroupedApplicationBackups,
	APIPayload,
} from "../../v1";

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/applications
 */
export type RESTGetAPIApplicationResponse = APIPayload<APIApplication>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/applications
 */
export type RESTGetAPIApplicationStatusResponse =
	APIPayload<APIApplicationStatus>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/applications
 */
export type RESTGetAPIApplicationStatusShortResponse =
	APIPayload<APIApplicationStatusShort>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/applications
 */
export type RESTGetAPIApplicationLogsResponse = APIPayload<string>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/applications
 */
export type RESTGetAPIApplicationMetricsResponse = APIPayload<
	APIApplicationMetric[]
>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/applications
 */
export type RESTGetAPIApplicationCommitsResponse = APIPayload<
	APIApplicationCommit[]
>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/applications
 */
export type RESTGetAPIApplicationBackupsResponse = APIPayload<
	APIApplicationBackup[]
>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/applications
 */
export type RESTGetAPIGroupedApplicationBackupsResponse = APIPayload<
	APIGroupedApplicationBackups[]
>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/applications
 */
export type RESTGetAPIApplicationBackupResponse =
	APIPayload<APIApplicationBackup>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/applications
 */
export type RESTGetAPIApplicationFilesResponse = APIPayload<
	APIApplicationFile[]
>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/applications
 */
export type RESTGetAPIApplicationFileContentResponse =
	APIPayload<APIApplicationFileContent>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/applications
 */
export type RESTGetAPIApplicationStartResponse = APIPayload<boolean>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/applications
 */
export type RESTGetAPIApplicationRestartResponse = APIPayload<boolean>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/applications
 */
export type RESTGetAPIApplicationStopResponse = APIPayload<boolean>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/applications
 */
export type RESTGetAPIApplicationEnvironmentResponse = APIPayload<
	APIApplicationEnvironment[]
>;
