import type { ISODateString, SnowFlake } from "../../v1";

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/databases
 */
export type DatabaseType = 1 | 2 | 3;
export const DatabaseType = {
	PostgreSQL: 1,
	MongoDB: 2,
	Redis: 3,
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
	USA: 1,
} as const;

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/databases
 */
export interface APIDatabaseConnection {
	ip: string;
	port: number;
	username: string;
	password: string;
	connection_url?: string;
}

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
	name: string;
	description: string;
	owner_id: SnowFlake;
	status: DatabaseStatus;
	storage: number;
	ram: number;
	connection: APIDatabaseConnection;
	last_backup: ISODateString | null;
	created_at: ISODateString;
	updated_at: ISODateString;
}

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/databases
 */
export interface APIDatabaseNetwork {
	total: number;
	now: number;
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
