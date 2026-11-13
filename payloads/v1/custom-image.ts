import type { ISODateString } from "../../common/v1";

/**
 * State of the latest build of a custom Docker image. A failed rebuild does not change the
 * current version: the apps keep running the last good one.
 * @see https://docs.vertracloud.app/api-reference/endpoint/images/get
 */
export type CustomImageStatus = "building" | "success" | "failed";
export const CustomImageStatus = {
	/** A build is running. Rebuilds are refused (`IMAGE_BUILD_IN_PROGRESS`) until it ends. */
	Building: "building",
	/** The latest build finished and the image can be used to create apps. */
	Success: "success",
	/** The latest build failed; see `APICustomImage.error` and the build log. */
	Failed: "failed",
} as const;

/**
 * Stage of a build that is running. Only meaningful while `APICustomImage.status` is `building`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/images/get
 */
export type CustomImageBuildPhase = "queued" | "starting" | "building" | "verifying";
export const CustomImageBuildPhase = {
	/** Waiting in the build queue; see `APICustomImage.queue_position`. */
	Queued: "queued",
	/** The build is starting. */
	Starting: "starting",
	/** The `Dockerfile` is being built. */
	Building: "building",
	/** The image was built and the platform is checking and measuring it. */
	Verifying: "verifying",
} as const;

/**
 * Who runs a step of the build log: the platform (queue, preparation, context, push, verification) or the user's `Dockerfile`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/images/logs
 */
export type CustomImageLogStepKind = "platform" | "dockerfile";
export const CustomImageLogStepKind = {
	/** A step run by the platform. Its `step_id` is one of `CustomImageLogPlatformStep`. */
	Platform: "platform",
	/** A step of the user's `Dockerfile`; `name` is the instruction as the builder reports it. */
	Dockerfile: "dockerfile",
} as const;

/**
 * `step_id` of the steps the platform itself reports, in the order they happen.
 * @see https://docs.vertracloud.app/api-reference/endpoint/images/logs
 */
export type CustomImageLogPlatformStep = "queue" | "prepare" | "context" | "push" | "verify" | "done";
export const CustomImageLogPlatformStep = {
	/** Waiting in the build queue. */
	Queue: "queue",
	/** Preparing the build. */
	Prepare: "prepare",
	/** Downloading and validating the build context. */
	Context: "context",
	/** Sending the image to the registry. */
	Push: "push",
	/** Checking the image and measuring its size. */
	Verify: "verify",
	/** Closing the build. */
	Done: "done",
} as const;

/** Progress of one step of the build log. */
export type CustomImageLogStepStatus = "pending" | "running" | "cached" | "succeeded" | "failed";
export const CustomImageLogStepStatus = {
	Pending: "pending",
	Running: "running",
	/** The step was served from the build cache (`Dockerfile` steps only). */
	Cached: "cached",
	Succeeded: "succeeded",
	Failed: "failed",
} as const;

/**
 * Data of the `step` event of the build log stream. It is sent again each time the step changes.
 * @see https://docs.vertracloud.app/api-reference/endpoint/images/logs
 */
export interface APICustomImageLogStep {
	/** Identifies the step. For `platform` steps it is a `CustomImageLogPlatformStep`; for `dockerfile` steps it is assigned by the builder. */
	step_id: string;
	kind: CustomImageLogStepKind;
	/** Readable name of the step. */
	name: string;
	status: CustomImageLogStepStatus;
	/** Absent until the step starts. */
	started_at?: ISODateString;
	/** Absent until the step ends. */
	finished_at?: ISODateString;
}

/**
 * Data of the `log` event of the build log stream: one line of text.
 * @see https://docs.vertracloud.app/api-reference/endpoint/images/logs
 */
export interface APICustomImageLogLine {
	/** Position of the line in the build log, from 0; use it to drop lines repeated after a reconnection. */
	seq: number;
	/** Unix time of the line, in milliseconds. */
	ts: number;
	/** Step the line belongs to; `null` when it belongs to none. */
	step_id: string | null;
	text: string;
}

/**
 * Data of the `end` event of the build log stream, sent once when the build is over.
 * @see https://docs.vertracloud.app/api-reference/endpoint/images/logs
 */
export interface APICustomImageLogEnd {
	status: CustomImageStatus;
	/** `true` when the log hit the size limit and its tail was dropped. */
	truncated: boolean;
}

/**
 * What triggered the build that produced an image version.
 * @see https://docs.vertracloud.app/api-reference/endpoint/images/versions
 */
export type CustomImageBuildSource = "upload" | "commit" | "github";
export const CustomImageBuildSource = {
	/** A full build context uploaded by the user (create or rebuild). */
	Upload: "upload",
	/** Files committed on top of the current build context (panel, CLI or GitHub Action). */
	Commit: "commit",
	/** A push to the linked GitHub repository and branch. */
	GitHub: "github",
} as const;

