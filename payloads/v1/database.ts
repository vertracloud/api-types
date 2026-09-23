import type { ISODateString, SnowFlake, UserPlan } from "../../v1";

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
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/get
 */

export interface APIDatabase {
	id: SnowFlake;
	cluster: DatabaseCluster;
	type: DatabaseType;
	name: string;
	description: string;
	owner_id: SnowFlake;
	owner_plan_id: UserPlan; // Owner's plan
	status: DatabaseStatus;
	ram: number;
	host: string; // example: "vertra-cloud-<type>-<dbId>.vertraweb.app"
	port: number;
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
export interface APIDatabasePasswordReset {
	password: string;
}
