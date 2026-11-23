import type { APIRestartRequired, ISODateString, PlanName, SnowFlake } from "../../v1";
import type { APIImagePullProgress, APIRuntimeUpdate } from "./application";

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/get
 */
export type DatabaseType = 1 | 2 | 3 | 4;
export const DatabaseType = {
	POSTGRESQL: 1,
	MONGODB: 2,
	REDIS: 3,
	MYSQL: 4,
} as const;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/get
 */
export type DatabaseStatus = "up" | "down";
export const DatabaseStatus = {
	UP: "up",
	DOWN: "down",
} as const;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/get
 */
export type DatabaseCluster = 1 | 2;
export const DatabaseCluster = {
	USA_1: 1,
	USA_2: 2,
} as const;

/**
 * Versions of one database engine.
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/versions
 */
export interface APIDatabaseVersionCatalog {
	/** Line used when `version` is omitted on creation. Always included in `available`. */
	recommended: string;
	/** Lines you can create, from newest to oldest. */
	available: string[];
}

/**
 * Catalog of database versions, keyed by engine.
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/versions
 */
export type APIDatabaseVersions = Record<DatabaseType, APIDatabaseVersionCatalog>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/get
 */
export interface APIDatabase {
	id: SnowFlake;
	cluster: DatabaseCluster;
	type: DatabaseType;
	name: string;
	description: string;
	owner_id: SnowFlake;
	/** Owner's plan; `null` when the owner has no plan. */
	owner_plan: PlanName | null;
	status: DatabaseStatus;
	ram: number;
	host: string; // example: "vertra-cloud-<id>.db.<region>.vertraweb.app"
	port: number;
	/**
	 * `true` when the database still uses its original connection address. Moving it to the current address (resetting
	 * the certificates) is done only from the dashboard; with an API key the reset responds 403 `WEBSITE_ONLY`.
	 */
	legacy_host: boolean;
	/**
	 * User to connect with. Databases created from v26.4.8 on use `vertracloud` (default database `vertracloud`,
	 * no superuser); older databases keep the engine's user (`postgres`, `default` or `root`). Read it instead of
	 * deriving it from `type`.
	 */
	username: string;
	/**
	 * Engine major line (for example `"18"`, `"8.0"`, `"9.7"`, `"8.2"`). Patch releases are applied by the platform
	 * automatically on restart (stop/start), so the patch version is never exposed.
	 */
	version: string;
	/** Stack the database belongs to; `null` (or absent) when it is not in one. */
	stack_id?: SnowFlake | null;
	/** Id of the service of the stack's template this database is; `null` (or absent) when the user added it. */
	stack_service_key?: string | null;
	created_at: ISODateString;
	updated_at: ISODateString;
	last_snapshot: ISODateString | null;
	offline_since: ISODateString | null;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/get
 */
export interface APIDatabaseNetwork {
	total: string;
	now: string;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/status
 */
export interface APIDatabaseStatus {
	id: SnowFlake;
	cpu: string;
	ram: string;
	status: DatabaseStatus;
	running: boolean;
	storage: string;
	/** `null` when network usage is unavailable. */
	network: APIDatabaseNetwork | null;
	uptime: number;
	/**
	 * `true` while the base image is being downloaded and the database is not running yet.
	 *
	 * Dashboard only. Not documented in the public docs, SDKs or MCP.
	 */
	installing?: boolean;
	/**
	 * Set while the base image is being downloaded. Optional: omitted when no download is in progress.
	 *
	 * Dashboard only. Not documented in the public docs, SDKs or MCP.
	 */
	image_pull?: APIImagePullProgress;
	/**
	 * Engine freshness of a running database. Optional: omitted when it could not be checked or the database is stopped.
	 *
	 * Dashboard only. Not documented in the public docs, SDKs or MCP.
	 */
	runtime_update?: APIRuntimeUpdate;
	/** Set while a restore of this resource is queued or running; follow it on `GET /v1/users/:id/snapshots/jobs/:job_id`. */
	restore_job_id: SnowFlake | null;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/allstatus
 */
export interface APIDatabaseStatusShort {
	id: SnowFlake;
	cpu: string;
	ram: string;
	storage: string;
	running: boolean;
	/**
	 * `true` while the base image is being downloaded and the database is not running yet.
	 *
	 * Dashboard only. Not documented in the public docs, SDKs or MCP.
	 */
	installing?: boolean;
	/**
	 * Set while the base image is being downloaded. Optional: omitted when no download is in progress.
	 *
	 * Dashboard only. Not documented in the public docs, SDKs or MCP.
	 */
	image_pull?: APIImagePullProgress;
	/**
	 * Engine freshness of a running database. Optional: omitted when it could not be checked or the database is stopped.
	 *
	 * Dashboard only. Not documented in the public docs, SDKs or MCP.
	 */
	runtime_update?: APIRuntimeUpdate;
	/** Set while a restore of this resource is queued or running; follow it on `GET /v1/users/:id/snapshots/jobs/:job_id`. */
	restore_job_id: SnowFlake | null;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/get
 */
export interface APIDatabaseOperationResponse {
	status: "success";
}

/**
 * Client certificate for TLS connections to the database.
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/credentials/get
 */
export interface APIDatabaseCertificate {
	crt: string;
	key: string;
	pem: string;
	/** CA certificate (PEM) that signs the database server certificate. May be absent on older databases. */
	ca?: string;
	/** Client identity as PKCS#12, base64-encoded, empty password (for drivers such as Prisma 6). May be absent on older databases. */
	p12?: string;
}

/**
 * One of your own application variables that still contains the previous database address.
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/credentials/reset
 */
export interface APIDatabaseClientVariableWithOldHost {
	app_id: SnowFlake;
	key: string;
}

/**
 * The new certificate, after a reset, together with the applications of stacks connected to the database that must restart to read it.
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/credentials/reset
 */
export interface APIDatabaseCertificateReset extends APIDatabaseCertificate, APIRestartRequired {
	/** The database address after the reset; the same as before when the reset is made with an API key. */
	host: string;
	/** Your own variables that still contain the previous address. Empty when the address does not change, which is always the case with an API key. */
	client_variables_with_old_host: APIDatabaseClientVariableWithOldHost[];
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/metrics
 */
export interface APIDatabaseMetrics {
	cpu: number;
	ram: number;
	storage: number;
	date: ISODateString;
	network: number[];
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/credentials/resetpassword
 */
export interface APIDatabasePasswordReset extends APIRestartRequired {
	password: string;
}

/**
 * The `details` of the `STORAGE_ABOVE_NEW_LIMIT` error (HTTP 409) of `PUT /v1/databases/:id`. All values are in MB.
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/update
 */
export interface APIStorageAboveNewLimitDetails {
	/** Space the data of the database uses now. */
	used_mb: number;
	/** Storage the new RAM would allow. */
	limit_mb: number;
	/** How much to free (delete data) so the data fits in `limit_mb`. */
	free_mb: number;
}
