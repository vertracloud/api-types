import type {
	APIApplication,
	APIPaginatedPayload,
	APIPayload,
	APITemplate,
	APITemplateCategoryCount,
	APITemplateDeploy,
	APITemplateDetail,
	APITemplateI18nText,
	APITemplateInputValue,
	APITemplatePermissions,
	APITemplateRam,
	APITemplateShareLink,
	APITemplateShareLinkCreated,
	APITemplateSharePreview,
	APITemplateUpdateInfo,
	APITemplateValidation,
	APITemplateVersion,
	RESTAPIWorkspaceQuery,
	SnowFlake,
	StackNetworkMode,
	TemplateCategory,
	TemplateOrigin,
	TemplateReportReason,
	TemplateShareLinkMode,
	WorkspaceResourceType,
} from "../../v1";

// ---------------------------------------------------------------------------
// Catalog
// ---------------------------------------------------------------------------

/** Order of the template list. */
export type RESTGetAPITemplatesSort = "recommended" | "popular" | "newest" | "name";
export const RESTGetAPITemplatesSort = {
	Recommended: "recommended",
	Popular: "popular",
	Newest: "newest",
	Name: "name",
} as const;

/**
 * Query of `GET /v1/templates`. The public catalog needs no authentication; with a session or an API key (`templates:read`) the answer also
 * includes your private templates and the `account` context of each template. Limited per IP.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/list
 */
