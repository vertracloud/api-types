import type { APICustomImage, APICustomImageVersion, APIDockerfileCheck, APIPayload } from "../../v1";

/**
 * Query accepted by every `/v1/images/:image_id/*` route (and by `GET /v1/images`) to act on a workspace image, like
 * `workspace_id` on the application routes. Absent = the caller's own images.
 */
export interface RESTAPICustomImageWorkspaceQuery {
	workspace_id?: string;
}

/**
 * Query of `GET /v1/images`: with `workspace_id`, lists the images of that workspace.
 * @see https://docs.vertracloud.app/api-reference/endpoint/images/list
 */
export type RESTGetAPICustomImagesQuery = RESTAPICustomImageWorkspaceQuery;

/**
 * `GET /v1/images`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/images/list
 */
export type RESTGetAPICustomImagesResult = APIPayload<APICustomImage[]>;

/**
 * Body of `POST /v1/images` — **`multipart/form-data`**. `file` is a file part and every other field a text field.
 *
 * The build context has **two mutually exclusive sources**: `file`, or `github_repository` (with an optional `github_branch`).
 * A repository in one of your GitHub App installations is **linked**: every push to the branch rebuilds the image. A public
 * repository outside your installations is built **once**, with no link (`github` is `null`); install the GitHub App to
 * get automatic rebuilds.
 * The context must have a file named exactly `Dockerfile` at its root (a single wrapping folder is accepted). The
 * build starts in the background and the image is returned with `status: "building"`.
 *
 * Error codes: `PLAN_DOES_NOT_SUPPORT_CUSTOM_IMAGES`, `MAX_IMAGES_REACHED`, `DOCKERFILE_NOT_FOUND`,
 * `DOCKERFILE_REFUSED`, `IMAGE_CONTEXT_TOO_LARGE`, `IMAGE_BUILDER_UNAVAILABLE`.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/images/create
 */
export interface RESTPostAPICustomImageBody {
	/** Image name: 1 to 50 characters, unique among your images. */
	name: string;
	/** Optional free-text description, up to 128 characters (the same limit as an application description). An empty value means no description. */
	description?: string;
	/** Build context: a ZIP file, up to 100 MB. Absent when the source is GitHub. */
	file?: unknown;
	/** Alternative to `file`: GitHub repository (`owner/name`) to build from. */
	github_repository?: string;
	/**
	 * Optional branch of `github_repository` to build from. When the repository is linked, it is also the branch whose pushes
	 * rebuild the image. Without it, the repository's default branch is used (`main`, `master` or whatever the repository sets).
	 */
	github_branch?: string;
	/** Workspace that will own the image. */
	workspace_id?: string;
}

/**
 * `202` — the image, with `status: "building"`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/images/create
 */
export type RESTPostAPICustomImageResult = APIPayload<APICustomImage>;

/**
 * `GET /v1/images/:image_id`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/images/get
 */
export type RESTGetAPICustomImageResult = APIPayload<APICustomImage>;

/**
 * Body of `PATCH /v1/images/:image_id` (JSON). Renames the image and/or changes its description, without building anything:
 * apps keep running and nothing is restarted. At least one field is required (otherwise `VALIDATION_ERROR`).
 *
 * Error codes: `VALIDATION_ERROR` (empty body, name out of range or already used by another of your images, description too
 * long), `IMAGE_NOT_FOUND`, `ACCESS_DENIED` (system images cannot be changed).
 * @see https://docs.vertracloud.app/api-reference/endpoint/images/update
 */
export interface RESTPatchAPICustomImageBody {
	/** New name: 1 to 50 characters, unique among the owner's images. Sending the current name is not an error. */
	name?: string;
	/** New description, up to 128 characters (free text). `null` or an empty string removes it. */
	description?: string | null;
}

/**
 * The updated image.
 * @see https://docs.vertracloud.app/api-reference/endpoint/images/update
 */
