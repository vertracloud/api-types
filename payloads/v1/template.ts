import type { APIErrorCode, ApplicationLanguage, ApplicationZeroDowntime, DatabaseType, ISODateString, SnowFlake, UserPlanName, WorkspaceResourceType } from "../../v1";
export { type APITemplateEffectivePermissions, type APITemplateI18nText, type APITemplateOrigin, TemplateOrigin } from "./template-origin";
import type { APITemplateEffectivePermissions, APITemplateI18nText, TemplateOrigin } from "./template-origin";

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

/**
 * Where a public template shows up. Private templates are only ever visible to their owner and to the links they create.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/get
 */
export type TemplateVisibility = "public" | "beta" | "hidden" | "deprecated";
export const TemplateVisibility = {
	/** Listed in the gallery. */
	Public: "public",
	/** Listed with a beta badge. */
	Beta: "beta",
	/** Not listed; reachable by its slug. */
	Hidden: "hidden",
	/** No longer maintained: out of the gallery and cannot be used for new apps. Apps that already run keep running and are told it is deprecated. */
	Deprecated: "deprecated",
} as const;

/**
 * Closed list of template categories.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/categories
 */
export type TemplateCategory = "automation" | "ai-agents" | "bots" | "apis" | "cms" | "monitoring" | "starters" | "databases" | "other";
export const TemplateCategory = {
	Automation: "automation",
	AiAgents: "ai-agents",
	Bots: "bots",
	Apis: "apis",
	Cms: "cms",
	Monitoring: "monitoring",
	Starters: "starters",
	Databases: "databases",
	Other: "other",
} as const;

/**
 * How the code of an app service reaches the container: `code` runs on one of the language runtimes, `image` runs a
 * Docker image and takes one custom image slot of the account that uses it.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/get
 */
export type TemplateSourceType = "code" | "image";
export const TemplateSourceType = {
	Code: "code",
	Image: "image",
} as const;

/**
 * Whether an app service needs web publishing.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/get
 */
export type TemplateWebMode = "required" | "optional" | "none";
export const TemplateWebMode = {
	/** The service is published on the web. */
	Required: "required",
	/** The user chooses whether to publish it. */
	Optional: "optional",
	/** The service has no web traffic (a bot or a worker). */
	None: "none",
} as const;

/**
 * Type of a question of the template (`inputs`).
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/get
 */
export type TemplateInputType = "text" | "secret" | "select" | "boolean" | "number" | "url" | "email";
export const TemplateInputType = {
	Text: "text",
	/** A secret value. With `generate`, the platform fills it when the user leaves it empty. */
	Secret: "secret",
	Select: "select",
	Boolean: "boolean",
	Number: "number",
	Url: "url",
	Email: "email",
} as const;

/**
 * Engine of a database service, by name. See {@link TEMPLATE_DATABASE_ENGINE_TYPE} for the matching `DatabaseType`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/get
 */
export type TemplateDatabaseEngine = "postgres" | "mysql" | "mongodb" | "redis";
export const TemplateDatabaseEngine = {
	Postgres: "postgres",
	Mysql: "mysql",
	Mongodb: "mongodb",
	Redis: "redis",
} as const;

/** The `DatabaseType` of a database created for each engine name used in a template. */
export const TEMPLATE_DATABASE_ENGINE_TYPE: Record<TemplateDatabaseEngine, DatabaseType> = {
	postgres: 1,
	mongodb: 2,
	redis: 3,
	mysql: 4,
};

/**
 * What a share link gives to whoever opens it. `use` creates apps from the template and keeps them updatable by the
 * author; `full_copy` gives the receiver an independent private template of their own.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/share-links/create
 */
export type TemplateShareLinkMode = "use" | "full_copy";
export const TemplateShareLinkMode = {
	Use: "use",
	FullCopy: "full_copy",
} as const;

/**
 * State of a template deploy (or update) job. A failed job has already undone everything it created.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/deploy-status
 */
export type TemplateDeployStatus = "queued" | "running" | "undoing" | "succeeded" | "failed";
export const TemplateDeployStatus = {
	Queued: "queued",
	Running: "running",
	/** A step failed and the resources the job created are being removed. */
	Undoing: "undoing",
	Succeeded: "succeeded",
	/** The job failed and nothing it created is left; see `APITemplateDeploy.error`. */
	Failed: "failed",
} as const;

/**
 * What the job does: create resources from a template, or move existing ones to a newer version.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/deploy-status
 */
