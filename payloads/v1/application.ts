import type { ISODateString, SnowFlake } from "../../v1";

/**
 * @see https://docs.cloud.com/api-reference/endpoint/applications
 */
export type ApplicationLanguage = "nodejs" | "python";
export const ApplicationLanguage = {
	NodeJS: "nodejs",
	Python: "python",
} as const;

/**
 * @see https://docs.cloud.com/api-reference/endpoint/status
 */
export type ApplicationStatus = "up" | "down";
export const ApplicationStatus = {
	UP: "up",
	DOWN: "down",
} as const;

/**
 * @see https://docs.cloud.com/api-reference/endpoint/status
 */
export type ApplicationCluster = 1;
export const ApplicationCluster = {
	USA: 1,
} as const;

/**
 * @see https://docs.cloud.com/api-reference/endpoint/status
 */
export type ApplicationType = 1 | 2;
export const ApplicationType = {
	Bot: 1,
	Website: 2,
} as const;

/**
 * @see https://docs.cloud.com/api-reference/endpoint/status
 */
export interface ApplicationDeploy {
	version: string;
	timestamp: ISODateString;
	notes: string;
}

/**
 * @see https://docs.cloud.com/api-reference/endpoint/status
 */
export interface ApplicationEnvironment {
	name: string;
	value: string;
}

/**
 * @see https://docs.cloud.com/api-reference/endpoint/status
 */
export type ApplicationFileType = "file" | "directory";
export const ApplicationFileType = {
	File: "file",
	Directory: "directory",
} as const;

/**
 * @see https://docs.cloud.com/api-reference/endpoint/status
 */
export interface ApplicationFile {
	type: ApplicationFileType;
	name: string;
	size: string;
	last_modified: ISODateString;
}

/**
 * @see https://docs.cloud.com/api-reference/endpoint/applications
 */
export interface APIApplication {
	id: SnowFlake;
	cluster: ApplicationCluster;
	type: ApplicationType;
	name: string;
	description: string;
	owner: SnowFlake;
	language: ApplicationLanguage;
	ram: number;
	status: ApplicationStatus;
	environment: ApplicationEnvironment[];
	domain?: string;
	custom?: string; // Custom domain
	last_deploy?: ISODateString;
	created_at: ISODateString;
	updated_at: ISODateString;
}

/**
 * @see https://docs.cloud.com/api-reference/endpoint/applications
 */
export interface APIApplicationNetwork {
	total: number;
	now: number;
}

/**
 * @see https://docs.cloud.com/api-reference/endpoint/applications
 */
export interface APIApplicationActivities {
	message: string;
	timestamp: ISODateString;
}

/**
 * @see https://docs.cloud.com/api-reference/endpoint/applications
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
 * @see https://docs.cloud.com/api-reference/endpoint/applications
 */
export interface APIApplicationStatusShort {
	id: SnowFlake;
	cpu: string;
	ram: string;
	running: boolean;
}
