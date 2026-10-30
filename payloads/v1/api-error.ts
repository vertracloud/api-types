import { WORKSPACE_ERROR_CODES } from "./workspace";

/**
 * Error sentinels of the template routes. Stable English codes returned in `code`; clients are expected to translate them.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/get
 */
export const TEMPLATE_ERROR_CODES = {
	/** 404 — the template does not exist, was removed or is not visible to the caller. */
	TEMPLATE_NOT_FOUND: "TEMPLATE_NOT_FOUND",
	/** 404 — the template has no version with that number or id. */
	TEMPLATE_VERSION_NOT_FOUND: "TEMPLATE_VERSION_NOT_FOUND",
	/** 409 — another template of yours already uses the slug. */
	TEMPLATE_SLUG_TAKEN: "TEMPLATE_SLUG_TAKEN",
	/** 400 — the manifest is not valid; `details` is an `APITemplateManifestInvalidDetails`: `{ issues }`. */
	TEMPLATE_MANIFEST_INVALID: "TEMPLATE_MANIFEST_INVALID",
	/** 400 — an answer to a question is missing or invalid; `details.issues` lists the questions. */
	TEMPLATE_INPUT_INVALID: "TEMPLATE_INPUT_INVALID",
	/** 400 — a service that runs code was sent without its source file. */
	TEMPLATE_SOURCE_REQUIRED: "TEMPLATE_SOURCE_REQUIRED",
	/** 400 — the code sent to become a template holds a secret (a `.env` file, a private key or a token); `details` is `{ files: string[] }` with the paths. Remove the secret and send it again. */
	TEMPLATE_SECRET_IN_SOURCE: "TEMPLATE_SECRET_IN_SOURCE",
	/** 404 — the linked repository has no template manifest at its root. */
	TEMPLATE_GITHUB_MANIFEST_NOT_FOUND: "TEMPLATE_GITHUB_MANIFEST_NOT_FOUND",
	/** 403 — the plan is below what the template needs; `details` carries the `TemplateFitReason` and the plan required. */
	TEMPLATE_PLAN_REQUIRED: "TEMPLATE_PLAN_REQUIRED",
	/** 400 — not enough free memory for the template; `details` carries the memory needed and the memory free. */
	TEMPLATE_RAM_INSUFFICIENT: "TEMPLATE_RAM_INSUFFICIENT",
	/** 403 — the template runs an image and every custom image slot of the account is in use. */
	TEMPLATE_IMAGE_SLOTS_EXHAUSTED: "TEMPLATE_IMAGE_SLOTS_EXHAUSTED",
	/** 403 — the route reads or changes the code, files, commands or variables of an app that comes from a closed template. */
	TEMPLATE_CLOSED: "TEMPLATE_CLOSED",
	/** 403 — `PATCH /v1/apps/:id/config` changes a deploy setting that the template of the app locks (`deploy.zero_downtime` or `deploy.auto_rollback` with `locked: true`); `details` is `{ setting: "zero_downtime" | "auto_rollback" }`. Going back to the value of the template is always accepted. */
	TEMPLATE_SETTING_LOCKED: "TEMPLATE_SETTING_LOCKED",
	/** 403 — the plan's limit of private templates was reached. */
	TEMPLATE_PRIVATE_LIMIT_REACHED: "TEMPLATE_PRIVATE_LIMIT_REACHED",
	/** 409 — another deploy of the same template or stack is running. */
	TEMPLATE_DEPLOY_IN_PROGRESS: "TEMPLATE_DEPLOY_IN_PROGRESS",
	/** The deploy failed and was undone; `details.step` is the step that failed. */
	TEMPLATE_DEPLOY_FAILED: "TEMPLATE_DEPLOY_FAILED",
	/** 404 — the deploy job does not exist or belongs to another account. */
	TEMPLATE_DEPLOY_NOT_FOUND: "TEMPLATE_DEPLOY_NOT_FOUND",
	/** 409 — the `Idempotency-Key` was already used with a different request. */
	IDEMPOTENCY_KEY_CONFLICT: "IDEMPOTENCY_KEY_CONFLICT",
	/** 403 when creating an app from the image, 409 when rebuilding, committing to, linking a repository to or editing the context of it, and 409 when deleting the template image slot while an app of the template still runs it — the image of a template can only be used through the template. The slot is released when the last app that uses it is deleted. */
	IMAGE_TEMPLATE_ONLY: "IMAGE_TEMPLATE_ONLY",
	/** 403 — an app that came from a share link cannot be saved as a template or shared. */
	TEMPLATE_SAVE_NOT_ALLOWED: "TEMPLATE_SAVE_NOT_ALLOWED",
	/** 409 — the update cannot go ahead; `details` is an `APITemplateUpdateBlockedDetails` with the reason. */
	TEMPLATE_UPDATE_BLOCKED: "TEMPLATE_UPDATE_BLOCKED",
	/** 409 — the template is deprecated and cannot be used for new apps. */
	TEMPLATE_DEPRECATED: "TEMPLATE_DEPRECATED",
	/** 400 — the version asked for cannot be chosen: the template does not allow picking earlier versions. */
	TEMPLATE_VERSION_NOT_SELECTABLE: "TEMPLATE_VERSION_NOT_SELECTABLE",
	/** 404 — the share link does not exist. */
	SHARE_LINK_NOT_FOUND: "SHARE_LINK_NOT_FOUND",
	/** 410 — the author revoked the share link. */
	SHARE_LINK_REVOKED: "SHARE_LINK_REVOKED",
	/** 410 — the share link expired. */
	SHARE_LINK_EXPIRED: "SHARE_LINK_EXPIRED",
	/** 410 — the share link reached its limit of uses. */
	SHARE_LINK_EXHAUSTED: "SHARE_LINK_EXHAUSTED",
	/** 403 — the variable is injected by the template and cannot be read or changed. */
	MANAGED_ENV_READONLY: "MANAGED_ENV_READONLY",
	/** 409 — the change detaches the application from its template (it stops receiving versions); repeat the request with `confirm_detach` set to confirm. `details` is an `APITemplateDetachConfirmationDetails`. */
	TEMPLATE_DETACH_CONFIRMATION_REQUIRED: "TEMPLATE_DETACH_CONFIRMATION_REQUIRED",
	/** 409 — the template marks the service as migrating its data on update, so rolling back only the code is blocked; `details` is an `APITemplateRollbackRequiresDataDetails`. Restore the snapshot the update took instead. */
	TEMPLATE_ROLLBACK_REQUIRES_DATA: "TEMPLATE_ROLLBACK_REQUIRES_DATA",
	/** The storage the template catalog is imported from is not configured or not reachable, so the catalog cannot be updated. */
	TEMPLATE_STORAGE_UNAVAILABLE: "TEMPLATE_STORAGE_UNAVAILABLE",
} as const;
export type TemplateErrorCode = (typeof TEMPLATE_ERROR_CODES)[keyof typeof TEMPLATE_ERROR_CODES];