export type TemplateDeployKind = "deploy" | "update";
export const TemplateDeployKind = {
	Deploy: "deploy",
	Update: "update",
} as const;

/**
 * Step of a template deploy or update, in execution order. A job lists only the steps that apply to it.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/deploy-status
 */
export type TemplateDeployStep = "validate" | "snapshot" | "network" | "databases" | "blob" | "images" | "apps" | "variables" | "certificates" | "start" | "healthcheck" | "outputs" | "rollback";
export const TemplateDeployStep = {
	/** Plan, memory, limits and answers are checked. */
	Validate: "validate",
	/** An update takes a safety snapshot of the app or stack before changing anything. */
	Snapshot: "snapshot",
	/** The stack network is prepared. */
	Network: "network",
	/** Databases are created and waited for. */
	Databases: "databases",
	/** The stack Blob folder and its restricted key are created. */
	Blob: "blob",
	/** Images are made available to the account. */
	Images: "images",
	/** Apps are created stopped. */
	Apps: "apps",
	/** Variables are resolved and saved. */
	Variables: "variables",
	/** Client certificates of the databases are delivered to the apps. */
	Certificates: "certificates",
	/** Everything is started. */
	Start: "start",
	/** The platform waits for each service to answer its health check. */
	Healthcheck: "healthcheck",
	/** The outputs shown at the end are saved. */
	Outputs: "outputs",
	/** An update that failed goes back to the safety snapshot. */
	Rollback: "rollback",
} as const;

/**
 * State of one step of a deploy job.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/deploy-status
 */
export type TemplateDeployStepStatus = "pending" | "running" | "done" | "skipped" | "failed";
export const TemplateDeployStepStatus = {
	Pending: "pending",
	Running: "running",
	Done: "done",
	/** The step does not apply to this template (for example, no database). */
	Skipped: "skipped",
	Failed: "failed",
} as const;

/**
 * Reason of a report against a template.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/share-links/report
 */
export type TemplateReportReason = "malware" | "scam" | "copyright" | "leaked_secret" | "other";
export const TemplateReportReason = {
	Malware: "malware",
	Scam: "scam",
	Copyright: "copyright",
	LeakedSecret: "leaked_secret",
	Other: "other",
} as const;

/**
 * Why a template does not fit the account right now. Used by `APITemplateAccountContext` and by the `details` of the
 * `TEMPLATE_PLAN_REQUIRED`, `TEMPLATE_RAM_INSUFFICIENT` and `TEMPLATE_IMAGE_SLOTS_EXHAUSTED` errors.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/get
 */
export type TemplateFitReason = "no_plan" | "ram" | "web_publish" | "image_plan" | "image_slots" | "private_network" | "blob_plan" | "min_plan" | "max_apps" | "max_databases" | "deploys_per_hour";
export const TemplateFitReason = {
	/** The account has no plan. */
	NoPlan: "no_plan",
	/** Not enough free memory for the sum of the minimum memory of the services that would be created. */
	Ram: "ram",
	/** A service needs web publishing and the plan does not include it. */
	WebPublish: "web_publish",
	/** A service runs an image and the plan does not include custom images. */
	ImagePlan: "image_plan",
	/** A service runs an image and every custom image slot is in use. */
	ImageSlots: "image_slots",
	/** The template needs the private network, which the plan does not include. */
	PrivateNetwork: "private_network",
	/** A service is a Blob Storage folder and the plan does not include Blob Storage. */
	BlobPlan: "blob_plan",
	/** The plan is below the minimum plan the author declared. */
	MinPlan: "min_plan",
	/** The plan's limit of applications would be exceeded. */
	MaxApps: "max_apps",
	/** The plan's limit of databases would be exceeded. */
	MaxDatabases: "max_databases",
	/** The hourly limit of template deploys was reached. */
	DeploysPerHour: "deploys_per_hour",
} as const;

/**
 * Why an update to a newer version is blocked. Carried in the `details` of `TEMPLATE_UPDATE_BLOCKED` and in
 * `APITemplateUpdateInfo.blocked`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/update-info
 */
