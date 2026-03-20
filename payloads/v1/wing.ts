import type { ISODateString } from "../../common/v1";
import type { ApplicationLanguage } from "./application";

/**
 * Wing service response wrapper
 */
export type APIPayloadStatus = "error" | "success";

export interface WingPayload<T = unknown> {
	status: APIPayloadStatus;
	response?: T;
	code?: string;
}

export interface WingServiceResult<T = unknown> {
	status: number;
	payload: WingPayload<T>;
}

/**
 * Container metrics (shared between apps and databases)
 */
export interface WingsContainerMetric {
	id: string;
	cpu: number;
	ram: number;
	storage: number;
	network_in: number;
	network_out: number;
	network: { total: string; now: string } | null;
	uptime: number;
	running: boolean;
}

/**
 * Application container creation response
 */
export interface WingsAppCreateResponse {
	container_id: string;
	container_name: string;
	envs: Array<{ key: string; value: string; note?: string }>;
	language: ApplicationLanguage;
	version: string;
	subdomain: string;
	max_bandwidth: string;
	memory: number;
	vcpus: number;
	auto_restart: boolean;
	created_at: ISODateString;
}

/**
 * Application container rebuild response
 */
export interface WingsAppRebuildResponse {
	container_id: string;
	container_name: string;
	version: string;
}

/**
 * Database container creation response
 */
export interface WingsDatabaseCreateResponse {
	container_id: string;
	container_name: string;
	subdomain_full: string;
	max_bandwidth: string;
	memory: number;
	vcpus: number;
	type: number;
	host: string;
	port: number;
	storage: number;
	created_at: ISODateString;
}

/**
 * Database container rebuild response
 */
export interface WingsDatabaseRebuildResponse {
	container_id: string;
	container_name: string;
	type: number;
	host: string;
	port: number;
	created_at: ISODateString;
}

/**
 * Database certificate bundle
 */
export interface WingsDatabaseCertificate {
	crt: string;
	key: string;
	pem: string;
}

/**
 * File upload response
 */
export interface WingsFileUploadResponse {
	app_id: string;
	updated_at: ISODateString;
}

/**
 * File move response
 */
export interface WingsFileMoveResponse {
	from: string;
	to: string;
}

/**
 * Snapshot restore response
 */
export interface WingsSnapshotRestoreResponse {
	message: string;
}

/**
 * Database reset response
 */
export interface WingsDatabaseResetResponse {
	id: string;
}
