import type { ISODateString, SnowFlake, UserPlanName } from "../../v1";
import type { APICustomImageApp } from "./custom-image";
import type { APITemplateEffectivePermissions, APITemplateOrigin } from "./template-origin";

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/get
 */
export type ApplicationLanguage = "javascript" | "typescript" | "bun" | "python" | "static" | "php" | "go" | "ruby" | "java" | "rust" | "deno" | "dotnet" | "elixir";
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
	DENO: "deno",
	DOTNET: "dotnet",
	ELIXIR: "elixir",
} as const;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/get
 */
export type ApplicationStatus = "up" | "down" | "building";
export const ApplicationStatus = {
	UP: "up",
	DOWN: "down",
	/** First build and start in progress after `POST /v1/apps`; ends as `up` or `down`. */
	BUILDING: "building",
} as const;

/**
 * Why the last build or install failed. See `APIApplication.last_build_error`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/get
 */
export type ApplicationBuildError = "BUILD_FAILED" | "BUILD_TIMEOUT" | "INSTALL_FAILED" | "INSTALL_OUT_OF_MEMORY" | "INSTALL_TIMEOUT" | "INSTALL_SHIELD_BLOCKED" | "BUILD_INTERRUPTED";
export const ApplicationBuildError = {
	BUILD_FAILED: "BUILD_FAILED",
	BUILD_TIMEOUT: "BUILD_TIMEOUT",
	INSTALL_FAILED: "INSTALL_FAILED",
	INSTALL_OUT_OF_MEMORY: "INSTALL_OUT_OF_MEMORY",
	INSTALL_TIMEOUT: "INSTALL_TIMEOUT",
	INSTALL_SHIELD_BLOCKED: "INSTALL_SHIELD_BLOCKED",
	BUILD_INTERRUPTED: "BUILD_INTERRUPTED",
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
	removed_directories: string[];
	/**
	 * Only for an application on a custom Docker image: the upload is a commit that rebuilds the image (the files go on top of the
	 * current build context). `null` or absent for a regular application.
	 */
	image_build?: APIApplicationImageBuild | null;
	/** Readable summary for the CLI, e.g. that the image is rebuilding and the application restarts when the build succeeds. */
	message?: string;
}

/**
 * The image build started by a commit to an application on a custom Docker image.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/filemanager/upload
 */