export type TemplateUpdateBlockReason = "no_new_version" | "detached" | "template_removed" | "link_revoked" | "ram" | "plan" | "image_slots" | "app_building" | "deploy_in_progress";
export const TemplateUpdateBlockReason = {
	/** The app already runs the latest version. */
	NoNewVersion: "no_new_version",
	/** The app was detached from the template and no longer receives versions. */
	Detached: "detached",
	/** The template was removed by its author. */
	TemplateRemoved: "template_removed",
	/** The share link the app came from was revoked. */
	LinkRevoked: "link_revoked",
	/** The new version needs more memory than is free. */
	Ram: "ram",
	/** The new version needs a plan above the current one. */
	Plan: "plan",
	/** The new version needs an image slot and none is free. */
	ImageSlots: "image_slots",
	/** The app is still building. */
	AppBuilding: "app_building",
	/** Another deploy or update of the same app or stack is running. */
	DeployInProgress: "deploy_in_progress",
} as const;

/**
 * Finding code of `POST /v1/templates/validate` and of the `details.issues` of `TEMPLATE_MANIFEST_INVALID`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/validate
 */
export type TemplateValidationCode =
	| "invalid_type"
	| "required"
	| "unknown_field"
	| "invalid_slug"
	| "invalid_version"
	| "invalid_category"
	| "invalid_text"
	| "invalid_ram"
	| "invalid_plan"
	| "unknown_placeholder"
	| "unknown_service"
	| "unknown_input"
	| "invalid_when"
	| "invalid_option"
	| "invalid_source"
	| "invalid_permissions"
	| "forbidden_env"
	| "forbidden_in_public"
	| "secret_in_manifest"
	| "invalid_deploy"
	| "invalid_connection"
	| "duplicate_id"
	| "too_many_services";
export const TemplateValidationCode = {
	InvalidType: "invalid_type",
	Required: "required",
	UnknownField: "unknown_field",
	InvalidSlug: "invalid_slug",
	InvalidVersion: "invalid_version",
	InvalidCategory: "invalid_category",
	InvalidText: "invalid_text",
	InvalidRam: "invalid_ram",
	/** `min_plan` is not the id of an existing plan. */
	InvalidPlan: "invalid_plan",
	UnknownPlaceholder: "unknown_placeholder",
	UnknownService: "unknown_service",
	UnknownInput: "unknown_input",
	InvalidWhen: "invalid_when",
	InvalidOption: "invalid_option",
	InvalidSource: "invalid_source",
	/** A combination of permissions that is not allowed (for example, a closed template that lets users edit code). */
	InvalidPermissions: "invalid_permissions",
	/** A variable the platform controls (such as `LD_PRELOAD`) in `env`. */
	ForbiddenEnv: "forbidden_env",
	/** A field that only private templates may use (`env_hidden`, `code.view: false`). */
	ForbiddenInPublic: "forbidden_in_public",
	SecretInManifest: "secret_in_manifest",
	InvalidDeploy: "invalid_deploy",
	InvalidConnection: "invalid_connection",
	DuplicateId: "duplicate_id",
	TooManyServices: "too_many_services",
} as const;

// ---------------------------------------------------------------------------
// Manifest
// ---------------------------------------------------------------------------

/** Maximum length of a template name. */
export const TEMPLATE_NAME_MAX_LENGTH = 50;
/** Maximum length of a template description. */
export const TEMPLATE_DESCRIPTION_MAX_LENGTH = 128;

/**
 * Links of the software a template packages.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/get
 */
export interface APITemplateLinks {
	website?: string;
	docs?: string;
	source?: string;
	/** Page of the license of the original software. */
	license?: string;
}

/**
 * Memory of a service, in MB.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/get
 */
export interface APITemplateRam {
	min: number;
	recommended: number;
	/** Upper bound the template suggests; users may go above it when `permissions.ram.above_max` allows. */
	max?: number;
}

/**
 * Condition on the answer of another question. There is no expression language: only equality.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/get
 */
export interface APITemplateWhen {
	/** Id of the question. */
	input: string;
	equals: string | number | boolean;
}

/** Value of an answer to a question. */
export type APITemplateInputValue = string | number | boolean;

/**
 * Limits applied to the answer of a question.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/get
 */
export interface APITemplateInputValidation {
	regex?: string;
	min?: number;
	max?: number;
	min_length?: number;
	max_length?: number;
}

/**
 * What choosing an option of a `select` question changes: variables, services switched on or off and extra memory.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/get
 */
export interface APITemplateOptionSets {
	/** Service id to `"on"` or `"off"`. */
	services?: Record<string, "on" | "off">;
	/** Service id to the variables to set on it. */
	env?: Record<string, Record<string, string>>;
	/** Service id to extra memory in MB. */
	ram_extra?: Record<string, number>;
}

/**
 * One option of a `select` question.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/get
 */
