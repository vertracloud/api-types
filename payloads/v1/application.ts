import type { ISODateString, SnowFlake, UserPlan } from "../../v1";

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/get
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
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/get
 */
export type ApplicationStatus = "up" | "down";
export const ApplicationStatus = {
	UP: "up",
	DOWN: "down",
} as const;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/get
 */
export type ApplicationCluster = number;
export const ApplicationCluster = {
	USA_1: 1,
	USA_2: 2,
	USA_3: 3,
} as const;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/get
 */
export type ApplicationType = 1 | 2;
export const ApplicationType = {
	BOT: 1,
	WEBSITE: 2,
} as const;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/filemanager/files
 */
export type ApplicationFileType = "file" | "directory";
export const ApplicationFileType = {
	FILE: "file",
	DIRECTORY: "directory",
} as const;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/get
 */
export type ApplicationVersion = "recommended" | "latest" | "auto" | (string & {});
export const ApplicationVersion = {
	RECOMMENDED: "recommended",
	LATEST: "latest",
	AUTO: "auto",
} as const;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/filemanager/content
 */
export type ApplicationFileContentType = "base64";
export const ApplicationFileContentType = {
	BASE64: "base64",
} as const;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/filemanager/files
 */
export interface APIApplicationFile {
	type: ApplicationFileType;
	name: string;
	path: string;
	size?: string;
	last_modified: ISODateString;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/filemanager/tree
 */
export interface APIApplicationFileTree extends APIApplicationFile {
	children?: APIApplicationFileTree[];
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/filemanager/content
 */
export interface APIApplicationFileContent {
	type: "base64";
	/** File bytes in standard base64 (with padding). */
	data: string;
	/** Actual size in bytes (not the length of the base64 string). */
	size: number;
	/** File mtime; send it back on PUT (`last_modified`) to detect edit conflicts. */
	last_modified: ISODateString;
}

/**
 * Successful ZIP upload through `POST /v1/apps/:id/files/upload`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/filemanager/upload
 */
export interface APIApplicationFileUpload {
	app_id: SnowFlake;
	updated_at: ISODateString;
	missing_dependencies: string[];
	removed_directories: string[];
}

/**
 * Repository linked to the application for auto-deploy. The webhook URL is not included here.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/get
 */
export interface APIApplicationGithub {
	repo_owner: string;
	repo_name: string;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/get
 */
export interface APIApplication {
	id: SnowFlake;
	cluster: ApplicationCluster;
	type: ApplicationType;
	name: string;
	description?: string;
	owner_id: string; // UUID
	owner_plan_id: UserPlan; // Owner's plan
	language: ApplicationLanguage;
	ram: number;
	status: ApplicationStatus;
	subdomain: string | null; // example: "my-app.vertraweb.app"
	/**
	 * Canonical public URL of the app, computed by the server (`custom_domain` > `subdomain` >
	 * `null`). Clients should use it as-is instead of building the URL from the subdomain.
	 */
	public_url: string | null;
	/**
	 * GitHub integration of this application, if any. `null` = the source is a zip (or snapshot).
	 * May be absent in older payloads. The webhook URL is available from
	 * `GET /v1/apps/:id/deploys/webhook`.
	 */
	github?: APIApplicationGithub | null;
	custom_domain: string | null; // example: "my-app.com.br"
	last_snapshot: ISODateString | null;
	created_at: ISODateString;
	updated_at: ISODateString;
	main_file: string;
	version: ApplicationVersion;
	/** @deprecated Always `true` since 2026-09-17 — auto-restart is on for every plan; any value sent is ignored. */
	auto_restart: boolean;
	start_command: string | null;
	/**
	 * Build command, run once per deploy, after dependencies are installed and before the app
	 * starts — in the build environment, with more memory than the app. `null` = no build step.
	 * If it fails, the deploy fails and the app does not start.
	 */
	build_command: string | null;
	offline_since: ISODateString | null;
	missing_dependencies?: string[]; // Undeclared packages detected on build/deploy
	/** Active Vertra Shield containment (burst/rate limit); `null` when there is none. */
	shield_cooldown: APIApplicationShieldCooldown | null;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/get
 */
export interface APIApplicationNetwork {
	total: string;
	now: string;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/status
 */
export interface APIApplicationStatus {
	id: SnowFlake;
	cpu: string;
	ram: string;
	/** @deprecated Not returned by `GET /v1/apps/:id/status`; use `running`. */
	status?: ApplicationStatus;
	running: boolean;
	/**
	 * `true` while dependencies are being installed.
	 *
	 * During this window the app itself is not running yet, so `running: false` alone does not
	 * mean the app is stopped. Optional: omitted when no installation is in progress.
	 */
	installing?: boolean;
	storage: string;
	/** `null` when network usage is unavailable (e.g. the app is stopped). */
	network: APIApplicationNetwork | null;
	uptime: number;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/allstatus
 */
export interface APIApplicationStatusShort {
	id: SnowFlake;
	cpu: string;
	ram: string;
	/** Absent when the app's status could not be read. */
	storage?: string;
	/** Absent when the app's status could not be read; `null` when network usage is unavailable. */
	network?: APIApplicationNetwork | null;
	running: boolean;
	/**
	 * `true` while dependencies are being installed.
	 *
	 * During this window the app itself is not running yet, so `running: false` alone does not
	 * mean the app is stopped. Optional: omitted when no installation is in progress.
	 */
	installing?: boolean;
	/**
	 * Seconds since the app started.
	 *
	 * A duration, not a point in time — hence `number` rather than `ISODateString`. Same unit and
	 * type as `APIApplicationStatus.uptime`.
	 *
	 * `null` when unknown (the app is stopped or its status could not be read). **`0` is never used
	 * as a sentinel** — `0` means "just started".
	 */
	uptime: number | null;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/metrics
 */
export interface APIApplicationMetric {
	cpu: number;
	ram: number;
	storage: number;
	date: ISODateString;
	network: number[];
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/create
 */
export interface APIApplicationConfig {
	NAME: string;
	MEMORY: number;
	MAIN: string;
	VERSION: ApplicationVersion;
	DESCRIPTION?: string;
	/** @deprecated Always `true` since 2026-09-17 — auto-restart is on for every plan; any value sent is ignored. */
	AUTORESTART?: boolean;
	START?: string;
	/** Build command (see `APIApplication.build_command`). */
	BUILD?: string;
	SUBDOMAIN?: string;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/enviroments/get
 */
export interface APIApplicationEnvironment {
	id: string;
	key: string;
	value: string;
	note: string | null;
	created_at: ISODateString;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/start
 */
export interface APIApplicationOperationResponse {
	status: "success";
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/deploys/recents
 */
export interface APIApplicationDeployment {
	app_id: SnowFlake;
	commit_id: string;
	message: string;
	pusher: string;
	branch: string;
	created_at: ISODateString;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/network/dns
 */
export type ApplicationDnsRecordType = "CNAME" | "TXT";
export const ApplicationDnsRecordType = {
	CNAME: "CNAME",
	TXT: "TXT",
} as const;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/network/dns
 */
export type ApplicationDnsRecordStatus = "active" | "pending_validation";
export const ApplicationDnsRecordStatus = {
	ACTIVE: "active",
	PENDING_VALIDATION: "pending_validation",
} as const;

/**
 * DNS record the user must create at their DNS provider for the custom domain.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/network/dns
 */
export interface APIApplicationDnsRecord {
	type: ApplicationDnsRecordType;
	name: string;
	value: string;
	status: ApplicationDnsRecordStatus;
}

/**
 * Returned when the auto-deploy webhook is created.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/deploys/create
 */
export interface APIApplicationWebhookUrl {
	url: string;
}

/**
 * Auto-deploy webhook of an application and the repository it is linked to.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/deploys/webhookurl
 */
export interface APIApplicationWebhook {
	webhook_url: string;
	repo_owner: string;
	repo_name: string;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/network/subdomain
 */
export interface APIApplicationSubdomain {
	/** Full hostname (`my-app.vertraweb.app`). */
	subdomain: string;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/network/customdomain
 */
export interface APIApplicationCustomDomain {
	domain: string;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/get
 */
export type ShieldIncidentReason = "burst" | "rate_limit";
export const ShieldIncidentReason = {
	BURST: "burst",
	RATE_LIMIT: "rate_limit",
} as const;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/get
 */
export type ShieldIncidentDirection = "in" | "out";
export const ShieldIncidentDirection = {
	IN: "in",
	OUT: "out",
} as const;

/**
 * Active Vertra Shield containment on this application (bandwidth limit after a burst/rate limit).
 * `null` when no containment is in effect.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/get
 */
export interface APIApplicationShieldCooldown {
	until: ISODateString;
	reason: ShieldIncidentReason;
	direction: ShieldIncidentDirection;
	strikes: number;
}

/**
 * Web publishing state of an application.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/network/publish
 */
export interface APIApplicationWebPublish {
	/** `null` when web publishing is off. */
	subdomain: string | null;
	custom_domain: string | null;
	type: ApplicationType;
}

/**
 * Suggestions from scanning the zip before creating an application. Nothing is applied
 * automatically: they are meant to pre-fill a creation form that the user can edit.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/scan
 */
export interface APIApplicationScanSuggestions {
	suggested_start_command?: string;
	suggested_build_command?: string;
	suggested_memory_mb?: number;
	suggested_public_web?: boolean;
	missing_dependencies?: string[];
}

/**
 * One runtime of `GET /v1/apps/runtimes`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/runtimes
 */
export interface APIApplicationRuntime {
	/** Recommended version for new applications. */
	recommended: string;
	latest: string;
	/** Other exact versions that can be pinned. Empty for runtimes without version pinning. */
	specific: string[];
}

/**
 * Catalog of supported runtimes, keyed by language.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/runtimes
 */
export type APIApplicationRuntimes = Record<ApplicationLanguage, APIApplicationRuntime>;

/**
 * `event` field of the `GET /v1/apps/:id/realtime` stream (`text/event-stream`).
 * `logs` = application output (one or more lines); `system` = stream/platform notices (e.g.
 * `install_note:started`); `heartbeat` = keep-alive, no content.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/realtime
 */
export type ApplicationRealtimeEventType = "logs" | "system" | "heartbeat";
export const ApplicationRealtimeEventType = {
	LOGS: "logs",
	SYSTEM: "system",
	HEARTBEAT: "heartbeat",
} as const;

/**
 * One server-sent event of `GET /v1/apps/:id/realtime`. `data` is plain text, not JSON; a `logs`
 * event may carry several lines separated by `\n`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/realtime
 */
export interface APIApplicationRealtimeEvent {
	event: ApplicationRealtimeEventType;
	data: string;
}
