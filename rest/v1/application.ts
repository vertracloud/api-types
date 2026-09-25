import type {
	APIApplication,
	APIApplicationCustomDomain,
	APIApplicationDeployment,
	APIApplicationDnsRecord,
	APIApplicationEnvironment,
	APIApplicationFile,
	APIApplicationFileContent,
	APIApplicationFileTree,
	APIApplicationFileUpload,
	APIApplicationMetric,
	APIApplicationOperationResponse,
	APIApplicationRealtimeEvent,
	APIApplicationRuntimes,
	APIApplicationScanSuggestions,
	APIApplicationStatus,
	APIApplicationStatusShort,
	APIApplicationSubdomain,
	APIApplicationWebPublish,
	APIApplicationWebhook,
	APIApplicationWebhookUrl,
	APIPayload,
	ApplicationLanguage,
	ISODateString,
	RESTAPIWorkspaceQuery,
} from "../../v1";

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/runtimes
 */
export type RESTGetAPIApplicationRuntimesResponse = APIPayload<APIApplicationRuntimes>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/get
 */
export type RESTGetAPIApplicationResponse = APIPayload<APIApplication>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/status
 */
export type RESTGetAPIApplicationStatusResponse = APIPayload<APIApplicationStatus>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/allstatus
 */
export type RESTGetAPIApplicationStatusShortResponse = APIPayload<APIApplicationStatusShort[]>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/logs
 */
export type RESTGetAPIApplicationLogsResponse = APIPayload<string>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/metrics
 */