export interface APITemplateInputOption {
	value: string;
	label?: APITemplateI18nText;
	sets?: APITemplateOptionSets;
}

/**
 * A question the user answers when using the template.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/get
 */
export interface APITemplateInput {
	/** Slug, unique in the template. */
	id: string;
	type: TemplateInputType;
	label: APITemplateI18nText;
	help?: APITemplateI18nText;
	/** Default `false`. */
	required?: boolean;
	default?: APITemplateInputValue;
	validation?: APITemplateInputValidation;
	/** For `secret`: `random:<n>` or `uuid`. The platform generates the value when the user leaves it empty. */
	generate?: string;
	/** `false` with `generate`: the generated value cannot be replaced. */
	editable?: boolean;
	/** The question only applies when this condition holds. */
	when?: APITemplateWhen;
	/** For `select`. */
	options?: APITemplateInputOption[];
}

/**
 * What users of the apps created from a template may do. Absent fields take the defaults; the platform applies derived
 * restrictions to closed templates (`code.view: false`) that cannot be configured.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/get
 */
export interface APITemplatePermissions {
	code?: {
		/** Default `true`. `false` makes the template closed: whoever uses it cannot see or download its code. Private templates only. */
		view?: boolean;
		/** Default `true` for `code` services and `false` for `image` services. Editing the code of an open template detaches the app. */
		edit?: boolean;
	};
	ram?: {
		/** Default `true`. */
		change?: boolean;
		/** Default `false`. */
		below_min?: boolean;
		/** Default `true`. */
		above_max?: boolean;
	};
	env?: {
		/** Default `true`: create variables beyond the declared ones. Forced to `false` in a closed template. */
		add?: boolean;
	};
	commands?: {
		/** Default `true` for `code` services: edit the start and build commands. Forced to `false` in a closed template. */
		edit?: boolean;
	};
	version?: {
		/** Default `false`: pick an earlier version of the template in the wizard. */
		selectable?: boolean;
	};
	share?: {
		/** Default `false`: allow share links of the `full_copy` mode. Private templates only; not compatible with `code.view: false`. */
		full_copy?: boolean;
	};
}

/**
 * What the `deploy` of a service may do. It only restricts: the plan still decides what is available.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/get
 */
export interface APITemplateDeploySettings {
	zero_downtime?: {
		default: ApplicationZeroDowntime;
		/** `true`: users cannot change it (for software that must not run twice at once). */
		locked?: boolean;
	};
	auto_rollback?: {
		default: boolean;
		locked?: boolean;
	};
	rollback?: {
		/** `required`: the software migrates its database on update, so a rollback always goes back with data. */
		with_data: "required" | "optional";
	};
}

/**
 * Where the code of an app service comes from.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/get
 */
export interface APITemplateSource {
	type: TemplateSourceType;
	/** For `image` in a public template: the upstream reference pinned by digest. */
	image?: string;
	/** For `code`: folder of the code in the template. */
	path?: string;
	/**
	 * For `image` in a public template: folder of the template that holds a `Dockerfile` built by the platform (used when
	 * the upstream image needs changes to run in the app sandbox). `image` then records the upstream reference it starts from.
	 */
	context?: string;
}

/**
 * When the platform considers a service ready at the end of the deploy.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/get
 */
export interface APITemplateHealthcheck {
	/** HTTP path. Without it, the platform's usual readiness check applies. */
	path?: string;
	/** Seconds to wait. */
	timeout: number;
}

/**
 * A link between two services of the template that only works with the private network.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/get
 */
export interface APITemplateConnection {
	/** `required`: the link does not work over public addresses, so the template needs a plan with the private network. */
	private?: "required";
}

/**
 * An app service of a template.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/get
 */
export interface APITemplateAppService {
	source: APITemplateSource;
	language?: ApplicationLanguage;
	runtime_version?: string;
	main?: string;
	build?: string;
	start?: string;
	/** For `image`: the port the app listens on. */
	port?: number;
	ram: APITemplateRam;
	web: TemplateWebMode;
	/**
	 * Variables with a fixed value, a placeholder (`{{app.url}}`, `{{services.db.host}}`, `{{secret:32}}`, `{{inputs.x}}`) or an
	 * answer. Keys listed in `env_hidden` are never present when the manifest is read.
	 */
	env?: Record<string, string>;
	/**
	 * Keys of `env` the users of the template cannot see. Private templates only. When creating a version, send the value in `env`;
	 * when the key is listed here but absent from `env`, the previous value is kept.
	 */
	env_hidden?: string[];
	healthcheck?: APITemplateHealthcheck;
	deploy?: APITemplateDeploySettings;
	/** Links to other services, by service id. */
	connections?: Record<string, APITemplateConnection>;
	/** Never present on an app service. */
	database?: never;
	/** Never present on an app service. */
	blob?: never;
}