/**
 * Who owns an image. `system` images are provided by the platform and cannot be changed or deleted by users.
 * @see https://docs.vertracloud.app/api-reference/endpoint/images/get
 */
export type CustomImageOwner = "account" | "system";
export const CustomImageOwner = {
	Account: "account",
	System: "system",
} as const;

/**
 * Where an image comes from. `own` is built from your own context; `template_copy` is the slot an image of a template takes
 * in your account: it cannot be rebuilt or edited, and it goes away when the last application that uses it does.
 * @see https://docs.vertracloud.app/api-reference/endpoint/images/get
 */
export type CustomImageKind = "own" | "template_copy";
export const CustomImageKind = {
	Own: "own",
	TemplateCopy: "template_copy",
} as const;

/**
 * Readable origin of an image that came from a template.
 * @see https://docs.vertracloud.app/api-reference/endpoint/images/get
 */
export interface APICustomImageOrigin {
	template_id: string;
	/** Name of the template, as shown in the list. */
	template_name: { "pt-br": string; en?: string; es?: string };
	/** Author of the template as shown to you; `null` for a template of the platform. */
	author_display: string | null;
}

/**
 * Finding of the `Dockerfile` check. Refusals block the build; warnings do not.
 * @see https://docs.vertracloud.app/api-reference/endpoint/images/check
 */
export type DockerfileIssueCode = "missing_dockerfile" | "syntax_frontend" | "run_security_insecure" | "run_network_host" | "mount_ssh" | "mount_secret" | "workdir_app" | "env_file_in_context" | "copy_env_file" | "volume_outside_app" | "volume_refused";
export const DockerfileIssueCode = {
	/** Refusal: there is no file named exactly `Dockerfile` at the root of the context. */
	MISSING_DOCKERFILE: "missing_dockerfile",
	/** Refusal: a `# syntax=` directive points to something other than the official Dockerfile frontend. */
	SYNTAX_FRONTEND: "syntax_frontend",
	/** Refusal: `RUN --security=insecure`. */
	RUN_SECURITY_INSECURE: "run_security_insecure",
	/** Refusal: `RUN --network=host`. */
	RUN_NETWORK_HOST: "run_network_host",
	/** Refusal: `--mount=type=ssh`. */
	MOUNT_SSH: "mount_ssh",
	/** Refusal: `--mount=type=secret`. */
	MOUNT_SECRET: "mount_secret",
	/** Warning: the final stage of the `Dockerfile` sets `WORKDIR` at `/app` or below. `/app` is the app's persistent disk, mounted over the image at runtime, so files the image puts there are hidden; use another directory, such as `/srv`. */
	WORKDIR_APP: "workdir_app",
	/** Warning: `.env*` files in the context. They are removed before the build; their keys become app variables. */
	ENV_FILE_IN_CONTEXT: "env_file_in_context",
	/** Warning: `COPY` or `ADD` of a `.env` file. The file is not in the build context, so the build fails on that line. */
	COPY_ENV_FILE: "copy_env_file",
	/** Warning: `VOLUME` outside `/app`. At runtime that path is a small temporary folder (64 MB, erased on restart); only `/app` keeps data. */
	VOLUME_OUTSIDE_APP: "volume_outside_app",
	/** Refusal: `VOLUME` at `/app` or below it (`/app` is already the application's persistent disk), or with a relative path. */
	VOLUME_REFUSED: "volume_refused",
} as const;

/**
 * One finding of the `Dockerfile` check.
 * @see https://docs.vertracloud.app/api-reference/endpoint/images/check
 */
export interface DockerfileIssue {
	code: DockerfileIssueCode;
	/** 1-based line of the `Dockerfile`; `null` when the finding is not tied to a line (for example, a missing file). */
	line: number | null;
}

/**
 * The `details` of the `DOCKERFILE_REFUSED` error (HTTP 400): the findings that blocked the build, with the same shape
 * as `APIDockerfileCheck.refusals`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/images/create
 */
export interface APIDockerfileRefusedDetails {
	issues: DockerfileIssue[];
}

/**
 * The `details` of the `IMAGE_BUILD_RATE_LIMITED` error (HTTP 429): which limit was reached and when a build fits again.
 * Every build that enters the queue counts, including those that later fail or are cancelled.
 */
export interface APIImageBuildRateLimitedDetails {
	/** The limit that was reached. */
	limit: number;
	/** Rolling window of the limit: 24 hours (`day`) or 1 hour (`hour`). */
	window: "day" | "hour";
	/** `owner` = builds of the account or workspace owner per day; `image` = builds of this image per hour. */
	scope: "owner" | "image";
	/** ISO 8601 time at which the oldest counted build leaves the window. */
	retry_at: string;
}