export interface RESTGetAPIApplicationMetricsQuery extends RESTAPIWorkspaceQuery {
	range?: "10m" | "30m" | "24h";
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/metrics
 */
export type RESTGetAPIApplicationMetricsResponse = APIPayload<APIApplicationMetric[]>;

/**
 * `GET /v1/apps/:id/files`. `path` absent = the application root.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/filemanager/files
 */
export interface RESTGetAPIApplicationFilesQuery extends RESTAPIWorkspaceQuery {
	path?: string;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/filemanager/files
 */
export type RESTGetAPIApplicationFilesResponse = APIPayload<APIApplicationFile[]>;

/**
 * `GET /v1/apps/:id/files/tree` — the whole file tree (depth-limited), as a list of root entries.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/filemanager/tree
 */
export type RESTGetAPIApplicationFileTreeResponse = APIPayload<APIApplicationFileTree[]>;

/**
 * `GET /v1/apps/:id/files/content`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/filemanager/content
 */
export interface RESTGetAPIApplicationFileContentQuery extends RESTAPIWorkspaceQuery {
	path: string;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/filemanager/content
 */
export type RESTGetAPIApplicationFileContentResponse = APIPayload<APIApplicationFileContent>;

/**
 * `POST /v1/apps/:id/files/upload` (multipart zip). `restart: "true"` restarts the app after the upload.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/filemanager/upload
 */
export interface RESTPostAPIApplicationFileUploadQuery extends RESTAPIWorkspaceQuery {
	restart?: "true" | "false";
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/filemanager/upload
 */
export type RESTPostAPIApplicationFileUploadResponse = APIPayload<APIApplicationFileUpload>;

/**
 * Creates or overwrites a file. Without `content`, creates (or truncates to) an empty file.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/filemanager/save
 */
export interface RESTPutAPIApplicationFileBody {
	path: string;
	content?: string;
	/** ISO 8601 datetime from the last read; a mismatch returns `409 FILE_MODIFIED`. */
	last_modified?: ISODateString;
	workspace_id?: string;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/filemanager/save
 */
export type RESTPutAPIApplicationFileResponse = APIPayload<null>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/filemanager/delete
 */
export interface RESTDeleteAPIApplicationFileBody {
	path: string;
	workspace_id?: string;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/filemanager/delete
 */
export type RESTDeleteAPIApplicationFileResponse = APIPayload<null>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/filemanager/move
 */
export interface RESTPatchAPIApplicationFileMoveBody {
	path: string;
	to: string;
	workspace_id?: string;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/filemanager/move
 */
export type RESTPatchAPIApplicationFileMoveResponse = APIPayload<null>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/enviroments/get
 */
export type RESTGetAPIApplicationEnvironmentResponse = APIPayload<APIApplicationEnvironment[]>;

/**
 * One variable of the `POST /apps/:id/envs` body. `note: null` clears the existing note.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/enviroments/createOrEdit
 */
export interface RESTPostAPIApplicationEnvironmentVariableBody {
	key: string;
	value: string;
	note?: string | null;
}

/**
 * Body of `POST /apps/:id/envs`: a single object (one variable) or an array (batch), with no repeated keys.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/enviroments/createOrEdit
 */
export type RESTPostAPIApplicationEnvironmentBody = RESTPostAPIApplicationEnvironmentVariableBody | RESTPostAPIApplicationEnvironmentVariableBody[];

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/enviroments/createOrEdit
 */
export type RESTPostAPIApplicationEnvironmentResponse = APIPayload<APIApplicationEnvironment[]>;

/**
 * `DELETE /v1/apps/:id/envs/:envId`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/enviroments/delete
 */
export type RESTDeleteAPIApplicationEnvironmentResponse = APIPayload<null>;

/**
 * Body of `POST /apps` — **`multipart/form-data`**, not JSON. Each field below is one multipart
 * part: `file` as a file and **every other field as a text field** (including `snapshot_id`,
 * `memory` and `envs`, the latter as a JSON-serialized string).
 *
 * The application has **two mutually exclusive sources**:
 *
 * - `file` — the zip uploaded by the user;
 * - `snapshot_id` — alternative to `file`: the app is created from that snapshot (which already
 *   includes its `vertracloud.config`).
 *
 * **Exactly one of them must be present.** Neither → `SOURCE_REQUIRED`; both →
 * `SOURCE_CONFLICT`.
 *
 * Error codes:
 *
 * - `SOURCE_REQUIRED` — neither `file` nor `snapshot_id`.
 * - `SOURCE_CONFLICT` — `file` and `snapshot_id` together.
 * - `SNAPSHOT_NOT_FOUND` — the snapshot does not exist or does not belong to the user.
 * - `SNAPSHOT_TYPE_MISMATCH` — the snapshot is from a database, not an application.
 * - `SNAPSHOT_TOO_LARGE` — the snapshot exceeds the size limit for creation.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/create
 */
export interface RESTPostAPIApplicationCreateBody {
	/** Application zip. Absent when the source is `snapshot_id`. */
	file?: unknown;
	/**
	 * Alternative to `file`: id of the **application** snapshot to create the app from. Sent as a
	 * multipart text field. Exactly one of `file` and `snapshot_id`.
	 */
	snapshot_id?: string;
	name: string;
	description?: string | null;
	/** RAM in MB. Multipart text field. Required with `file`; with `snapshot_id` defaults to the snapshot's config. */
	memory?: number;
	/** Required with `file`; with `snapshot_id` defaults to the snapshot's config. */
	main?: string;
	/** Required with `file`; with `snapshot_id` defaults to the snapshot's config. */
	version?: string;
	start?: string;
	/** Build command (see `APIApplication.build_command`). */
	build?: string;
	/** `"random"` = the platform picks one at random. */
	subdomain?: string;
	workspace_id?: string;
	/** JSON-serialized string in the multipart body. */
	envs?: RESTPostAPIApplicationEnvironmentVariableBody[];
}

/**
 * The created application, plus the directories removed from the uploaded zip.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/create
 */
export type RESTPostAPIApplicationCreateResponse = APIPayload<APIApplication & { removed_directories: string[] }>;

/**
 * Scans a zip before creating the application and returns suggestions (start/build command,
 * memory). Creates nothing.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/scan
 */
export interface RESTPostAPIApplicationScanBody {
	/** Application zip. */
	file: unknown;
	/** Main file of the application — used only to infer the language, as on create. */
	main: string;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/scan
 */
export type RESTPostAPIApplicationScanResponse = APIPayload<APIApplicationScanSuggestions>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/delete
 */
export type RESTDeleteAPIApplicationResponse = APIPayload<null>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/download
 */
export type RESTGetAPIApplicationDownloadResponse = ArrayBuffer;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/realtime
 */
export interface RESTGetAPIApplicationRealtimeQuery extends RESTAPIWorkspaceQuery {
	since?: number;
}

/**
 * The route answers with a `text/event-stream`; this is the shape of each event in it.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/realtime
 */
export type RESTGetAPIApplicationRealtimeResponse = APIApplicationRealtimeEvent;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/start
 */
export type RESTPostAPIApplicationStartResponse = APIPayload<APIApplicationOperationResponse>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/stop
 */
export type RESTPostAPIApplicationStopResponse = APIPayload<APIApplicationOperationResponse>;

/**
 * Optional restart body. No body = regular restart, reusing the install and build cache.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/restart
 */
export interface RESTPostAPIApplicationRestartBody {
	/** Reinstalls dependencies from scratch, ignoring the install cache. */
	reinstall_dependencies?: boolean;
	/** Runs the build command again even without code changes. Counts as a deploy toward the hourly limit. */
	force_build?: boolean;
	/**
	 * After changing the app's language, removes the dependencies left by the previous runtime.
	 * Must differ from the current language (`CLEANUP_LANGUAGE_SAME_AS_CURRENT`).
	 */
	cleanup_old_runtime_language?: ApplicationLanguage;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/restart
 */
export type RESTPostAPIApplicationRestartResponse = APIPayload<APIApplicationOperationResponse>;

/**
 * Body for updating the app configuration. Every field is optional, but at least one must be
 * provided.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/updateconfig
 */
export interface RESTPatchAPIApplicationUpdateConfigBody {
	name?: string;
	description?: string | null;
	main_file?: string;
	version?: string;
	start_command?: string | null;
	build_command?: string | null;
	ram?: number;
	language?: ApplicationLanguage;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/updateconfig
 */
export type RESTPatchAPIApplicationUpdateConfigResponse = APIPayload<string>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/network/dns
 */
export type RESTGetAPIApplicationDnsRecordsResponse = APIPayload<APIApplicationDnsRecord[]>;

/**
 * Purges the edge cache of a published application.
 *
 * `hostnames` absent or empty = every host of the application (subdomain and custom domain).
 * When provided, each host must belong to the application. `paths` narrows the purge to
 * specific URLs within those hosts.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/network/purgecache
 */
export interface RESTPostAPIApplicationPurgeCacheBody {
	hostnames?: string[];
	paths?: string[];
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/network/purgecache
 */
export type RESTPostAPIApplicationPurgeCacheResponse = APIPayload<null>;

/**
 * `GET /v1/apps/:id/network/custom` — `404 NO_CUSTOM_DOMAIN` when the application has none.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/network/customdomain
 */
export type RESTGetAPIApplicationCustomDomainResponse = APIPayload<APIApplicationCustomDomain>;

/**
 * `POST /v1/apps/:id/network/custom`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/network/customdomain
 */
export interface RESTPostAPIApplicationCustomDomainBody {
	domain: string;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/network/customdomain
 */
export type RESTPostAPIApplicationCustomDomainResponse = APIPayload<APIApplicationCustomDomain>;

/**
 * `DELETE /v1/apps/:id/network/custom`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/network/customdomain
 */
export type RESTDeleteAPIApplicationCustomDomainResponse = APIPayload<null>;

/**
 * `PATCH /v1/apps/:id/network/subdomain`. Only the label (`my-app`), 3–50 characters.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/network/subdomain
 */
export interface RESTPatchAPIApplicationSubdomainBody {
	subdomain: string;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/network/subdomain
 */
export type RESTPatchAPIApplicationSubdomainResponse = APIPayload<APIApplicationSubdomain>;

/**
 * Turns on web publishing for an application created without it.
 * `subdomain` absent = the platform picks one at random; choosing one requires a plan with custom subdomains.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/network/publish
 */
export interface RESTPostAPIApplicationWebPublishBody {
	subdomain?: string;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/network/publish
 */
export type RESTPostAPIApplicationWebPublishResponse = APIPayload<APIApplicationWebPublish>;

/**
 * Turns off web publishing: releases the subdomain, removes the custom domain and makes the application private again.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/network/publish
 */
export type RESTDeleteAPIApplicationWebPublishResponse = APIPayload<APIApplicationWebPublish>;

/**
 * `GET /v1/apps/:id/deploys/webhook`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/deploys/webhookurl
 */
export type RESTGetAPIApplicationWebhookUrlResponse = APIPayload<APIApplicationWebhook>;

/**
 * Creates the auto-deploy webhook from an already connected repository.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/deploys/create
 */
export interface RESTPostAPIApplicationWebhookCreateBody {
	owner: string;
	repo_name: string;
	repo_id: string;
	account_id: string;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/deploys/create
 */
export type RESTPostAPIApplicationWebhookCreateResponse = APIPayload<APIApplicationWebhookUrl>;

/**
 * `DELETE /v1/apps/:id/deploys/webhook`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/deploys/delete
 */
export type RESTDeleteAPIApplicationWebhookResponse = APIPayload<null>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/deploys/recents
 */
export type RESTGetAPIApplicationDeploymentsResponse = APIPayload<APIApplicationDeployment[]>;