/**
 * A managed database service of a template. Reached from other services with `{{services.<id>.url}}`, `.host`, `.port`, `.user`, `.password`,
 * `.database` and, in the public network mode, the paths of the client certificate files the platform writes into the application:
 * `.ssl.ca_path`, `.ssl.cert_path`, `.ssl.key_path`, `.ssl.pem_path` (key, certificate and CA in one file, the format MongoDB reads) and `.ssl.p12_path`
 * (PKCS#12 with an empty password, the format Prisma 6 and earlier read through `sslidentity`); `.ssl.p12_password` is the empty password.
 * `.prisma_url` is a PostgreSQL URL written for Prisma 6 and earlier, with the CA and the PKCS#12 file already in it.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/get
 */
export interface APITemplateDatabaseService {
	database: TemplateDatabaseEngine;
	/** One of the available versions of the engine; default: the recommended one. */
	version?: string;
	ram: APITemplateRam;
	/** The database is only created when the condition holds. */
	when?: APITemplateWhen;
	/** Never present on a database service. */
	source?: never;
	/** Never present on a database service. */
	blob?: never;
}

/**
 * Visibility of the files of a Blob service. `private` files are only reachable with the credentials the platform hands to
 * the apps; `public` files are also served from a public address.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/get
 */
export type TemplateBlobVisibility = "private" | "public";
export const TemplateBlobVisibility = {
	Private: "private",
	Public: "public",
} as const;

/**
 * A Blob Storage service of a template: a folder of the account's Blob, with credentials restricted to it. The plan must
 * include Blob Storage. Reached from other services with `{{services.<id>.endpoint}}`, `.bucket`, `.region`, `.prefix`,
 * `.access_key_id`, `.secret_access_key` and `.public_base_url` (empty when the service is private).
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/get
 */
export interface APITemplateBlobService {
	blob: {
		/** Default `private`. */
		visibility?: TemplateBlobVisibility;
	};
	/** The folder is only created when the condition holds. */
	when?: APITemplateWhen;
	/** Never present on a Blob service. */
	source?: never;
	/** Never present on a Blob service. */
	database?: never;
}

export type APITemplateService = APITemplateAppService | APITemplateDatabaseService | APITemplateBlobService;

/**
 * What the wizard shows at the end of a deploy.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/get
 */
export interface APITemplateOutput {
	label: APITemplateI18nText;
	/** A placeholder or a text. */
	value: string | APITemplateI18nText;
	/** The value is a secret. */
	secret?: boolean;
	/** The value is shown once and never again. */
	once?: boolean;
}

/**
 * The manifest of a template version: requirements, questions, services, permissions and outputs. Valid against the
 * public manifest JSON Schema.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/get
 */
export interface APITemplateManifest {
	/** Slug, `a-z0-9-`. */
	id: string;
	/** Semantic version. */
	version: string;
	/** Up to 50 characters per language. */
	name: APITemplateI18nText;
	/** Up to 128 characters per language. */
	description: APITemplateI18nText;
	category: TemplateCategory;
	tags?: string[];
	/** Icon file of the template (SVG or PNG). */
	icon?: string;
	links?: APITemplateLinks;
	/** Slug of the dedicated page of the template. Public templates only. */
	landing?: string;
	/** Id of the lowest plan allowed to use the template, on top of what the requirements already ask for. */
	min_plan?: string;
	inputs?: APITemplateInput[];
	/** Services by id: app, database and Blob services. */
	services: Record<string, APITemplateService>;
	permissions?: APITemplatePermissions;
	outputs?: APITemplateOutput[];
	/** Names of secrets the platform generates once and shares between services (`{{secrets.<name>}}`). */
	secrets?: string[];
	/** The user brings the key of the AI model: the card and the wizard show a notice. */
	byok?: boolean;
}

// ---------------------------------------------------------------------------
// Catalog
// ---------------------------------------------------------------------------

/**
 * A service of a template, summarized for cards, previews and wizards. It never carries code or variables.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/get
 */
