import type { APIRestartRequired, ISODateString, SnowFlake, UserPlanName } from "../../v1";

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
export type DatabaseCluster = number;
export const DatabaseCluster = {
	USA_1: 1,
	USA_2: 2,
	USA_3: 3,
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
	owner_plan: UserPlanName | null;
	status: DatabaseStatus;
	ram: number;
	host: string; // example: "vertra-cloud-<type>-<dbId>.vertraweb.app"
	port: number;
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
 * The new certificate, after a reset, together with the applications of stacks connected to the database that must restart to read it.
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/credentials/reset
 */
export interface APIDatabaseCertificateReset extends APIDatabaseCertificate, APIRestartRequired {}

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
