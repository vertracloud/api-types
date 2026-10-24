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
	/** Warning: `WORKDIR` at `/app` or below. `/app` is the app's persistent disk, so what the image puts there is hidden by the mount. */
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
	/** State of the latest build. */
	status: CustomImageStatus;
	/** Readable reason of the latest failed build; `null` when it did not fail. */
	error: string | null;
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
	/** Current version of the image; `null` while no build has succeeded. */
	current_version_id: string | null;
	created_at: ISODateString;
	updated_at: ISODateString;
}

/**
 * A successful build of an image. Each success is a new version of the same image.
 * @see https://docs.vertracloud.app/api-reference/endpoint/images/versions
 */
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