export type RESTPatchAPICustomImageResult = APIPayload<APICustomImage>;

/**
 * Body of `PUT /v1/images/:image_id` — **`multipart/form-data`**. Rebuilds the image replacing the whole build context.
 * Refused with `IMAGE_BUILD_IN_PROGRESS` while another build of the image runs. Apps are never restarted by a rebuild.
 * @see https://docs.vertracloud.app/api-reference/endpoint/images/rebuild
 */
export interface RESTPutAPICustomImageBody {
	/** New build context: a ZIP file, up to 100 MB. */
	file: unknown;
}

/**
 * `202` — the image, with `status: "building"`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/images/rebuild
 */
export type RESTPutAPICustomImageResult = APIPayload<APICustomImage>;

/**
 * Body of `DELETE /v1/images/:image_id`. Deletes the image, its versions, its context **and every application created
 * from it**. Refused with `IMAGE_BUILD_IN_PROGRESS` while a build runs.
 * @see https://docs.vertracloud.app/api-reference/endpoint/images/delete
 */
export interface RESTDeleteAPICustomImageBody {
	/** Must be equal to the image name, otherwise the call fails with `IMAGE_NAME_MISMATCH`. */
	confirm_name: string;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/images/delete
 */
export type RESTDeleteAPICustomImageResult = APIPayload<{
	/** Ids of the applications deleted together with the image. */
	deleted_apps: string[];
}>;

/**
 * `GET /v1/images/:image_id/versions`. Newest first.
 * @see https://docs.vertracloud.app/api-reference/endpoint/images/versions
 */
export type RESTGetAPICustomImageVersionsResult = APIPayload<APICustomImageVersion[]>;

/**
 * Query of `GET /v1/images/:image_id/logs`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/images/logs
 */
export interface RESTGetAPICustomImageLogsQuery extends RESTAPICustomImageWorkspaceQuery {
	/** Version whose build log to read; absent = the latest build. */
	version_id?: string;
}

/**
 * `GET /v1/images/:image_id/logs` is a **Server-Sent Events** stream, not JSON. Each `log` event carries one line of the
 * build log as text. The stream first repeats the history and then follows the build live.
 * @see https://docs.vertracloud.app/api-reference/endpoint/images/logs
 */
export type RESTGetAPICustomImageLogsResult = string;

/**
 * `GET /v1/images/:image_id/context`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/images/context
 */
export type RESTGetAPICustomImageContextResult = APIPayload<{
	/** Temporary download URL of the current build context. */
	url: string;
}>;

/**
 * Body of `PUT /v1/images/:image_id/github`. Links the image to a GitHub repository and branch: a push to that branch rebuilds it.
 * The repository must be in one of your GitHub App installations.
 * @see https://docs.vertracloud.app/api-reference/endpoint/images/github-link
 */
export interface RESTPutAPICustomImageGithubBody {
	/** Repository, as `owner/name`. */
	repository: string;
	/** Optional branch whose pushes rebuild the image. Without it, the repository's default branch is used. */
	branch?: string;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/images/github-link
 */
export type RESTPutAPICustomImageGithubResult = APIPayload<APICustomImage>;

/**
 * `DELETE /v1/images/:image_id/github`. Unlinks the image from GitHub.
 * @see https://docs.vertracloud.app/api-reference/endpoint/images/github-unlink
 */
export type RESTDeleteAPICustomImageGithubResult = APIPayload<APICustomImage>;

/**
 * Body of `POST /v1/images/check` (JSON). Checks a `Dockerfile` before building; creates nothing.
 * @see https://docs.vertracloud.app/api-reference/endpoint/images/check
 */
export interface RESTPostAPICustomImageCheckBody {
	/** Content of the `Dockerfile`. */
	dockerfile: string;
	/** Paths of the files in the build context, relative to its root. */
	files: string[];
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/images/check
 */
export type RESTPostAPICustomImageCheckResult = APIPayload<APIDockerfileCheck>;