export interface APITemplateServiceSummary {
	/** Id of the service in the manifest. */
	id: string;
	kind: "app" | "database" | "blob";
	/** `null` for a database and for a Blob folder. */
	source_type: TemplateSourceType | null;
	/** `null` for an app and for a Blob folder. */
	database: TemplateDatabaseEngine | null;
	/** Visibility of a Blob folder; `null` for apps and databases. */
	blob_visibility: TemplateBlobVisibility | null;
	/** Memory of the service; a Blob folder uses none (`min` and `recommended` are `0`). */
	ram: APITemplateRam;
	/** `null` for a database and for a Blob folder. */
	web: TemplateWebMode | null;
	/** `true` when the service is only created for some answers (`when` or an option that switches it). */
	conditional: boolean;
}

/**
 * Who a private template belongs to. Absent for catalog templates.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/get
 */
export interface APITemplateOwner {
	user_id: SnowFlake;
	/** `null` when the template belongs to the user. */
	workspace_id: SnowFlake | null;
}

/**
 * Brief of a template version.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/versions
 */
export interface APITemplateVersionSummary {
	id: string;
	/** Semantic version. */
	version: string;
	/** `true` for a security release: the panel highlights it and the owner gets an e-mail. */
	security: boolean;
	created_at: ISODateString;
}

/**
 * What using a template would do to the caller's account. Present only when the request is authenticated.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/get
 */
export interface APITemplateAccountContext {
	/** `true` when the plan and the free resources of the account cover the template. */
	fits: boolean;
	/** Why it does not fit; empty when it does. */
	reasons: APITemplateFitIssue[];
	/** Memory the template needs: the sum of the minimum memory of the services that would be created (MB). */
	required_ram: number;
	/** Memory the account has free (MB). */
	free_ram: number;
	/** `true` when using the template takes a custom image slot that the account does not already hold (never for an image of the account's own private template). */
	needs_image_slot: boolean;
	/** Custom image slots free in the account. */
	image_slots_free: number;
	/** `true` when the account already runs apps created from this template. */
	in_use: boolean;
	/** Number of apps and stacks of the account created from this template. */
	in_use_count: number;
}

/**
 * One reason a template does not fit.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/get
 */
export interface APITemplateFitIssue {
	reason: TemplateFitReason;
	/** What the template needs, when it is a number (MB, slots) or a plan id. */
	required?: number | string;
	/** What the account has. */
	available?: number | string;
}

/**
 * A template, as listed in the gallery.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/list
 */
export interface APITemplate {
	id: string;
	/** Unique among public templates. */
	slug: string;
	origin: TemplateOrigin;
	visibility: TemplateVisibility;
	name: APITemplateI18nText;
	description: APITemplateI18nText;
	category: TemplateCategory;
	tags: string[];
	/** URL of the template icon; `null` when it has none. */
	icon_url: string | null;
	/** Name shown as the author. `null` for templates of the platform. */
	author_display: string | null;
	links: APITemplateLinks;
	/** Slug of the dedicated public page, when there is one. */
	landing: string | null;
	/** Highlighted in the gallery. */
	featured: boolean;
	/** The latest version. */
	current_version: APITemplateVersionSummary;
	services: APITemplateServiceSummary[];
	/** `true` when using it creates a stack (two or more services). */
	creates_stack: boolean;
	/** Sum of the minimum memory of every service (MB). */
	ram_min_total: number;
	/** The user brings the key of the AI model. */
	byok: boolean;
	/** Id of the lowest plan that can use it, calculated from the requirements and the declared `min_plan`. */
	required_plan: UserPlanName | (string & {});
	/** `false` for a closed template: whoever uses it cannot see its code. Public templates are always open. */
	code_view: boolean;
	/** Number of times a public template was used; `null` for private templates. */
	uses_count: number | null;
	/** Owner of a private template; `null` for catalog templates. */
	owner: APITemplateOwner | null;
	/** Linked GitHub repository of a private template; `null` when not linked (and for catalog templates). */
	github: { repository: string; branch: string } | null;
	created_at: ISODateString;
	updated_at: ISODateString;
	/** What the template would do to the caller's account. Present only with authentication. */
	account?: APITemplateAccountContext;
}

/**
 * A template with what the wizard needs: questions, permissions and documentation. Closed templates never carry code.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/get
 */
export interface APITemplateDetail extends APITemplate {
	inputs: APITemplateInput[];
	permissions: APITemplateEffectivePermissions;
	/** What the wizard shows at the end. */
	outputs: APITemplateOutput[];
	/** Documentation of the template (Markdown), by language; `null` when it has none. */
	readme: APITemplateI18nText | null;
	/** Changelog of the latest version. */
	changelog: APITemplateI18nText | null;
}

