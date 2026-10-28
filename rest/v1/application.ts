import type {
	APIApplication,
	APIApplicationDeployment,
	APIApplicationDomain,
	APIApplicationDomainConnect,
	APIApplicationDomainDnsRecord,
	APIApplicationDomainRedirectStatus,
	APIApplicationEnvironment,
	APIApplicationFile,
	APIApplicationFileContent,
	APIApplicationFileTree,
	APIApplicationFileUpload,
	APIApplicationMetric,
	APIApplicationOperationResponse,
	APIApplicationRealtimeEvent,
	APIApplicationRelease,
	APIApplicationReleaseLog,
	APIApplicationRollbackPreview,
	APIApplicationRuntimes,
	APIApplicationScanSuggestions,
	APIApplicationStatus,
	APIApplicationStatusShort,
	APIApplicationSubdomain,
	APIApplicationWebPublish,
	APIApplicationWebhook,
	APIApplicationWebhookUrl,
	APIPaginatedPayload,
	APIPayload,
	APISnapshotImageWarning,
	ApplicationLanguage,
	ApplicationZeroDowntime,
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
 * `confirm_detach` of the routes that change the code of an application. An application that came from an open template (one that lets you change the
 * code) stops receiving versions of the template when its code is changed: without `confirm_detach` set to `true` the request fails with
 * `409 TEMPLATE_DETACH_CONFIRMATION_REQUIRED` (`details` is an `APITemplateDetachConfirmationDetails`) and changes nothing; with it the change is made and the
 * application is detached. Sent in the JSON body, as a text part of a multipart body or, on any of these routes, as the query `confirm_detach=true`.
 * Ignored for an application that does not come from a template.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/detach
 */
export interface RESTAPIConfirmDetach {
	confirm_detach?: boolean;
}

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
 * `POST /v1/apps/:id/files/upload` (multipart, single file or zip). `restart: "true"` restarts the app after the upload.
 * `path` is the destination folder inside the application (default: root); a zip is extracted into it.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/filemanager/upload
 */
export interface RESTPostAPIApplicationFileUploadQuery extends RESTAPIWorkspaceQuery {
	/** See `RESTAPIConfirmDetach`. */
	confirm_detach?: "true" | "false";
	restart?: "true" | "false";
	path?: string;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/filemanager/upload
 */
export type RESTPostAPIApplicationFileUploadResponse = APIPayload<APIApplicationFileUpload>;

/**
 * Multipart body of `POST /v1/apps/:id/files/upload`: `file` as a file part, `message` as a text part.
 * `message` is the commit message shown in the release history. Optional, up to 500 characters;
 * surrounding spaces are trimmed and an empty value is stored as `null`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/filemanager/upload
 */
export interface RESTPostAPIApplicationFileUploadBody extends RESTAPIConfirmDetach {
	/** Zip or single file. */
	file: unknown;
	message?: string;
}

/**
 * `GET /v1/apps/:id/releases`. Newest first. `limit` defaults to 20; the maximum is 50 and larger values return 400 `VALIDATION_ERROR`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/releases/list
 */
export interface RESTGetAPIApplicationReleasesQuery extends RESTAPIWorkspaceQuery {
	page?: number;
	limit?: number;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/releases/list
 */
export type RESTGetAPIApplicationReleasesResponse = APIPaginatedPayload<APIApplicationRelease>;

/**
 * `GET /v1/apps/:id/releases/:release_id/log`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/releases/log
 */
export type RESTGetAPIApplicationReleaseLogResponse = APIPayload<APIApplicationReleaseLog>;

/**
 * `GET /v1/apps/:id/releases/:release_id/rollback`. Previews a rollback to this release; changes nothing.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/releases/rollback-preview
 */
export type RESTGetAPIApplicationRollbackPreviewResponse = APIPayload<APIApplicationRollbackPreview>;

/**
 * Body of `POST /v1/apps/:id/releases/:release_id/rollback`.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/releases/rollback
 */
export interface RESTPostAPIApplicationRollbackBody {
	/** `true` also restores the environment variables saved with that release. Default `false`: the current variables are kept. */
	restore_environment?: boolean;
}

/**
 * Rolls the application back to this release. Restores all of its code, deletes the code files the
 * release did not have, leaves the data the application created while running untouched, and restarts
 * the application. Returns the new release, with `source: "rollback"`.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/releases/rollback
 */
export type RESTPostAPIApplicationRollbackResponse = APIPayload<APIApplicationRelease>;

/**
 * Creates or overwrites a file. Without `content`, creates (or truncates to) an empty file.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/filemanager/save
 */
export interface RESTPutAPIApplicationFileBody extends RESTAPIConfirmDetach {
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
export interface RESTDeleteAPIApplicationFileBody extends RESTAPIConfirmDetach {
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
export interface RESTPatchAPIApplicationFileMoveBody extends RESTAPIConfirmDetach {
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
 * A snapshot of an application of a closed template (`APIResourceSnapshot.closed`) creates an application with the same closed policy.
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
	/** Forces the language; without it the platform detects it from the project manifest. */
	language?: ApplicationLanguage;
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
 * `202` — the application, with `status: "building"`. The build and first start continue in the
 * background; follow the logs or poll the application until `status` is `up` or `down`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/create
 */
export type RESTPostAPIApplicationCreateResponse = APIPayload<
	APIApplication & {
		/** Creating from the snapshot of an application on a custom Docker image: the recorded image version no longer exists, so the application uses the image's current version. */
		warning?: APISnapshotImageWarning;
	}
>;

/**
 * Body of `POST /v1/apps/image` (JSON). Creates an application that runs from a custom Docker image. The image must be
 * ready (`status: "success"`), otherwise the call fails with `IMAGE_NOT_READY`. Several apps can share one image, each
 * with its own variables. An image that belongs to a template (a platform image or a `template_copy`) is refused with
 * `IMAGE_TEMPLATE_ONLY`: use the template instead.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/create-from-image
 */
export interface RESTPostAPIApplicationImageBody {
	/** Id of the image the app runs from. */
	image_id: string;
	/** Application name. */
	name: string;
	/** RAM in MB. */
	memory: number;
	description?: string;
	/** `true` publishes the app on the web (`subdomain` and `port` apply); `false` is an app without traffic, such as a bot or worker. */
	web: boolean;
	/** `"random"` = the platform picks one at random. Only with `web: true`. */
	subdomain?: string;
	/** Port the app listens on. Only with `web: true`; default: the first `EXPOSE` of the image's `Dockerfile`, or `80`. The platform injects it as `PORT`. */
	port?: number;
	envs?: RESTPostAPIApplicationEnvironmentVariableBody[];
	workspace_id?: string;
}

/**
 * `202` — the application, with `status: "building"` and `custom_image` filled in.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/create-from-image
 */
export type RESTPostAPIApplicationImageResult = APIPayload<APIApplication>;

/**
 * Scans a zip before creating the application and returns suggestions (language, main file,
 * version, start/build command, memory). Creates nothing.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/scan
 */
export interface RESTPostAPIApplicationScanBody {
	/** Application zip. */
	file: unknown;
	/** Main file of the application. Optional: without it the platform detects the language and the main file from the project manifest. */
	main?: string;
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
	/**
	 * Deploy behavior. `zero_downtime: "on"` needs the Enterprise plan and `auto_rollback: true` needs
	 * Intermediary or higher; below that the request fails with 403
	 * (`PLAN_DOES_NOT_SUPPORT_ZERO_DOWNTIME` / `PLAN_DOES_NOT_SUPPORT_AUTO_ROLLBACK`). `"off"`, `"auto"`
	 * and `auto_rollback: false` are always accepted. `health_check_path` must start with `/`, have at most 200
	 * characters and be printable ASCII without spaces (percent-encode anything else, e.g. `%20`); `null` clears
	 * it (back to `/`).
	 */
	deploy?: {
		zero_downtime?: ApplicationZeroDowntime;
		auto_rollback?: boolean;
		health_check_path?: string | null;
	};
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/updateconfig
 */
export type RESTPatchAPIApplicationUpdateConfigResponse = APIPayload<string>;

/**
 * Purges the edge cache of a published application.
 *
 * `hostnames` absent or empty = every host of the application (subdomain and custom domains).
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
 * `GET /v1/apps/:id/domains` — the custom domains of the application, automatic companions included.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/domains/list
 */
export type RESTGetAPIApplicationDomainsResponse = APIPayload<APIApplicationDomain[]>;

/**
 * `POST /v1/apps/:id/domains` — adds a custom domain without redeploying the application.
 *
 * `www` (default `true`) also creates the automatic companion (`www.` for a root domain, the root for a
 * `www.` hostname); it does not count toward the plan's domain limit. `redirect_status` defaults to `308`
 * and only applies with `redirect_to`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/domains/create
 */
export interface RESTPostAPIApplicationDomainBody {
	hostname: string;
	www?: boolean;
	/** 1 to 65535; up to 5 distinct ports besides `80` per application. Defaults to `80`. */
	port?: number;
	/** Literal path added in front of every request: starts with `/`, no trailing `/`. */
	path_prefix?: string;
	/** Id of another domain of the same application. */
	redirect_to?: string;
	redirect_status?: APIApplicationDomainRedirectStatus;
}

/**
 * The created domain and its companion, when there is one.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/domains/create
 */
export type RESTPostAPIApplicationDomainResponse = APIPayload<APIApplicationDomain[]>;

/**
 * `PATCH /v1/apps/:id/domains/:domain_id`. Send only what changes; `null` clears `path_prefix` or
 * `redirect_to`. `primary: true` swaps the domain with its companion as the main one.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/domains/update
 */
export interface RESTPatchAPIApplicationDomainBody {
	port?: number;
	path_prefix?: string | null;
	redirect_to?: string | null;
	redirect_status?: APIApplicationDomainRedirectStatus;
	primary?: true;
}

/**
 * The domains changed by the request.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/domains/update
 */
export type RESTPatchAPIApplicationDomainResponse = APIPayload<APIApplicationDomain[]>;

/**
 * `DELETE /v1/apps/:id/domains/:domain_id` — also removes the automatic companion.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/domains/delete
 */
export type RESTDeleteAPIApplicationDomainResponse = APIPayload<null>;

/**
 * `GET /v1/apps/:id/domains/:domain_id/dns` — the records to create at the DNS provider.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/domains/dns
 */
export type RESTGetAPIApplicationDomainDnsResponse = APIPayload<APIApplicationDomainDnsRecord[]>;

/**
 * `POST /v1/apps/:id/domains/:domain_id/connect` — URL that configures the DNS records at the
 * domain's DNS provider. `404 DOMAIN_CONNECT_UNAVAILABLE` when the provider does not support it.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/domains/connect
 */
export type RESTPostAPIApplicationDomainConnectResponse = APIPayload<APIApplicationDomainConnect>;

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
	/**
	 * Only for an application on a custom image: the port the image listens on (1–65535), saved as the app's port.
	 * Required when the app was created without web (`IMAGE_APP_PORT_REQUIRED`); ignored for other applications.
	 */
	port?: number;
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
export interface RESTPostAPIApplicationWebhookCreateBody extends RESTAPIConfirmDetach {
	owner: string;
	repo_name: string;
	repo_id: string;
	account_id: string;
	/**
	 * Branch the auto-deploy reacts to. Without it, a push on `main` or `master` deploys, as it always
	 * did; with it, only a push on this branch does (a push on any other branch is ignored with a 200).
	 * Linking again with another `branch` changes it; linking again without one goes back to `main` or `master`.
	 */
	branch?: string;
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