/**
 * Error sentinels of the stack routes. Stable English codes returned in `code`; clients are expected to translate them.
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/get
 */
export const STACK_ERROR_CODES = {
	/** 404 — the stack does not exist or belongs to another account. */
	STACK_NOT_FOUND: "STACK_NOT_FOUND",
	/** 409 — the resource is already in another stack, or is not in the same account or workspace as the stack. */
	STACK_MEMBER_CONFLICT: "STACK_MEMBER_CONFLICT",
	/** 404 — the resource is not a member of the stack. */
	STACK_MEMBER_NOT_FOUND: "STACK_MEMBER_NOT_FOUND",
	/** 404 — the stack has no connection with that id. */
	STACK_BINDING_NOT_FOUND: "STACK_BINDING_NOT_FOUND",
	/** 400 — the network mode is not accepted: only `public` can be used. */
	STACK_NETWORK_MODE_UNAVAILABLE: "STACK_NETWORK_MODE_UNAVAILABLE",
	/** 403 — the member comes from a closed template and cannot leave the stack. */
	STACK_SERVICE_LOCKED: "STACK_SERVICE_LOCKED",
	/** 400 — `confirm_name` is not the stack name. */
	STACK_NAME_MISMATCH: "STACK_NAME_MISMATCH",
	/** 400 — the folder has no application, or no database, to put in a stack. */
	STACK_TRANSFORM_EMPTY: "STACK_TRANSFORM_EMPTY",
	/** 409 — the stack already has a Blob folder with that prefix. */
	STACK_BLOB_PREFIX_TAKEN: "STACK_BLOB_PREFIX_TAKEN",
} as const;
export type StackErrorCode = (typeof STACK_ERROR_CODES)[keyof typeof STACK_ERROR_CODES];