/**
 * Result of checking a `Dockerfile` and its context file list, before building.
 * @see https://docs.vertracloud.app/api-reference/endpoint/images/check
 */
export interface APIDockerfileCheck {
	/** Findings that block the build. */
	refusals: DockerfileIssue[];
	/** Findings that do not block the build. */
	warnings: DockerfileIssue[];
	/** Port suggested for the app: the first `EXPOSE` of the `Dockerfile`, or `80` when there is none. */
	suggested_port: number;
}

/**
 * An application that runs from a custom image.
 * @see https://docs.vertracloud.app/api-reference/endpoint/images/get
 */
export interface APICustomImageApp {
	id: string;
	name: string;
	/** Image version the app is running; `null` when it has not started on any version yet. */
	version_id: string | null;
	/** `true` when the image has a newer version than the one the app runs. The app moves to it on the next restart or deploy asked by the user. */
	outdated: boolean;
}

/**
 * A custom Docker image: a build context with a `Dockerfile`, built in isolation by the platform.
 * @see https://docs.vertracloud.app/api-reference/endpoint/images/get
 */
export interface APICustomImage {
	id: string;
	name: string;
	/** Free-text description, up to 128 characters; `null` when the image has none. */
	description: string | null;
	owner: CustomImageOwner;
	/** `own` (default) or `template_copy`. Absent in older payloads, where it means `own`. */
	kind?: CustomImageKind;
	/** Template the image came from when `kind` is `template_copy`; `null` (or absent) otherwise. */
	origin?: APICustomImageOrigin | null;
	/** State of the latest build. */
	status: CustomImageStatus;
	/** Stage of the build in progress; `null` when `status` is not `building`. */
	build_phase: CustomImageBuildPhase | null;
	/** Place in the build queue (1 = next); `null` unless `build_phase` is `queued`. */
	queue_position: number | null;
	/** When the build in progress entered the queue; `null` when `status` is not `building`. */
	queued_at: ISODateString | null;
	/** Readable reason of the latest failed build; `null` when it did not fail. */
	error: string | null;
	/** Code of the latest failed build (e.g. `IMAGE_BUILDER_UNAVAILABLE`, `BUILD_FAILED`); `null` when it did not fail. */
	error_code: string | null;
	/** Digest (`sha256:...`) of the current version; `null` while no build has succeeded. */
	digest: string | null;
	/** Size of the current version, uncompressed, in bytes; `null` while no build has succeeded. */
	uncompressed_bytes: number | null;
	/** Number of layers of the current version; `null` while no build has succeeded. */
	layer_count: number | null;
	/** Port suggested for a new app on this image: the first `EXPOSE` of the `Dockerfile` of the latest build context, or `80`; `null` for an image created before this field existed. */
	suggested_port: number | null;
	/** Applications created from this image. */
	apps: APICustomImageApp[];
	/** Linked GitHub repository and branch; `null` when the image is not linked. */
	github: { repository: string; branch: string } | null;
	/** When `true`, every successful build of the image restarts the image's running apps on the new version (stopped apps are not started). Images created from a GitHub repository start with `true`, the others with `false`. */
	auto_update_apps: boolean;
	/** Warnings of the `Dockerfile` check of the latest build (same codes as `APIDockerfileCheck.warnings`); empty when there are none or the image was built before this field existed. */
	warnings: DockerfileIssue[];
	/** Current version of the image; `null` while no build has succeeded. */
	current_version_id: string | null;
	created_at: ISODateString;
	updated_at: ISODateString;
}

/**
 * A successful build of an image. Each success is a new version of the same image.
 * @see https://docs.vertracloud.app/api-reference/endpoint/images/versions
 */
/**
 * A reserved direct upload of a build context (`POST /v1/images/uploads`). Send the ZIP with `PUT` to `url` with exactly
 * `headers`: the URL only accepts the declared file (its size and SHA-256 are signed) until `expires_at`. Then use `upload_id`
 * once, in `POST /v1/images` or `PUT /v1/images/:image_id`.
 */
export interface APICustomImageUpload {
	upload_id: string;
	url: string;
	headers: Record<string, string>;
	/** ISO 8601. */
	expires_at: string;
}

export interface APICustomImageVersion {
	id: string;
	/** Digest (`sha256:...`) of this version. */
	digest: string;
	source: CustomImageBuildSource;
	/** Message sent with the commit or upload; `null` when there is none. */
	message: string | null;
	created_at: ISODateString;
	/** `true` when at least one application is running this version. */
	in_use: boolean;
}
