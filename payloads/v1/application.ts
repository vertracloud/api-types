import type { ISODateString, SnowFlake } from "../../v1";

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/applications
 */
export type ApplicationLanguage = "nodejs" | "python";
export const ApplicationLanguage = {
	NODEJS: "nodejs",
	PYTHON: "python",
} as const;

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/applications
 */
export type ApplicationStatus = "up" | "down";
export const ApplicationStatus = {
	UP: "up",
	DOWN: "down",
} as const;

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/applications
 */
export type ApplicationCommitStatus = 1 | 2 | 3 | 4;
export const ApplicationCommitStatus = {
	PENDING: 1,
	DEPLOYING: 2,
	COMPLETED: 3,
	FAILED: 4,
} as const;

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/applications
 */
export type ApplicationCluster = 1;
export const ApplicationCluster = {
	USA_1: 1,
	USA_2: 2,
} as const;

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/applications
 */
export type ApplicationType = 1 | 2;
export const ApplicationType = {
	BOT: 1,
	WEBSITE: 2,
} as const;

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/applications
 */
export interface ApplicationCommit {
	version: string;
	timestamp: ISODateString;
	notes: string;
}

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/applications
 */
export type ApplicationFileType = "file" | "directory";
export const ApplicationFileType = {
	FILE: "file",
	DIRECTORY: "directory",
} as const;

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/applications
 */
export type ApplicationVersion = "recommended" | "latest";
export const ApplicationVersion = {
	RECOMMENDED: "recommended",
	LATEST: "latest",
} as const;

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/applications
 */
export type ApplicationFileContentType = "buffer";
export const ApplicationFileContentType = {
	BUFFER: "buffer",
} as const;

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/applications
 */
export interface APIApplicationFile {
	type: ApplicationFileType;
	name: string;
	size?: string;
	last_modified: ISODateString;
}

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/applications
 */
export interface APIApplicationFileContent {
	type: ApplicationFileContentType;
	data: number[];
}

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/applications
 */
export interface APIApplication {
	id: SnowFlake;
	cluster: ApplicationCluster;
	type: ApplicationType;
	name: string;
	description: string;
	owner_id: SnowFlake;
	language: ApplicationLanguage;
	ram: number;
	status: ApplicationStatus;
	domain: string | null;
	custom_domain: string | null;
	last_commit: ISODateString;
	last_backup: ISODateString | null;
	created_at: ISODateString;
	updated_at: ISODateString;
}

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/applications
 */
export interface APIApplicationNetwork {
	total: string;
	now: string;
}

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/applications
 */
export interface APIApplicationActivity {
	message: string;
	timestamp: ISODateString;
}

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/applications
 */
export interface APIApplicationStatus {
	cpu: string;
	ram: string;
	status: ApplicationStatus;
	running: boolean;
	storage: string;
	network: APIApplicationNetwork;
	uptime: number;
	created_at: ISODateString;
	updated_at: ISODateString;
}

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/applications
 */
export interface APIApplicationStatusShort {
	id: SnowFlake;
	cpu: string;
	ram: string;
	running: boolean;
}

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/applications
 */
export interface APIApplicationMetric {
	cpu: number;
	ram: number;
	storage: number;
	date: ISODateString;
	network: number[];
}

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/applications
 */
export interface APIApplicationCommit {
	id: SnowFlake;
	author_id: SnowFlake;
	message: string;
	version: string;
	status: ApplicationCommitStatus;
	size: string;
	date: ISODateString;
}

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/applications
 */
export interface APIApplicationBackup {
	id: SnowFlake;
	app_id: SnowFlake;
	author_id: SnowFlake | null;
	size: string;
	date: ISODateString;
}

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/applications
 */
export interface APIGroupedApplicationBackups {
	app_id: SnowFlake;
	app_name: string | null;
	backups: APIApplicationBackup[];
}

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/applications
 */
export interface APIApplicationConfig {
	NAME: string;
	MEMORY: number;
	MAIN: string;
	VERSION: ApplicationVersion;
	DESCRIPTION?: string;
	AUTORESTART?: boolean;
	START?: string;
	SUBDOMAIN?: string;
}

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/applications
 */
export interface APIApplicationEnvironment {
	id: string;
	key: string;
	value: string;
	note: string | null;
	created_at: ISODateString;
}
