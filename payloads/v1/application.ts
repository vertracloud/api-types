import type { ISODateString, SnowFlake, UserPlan } from "../../v1";

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/applications
 */
export type ApplicationLanguage = "javascript" | "typescript" | "bun" | "python" | "static" | "php" | "go" | "ruby" | "java" | "rust";
export const ApplicationLanguage = {
	JAVASCRIPT: "javascript",
	TYPESCRIPT: "typescript",
	BUN: "bun",
	PYTHON: "python",
	STATIC: "static",
	PHP: "php",
	GO: "go",
	RUBY: "ruby",
	JAVA: "java",
	RUST: "rust",
} as const;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/applications
 */
export type ApplicationStatus = "up" | "down";
export const ApplicationStatus = {
	UP: "up",
	DOWN: "down",
} as const;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/applications
 */
export type ApplicationCluster = number;
export const ApplicationCluster = {
	USA_1: 1,
	USA_2: 2,
	USA_3: 3,
} as const;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/applications
 */
export type ApplicationType = 1 | 2;
export const ApplicationType = {
	BOT: 1,
	WEBSITE: 2,
} as const;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/applications
 */
export type ApplicationFileType = "file" | "directory";
export const ApplicationFileType = {
	FILE: "file",
	DIRECTORY: "directory",
} as const;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/applications
 */
export type ApplicationVersion = "recommended" | "latest" | "auto" | (string & {});
export const ApplicationVersion = {
	RECOMMENDED: "recommended",
	LATEST: "latest",
	AUTO: "auto",
} as const;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/applications
 */
export type ApplicationFileContentType = "buffer";
export const ApplicationFileContentType = {
	BUFFER: "buffer",
} as const;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/applications
 */
export interface APIApplicationFile {
	type: ApplicationFileType;
	name: string;
	path: string;
	size?: string;
	last_modified: ISODateString;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/applications
 */
export interface APIApplicationFileTree extends APIApplicationFile {
	children?: APIApplicationFileTree[];
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/applications
 */
export interface APIApplicationFileContent {
	type: ApplicationFileContentType;
	data: number[];
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/applications
 */
export interface APIApplication {
	id: SnowFlake;
	cluster: ApplicationCluster;
	type: ApplicationType;
	name: string;
	description?: string;
	owner_id: string; // UUID
	owner_plan_id: UserPlan; // Owner App Plan
	language: ApplicationLanguage;
	ram: number;
	status: ApplicationStatus;
	subdomain: string | null; // example: "my-app.vertraweb.com"
	custom_domain: string | null; // example: "my-app.com.br"
	last_snapshot: ISODateString | null;
	created_at: ISODateString;
	updated_at: ISODateString;
	main_file: string;
	version: ApplicationVersion;
	auto_restart: boolean;
	start_command: string | null;
	use_credits: boolean;
	credits_used?: number;
	offline_since: ISODateString | null;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/applications
 */
export interface APIApplicationNetwork {
	total: string;
	now: string;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/applications
 */
export interface APIApplicationActivity {
	message: string;
	timestamp: ISODateString;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/applications
 */
export interface APIApplicationStatus {
	id: SnowFlake;
	cpu: string;
	ram: string;
	status: ApplicationStatus;
	running: boolean;
	storage: string;
	network: APIApplicationNetwork;
	uptime: number;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/applications
 */
export interface APIApplicationStatusShort {
	id: SnowFlake;
	cpu: string;
	ram: string;
	running: boolean;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/applications
 */
export interface APIApplicationMetric {
	cpu: number;
	ram: number;
	storage: number;
	date: ISODateString;
	network: number[];
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/applications
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
 * @see https://docs.vertracloud.app/api-reference/endpoint/applications
 */
export interface APIApplicationEnvironment {
	id: string;
	key: string;
	value: string;
	note: string | null;
	created_at: ISODateString;
}
