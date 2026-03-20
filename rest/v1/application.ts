import type {
	APIApplication,
	APIApplicationDeployment,
	APIApplicationEnvironment,
	APIApplicationFile,
	APIApplicationFileContent,
	APIApplicationMetric,
	APIApplicationOperationResponse,
	APIApplicationStatus,
	APIApplicationStatusShort,
	APICustomDomainResponse,
	APIDnsRecord,
	APIPayload,
	APISubdomainResponse,
	APIWebhookUrl,
} from "../../v1";

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/get
 */
export type RESTGetAPIApplicationResponse = APIPayload<APIApplication>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/status
 */
export type RESTGetAPIApplicationStatusResponse = APIPayload<APIApplicationStatus>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/allstatus
 */
export type RESTGetAPIApplicationStatusShortResponse = APIPayload<APIApplicationStatusShort>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/logs
 */
export type RESTGetAPIApplicationLogsResponse = APIPayload<string>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/metrics
 */
export type RESTGetAPIApplicationMetricsResponse = APIPayload<APIApplicationMetric[]>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/filemanager/files
 */
export type RESTGetAPIApplicationFilesResponse = APIPayload<APIApplicationFile[]>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/filemanager/content
 */
export type RESTGetAPIApplicationFileContentResponse = APIPayload<APIApplicationFileContent>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/start
 */
export type RESTGetAPIApplicationStartResponse = APIPayload<boolean>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/restart
 */
export type RESTGetAPIApplicationRestartResponse = APIPayload<boolean>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/stop
 */
export type RESTGetAPIApplicationStopResponse = APIPayload<boolean>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/enviroments/get
 */
export type RESTGetAPIApplicationEnvironmentResponse = APIPayload<APIApplicationEnvironment[]>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/create
 */
export type RESTPostAPIApplicationCreateResponse = APIPayload<APIApplication>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/delete
 */
export type RESTDeleteAPIApplicationResponse = APIPayload<void>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/download
 */
export type RESTGetAPIApplicationDownloadResponse = ArrayBuffer;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/realtime
 */
export type RESTGetAPIApplicationRealtimeResponse = EventSource;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/start
 */
export type RESTPostAPIApplicationStartResponse = APIPayload<APIApplicationOperationResponse>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/stop
 */
export type RESTPostAPIApplicationStopResponse = APIPayload<APIApplicationOperationResponse>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/restart
 */
export type RESTPostAPIApplicationRestartResponse = APIPayload<APIApplicationOperationResponse>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/updateconfig
 */
export type RESTPostAPIApplicationUpdateConfigResponse = APIPayload<string>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/dnsrecords
 */
export type RESTGetAPIApplicationDnsRecordsResponse = APIPayload<APIDnsRecord[]>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/customdomain
 */
export type RESTPostAPIApplicationCustomDomainResponse = APIPayload<APICustomDomainResponse>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/subdomain
 */
export type RESTPatchAPIApplicationSubdomainResponse = APIPayload<APISubdomainResponse>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/webhook
 */
export type RESTGetAPIApplicationWebhookUrlResponse = APIPayload<APIWebhookUrl>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/deployments
 */
export type RESTGetAPIApplicationDeploymentsResponse = APIPayload<APIApplicationDeployment[]>;
