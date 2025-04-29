import type { ISODateString, SnowFlake } from "../../v1";

/**
 * @see https://docs.cloud.com/api-reference/endpoint/databases
 */
export type DatabaseType = "postgresql" | "mongodb" | "redis";
export const DatabaseType = {
	PostgreSQL: "postgresql",
	MongoDB: "mongodb",
	Redis: "redis",
} as const;

/**
 * @see https://docs.cloud.com/api-reference/endpoint/databases
 */
export type DatabaseStatus = "up" | "down";
export const DatabaseStatus = {
	UP: "up",
	DOWN: "down",
} as const;

/**
 * @see https://docs.cloud.com/api-reference/endpoint/status
 */
export type DatabaseCluster = 1;
export const DatabaseCluster = {
	USA: 1,
} as const;

/**
 * @see https://docs.cloud.com/api-reference/endpoint/databases
 */
export interface APIDatabaseConnection {
	ip: string;
	port: number;
	username: string;
	password: string;
	connection_url?: string;
}

/**
 * @see https://docs.cloud.com/api-reference/endpoint/databases
 */
export interface APIDatabaseActivity {
	message: string;
	timestamp: ISODateString;
}

/**
 * @see https://docs.cloud.com/api-reference/endpoint/databases
 */
export interface APIDatabase {
	id: SnowFlake;
	cluster: DatabaseCluster;
	type: DatabaseType;
	name: string;
	description: string;
	owner: SnowFlake;
	status: DatabaseStatus;
	storage: number;
	ram: number;
	connection: APIDatabaseConnection;
	last_backup?: ISODateString;
	created_at: ISODateString;
	updated_at: ISODateString;
}

/**
 * @see https://docs.cloud.com/api-reference/endpoint/databases
 */
export interface APIDatabaseNetwork {
	total: number;
	now: number;
}

/**
 * @see https://docs.cloud.com/api-reference/endpoint/databases
 */
export interface APIDatabaseBackup {
	message: string;
	timestamp: ISODateString;
}

/**
 * @see https://docs.cloud.com/api-reference/endpoint/databases
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
 * @see https://docs.cloud.com/api-reference/endpoint/databases
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
 * @see https://docs.cloud.com/api-reference/endpoint/databases
 */
export interface APIDatabaseStatusShort {
	id: SnowFlake;
	cpu: string;
	ram: string;
	running: boolean;
}
