import type { ISODateString, SnowFlake, UserPlan } from "../../v1";

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases
 */
export type DatabaseType = 1 | 2 | 3 | 4;
export const DatabaseType = {
	POSTGRESQL: 1,
	MONGODB: 2,
	REDIS: 3,
	MYSQL: 4,
} as const;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases
 */
export type DatabaseStatus = "up" | "down";
export const DatabaseStatus = {
	UP: "up",
	DOWN: "down",
} as const;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/status
 */
export type DatabaseCluster = number;
export const DatabaseCluster = {
	USA_1: 1,
	USA_2: 2,
	USA_3: 3,
} as const;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases
 */
export interface APIDatabaseActivity {
	message: string;
	timestamp: ISODateString;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases
 */

export interface APIDatabase {
	id: SnowFlake;
	cluster: DatabaseCluster;
	type: DatabaseType;
	name: string;
	description: string;
	owner_id: SnowFlake;
	owner_plan_id: UserPlan; // Owner App Plan
	status: DatabaseStatus;
	ram: number;
	host: string; // example: "vertra-cloud-<type>-<dbId>.vertraweb.app"
	port: number;
	created_at: ISODateString;
	updated_at: ISODateString;
	last_snapshot: ISODateString | null;
	use_credits: boolean;
	credits_used?: number;
	offline_since: ISODateString | null;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases
 */
export interface APIDatabaseNetwork {
	total: string;
	now: string;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases
 */
export interface APIDatabaseSnapshot {
	id: SnowFlake;
	resource_id: SnowFlake;
	author_id: SnowFlake | null;
	size: string;
	date: ISODateString;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases
 */
export interface APIDatabaseStatus {
	id: SnowFlake;
	cpu: string;
	ram: string;
	status: DatabaseStatus;
	running: boolean;
	storage: string;
	network: APIDatabaseNetwork;
	uptime: number;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases
 */
export interface APIDatabaseStatusShort {
	id: SnowFlake;
	cpu: string;
	ram: string;
	storage: string;
	running: boolean;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases
 */
export interface APIDatabaseMetrics {
	cpu: number;
	ram: number;
	storage: number;
	date: ISODateString;
	network: number[];
}
