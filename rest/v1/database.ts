import type { APIDatabase, APIDatabaseCertificate, APIDatabaseCertificateReset, APIDatabaseMetrics, APIDatabaseOperationResponse, APIDatabasePasswordReset, APIDatabaseStatus, APIDatabaseStatusShort, APIDatabaseVersions, APIPayload, DatabaseType, RegionId, SnowFlake } from "../../v1";

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
 * - `SNAPSHOT_EXCEEDS_STORAGE` — the snapshot's data does not fit in the disk of the chosen RAM (`APISnapshotExceedsStorageDetails`).
 * - `REGION_NOT_AVAILABLE` — `region` is not available to the account, or it has no room for new resources now.
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
	/**
	 * Region to create the database in (`ny` or `sp`). Omitted, the account's default region is used. A region
	 * not open to the account is refused with `REGION_NOT_AVAILABLE`.
	 */
	region?: RegionId;
}

/**
 * `201` — the database. With `snapshot_id`, `202` instead: the data comes back from the snapshot in the background (`restore_job_id`);
 * if the restore fails, the database is kept as it is (it accepts connections from the start) and the job's `reason` says why.
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/create
 */
export type RESTPostAPIDatabaseCreateResponse = APIPayload<
	APIDatabase & {
		/** Returned only in this response; afterwards reset it to see a new one. */
		password: string;
		/** Only with `snapshot_id`: the restore job to follow on `GET /v1/users/:id/snapshots/jobs/:job_id`. */
		restore_job_id?: SnowFlake;
	}
>;

/**
 * Deletes the database right away. It is permanent: take a snapshot first if you may need the data again.
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
 * Lowering `ram` is refused with 409 `STORAGE_ABOVE_NEW_LIMIT` when your data takes more space than the storage of the
 * new RAM allows; nothing is changed. `details` is an `APIStorageAboveNewLimitDetails` (`used_mb`, `limit_mb`, `free_mb`):
 * free `free_mb` (delete data) and try again.
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
 * Returns the newly issued certificate. With an API key, a database whose `legacy_host` is `true` is not reset: 403 `WEBSITE_ONLY`
 * (moving it to the current address is done from the dashboard). Other databases are reset normally.
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/credentials/reset
 */
export type RESTPostAPIDatabaseResetCertificateResponse = APIPayload<APIDatabaseCertificateReset>;

/**
 * `POST /v1/databases/:id/credentials/reset`. With a dashboard session it requires `X-Action-Code` (action
 * `reset_database_password`, target the database id; see `RESTPostAPIUserActionCodeBody`), checked after access to the database.
 * Without the header: 403 `ACTION_CODE_REQUIRED`; wrong, expired or used code: 400 `ACTION_CODE_INVALID`; after too many wrong codes: 429 `TOO_MANY_ATTEMPTS`. API keys (scope `databases:credentials`) do not use the code.
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/credentials/resetpassword
 */
export type RESTPostAPIDatabaseResetPasswordResponse = APIPayload<APIDatabasePasswordReset>;