export interface RESTGetAPITemplatesQuery extends RESTAPIWorkspaceQuery {
	/** Text to look for in the name, description and tags. */
	search?: string;
	category?: TemplateCategory;
	/** `private` lists your private templates (and the ones of `workspace_id`); it needs authentication. */
	origin?: TemplateOrigin;
	tag?: string;
	/** `true` keeps only the templates that fit your account right now. Needs authentication. */
	fits?: boolean;
	/** Default `recommended`. */
	sort?: RESTGetAPITemplatesSort;
	page?: number;
	limit?: number;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/list
 */
export type RESTGetAPITemplatesResponse = APIPaginatedPayload<APITemplate>;

/**
 * `GET /v1/templates/categories` — the public catalog, with the number of templates per category.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/categories
 */
export type RESTGetAPITemplateCategoriesResponse = APIPayload<APITemplateCategoryCount[]>;

/**
 * Query of `GET /v1/templates/:template_id` (the id or the slug). Public templates need no authentication.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/get
 */
export type RESTGetAPITemplateQuery = RESTAPIWorkspaceQuery;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/get
 */
export type RESTGetAPITemplateResponse = APIPayload<APITemplateDetail>;

/**
 * `GET /v1/templates/:template_id/versions` — newest first.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/versions
 */
export type RESTGetAPITemplateVersionsResponse = APIPayload<APITemplateVersion[]>;

// ---------------------------------------------------------------------------
// Use a template
// ---------------------------------------------------------------------------

/** What the user chooses for one service of the template. */
export interface RESTPostAPITemplateDeployServiceOptions {
	/** Name of the application or database; default: the name of the deploy followed by the service id. */
	name?: string;
	/** Memory in MB, within what `permissions.ram` allows. */
	ram?: number;
	/** For an application with web: `"random"` or the subdomain you want. */
	subdomain?: string;
}

/**
 * Headers of the deploy routes.
 */
export interface RESTPostAPITemplateDeployHeaders {
	/**
	 * Makes the call safe to repeat: the same key with the same request returns the same job instead of creating a second set of
	 * resources. The same key with a different request returns `IDEMPOTENCY_KEY_CONFLICT`. Recommended for every call.
	 */
	"Idempotency-Key"?: string;
}

/**
 * Body of `POST /v1/templates/:template_id/deploy` (JSON). Creates, as one operation, everything the template describes: if any step fails, all
 * that the job created is removed. The call returns `202` with the job; follow it with `GET /v1/template-deploys/:deploy_id`
 * or its event stream.
 *
 * Error codes: `TEMPLATE_NOT_FOUND`, `TEMPLATE_DEPRECATED`, `TEMPLATE_INPUT_INVALID`, `TEMPLATE_PLAN_REQUIRED`,
 * `TEMPLATE_RAM_INSUFFICIENT`, `TEMPLATE_IMAGE_SLOTS_EXHAUSTED`, `TEMPLATE_VERSION_NOT_SELECTABLE`, `TEMPLATE_DEPLOY_IN_PROGRESS`,
 * `IDEMPOTENCY_KEY_CONFLICT`, `MAX_APPS_REACHED`, `MAX_DATABASES_REACHED`, `WORKSPACE_OWNER_ONLY` (only the owner of a workspace uses templates in it),
 * `DEPLOY_RATE_LIMITED`.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/deploy
 */
export interface RESTPostAPITemplateDeployBody {
	/** Name of the application, or of the stack when the template has more than one service. */
	name: string;
	description?: string;
	/** A version number. Only valid when the template allows choosing versions; default: the latest. */
	version?: string;
	/** Answers to the questions of the template, by question id. */
	inputs?: Record<string, APITemplateInputValue>;
	/** Choices per service, by service id. */
	services?: Record<string, RESTPostAPITemplateDeployServiceOptions>;
	/** Only `public` is available for now; `private` answers 400 `STACK_NETWORK_MODE_UNAVAILABLE`. */
	network_mode?: StackNetworkMode;
	/** Workspace that will own what is created. */
	workspace_id?: string;
	/** Folder to put the application or stack in. */
	folder_id?: string;
}

/**
 * `202` — the job (`status: "queued"`), or `200` with the same job when the `Idempotency-Key` was already used.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/deploy
 */
export type RESTPostAPITemplateDeployResponse = APIPayload<APITemplateDeploy>;

/**
 * `GET /v1/template-deploys/:deploy_id`. Outputs marked `once` come back on the first read of a finished job and are `null` afterwards.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/deploy-status
 */
export type RESTGetAPITemplateDeployResponse = APIPayload<APITemplateDeploy>;

/**
 * `GET /v1/template-deploys/:deploy_id/events` is a **Server-Sent Events** stream, not JSON, with the same shape as the stream of the
 * build log of an image. A `progress` event carries one `APITemplateDeployEvent` as JSON every time the job changes step, starting with
 * the current state; the `end` event closes the stream. Outputs are never sent on the stream: read the job at the end.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/deploy-events
 */
export type RESTGetAPITemplateDeployEventsResponse = string;

// ---------------------------------------------------------------------------
// Private templates
// ---------------------------------------------------------------------------

/**
 * Body of `POST /v1/templates` — **`multipart/form-data`**. `manifest` is a text field with the JSON-serialized manifest. Each `code`
 * service of the manifest needs its source as a ZIP file part named `sources[<service_id>]`; `image` services refer to an image of your
 * account by id in `source.image`. Creates the template with its first version. Only the owner of a workspace creates templates in it.
 * Plans that can create custom images can create templates.
 *
 * Error codes: `TEMPLATE_MANIFEST_INVALID`, `TEMPLATE_SOURCE_REQUIRED`, `TEMPLATE_SLUG_TAKEN`, `TEMPLATE_PRIVATE_LIMIT_REACHED`,
 * `PLAN_DOES_NOT_SUPPORT_CUSTOM_IMAGES`, `IMAGE_NOT_FOUND`, `WORKSPACE_OWNER_ONLY`.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/create
 */
export interface RESTPostAPITemplateBody {
	/** JSON-serialized `APITemplateManifest`. */
	manifest: string;
	/** Message of the first version, JSON-serialized `APITemplateI18nText`. */
	changelog?: string;
	/** Workspace that will own the template. */
	workspace_id?: string;
	/** ZIP of the code of each `code` service, one part per service. */
	[source: `sources[${string}]`]: unknown;
}

/**
 * `201` — the new template.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/create
 */
export type RESTPostAPITemplateResponse = APIPayload<APITemplateDetail>;

/** What happens to a variable of the app when it becomes a template. */
export type TemplateEnvReviewMode = "question" | "keep" | "generate" | "hidden" | "omit";
export const TemplateEnvReviewMode = {
	/** Becomes a question the user answers; the value is not copied. */
	Question: "question",
	/** The value is copied into the template: only for variables that are not secrets. */
	Keep: "keep",
	/** Becomes a secret the platform generates for each user. */
	Generate: "generate",
	/** The value is copied but hidden from whoever uses the template (a closed template). */
	Hidden: "hidden",
	/** Left out of the template. */
	Omit: "omit",
} as const;

/**
 * Review of one variable when saving an app as a template.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/create-from-app
 */
export interface RESTPostAPITemplateEnvReview {
	key: string;
	mode: TemplateEnvReviewMode;
	/** Label of the question, with `question` and `generate`. */
	label?: APITemplateI18nText;
	help?: APITemplateI18nText;
	/** For `generate`: how it is generated, `random:<n>` or `uuid`. */
	generate?: string;
}

/**
 * A variable of an app as the review screen offers it.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/draft
 */
export interface APITemplateDraftEnv {
	key: string;
	/** `true` when the name looks like a secret (`*_KEY`, `*_TOKEN`, `*_SECRET`, `PASSWORD`...): it should not be copied. */
	looks_secret: boolean;
	/** What the platform suggests: secret-looking variables become questions, the others are kept. */
	suggested_mode: TemplateEnvReviewMode;
}

/**
 * A file or folder of the `/app` of an application as the review screen offers it.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/draft
 */
export interface APITemplateDraftPath {
	path: string;
	type: "file" | "directory";
	/** Whether it goes into the template by default. */
	selected: boolean;
	/** Why it is not selected by default; `null` when it is. */
	reason: "env_file" | "platform_folder" | "dependencies" | "database_file" | "uploads" | null;
}

/**
 * What the platform proposes when an application (or the members of a stack) becomes a template. Values are never included.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/draft
 */
export interface APITemplateDraftMember {
	/** Application or database id. */
	resource_id: SnowFlake;
	resource_type: Extract<WorkspaceResourceType, "application" | "database">;
	name: string;
	/** Memory of the member, a good starting point for `ram`. */
	ram: APITemplateRam;
	/** Variables of an application. */
	env: APITemplateDraftEnv[];
	/** Files and folders of the `/app` of an application with code; empty for an image and for a database. */
	paths: APITemplateDraftPath[];
}

/**
 * `GET /v1/templates/from-app/:app_id/draft` and `GET /v1/templates/from-stack/:stack_id/draft`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/draft
 */
export interface APITemplateDraft {
	members: APITemplateDraftMember[];
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/draft
 */
export type RESTGetAPITemplateDraftResponse = APIPayload<APITemplateDraft>;

/**
 * What to save of one member of the application or stack.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/create-from-app
 */
export interface RESTPostAPITemplateFromMember {
	/** Id of the application or database. */
	resource_id: SnowFlake;
	/** Id of the service in the manifest. */
	service_id: string;
	/** A review for every variable of the application; a variable without review is left out. */
	env?: RESTPostAPITemplateEnvReview[];
	/** Paths of the `/app` that go into the template (code applications only). `.env*`, the platform folder and dependencies cannot be included. */
	paths?: string[];
	ram?: APITemplateRam;
}

/**
 * Body of `POST /v1/templates/from-app/:app_id` (JSON): saves an application as a private template. Refused for an application that came
 * from a share link (`TEMPLATE_SAVE_NOT_ALLOWED`) and for an application of a closed template (`TEMPLATE_CLOSED`).
 *
 * Error codes: `TEMPLATE_SAVE_NOT_ALLOWED`, `TEMPLATE_CLOSED`, `TEMPLATE_SLUG_TAKEN`, `TEMPLATE_PRIVATE_LIMIT_REACHED`, `TEMPLATE_MANIFEST_INVALID`,
 * `PLAN_DOES_NOT_SUPPORT_CUSTOM_IMAGES`, `APP_NOT_FOUND`, `WORKSPACE_OWNER_ONLY`.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/create-from-app
 */
export interface RESTPostAPITemplateFromAppBody {
	/** Slug of the template. */
	id: string;
	name: APITemplateI18nText;
	description: APITemplateI18nText;
	category: TemplateCategory;
	tags?: string[];
	/** Default `1.0.0`. */
	version?: string;
	permissions?: APITemplatePermissions;
	/** What to save of the application. */
	member: RESTPostAPITemplateFromMember;
	/** Workspace that will own the template. */
	workspace_id?: string;
}

/**
 * `201`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/create-from-app
 */
export type RESTPostAPITemplateFromAppResponse = APIPayload<APITemplateDetail>;

/**
 * Body of `POST /v1/templates/from-stack/:stack_id` (JSON): saves a stack as a private template, one service per member.
 * Same errors as saving an application.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/create-from-stack
 */
export interface RESTPostAPITemplateFromStackBody {
	id: string;
	name: APITemplateI18nText;
	description: APITemplateI18nText;
	category: TemplateCategory;
	tags?: string[];
	version?: string;
	permissions?: APITemplatePermissions;
	/** What to save of each member of the stack. */
	members: RESTPostAPITemplateFromMember[];
	workspace_id?: string;
}

/**
 * `201`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/create-from-stack
 */
export type RESTPostAPITemplateFromStackResponse = APIPayload<APITemplateDetail>;

/**
 * Body of `PATCH /v1/templates/:template_id` (JSON): changes the details of a private template. A new manifest is a new version.
 * At least one field is required.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/update
 */
export interface RESTPatchAPITemplateBody {
	name?: APITemplateI18nText;
	description?: APITemplateI18nText;
	category?: TemplateCategory;
	tags?: string[];
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/update
 */
export type RESTPatchAPITemplateResponse = APIPayload<APITemplateDetail>;

/**
 * `DELETE /v1/templates/:template_id`. Removes a private template and revokes its links. What was already created from it keeps running and
 * is told the template was removed.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/delete
 */
export type RESTDeleteAPITemplateResponse = APIPayload<null>;

/**
 * Body of `PUT /v1/templates/:template_id/github` (JSON). Links the template to a repository that has the manifest at its root: every push to
 * the branch creates a version. The repository must be in one of your GitHub App installations.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/github-link
 */
export interface RESTPutAPITemplateGithubBody {
	/** Repository, as `owner/name`. */
	repository: string;
	/** Default: the default branch of the repository. */
	branch?: string;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/github-link
 */
export type RESTPutAPITemplateGithubResponse = APIPayload<APITemplateDetail>;

/**
 * `DELETE /v1/templates/:template_id/github`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/github-unlink
 */
export type RESTDeleteAPITemplateGithubResponse = APIPayload<APITemplateDetail>;

/**
 * Body of `POST /v1/templates/:template_id/versions` — **`multipart/form-data`**, like the creation of the template. The version number of
 * the manifest must be higher than the current one.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/new-version
 */
export interface RESTPostAPITemplateVersionBody {
	/** JSON-serialized `APITemplateManifest`. */
	manifest: string;
	/** JSON-serialized `APITemplateI18nText`. */
	changelog?: string;
	[source: `sources[${string}]`]: unknown;
}

/**
 * `201`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/new-version
 */
export type RESTPostAPITemplateVersionResponse = APIPayload<APITemplateVersion>;

/**
 * Body of `POST /v1/templates/validate` (JSON). Checks a manifest and creates nothing. `manifest` is any JSON value, so a manifest that
 * is not even an object is reported as findings instead of a malformed request.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/validate
 */
export interface RESTPostAPITemplateValidateBody {
	manifest: unknown;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/validate
 */
export type RESTPostAPITemplateValidateResponse = APIPayload<APITemplateValidation>;

// ---------------------------------------------------------------------------
// Share links
// ---------------------------------------------------------------------------

/**
 * Body of `POST /v1/templates/:template_id/share-links` (JSON). `full_copy` needs `permissions.share.full_copy` in the template and is not
 * compatible with a closed template.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/share-links/create
 */
export interface RESTPostAPITemplateShareLinkBody {
	/** Default `use`. */
	mode?: TemplateShareLinkMode;
	/** Maximum number of uses; default: no limit. */
	max_uses?: number;
	/** Days until the link expires; default: it does not expire. */
	expires_in_days?: number;
}

/**
 * `201` — the link with its token. The token is shown only now.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/share-links/create
 */
export type RESTPostAPITemplateShareLinkResponse = APIPayload<APITemplateShareLinkCreated>;

/**
 * `GET /v1/templates/:template_id/share-links`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/share-links/list
 */
export type RESTGetAPITemplateShareLinksResponse = APIPayload<APITemplateShareLink[]>;

/**
 * `DELETE /v1/templates/:template_id/share-links/:link_id`. Revokes the link: no new use, and no more updates offered. What was already
 * created from it is not affected.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/share-links/revoke
 */
export type RESTDeleteAPITemplateShareLinkResponse = APIPayload<APITemplateShareLink>;

/**
 * `GET /v1/share/templates/:token` — what the link gives, before using it. Works without authentication; with it the answer includes the
 * `account` context. Limited per IP.
 *
 * Error codes: `SHARE_LINK_NOT_FOUND`, `SHARE_LINK_REVOKED`, `SHARE_LINK_EXPIRED`, `SHARE_LINK_EXHAUSTED`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/share-links/preview
 */
export type RESTGetAPITemplateSharePreviewResponse = APIPayload<APITemplateSharePreview>;

/**
 * Body of `POST /v1/share/templates/:token/deploy` (JSON) for a link in `use` mode: the same as using a catalog template, without a choice of
 * version. A `full_copy` link is refused here: use `.../copy`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/share-links/deploy
 */
export type RESTPostAPITemplateShareDeployBody = Omit<RESTPostAPITemplateDeployBody, "version">;

/**
 * `202` — the job.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/share-links/deploy
 */
export type RESTPostAPITemplateShareDeployResponse = APIPayload<APITemplateDeploy>;

/**
 * Body of `POST /v1/share/templates/:token/copy` (JSON) for a link in `full_copy` mode: gives you a private template of your own, independent of the
 * author. It counts against your limit of private templates.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/share-links/copy
 */
export interface RESTPostAPITemplateShareCopyBody {
	/** Workspace that will own the copy. */
	workspace_id?: string;
}

/**
 * `201`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/share-links/copy
 */
export type RESTPostAPITemplateShareCopyResponse = APIPayload<APITemplateDetail>;

/**
 * Body of `POST /v1/share/templates/:token/report` and of `POST /v1/apps/:id/template/report` (JSON). Reports the template to the platform.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/share-links/report
 */
export interface RESTPostAPITemplateReportBody {
	reason: TemplateReportReason;
	/** Up to 1,000 characters. */
	details?: string;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/share-links/report
 */
export type RESTPostAPITemplateReportResponse = APIPayload<null>;

// ---------------------------------------------------------------------------
// Updates and detaching
// ---------------------------------------------------------------------------

/**
 * `GET /v1/apps/:id/template/update` and `GET /v1/stacks/:stack_id/template/update` — what updating to the latest version would do.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/update-info
 */
export type RESTGetAPITemplateUpdateInfoResponse = APIPayload<APITemplateUpdateInfo>;

/**
 * Body of `POST /v1/apps/:id/template/update` and `POST /v1/stacks/:stack_id/template/update` (JSON). Takes a safety snapshot, updates the
 * services one after the other and, if one fails, goes back to the snapshot. Never automatic: it runs only when you ask. Returns `202` with a
 * job (`kind: "update"`).
 *
 * Error codes: `TEMPLATE_UPDATE_BLOCKED` (`details.reason`), `TEMPLATE_INPUT_INVALID`, `TEMPLATE_PLAN_REQUIRED`, `TEMPLATE_RAM_INSUFFICIENT`,
 * `TEMPLATE_IMAGE_SLOTS_EXHAUSTED`, `TEMPLATE_DEPLOY_IN_PROGRESS`.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/update
 */
export interface RESTPostAPITemplateUpdateBody {
	/** Answers to the required questions the new version adds. */
	inputs?: Record<string, APITemplateInputValue>;
	/** New memory in MB per service, for the services whose minimum memory rose. */
	ram?: Record<string, number>;
}

/**
 * `202`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/update
 */
export type RESTPostAPITemplateUpdateResponse = APIPayload<APITemplateDeploy>;

/**
 * `POST /v1/apps/:id/template/detach`. The application stops receiving versions and becomes an ordinary one. Refused for an application of a
 * closed template (`TEMPLATE_CLOSED`).
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/detach
 */
export type RESTPostAPIApplicationTemplateDetachResponse = APIPayload<APIApplication>;

/**
 * Query of the detach, update and report routes of an application or stack.
 */
export type RESTAPITemplateResourceQuery = RESTAPIWorkspaceQuery;
