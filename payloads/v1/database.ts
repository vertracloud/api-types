import type { ISODateString, SnowFlake, UserPlan } from "../../v1";

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/databases
 */
export type DatabaseType = 1 | 2 | 3;
export const DatabaseType = {
	POSTGRESQL: 1,
	MONGODB: 2,
	REDIS: 3,
} as const;

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/users
 */
export type DatabasePlan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export const DatabasePlan = {
	REDIS_128: 1,
	REDIS_256: 2,
	REDIS_512: 3,
	REDIS_1024: 4,
	MONGODB_1024: 5,
	MONGODB_2048: 6,
	MONGODB_5120: 7,
	MONGODB_10240: 8,
	POSTGRESQL_1024: 9,
	POSTGRESQL_2048: 10,
	POSTGRESQL_5120: 11,
	POSTGRESQL_10240: 12,
} as const;

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/databases
 */
export type DatabaseStatus = "up" | "down";
export const DatabaseStatus = {
	UP: "up",
	DOWN: "down",
} as const;

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/status
 */
export type DatabaseCluster = 1;
export const DatabaseCluster = {
	USA_1: 1,
	USA_2: 2,
} as const;

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/databases
 */
export interface APIDatabaseActivity {
	message: string;
	timestamp: ISODateString;
}

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/databases
 */
export interface APIDatabase {
	id: SnowFlake;
	cluster: DatabaseCluster;
	type: DatabaseType;
	duration: number;
	name: string;
	description: string;
	owner_id: SnowFlake;
	owner_plan_id: UserPlan; // Owner App Plan
	plan_id: DatabasePlan;
	status: DatabaseStatus;
	storage: number;
	ram: number;
	host: string; // example: "vertra-cloud-<type>-<dbId>.vertraweb.app"
	port: number;
	created_at: ISODateString;
	updated_at: ISODateString;
	purchased_at: ISODateString;
	expires_at: ISODateString;
	last_backup: ISODateString | null;
}

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/databases
 */
export interface APIDatabaseNetwork {
	total: string;
	now: string;
}

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/databases
 */
export interface APIDatabaseBackup {
	message: string;
	timestamp: ISODateString;
}

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/databases
 */
export interface APIDatabaseStatus {
	cpu: string;
	ram: string;
	status: DatabaseStatus;
	running: boolean;
	storage: string;
	network: APIDatabaseNetwork;
	uptime: number;
	created_at: ISODateString;
	updated_at: ISODateString;
}

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/databases
 */
export interface APIDatabaseStatusShort {
	id: SnowFlake;
	cpu: string;
	ram: string;
	storage: string;
	running: boolean;
}

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/databases
 */
export interface APIDatabaseMetrics {
	cpu: number;
	ram: number;
	storage: number;
	date: ISODateString;
	network: number[];
}