export interface APIApplicationImageBuild {
	image_id: string;
	build_id: string;
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
 * How a new deploy replaces the running version. `auto` = without downtime only when the app receives
 * traffic through web publishing, otherwise with downtime; `on` = always without downtime (Enterprise);
 * `off` = the running version stops before the new one starts.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/updateconfig
 */
export type ApplicationZeroDowntime = "auto" | "on" | "off";
export const ApplicationZeroDowntime = {
	AUTO: "auto",
	ON: "on",
	OFF: "off",
} as const;

/**
 * Deploy behavior of an application. Changed with `PATCH /v1/apps/:id/config` (`deploy`).
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/updateconfig
 */
export interface APIApplicationDeploySettings {
	/** The saved choice. Defaults to `off`: zero-downtime deploys are opt-in. */
	zero_downtime: ApplicationZeroDowntime;
	/**
	 * Whether the next deploy runs without downtime. `true` on Enterprise when `zero_downtime` is `on`,
	 * or when it is `auto` and the app receives traffic through web publishing.
	 */
	zero_downtime_active: boolean;
	/**
	 * If the new version stops within 60 seconds after a deploy, the platform switches back to the
	 * previous version, once. Off by default (opt-in). Acts from the Intermediary plan; the saved value is returned on
	 * any plan.
	 */
	auto_rollback: boolean;
	/**
	 * HTTP path the platform calls on the new version before it receives traffic. Any HTTP response,
	 * including 404, counts as healthy; a refused connection, a timeout or a 5xx counts as a failure.
	 * Starts with `/`, at most 200 characters, printable ASCII only with no spaces; percent-encode anything
	 * else (`%20`, `%C3%A9`). `null` = `/`.
	 */
	health_check_path: string | null;
}

/**
 * The template an application was created from.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/get
 */
export interface APIApplicationTemplate extends APITemplateOrigin {
	/** Id of the service of the template this application is; `null` when the template has a single service. */
	service_id: string | null;
	/** What the template lets you do with this application. */
	permissions: APITemplateEffectivePermissions;
	/**
	 * Deploy settings the template locks for this application (`PATCH /v1/apps/:id/config` refuses another value with `TEMPLATE_SETTING_LOCKED`).
	 * Empty once the application is detached.
	 */
	locked_deploy_settings?: ("zero_downtime" | "auto_rollback")[];
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
	/** Owner's plan; `null` when the owner has no plan. */
	owner_plan: UserPlanName | null;
	language: ApplicationLanguage;
	ram: number;
	status: ApplicationStatus;
	/** Code of the last failed build/install; `null` after a successful build. Details in the app logs. */
	last_build_error: ApplicationBuildError | null;
	subdomain: string | null; // example: "my-app.vertraweb.app"
	/**
	 * Canonical public URL of the app, computed by the server (primary domain > `subdomain` >
	 * `null`). Clients should use it as-is instead of building the URL from the subdomain.
	 */
	public_url: string | null;
	/**
	 * GitHub integration of this application, if any. `null` = the source is a zip (or snapshot).
	 * May be absent in older payloads. The webhook URL is available from
	 * `GET /v1/apps/:id/deploys/webhook`.
	 */
	github?: APIApplicationGithub | null;
	/** Custom domains of the application, with their status. Empty when it has none. */
	domains: APIApplicationDomain[];
	last_snapshot: ISODateString | null;
	created_at: ISODateString;
	updated_at: ISODateString;
	main_file: string;
	version: ApplicationVersion;
	start_command: string | null;
	/**
	 * Build command, run once per deploy, after dependencies are installed and before the app
	 * starts — in the build environment, with more memory than the app. `null` = no build step.
	 * If it fails, the deploy fails and the app does not start.
	 */
	build_command: string | null;
	offline_since: ISODateString | null;
	/** Active Vertra Shield containment (burst/rate limit); `null` when there is none. */
	shield_cooldown: APIApplicationShieldCooldown | null;
	/** Deploy behavior: zero downtime, automatic rollback and health check. */
	deploy: APIApplicationDeploySettings;
	/**
	 * Custom Docker image the app runs from; `null` for a regular app. With an image, `language`, `version`,
	 * `main_file`, `start_command` and `build_command` do not apply: they come from the image.
	 */
	/** Stack the application belongs to; `null` (or absent) when it is not in one. */
	stack_id?: SnowFlake | null;
	/** Id of the service of the stack's template this application is; `null` (or absent) when the user added it. */
	stack_service_key?: string | null;
	/** Template the application was created from; `null` (or absent) for an application that did not come from one. */
	template?: APIApplicationTemplate | null;
	custom_image:
		| (APICustomImageApp & {
				/** Id of the image. `id` and `name` of the base object are the application's, not the image's. */
				image_id: string;
				/** Port the app listens on and the platform routes to; `null` for an app without web traffic. */
				port: number | null;
		  })
		| null;
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
	/**
	 * Set when the variable is managed by a connection of a stack: the platform keeps it up to date and the panel marks it as managed.
	 * Editing it by hand turns it into an ordinary variable. `null` (or absent) for a variable you own. Variables the author of a
	 * template hid are never listed.
	 */
	managed_by?: APIApplicationEnvironmentManager | null;
	created_at: ISODateString;
}

/**
 * The connection that manages an environment variable.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/enviroments/get
 */
export interface APIApplicationEnvironmentManager {
	type: "stack_binding";
	binding_id: string;
	/** The stack of the connection. `null` for the address variable of an application that is not in a stack (the connection of the application with itself). */
	stack_id: SnowFlake | null;
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
 * How a release was created.
 * `github` = push to the connected repository; `cli` = the Vertra CLI; `upload` = upload from the
 * dashboard, an SDK or an extension; `editor` = edits made in the file manager; `rollback` = a
 * release that restores an earlier one; `env_change` = a change to the environment variables only.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/releases/list
 */
export type ApplicationReleaseSource = "github" | "cli" | "upload" | "editor" | "rollback" | "env_change";
export const ApplicationReleaseSource = {
	GITHUB: "github",
	CLI: "cli",
	UPLOAD: "upload",
	EDITOR: "editor",
	ROLLBACK: "rollback",
	ENV_CHANGE: "env_change",
} as const;

/**
 * Lifecycle of a release. `deploying` = being built and started; `active` = the application's current
 * code, one per application (see `first_started_at`: files committed without a restart are `active`
 * before the application runs them); `superseded` = replaced by a newer release; `failed` = the
 * application stopped right after this release was deployed and the platform rolled back to the
 * previous one; `rolled_back` = the active release was replaced by a rollback; `expired` = its code is
 * no longer kept.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/releases/list
 */
export type ApplicationReleaseStatus = "deploying" | "active" | "superseded" | "failed" | "rolled_back" | "expired";
export const ApplicationReleaseStatus = {
	DEPLOYING: "deploying",
	ACTIVE: "active",
	SUPERSEDED: "superseded",
	FAILED: "failed",
	ROLLED_BACK: "rolled_back",
	EXPIRED: "expired",
} as const;

/**
 * One version of an application's code, kept so it can be listed and, when the plan allows it,
 * restored. The list is newest first. A release stays listed after its code expires.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/releases/list
 */
export interface APIApplicationRelease {
	id: SnowFlake;
	app_id: SnowFlake;
	source: ApplicationReleaseSource;
	status: ApplicationReleaseStatus;
	/** Commit or upload message. `null` when none was given, and always `null` for file manager edits. */
	message: string | null;
	/** The GitHub pusher, or the name of the user who uploaded or edited the files. */
	author: string;
	/** The GitHub push that produced this release. `null` for any other source. */
	github: APIApplicationDeployment | null;
	/** Number of files changed by the operation that produced this release. */
	files_changed: number;
	rollback: {
		/**
		 * `false` for the active release, for an expired release, and when the plan does not allow
		 * rolling back to this release.
		 */
		available: boolean;
		/**
		 * When this release's code stops being kept, counted from the moment it stopped being the active
		 * release. `null` for the active release and when no code was kept.
		 */
		expires_at: ISODateString | null;
		/** The release this one restores, when `source` is `rollback`. `null` otherwise. */
		from: SnowFlake | null;
	};
	/** `true` when a crash log was recorded for this release. The log can still expire; see the log endpoint. */
	has_log: boolean;
	/**
	 * Time, in milliseconds, the platform took to install dependencies, build and start this release.
	 * `null` when the release was not deployed with a build (for example, files committed without a restart).
	 */
	build_duration_ms: number | null;
	/**
	 * When the application first started with this release's code. `null` while the code is in the
	 * application folder but the application has not been started with it yet (for example, files
	 * committed without a restart): changes only take effect after a restart.
	 */
	first_started_at: ISODateString | null;
	created_at: ISODateString;
}

/**
 * Crash log of a release. `content` is `null` when there is no log or it has expired.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/releases/log
 */
export interface APIApplicationReleaseLog {
	content: string | null;
}

/**
 * How an environment variable changes if a rollback restores the release's variables, compared with the
 * active release. `added` = the release has it and the active release does not; `removed` = the active
 * release has it and the release does not; `modified` = both have it with different values.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/releases/rollback-preview
 */
export type ApplicationEnvironmentChange = "added" | "modified" | "removed";
export const ApplicationEnvironmentChange = {
	ADDED: "added",
	MODIFIED: "modified",
	REMOVED: "removed",
} as const;

/**
 * What a rollback to a release would change in the environment variables. Only variable names and the
 * kind of change are returned, never values. Sorted by key. Empty when the release has no stored variables.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/releases/rollback-preview
 */
export interface APIApplicationRollbackPreview {
	environment_changes: { key: string; change: ApplicationEnvironmentChange }[];
}

/**
 * Lifecycle of a custom domain. `pending`: waiting for the DNS records; `active`: serving the
 * application; `moved`: the domain stopped pointing at the platform; `deleted`: removed.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/domains/list
 */
export type APIApplicationDomainStatus = "pending" | "active" | "moved" | "deleted";
export const APIApplicationDomainStatus = {
	PENDING: "pending",
	ACTIVE: "active",
	MOVED: "moved",
	DELETED: "deleted",
} as const satisfies Record<string, APIApplicationDomainStatus>;

/**
 * Certificate state of a custom domain.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/domains/list
 */
export type APIApplicationDomainSslStatus = "pending" | "active" | "failed";
export const APIApplicationDomainSslStatus = {
	PENDING: "pending",
	ACTIVE: "active",
	FAILED: "failed",
} as const satisfies Record<string, APIApplicationDomainSslStatus>;

/**
 * HTTP status of a domain-to-domain redirect.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/domains/create
 */
export type APIApplicationDomainRedirectStatus = 301 | 302 | 307 | 308;
export const APIApplicationDomainRedirectStatus = {
	MOVED_PERMANENTLY: 301,
	FOUND: 302,
	TEMPORARY_REDIRECT: 307,
	PERMANENT_REDIRECT: 308,
} as const satisfies Record<string, APIApplicationDomainRedirectStatus>;

/**
 * A custom domain of an application.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/domains/list
 */
export interface APIApplicationDomain {
	id: string;
	/** Lowercase hostname (`my-app.com.br`). */
	hostname: string;
	/** `true` when the hostname is a registrable root domain; the root needs a DNS provider that flattens `CNAME`. */
	apex: boolean;
	/** Id of the main domain when this one is its automatic `www`/root companion; `null` otherwise. */
	companion_of: string | null;
	/** Id of another domain of the same application this one redirects to; `null` = serves the application. */
	redirect_to: string | null;
	/** Status code of the redirect. `308` when `redirect_to` is `null`. */
	redirect_status: APIApplicationDomainRedirectStatus;
	/** Literal path added in front of every request (`/api`): starts with `/`, no trailing `/`. `null` = none. */
	path_prefix: string | null;
	/** Port of the application that serves this domain, 1 to 65535. Defaults to `80`. */
	port: number;
	status: APIApplicationDomainStatus;
	ssl_status: APIApplicationDomainSslStatus;
	created_at: ISODateString;
}

/**
 * DNS record the user must create at their DNS provider for a custom domain.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/domains/dns
 */
export interface APIApplicationDomainDnsRecord {
	type: "CNAME" | "TXT";
	name: string;
	value: string;
	status: "pending" | "active";
}

/**
 * Link that configures the DNS records of a custom domain at the DNS provider.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/domains/connect
 */
export interface APIApplicationDomainConnect {
	url: string;
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
	/**
	 * Branch the auto-deploy reacts to. `null` for a link created without one: it reacts to a push on
	 * `main` or `master`, as it always did.
	 */
	branch: string | null;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/network/subdomain
 */
export interface APIApplicationSubdomain {
	/** Full hostname (`my-app.vertraweb.app`). */
	subdomain: string;
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
	/** Hostnames of the custom domains. */
	domains: string[];
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
	/** Detected language; `null` when it could not be determined. */
	language: ApplicationLanguage | null;
	/** Detected main file; `null` when none was found. */
	main: string | null;
	/** Recommended version for the detected language; `null` when there is none. */
	version: string | null;
	/** Whether the project has a manifest file at the root. */
	has_manifest: boolean;
	/** Other languages with a manifest at the root when detection is ambiguous; empty otherwise. */
	candidates: ApplicationLanguage[];
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
 * `install_note:started`, `deploy_note:failed:<release_id>`, `deploy_note:rollback:<from>:<to>`,
 * `deploy_note:discarded:<release_id>` (Enterprise zero-downtime: the new release did not become healthy
 * and was dropped; the previous one keeps running), where `<from>` and `<to>` identify the releases
 * involved); `heartbeat` = keep-alive, no content.
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
