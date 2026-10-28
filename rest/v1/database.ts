import type { APIDatabase, APIDatabaseCertificate, APIDatabaseCertificateReset, APIDatabaseMetrics, APIDatabaseOperationResponse, APIDatabasePasswordReset, APIDatabaseStatus, APIDatabaseStatusShort, APIDatabaseVersions, APIPayload, DatabaseType, SnowFlake } from "../../v1";

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
export type RESTGetAPIDatabaseStatusShortResponse = APIPayload<APIDatabaseStatusShort[]>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/metrics
 */
export type RESTGetAPIDatabaseMetricsResponse = APIPayload<APIDatabaseMetrics[]>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/start
 */
export type RESTPostAPIDatabaseStartResponse = APIPayload<APIDatabaseOperationResponse>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/stop
 */
export type RESTPostAPIDatabaseStopResponse = APIPayload<APIDatabaseOperationResponse>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/versions
 */
export type RESTGetAPIDatabaseVersionsResponse = APIPayload<APIDatabaseVersions>;

/**
 * Body of `POST /databases` — JSON.
 *
 * `snapshot_id` creates the database with the **snapshot's engine** (its `resource_type`) and
 * restores its data instead of starting empty. If `type` is also sent, it **must match** the
 * snapshot's engine; otherwise creation is rejected.
 *
 * Error codes:
 *
 * - `SNAPSHOT_NOT_FOUND` — the snapshot does not exist or does not belong to the user.
 * - `SNAPSHOT_TYPE_MISMATCH` — the snapshot is from an application, or `type` does not match
 *   the snapshot's engine.
 * - `SNAPSHOT_TOO_LARGE` — the snapshot exceeds the size limit for creation.
 * - `INVALID_DATABASE_VERSION` — `version` is not an available version of the engine.
 * - `SNAPSHOT_VERSION_NEWER` — with `snapshot_id`, `version` is older than the snapshot's version.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/create
 */
export interface RESTPostAPIDatabaseCreateBody {
	name: string;
	description?: string | null;
	/**
	 * Database engine. **Optional** with `snapshot_id` — the engine comes from the snapshot; if
	 * provided, it must match it (`SNAPSHOT_TYPE_MISMATCH`).
	 */
	type?: DatabaseType;
	/** RAM in MB. */
	ram: number;
	workspace_id?: string;
	/** Creates the database from a database snapshot: snapshot's engine + restored data. */
	snapshot_id?: string;
	/**
	 * Engine major line (see `GET /databases/versions`). Omitted, the recommended one is used. With `snapshot_id`,
	 * the default is the snapshot's version, and only the same or a newer one is accepted
	 * (`SNAPSHOT_VERSION_NEWER`). A value outside the catalog is rejected with `INVALID_DATABASE_VERSION`.
	 */
	version?: string;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/create
 */
export type RESTPostAPIDatabaseCreateResponse = APIPayload<APIDatabase>;

/**
 * Returns the id of the deleted database.
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/delete
 */
export type RESTDeleteAPIDatabaseResponse = APIPayload<SnowFlake>;

/**
 * Body of `PUT /databases/:id`. Every field is optional. `description: null` (or empty) clears it.
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/update
 */
export interface RESTPutAPIDatabaseUpdateBody {
	/** 1–50 characters. */
	name?: string;
	/** Up to 128 characters. */
	description?: string | null;
	/** RAM in MB. */
	ram?: number;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/update
 */
export type RESTPutAPIDatabaseUpdateResponse = APIPayload<APIDatabaseOperationResponse>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/reset
 */
export type RESTPostAPIDatabaseResetResponse = APIPayload<APIDatabaseOperationResponse>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/credentials/get
 */
export type RESTGetAPIDatabaseCertificateResponse = APIPayload<APIDatabaseCertificate>;

/**
 * Returns the newly issued certificate.
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/credentials/reset
 */
export type RESTPostAPIDatabaseResetCertificateResponse = APIPayload<APIDatabaseCertificateReset>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/credentials/resetpassword
 */
export type RESTPostAPIDatabaseResetPasswordResponse = APIPayload<APIDatabasePasswordReset>;
