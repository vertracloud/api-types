import type { ISODateString, SnowFlake } from "../../v1";

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/applications
 */
export type ApplicationLanguage = "nodejs" | "python";
export const ApplicationLanguage = {
	NodeJS: "nodejs",
	Python: "python",
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
export type ApplicationCluster = 1;
export const ApplicationCluster = {
	USA: 1,
} as const;

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/applications
 */
export type ApplicationType = 1 | 2;
export const ApplicationType = {
	Bot: 1,
	Website: 2,
} as const;

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/applications
 */
export interface ApplicationDeploy {
	version: string;
	timestamp: ISODateString;
	notes: string;
}

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/applications
 */
export type ApplicationFileType = "file" | "directory";
export const ApplicationFileType = {
	File: "file",
	Directory: "directory",
} as const;

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/applications
 */
export type ApplicationFileContentType = "buffer";
export const ApplicationFileContentType = {
	Buffer: "buffer",
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
	last_deploy: ISODateString | null;
	created_at: ISODateString;
	updated_at: ISODateString;
}

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/applications
 */
export interface APIApplicationNetwork {
	total: number;
	now: number;
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
export interface APIApplicationMetrics {
	cpu: number;
	ram: number;
	storage: number;
	date: ISODateString;
	network: number[];
}