/** Stable error sentinels returned by routes available to API keys. */
export const API_ERROR_CODES = {
	ACCESS_DENIED: "ACCESS_DENIED",
	API_KEY_INVALID: "API_KEY_INVALID",
	// Key management (`/v1/users/me/api-keys`) — dashboard-session routes.
	API_KEY_NOT_FOUND: "API_KEY_NOT_FOUND",
	API_KEY_LIMIT_REACHED: "API_KEY_LIMIT_REACHED",
	API_KEY_INVALID_NAME: "API_KEY_INVALID_NAME",
	API_KEY_INVALID_SCOPES: "API_KEY_INVALID_SCOPES",
	API_KEY_INVALID_IPS: "API_KEY_INVALID_IPS",
	API_KEY_IP_DENIED: "API_KEY_IP_DENIED",
	API_KEY_SCOPE_DENIED: "API_KEY_SCOPE_DENIED",
	/** 403 — the route only accepts a dashboard session; API keys are refused. */
	WEBSITE_ONLY: "WEBSITE_ONLY",
	AUTH_TOKEN_MISSING: "AUTH_TOKEN_MISSING",
	ACCOUNT_BANNED: "ACCOUNT_BANNED",
	APP_SHIELD_COOLDOWN: "APP_SHIELD_COOLDOWN",
	APP_BANNED: "APP_BANNED",
	APP_ALREADY_PUBLISHED: "APP_ALREADY_PUBLISHED",
	APP_HAS_NO_SUBDOMAIN: "APP_HAS_NO_SUBDOMAIN",
	/** 409 — the application is still building; wait until the build ends. */
	APP_BUILDING: "APP_BUILDING",
	APP_NOT_FOUND: "APP_NOT_FOUND",
	APP_NOT_PUBLISHED: "APP_NOT_PUBLISHED",
	APP_ALREADY_IN_WORKSPACE: "APP_ALREADY_IN_WORKSPACE",
	APP_NOT_FOUND_IN_WORKSPACE: "APP_NOT_FOUND_IN_WORKSPACE",
	/** 403 — the API key is restricted to a Blob folder (`blob_prefix`) and the operation is outside it, or it is an account-level operation (rules, domains, statistics). */
	BLOB_PREFIX_DENIED: "BLOB_PREFIX_DENIED",
	/** 403 — the API key was created by the platform for a stack: it cannot be edited, only revoked together with the stack. */
	API_KEY_MANAGED: "API_KEY_MANAGED",
	/** 404 — the object does not exist or belongs to another account. */
	BLOB_OBJECT_NOT_FOUND: "BLOB_OBJECT_NOT_FOUND",
	/** 409 — the path is taken and `overwrite` is not set. */
	BLOB_OBJECT_ALREADY_EXISTS: "BLOB_OBJECT_ALREADY_EXISTS",
	/** 404 — the upload does not exist, is not yours, or is already completed or aborted. */
	BLOB_UPLOAD_NOT_FOUND: "BLOB_UPLOAD_NOT_FOUND",
	/** 410 — the upload passed its deadline. */
	BLOB_UPLOAD_EXPIRED: "BLOB_UPLOAD_EXPIRED",
	/** 409 — parts are missing or the stored size differs from the declared size. */
	BLOB_UPLOAD_INCOMPLETE: "BLOB_UPLOAD_INCOMPLETE",
	/** 409 — more uploads open than the plan allows. */
	BLOB_UPLOAD_LIMIT: "BLOB_UPLOAD_LIMIT",
	/** 400 — the SHA-256 sent does not match the file. */
	BLOB_CHECKSUM_MISMATCH: "BLOB_CHECKSUM_MISMATCH",
	/** 413 — the file exceeds the plan, single-request upload, folder rule or upload token limit. */
	BLOB_FILE_TOO_LARGE: "BLOB_FILE_TOO_LARGE",
	/** 403 — Blob Storage is suspended for the account (grace period, abuse or deletion). */
	BLOB_NAMESPACE_SUSPENDED: "BLOB_NAMESPACE_SUSPENDED",
	/** 401 — the upload token does not exist, expired or was revoked. */
	BLOB_UPLOAD_TOKEN_INVALID: "BLOB_UPLOAD_TOKEN_INVALID",
	/** 401 — the upload token has no uses left. */
	BLOB_UPLOAD_TOKEN_EXHAUSTED: "BLOB_UPLOAD_TOKEN_EXHAUSTED",
	/** 403 — upload tokens only work on the upload routes. */
	BLOB_UPLOAD_TOKEN_NOT_ALLOWED: "BLOB_UPLOAD_TOKEN_NOT_ALLOWED",
	/** 403 — the path, size or extension is outside what the upload token allows. */
	BLOB_UPLOAD_TOKEN_CONSTRAINT: "BLOB_UPLOAD_TOKEN_CONSTRAINT",
	/** 404 — the share does not exist, was revoked or expired. */
	BLOB_SHARE_NOT_FOUND: "BLOB_SHARE_NOT_FOUND",
	/** 410 — the share reached its download limit. */
	BLOB_SHARE_EXHAUSTED: "BLOB_SHARE_EXHAUSTED",
	/** 401 — wrong share password. */
	BLOB_SHARE_PASSWORD_INVALID: "BLOB_SHARE_PASSWORD_INVALID",
	/** 409 — the `If-Match` of the rule list is outdated; read it again. */
	BLOB_RULES_CONFLICT: "BLOB_RULES_CONFLICT",
	/** 409 — more folder rules than the plan allows. */
	BLOB_RULE_LIMIT: "BLOB_RULE_LIMIT",
	/** 409 — more custom domains than the plan allows. */
	BLOB_CUSTOM_DOMAIN_LIMIT: "BLOB_CUSTOM_DOMAIN_LIMIT",
	/** 409 — the hostname is already in use. */
	BLOB_CUSTOM_DOMAIN_TAKEN: "BLOB_CUSTOM_DOMAIN_TAKEN",
	/** 404 — the domain does not exist or belongs to another account. */
	BLOB_CUSTOM_DOMAIN_NOT_FOUND: "BLOB_CUSTOM_DOMAIN_NOT_FOUND",
	/** 422 — the file extension is blocked, outside the rule or token, or the content is an executable. */
	BLOCKED_FILE_TYPE: "BLOCKED_FILE_TYPE",
	/** 403 — the upload would exceed the storage quota. */
	STORAGE_QUOTA_EXCEEDED: "STORAGE_QUOTA_EXCEEDED",
	BUILD_FAILED: "BUILD_FAILED",
	BUILD_TIMEOUT: "BUILD_TIMEOUT",
	/** The build was interrupted before it finished; start it again with a restart. */
	BUILD_INTERRUPTED: "BUILD_INTERRUPTED",
	/** 400 — the order needs complete billing details for the service invoice (name, address and, in Brazil, CPF/CNPJ). Fill them with `PUT /v1/users/me/billing`. */
	BILLING_DETAILS_INCOMPLETE: "BILLING_DETAILS_INCOMPLETE",
	/** 400 — billing details failed validation; the field is in `details.path`. */
	BILLING_DETAILS_INVALID: "BILLING_DETAILS_INVALID",
	/** 402 — the bank refused the card charge. */
	CARD_DECLINED: "CARD_DECLINED",
	/** 400 — the plan can only be paid by PIX. */
	CARD_NOT_ALLOWED_FOR_PLAN: "CARD_NOT_ALLOWED_FOR_PLAN",
	CARD_NOT_FOUND: "CARD_NOT_FOUND",
	CERTIFICATE_NOT_FOUND: "CERTIFICATE_NOT_FOUND",
	CONTAINER_ALREADY_RUNNING: "CONTAINER_ALREADY_RUNNING",
	/** 400 — no active coupon with this code. */
	COUPON_INVALID: "COUPON_INVALID",
	COUPON_INACTIVE: "COUPON_INACTIVE",
	COUPON_NOT_STARTED: "COUPON_NOT_STARTED",
	COUPON_EXPIRED: "COUPON_EXPIRED",
	/** 400 — the coupon reached its total number of uses. */
	COUPON_EXHAUSTED: "COUPON_EXHAUSTED",
	/** 400 — the account already used this coupon as many times as allowed. */
	COUPON_USER_LIMIT: "COUPON_USER_LIMIT",
	/** 400 — the coupon is not available to this account. */
	COUPON_AUDIENCE: "COUPON_AUDIENCE",
	/** 400 — the coupon does not apply to this plan. */
	COUPON_PLAN: "COUPON_PLAN",
	/** 400 — the coupon does not apply to this billing period. */
	COUPON_DURATION: "COUPON_DURATION",
	COUPON_PAYMENT_METHOD: "COUPON_PAYMENT_METHOD",
	CUSTOM_DOMAIN_RECORD_NOT_FOUND: "CUSTOM_DOMAIN_RECORD_NOT_FOUND",
	CUSTOM_DOMAIN_REGISTRATION_FAILED: "CUSTOM_DOMAIN_REGISTRATION_FAILED",
	DAILY_QUOTA_EXCEEDED: "DAILY_QUOTA_EXCEEDED",
	DATABASE_NOT_FOUND: "DATABASE_NOT_FOUND",
	DATABASE_NOT_RUNNING: "DATABASE_NOT_RUNNING",
	DATABASE_ALREADY_IN_WORKSPACE: "DATABASE_ALREADY_IN_WORKSPACE",
	DATABASE_NOT_FOUND_IN_WORKSPACE: "DATABASE_NOT_FOUND_IN_WORKSPACE",
	DATABASE_PERSISTENCE_FAILED: "DATABASE_PERSISTENCE_FAILED",
	DEPLOY_FAILED: "DEPLOY_FAILED",
	DEPLOYMENT_NOT_FOUND: "DEPLOYMENT_NOT_FOUND",
	DEPLOY_RATE_LIMITED: "DEPLOY_RATE_LIMITED",
	/** 409 — another application already uses the hostname (400 only on the removed `/network/custom` route). */
	DOMAIN_ALREADY_IN_USE: "DOMAIN_ALREADY_IN_USE",
	/** 404 — the application has no domain with that id. */
	DOMAIN_NOT_FOUND: "DOMAIN_NOT_FOUND",
	/** The plan's limit of custom domains per application was reached (the automatic `www` does not count). */
	DOMAIN_LIMIT_REACHED: "DOMAIN_LIMIT_REACHED",
	/** The application already serves domains on 5 distinct ports besides `80`. */
	DOMAIN_PORT_LIMIT_REACHED: "DOMAIN_PORT_LIMIT_REACHED",
	/** 404 — the domain's DNS provider does not support automatic configuration. */
	DOMAIN_CONNECT_UNAVAILABLE: "DOMAIN_CONNECT_UNAVAILABLE",
	/** 404 — the image does not exist or the caller cannot access it. */
	IMAGE_NOT_FOUND: "IMAGE_NOT_FOUND",
	/** 403 — the plan's limit of custom images was reached (images in any state count). */
	MAX_IMAGES_REACHED: "MAX_IMAGES_REACHED",
	/** 403 — the plan does not include custom Docker images. */
	PLAN_DOES_NOT_SUPPORT_CUSTOM_IMAGES: "PLAN_DOES_NOT_SUPPORT_CUSTOM_IMAGES",
	/** 409 — the image is the source of the current version of one of your private templates; `details` is `{ templates: string[] }` with their ids. Remove or replace it in the template first. */
	IMAGE_IN_USE: "IMAGE_IN_USE",
	/** 409 — the image already has a build running. */
	IMAGE_BUILD_IN_PROGRESS: "IMAGE_BUILD_IN_PROGRESS",
	/** 409 — the image has no successful build yet, so it cannot be used to create apps. */
	IMAGE_NOT_READY: "IMAGE_NOT_READY",
	/** 400 — there is no file named exactly `Dockerfile` at the root of the build context. */
	DOCKERFILE_NOT_FOUND: "DOCKERFILE_NOT_FOUND",
	/** 400 — the `Dockerfile` has a refused instruction; `details` is an `APIDockerfileRefusedDetails`: `{ issues }` lists the `DockerfileIssueCode` findings. */
	DOCKERFILE_REFUSED: "DOCKERFILE_REFUSED",
	/** 400 — `confirm_name` is not the image name. */
	IMAGE_NAME_MISMATCH: "IMAGE_NAME_MISMATCH",
	/** 404 — the image has no version with that id. */
	IMAGE_VERSION_NOT_FOUND: "IMAGE_VERSION_NOT_FOUND",
	/** 503 — no host can build images right now. Try again later. */
	IMAGE_BUILDER_UNAVAILABLE: "IMAGE_BUILDER_UNAVAILABLE",
	/** 413 — the build context is too large: more than 100 MB compressed, more than 512 MB uncompressed, more than 50,000 entries, or a `Dockerfile` larger than 1 MB. */
	IMAGE_CONTEXT_TOO_LARGE: "IMAGE_CONTEXT_TOO_LARGE",
	/** Build error — the built image is larger than 10 GB uncompressed. */
	IMAGE_TOO_LARGE: "IMAGE_TOO_LARGE",
	/** Build error — the image sets a label in a namespace reserved for the platform (such as `vertra.*`; the build log names the refused label). */
	IMAGE_LABEL_REFUSED: "IMAGE_LABEL_REFUSED",
	/** Build error — the image declares a `VOLUME` inside `/app`, which is the application's own persistent disk. */
	IMAGE_VOLUME_REFUSED: "IMAGE_VOLUME_REFUSED",
	/** 400 — the application runs a custom image and has no port yet: send `port` to publish it on the web. */
	IMAGE_APP_PORT_REQUIRED: "IMAGE_APP_PORT_REQUIRED",
	/** 400 — the field (`main_file`, `language`, `version`, `start_command` or `build_command`) does not apply to an application that runs a custom image: it comes from the image. */
	IMAGE_APP_FIELD_NOT_APPLICABLE: "IMAGE_APP_FIELD_NOT_APPLICABLE",
	/** 409 — the application runs a custom image, so its code cannot be written into `/app` or deployed from GitHub; update the image instead. */
	IMAGE_APP_CODE_NOT_APPLICABLE: "IMAGE_APP_CODE_NOT_APPLICABLE",
	ENV_LIMIT_EXCEEDED: "ENV_LIMIT_EXCEEDED",
	ENV_DUPLICATE_KEY: "ENV_DUPLICATE_KEY",
	ENV_NOT_FOUND: "ENV_NOT_FOUND",
	FILE_TOO_LARGE: "FILE_TOO_LARGE",
	FILE_MODIFIED: "FILE_MODIFIED",
	FILE_NOT_FOUND: "FILE_NOT_FOUND",
	FILE_OR_FOLDER_NOT_FOUND: "FILE_OR_FOLDER_NOT_FOUND",
	FORBIDDEN: "FORBIDDEN",
	FORBIDDEN_DOMAIN: "FORBIDDEN_DOMAIN",
	FORBIDDEN_PATH: "FORBIDDEN_PATH",
	FORBIDDEN_KEY: "FORBIDDEN_KEY",
	FORCED_SNAPSHOT_RATE_LIMIT: "FORCED_SNAPSHOT_RATE_LIMIT",
	INSTALLATION_NOT_FOUND: "INSTALLATION_NOT_FOUND",
	INSTALL_SHIELD_BLOCKED: "INSTALL_SHIELD_BLOCKED",
	INSTALL_TIMEOUT: "INSTALL_TIMEOUT",
	INSTALL_FAILED: "INSTALL_FAILED",
	INSTALL_CANCELLED: "INSTALL_CANCELLED",
	INSTALL_OUT_OF_MEMORY: "INSTALL_OUT_OF_MEMORY",
	INSTALL_QUEUE_FULL: "INSTALL_QUEUE_FULL",
	INSUFFICIENT_MEMORY: "INSUFFICIENT_MEMORY",
	INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
	INVALID_CONFIG: "INVALID_CONFIG",
	INVALID_CUSTOM_DOMAIN_FORMAT: "INVALID_CUSTOM_DOMAIN_FORMAT",
	INVALID_DATABASE_VERSION: "INVALID_DATABASE_VERSION",
	INVALID_HOSTNAME_FOR_APP: "INVALID_HOSTNAME_FOR_APP",
	INVALID_LANGUAGE: "INVALID_LANGUAGE",
	INVALID_MEMORY_FORMAT: "INVALID_MEMORY_FORMAT",
	INVALID_MONTHS: "INVALID_MONTHS",
	INVALID_OR_EXPIRED_CODE: "INVALID_OR_EXPIRED_CODE",
	INVALID_PARAMS: "INVALID_PARAMS",
	INVALID_PAYLOAD: "INVALID_PAYLOAD",
	INVALID_PATH: "INVALID_PATH",
	/** `path_prefix` must start with `/`, have no trailing `/` and use literal characters only. */
	INVALID_PATH_PREFIX: "INVALID_PATH_PREFIX",
	/** `port` must be an integer from 1 to 65535. */
	INVALID_DOMAIN_PORT: "INVALID_DOMAIN_PORT",
	/** `redirect_to` must be another `active` domain of the same application and must not form a loop. */
	INVALID_REDIRECT_TARGET: "INVALID_REDIRECT_TARGET",
	INVALID_PLAN: "INVALID_PLAN",
	INVALID_PLAN_NAME: "INVALID_PLAN_NAME",
	INVALID_RAM_LIMIT: "INVALID_RAM_LIMIT",
	INVALID_RANGE: "INVALID_RANGE",
	INVALID_SUBDOMAIN_FORMAT: "INVALID_SUBDOMAIN_FORMAT",
	INVALID_VERSION: "INVALID_VERSION",
	INVALID_ZIP: "INVALID_ZIP",
	INVALID_ZIP_STRUCTURE: "INVALID_ZIP_STRUCTURE",
	MAIN_FILE_NOT_FOUND: "MAIN_FILE_NOT_FOUND",
	MAX_APPS_REACHED: "MAX_APPS_REACHED",
	MAX_DATABASES_REACHED: "MAX_DATABASES_REACHED",
	MEMORY_BELOW_MINIMUM: "MEMORY_BELOW_MINIMUM",
	MEMORY_LIMIT_EXCEEDED: "MEMORY_LIMIT_EXCEEDED",
	MEMORY_MUST_BE_INTEGER: "MEMORY_MUST_BE_INTEGER",
	MEMORY_REQUIRED: "MEMORY_REQUIRED",
	MISSING_HEADERS: "MISSING_HEADERS",
	MISSING_PLAN_OR_MONTHS: "MISSING_PLAN_OR_MONTHS",
	MISSING_CONTENT: "MISSING_CONTENT",
	NOT_AN_UPGRADE: "NOT_AN_UPGRADE",
	NO_AUTHORIZED_PATHS: "NO_AUTHORIZED_PATHS",
	NO_CHANGES_PROVIDED: "NO_CHANGES_PROVIDED",
	NO_FIELDS_TO_UPDATE: "NO_FIELDS_TO_UPDATE",
	NO_FILE_UPLOADED: "NO_FILE_UPLOADED",
	OPERATION_IN_PROGRESS: "OPERATION_IN_PROGRESS",
	ORDER_NOT_FOUND: "ORDER_NOT_FOUND",
	ORDER_NOT_PAID: "ORDER_NOT_PAID",
	ORDER_NOT_PAYABLE: "ORDER_NOT_PAYABLE",
	ORDER_NOT_REFUNDED: "ORDER_NOT_REFUNDED",
	/** 404 — the order has no payment receipt (unpaid, redeemed code or paid before receipts existed). */
	ORDER_RECEIPT_UNAVAILABLE: "ORDER_RECEIPT_UNAVAILABLE",
	OWNER_APP_WITHOUT_LIMITS: "OWNER_APP_WITHOUT_LIMITS",
	PAYLOAD_TOO_LARGE: "PAYLOAD_TOO_LARGE",
	/** 409 — a folder in the path is an existing file (writing `app/x.js` when `app` is a file). */
	PATH_IS_FILE: "PATH_IS_FILE",
	PENDING_ORDER_LIMIT_REACHED: "PENDING_ORDER_LIMIT_REACHED",
	PAYMENT_METHOD_UNAVAILABLE: "PAYMENT_METHOD_UNAVAILABLE",
	/** 403 — the plan does not include automatic rollback (`deploy.auto_rollback: true` below Intermediary). */
	PLAN_DOES_NOT_SUPPORT_AUTO_ROLLBACK: "PLAN_DOES_NOT_SUPPORT_AUTO_ROLLBACK",
	PLAN_DOES_NOT_SUPPORT_CUSTOM_DOMAIN: "PLAN_DOES_NOT_SUPPORT_CUSTOM_DOMAIN",
	PLAN_DOES_NOT_SUPPORT_CUSTOM_SUBDOMAIN: "PLAN_DOES_NOT_SUPPORT_CUSTOM_SUBDOMAIN",
	/** 403 — the plan does not include rollback to earlier releases. */
	PLAN_DOES_NOT_SUPPORT_ROLLBACK: "PLAN_DOES_NOT_SUPPORT_ROLLBACK",
	PLAN_DOES_NOT_SUPPORT_WEB_PUBLISH: "PLAN_DOES_NOT_SUPPORT_WEB_PUBLISH",
	/** 403 — the plan does not include zero-downtime deploys (`deploy.zero_downtime: "on"` below Enterprise). */
	PLAN_DOES_NOT_SUPPORT_ZERO_DOWNTIME: "PLAN_DOES_NOT_SUPPORT_ZERO_DOWNTIME",
	/** 403 — the account has no plan; creating applications or databases, starting or restarting them, deploying and publishing a site all require one. */
	PLAN_REQUIRED: "PLAN_REQUIRED",
	PLAN_MISMATCH_FOR_RENEWAL: "PLAN_MISMATCH_FOR_RENEWAL",
	PLAN_NOT_ALLOWED: "PLAN_NOT_ALLOWED",
	RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED",
	REFUND_AMOUNT_EXCEEDS_PRICE: "REFUND_AMOUNT_EXCEEDS_PRICE",
	/** 409 — the release is already the active one. */
	RELEASE_ALREADY_ACTIVE: "RELEASE_ALREADY_ACTIVE",
	/** 410 — the release's kept code has expired or is outside the limit of the plan. */
	RELEASE_EXPIRED: "RELEASE_EXPIRED",
	/** 404 — the release does not exist or belongs to another application. */
	RELEASE_NOT_FOUND: "RELEASE_NOT_FOUND",
	REPO_ALREADY_LINKED: "REPO_ALREADY_LINKED",
	RESTORE_COOLDOWN: "RESTORE_COOLDOWN",
	SNAPSHOT_ENGINE_MISMATCH: "SNAPSHOT_ENGINE_MISMATCH",
	SNAPSHOT_FAILED: "SNAPSHOT_FAILED",
	SNAPSHOT_IMPORT_FAILED: "SNAPSHOT_IMPORT_FAILED",
	SNAPSHOT_NOT_FOUND: "SNAPSHOT_NOT_FOUND",
	SNAPSHOT_RATE_LIMITED: "SNAPSHOT_RATE_LIMITED",
	SNAPSHOT_TYPE_MISMATCH: "SNAPSHOT_TYPE_MISMATCH",
	SNAPSHOT_TOO_LARGE: "SNAPSHOT_TOO_LARGE",
	SNAPSHOT_VERSION_NEWER: "SNAPSHOT_VERSION_NEWER",
	SOURCE_CONFLICT: "SOURCE_CONFLICT",
	SOURCE_REQUIRED: "SOURCE_REQUIRED",
	STORAGE_ABOVE_NEW_LIMIT: "STORAGE_ABOVE_NEW_LIMIT",
	SUBDOMAIN_CHANGE_RATE_LIMITED: "SUBDOMAIN_CHANGE_RATE_LIMITED",
	SUBDOMAIN_FORBIDDEN: "SUBDOMAIN_FORBIDDEN",
	SUBDOMAIN_TAKEN: "SUBDOMAIN_TAKEN",
	/** 400 — the CPF or CNPJ is not valid. */
	TAX_ID_INVALID: "TAX_ID_INVALID",
	TYPE_MISMATCH: "TYPE_MISMATCH",
	USER_LIMITS_NOT_FOUND: "USER_LIMITS_NOT_FOUND",
	USER_NOT_FOUND: "USER_NOT_FOUND",
	USER_NOT_IN_WORKSPACE: "USER_NOT_IN_WORKSPACE",
	DATABASE_BANNED: "DATABASE_BANNED",
	VALIDATION_ERROR: "VALIDATION_ERROR",
	ZIP_TOO_LARGE: "ZIP_TOO_LARGE",
	ZIP_TOO_SMALL: "ZIP_TOO_SMALL",
	STORAGE_FULL: "STORAGE_FULL",
	TARGET_IS_DIRECTORY: "TARGET_IS_DIRECTORY",
	...WORKSPACE_ERROR_CODES,
	...TEMPLATE_ERROR_CODES,
	...STACK_ERROR_CODES,
} as const;

export const APIErrorCode = API_ERROR_CODES;

export type APIErrorCode = (typeof API_ERROR_CODES)[keyof typeof API_ERROR_CODES];