/**
 * A version of a template. Versions never change after they are published.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/versions
 */
export interface APITemplateVersion extends APITemplateVersionSummary {
	changelog: APITemplateI18nText | null;
	/**
	 * The manifest of the version, without the values of `env_hidden`. `null` when the caller cannot read the code of the
	 * template (a closed template of another author).
	 */
	manifest: APITemplateManifest | null;
}

/**
 * Number of public templates in a category.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/categories
 */
export interface APITemplateCategoryCount {
	category: TemplateCategory;
	count: number;
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

/**
 * A finding of the manifest validation.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/validate
 */
export interface APITemplateValidationIssue {
	/** Path of the field in the manifest (`services.app.ram.min`). */
	path: string;
	code: TemplateValidationCode;
	/** Readable explanation in English. */
	message: string;
}

/**
 * The `details` of the `TEMPLATE_MANIFEST_INVALID` error.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/validate
 */
export interface APITemplateManifestInvalidDetails {
	issues: APITemplateValidationIssue[];
}

/**
 * Result of validating a manifest. Nothing is created.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/validate
 */
export interface APITemplateValidation {
	valid: boolean;
	/** Empty when `valid`. */
	issues: APITemplateValidationIssue[];
	/** Calculated from the manifest; `null` when it is not valid enough to calculate. */
	required_plan: UserPlanName | (string & {}) | null;
	/** Sum of the minimum memory of every service (MB); `null` when it cannot be calculated. */
	ram_min_total: number | null;
	services: APITemplateServiceSummary[];
}

// ---------------------------------------------------------------------------
// Deploy
// ---------------------------------------------------------------------------

/**
 * One step of a deploy job.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/deploy-status
 */
export interface APITemplateDeployStepState {
	step: TemplateDeployStep;
	status: TemplateDeployStepStatus;
	started_at: ISODateString | null;
	finished_at: ISODateString | null;
}

/**
 * The readable error of a failed job.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/deploy-status
 */
export interface APITemplateDeployError {
	code: APIErrorCode;
	message: string;
	/** Step that failed. */
	step: TemplateDeployStep | null;
	details?: Record<string, unknown>;
}

/**
 * A resource a deploy job created.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/deploy-status
 */
export interface APITemplateDeployResource {
	resource_type: WorkspaceResourceType;
	resource_id: SnowFlake;
	/** Id of the service in the manifest; `null` for the stack and for images. */
	service_id: string | null;
	name: string;
}

/**
 * An output of a finished deploy. A `once` value comes back only on the first read; afterwards `value` is `null`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/deploy-status
 */
export interface APITemplateDeployOutput {
	label: APITemplateI18nText;
	value: string | APITemplateI18nText | null;
	secret: boolean;
	once: boolean;
}

/**
 * A deploy or update job. The platform runs it as one operation: if a step fails, everything the job created is removed.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/deploy-status
 */
export interface APITemplateDeploy {
	id: string;
	kind: TemplateDeployKind;
	template_id: string;
	/** Version being deployed. */
	version_id: string;
	version: string;
	status: TemplateDeployStatus;
	/** Step running now; `null` when the job is queued or finished. */
	current_step: TemplateDeployStep | null;
	steps: APITemplateDeployStepState[];
	/** Set when `status` is `failed`. */
	error: APITemplateDeployError | null;
	/** What the job created (ids and types). Empty after a failure, since the job undoes it. */
	resources: APITemplateDeployResource[];
	/** The stack, when the template has two or more services. */
	stack_id: SnowFlake | null;
	/** The app, when the template has a single app. */
	application_id: SnowFlake | null;
	/** Present when the job succeeded. */
	outputs: APITemplateDeployOutput[];
	created_at: ISODateString;
	updated_at: ISODateString;
	finished_at: ISODateString | null;
}

/**
 * A progress event of a deploy job stream. It never carries outputs: read the job at the end.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/deploy-events
 */
export interface APITemplateDeployEvent {
	deploy_id: string;
	status: TemplateDeployStatus;
	current_step: TemplateDeployStep | null;
	steps: APITemplateDeployStepState[];
	error: APITemplateDeployError | null;
}

// ---------------------------------------------------------------------------
// Updates
// ---------------------------------------------------------------------------

/**
 * Why an update is blocked.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/update-info
 */
export interface APITemplateUpdateBlocked {
	reason: TemplateUpdateBlockReason;
	/** Numbers behind the reason, such as the memory needed and free. */
	details?: Record<string, unknown>;
}

/**
 * The `details` of the `TEMPLATE_UPDATE_BLOCKED` error.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/update
 */
export type APITemplateUpdateBlockedDetails = APITemplateUpdateBlocked;

/**
 * What an application of an open template did that detaches it. The `details` of the `TEMPLATE_DETACH_CONFIRMATION_REQUIRED` error.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/detach
 */
export interface APITemplateDetachConfirmationDetails {
	/** `files.write` (changing files), `deploy.code` (uploading code), `deploy.github` (linking a repository) or `commit` (committing the container to an image). */
	action: "files.write" | "deploy.code" | "deploy.github" | "commit";
}

/**
 * Why rolling back only the code was refused. The `details` of the `TEMPLATE_ROLLBACK_REQUIRES_DATA` error.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/rollback
 */
export interface APITemplateRollbackRequiresDataDetails {
	/** The template's software migrates its data when it updates, so older code cannot run on the data as it is now. */
	reason: "with_data_required";
	/** Where to go instead: restore the safety snapshot taken before the update, which brings back the code and the databases together. */
	restore: "update_snapshot";
}

/**
 * What updating an app or a stack to the latest version of its template would do.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/update-info
 */
export interface APITemplateUpdateInfo {
	update_available: boolean;
	current_version: string;
	/** `null` when there is no newer version. */
	latest_version: string | null;
	/** `true` for a security release. */
	security: boolean;
	changelog: APITemplateI18nText | null;
	/** Required questions the new version adds; the update asks for them. */
	new_inputs: APITemplateInput[];
	/** Services the new version adds; they are created in the same operation. */
	added_services: APITemplateServiceSummary[];
	/** Ids of services the new version drops. They are not deleted: they leave the template and you can delete them. */
	removed_services: string[];
	/** Services whose minimum memory rose above what they have. */
	ram_changes: { service_id: string; current: number; required_min: number }[];
	/** Memory free in the account (MB). */
	free_ram: number;
	/** `true` when the new version opens permissions the app had closed (for example, a closed template that becomes open). */
	opens_permissions: boolean;
	/** `true` when going back from the new version always takes the data along. */
	rollback_with_data: boolean;
	/** `null` when the update can go ahead. */
	blocked: APITemplateUpdateBlocked | null;
}

// ---------------------------------------------------------------------------
// Share links
// ---------------------------------------------------------------------------

/**
 * A share link of a private template. The token is returned only when the link is created.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/share-links/list
 */
export interface APITemplateShareLink {
	id: string;
	template_id: string;
	mode: TemplateShareLinkMode;
	/** Last 4 characters of the token, to tell links apart. */
	last4: string;
	/** Times the link was used. */
	uses: number;
	/** `null` = no limit. */
	max_uses: number | null;
	/** `null` = does not expire. */
	expires_at: ISODateString | null;
	/** Set when the author revoked the link. */
	revoked_at: ISODateString | null;
	created_at: ISODateString;
}

/**
 * A share link as returned by its creation, with the secret token.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/share-links/create
 */
export interface APITemplateShareLinkCreated extends APITemplateShareLink {
	/** The full token. Shown once; it cannot be recovered. */
	token: string;
}

/**
 * What a person sees before using a share link. Private templates are not verified by the platform.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/share-links/preview
 */
export interface APITemplateSharePreview {
	mode: TemplateShareLinkMode;
	name: APITemplateI18nText;
	description: APITemplateI18nText;
	category: TemplateCategory;
	icon_url: string | null;
	/** Name the author chose to show. */
	author_display: string | null;
	/** Version the link gives. */
	version: string;
	/** What would be created. */
	services: APITemplateServiceSummary[];
	creates_stack: boolean;
	ram_min_total: number;
	required_plan: UserPlanName | (string & {});
	/** Custom image slots the receiver would use: one per distinct image of the template, so it can be more than 1. */
	image_slots_needed: number;
	/** Always `false`: the platform does not review private templates. */
	verified: false;
	/** `false` for a closed template: the receiver cannot see the code and the values they fill in go to a code they cannot read. */
	code_view: boolean;
	byok: boolean;
	inputs: APITemplateInput[];
	permissions: APITemplateEffectivePermissions;
	/** What using it would do to the caller's account. Present only with authentication. */
	account?: APITemplateAccountContext;
}
