import type { APIDatabase, APIDatabaseMetrics, APIDatabasePasswordReset, APIDatabaseStatus, APIDatabaseStatusShort, APIPayload } from "../../v1";

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/get
 */
export type RESTGetAPIDatabaseResponse = APIPayload<APIDatabase>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/status
 */
export type RESTGetAPIDatabaseStatusResponse = APIPayload<APIDatabaseStatus>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/allstatus
 */
export type RESTGetAPIDatabaseStatusShortResponse = APIPayload<APIDatabaseStatusShort>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/metrics
 */
export type RESTGetAPIDatabaseMetricsResponse = APIPayload<APIDatabaseMetrics[]>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/start
 */
export type RESTGetAPIDatabaseStartResponse = APIPayload<boolean>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/restart
 */
export type RESTGetAPIDatabaseRestartResponse = APIPayload<boolean>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/stop
 */
export type RESTGetAPIDatabaseStopResponse = APIPayload<boolean>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/create
 */
export type RESTPostAPIDatabaseCreateResponse = APIPayload<APIDatabase>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/delete
 */
export type RESTDeleteAPIDatabaseResponse = APIPayload<void>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/update
 */
export type RESTPutAPIDatabaseUpdateResponse = APIPayload<APIDatabase>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/reset
 */
export type RESTPostAPIDatabaseResetResponse = APIPayload<void>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/credentials/get
 */
export type RESTGetAPIDatabaseCertificateResponse = ArrayBuffer;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/credentials/reset
 */
export type RESTPostAPIDatabaseResetCertificateResponse = APIPayload<void>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/credentials/resetpassword
 */
export type RESTPostAPIDatabaseResetPasswordResponse = APIPayload<APIDatabasePasswordReset>;
