import type {
	APIBlobBatchResult,
	APIBlobCustomDomain,
	APIBlobDeleteResult,
	APIBlobDownload,
	APIBlobObject,
	APIBlobObjectList,
	APIBlobRule,
	APIBlobRules,
	APIBlobS3Credentials,
	APIBlobShare,
	APIBlobSharePublic,
	APIBlobStats,
	APIBlobUpload,
	APIBlobUploadPart,
	APIBlobUploadToken,
	APIPayload,
	BlobContentDisposition,
	BlobVisibility,
	ISODateString,
	RESTAPIWorkspaceQuery,
	SnowFlake,
} from "../../v1";

// Blob Storage routes are served at `https://blob.vertracloud.app/v1/...`. Every route accepts
// `workspace_id` (query) to act on the blob of a workspace owner. Authenticate with a dashboard
// session, an API key (`blob:read` / `blob:write`) or, on the upload routes only, an upload token.

/**
 * Options shared by both ways of uploading. Defaults: `visibility: "private"`, `overwrite: false`,
 * `random_suffix: false` (always `true` for an upload token without a fixed `path`).
 */
export interface RESTBlobObjectWriteOptions {
	visibility?: BlobVisibility;
	/** Replace an existing object at `path`. Without it a taken path returns `BLOB_OBJECT_ALREADY_EXISTS`. */
	overwrite?: boolean;
	/** Insert `-<10 random characters>` before the extension. */
	random_suffix?: boolean;
	cache_control?: string;
	content_disposition?: BlobContentDisposition;
	filename?: string;
	expires_at?: ISODateString;
	/**
	 * Hex SHA-256 of the file; a mismatch returns `BLOB_CHECKSUM_MISMATCH`. Only valid for the
	 * single-request upload and for a direct upload sent in one part: a multipart upload refuses it
	 * (`VALIDATION_ERROR`), because the storage does not compute a SHA-256 of the whole object.
	 */
	checksum_sha256?: string;
}

// ---------------------------------------------------------------------------
// Upload
// ---------------------------------------------------------------------------

/**
 * `POST /v1/objects` — single-request upload (up to the plan's `max_simple_upload_bytes`). The
 * body is `multipart/form-data` with one `file` field; options go in the query. Accepts an upload token.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/objects/upload
 */
export interface RESTPostAPIBlobObjectQuery extends RESTAPIWorkspaceQuery, RESTBlobObjectWriteOptions {
	path: string;
	/** JSON object, URL-encoded. */
	metadata?: string;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/objects/upload
 */
export type RESTPostAPIBlobObjectResponse = APIPayload<APIBlobObject>;

/**
 * `POST /v1/uploads` — starts a direct upload (single or multipart, chosen by `size`). Accepts an upload token.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/uploads/create
 */
export interface RESTPostAPIBlobUploadBody extends RESTBlobObjectWriteOptions {
	path: string;
	size: number;
	metadata?: Record<string, string>;
}
export type RESTPostAPIBlobUploadQuery = RESTAPIWorkspaceQuery;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/uploads/create
 */
export type RESTPostAPIBlobUploadResponse = APIPayload<APIBlobUpload>;

/** `GET /v1/uploads` — uploads still in progress. */
export type RESTGetAPIBlobUploadsQuery = RESTAPIWorkspaceQuery;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/uploads/list
 */
export type RESTGetAPIBlobUploadsResponse = APIPayload<APIBlobUpload[]>;

/** `GET /v1/uploads/:upload_id` — status of one upload, to resume it. Accepts an upload token. */
export type RESTGetAPIBlobUploadQuery = RESTAPIWorkspaceQuery;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/uploads/get
 */
export type RESTGetAPIBlobUploadResponse = APIPayload<APIBlobUpload>;

/**
 * `POST /v1/uploads/:upload_id/parts` — URLs for up to 100 parts. Accepts an upload token.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/uploads/parts
 */
export interface RESTPostAPIBlobUploadPartsBody {
	part_numbers: number[];
}
export type RESTPostAPIBlobUploadPartsQuery = RESTAPIWorkspaceQuery;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/uploads/parts
 */
export type RESTPostAPIBlobUploadPartsResponse = APIPayload<APIBlobUploadPart[]>;

/** `POST /v1/uploads/:upload_id/complete` — checks the parts and creates the object. Accepts an upload token. */
export type RESTPostAPIBlobUploadCompleteQuery = RESTAPIWorkspaceQuery;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/uploads/complete
 */
export type RESTPostAPIBlobUploadCompleteResponse = APIPayload<APIBlobObject>;

/** `DELETE /v1/uploads/:upload_id` — aborts an upload; repeating it is not an error. Accepts an upload token. */
export type RESTDeleteAPIBlobUploadQuery = RESTAPIWorkspaceQuery;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/uploads/abort
 */
export type RESTDeleteAPIBlobUploadResponse = APIPayload<null>;

// ---------------------------------------------------------------------------
// Objects
// ---------------------------------------------------------------------------

/**
 * `GET /v1/objects`.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/objects/list
 */
export interface RESTGetAPIBlobObjectsQuery extends RESTAPIWorkspaceQuery {
	prefix?: string;
	/** Group paths into folders at `/`. Omit it for a flat list. */
	delimiter?: "/";
	visibility?: BlobVisibility;
	cursor?: string;
	/** 1–1000. Default 100. */
	limit?: number;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/objects/list
 */
export type RESTGetAPIBlobObjectsResponse = APIPayload<APIBlobObjectList>;

/** `GET /v1/objects/:object_id`. */
export type RESTGetAPIBlobObjectQuery = RESTAPIWorkspaceQuery;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/objects/get
 */
export type RESTGetAPIBlobObjectResponse = APIPayload<APIBlobObject>;

/**
 * Fields of an object that can change. `null` restores the default; a `null` metadata value removes that key.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/objects/update
 */
export interface RESTPatchAPIBlobObjectBody {
	visibility?: BlobVisibility;
	cache_control?: string | null;
	content_disposition?: BlobContentDisposition | null;
	filename?: string | null;
	expires_at?: ISODateString | null;
	metadata?: Record<string, string | null>;
}

/** `PATCH /v1/objects/:object_id`. */
export type RESTPatchAPIBlobObjectQuery = RESTAPIWorkspaceQuery;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/objects/update
 */
export type RESTPatchAPIBlobObjectResponse = APIPayload<APIBlobObject>;

/**
 * `PATCH /v1/objects` — applies the same changes to up to 100 objects.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/objects/update-many
 */
export interface RESTPatchAPIBlobObjectsBody {
	ids: SnowFlake[];
	changes: RESTPatchAPIBlobObjectBody;
}
export type RESTPatchAPIBlobObjectsQuery = RESTAPIWorkspaceQuery;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/objects/update-many
 */
export type RESTPatchAPIBlobObjectsResponse = APIPayload<APIBlobBatchResult[]>;

/**
 * `POST /v1/objects/copy` — copies or moves an object. A move keeps the `id`; a copy creates
 * another object that counts toward storage.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/objects/copy
 */
export interface RESTPostAPIBlobObjectCopyBody {
	source: SnowFlake;
	path: string;
	move?: boolean;
	overwrite?: boolean;
	random_suffix?: boolean;
	visibility?: BlobVisibility;
}
export type RESTPostAPIBlobObjectCopyQuery = RESTAPIWorkspaceQuery;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/objects/copy
 */
export type RESTPostAPIBlobObjectCopyResponse = APIPayload<APIBlobObject>;

/** `DELETE /v1/objects/:object_id`. */
export type RESTDeleteAPIBlobObjectQuery = RESTAPIWorkspaceQuery;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/objects/delete
 */
export type RESTDeleteAPIBlobObjectResponse = APIPayload<null>;

/**
 * `DELETE /v1/objects` — up to 1000 objects per call, by `ids` or by folder `prefix` (send one of them).
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/objects/delete-many
 */
export type RESTDeleteAPIBlobObjectsBody = { ids: SnowFlake[]; prefix?: never } | { prefix: string; ids?: never };
export type RESTDeleteAPIBlobObjectsQuery = RESTAPIWorkspaceQuery;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/objects/delete-many
 */
export type RESTDeleteAPIBlobObjectsResponse = APIPayload<APIBlobDeleteResult>;

/**
 * `GET /v1/objects/:object_id/download` — temporary download link; it cannot be revoked. With
 * `redirect` true (default) the response is a `302` to the link; with `false` it is `RESTGetAPIBlobObjectDownloadResponse`.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/objects/download
 */
export interface RESTGetAPIBlobObjectDownloadQuery extends RESTAPIWorkspaceQuery {
	/** Seconds, 60–86400. Default 3600. */
	expires_in?: number;
	disposition?: BlobContentDisposition;
	filename?: string;
	redirect?: boolean;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/objects/download
 */
export type RESTGetAPIBlobObjectDownloadResponse = APIPayload<APIBlobDownload>;

// ---------------------------------------------------------------------------
// Shares
// ---------------------------------------------------------------------------

/**
 * `POST /v1/shares` — responds `201`.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/shares/create
 */
export interface RESTPostAPIBlobShareBody {
	object_id: SnowFlake;
	/** Seconds, 60 to 30 days. Default 24 hours. */
	expires_in?: number;
	/** 1–10000. */
	max_downloads?: number;
	/** 8–128 characters; plan-dependent. */
	password?: string;
}
export type RESTPostAPIBlobShareQuery = RESTAPIWorkspaceQuery;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/shares/create
 */
export type RESTPostAPIBlobShareResponse = APIPayload<APIBlobShare>;

/**
 * `GET /v1/shares`.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/shares/list
 */
export interface RESTGetAPIBlobSharesQuery extends RESTAPIWorkspaceQuery {
	object_id?: SnowFlake;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/shares/list
 */
export type RESTGetAPIBlobSharesResponse = APIPayload<APIBlobShare[]>;

/** `DELETE /v1/shares/:share_id` — revokes the share. */
export type RESTDeleteAPIBlobShareQuery = RESTAPIWorkspaceQuery;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/shares/revoke
 */
export type RESTDeleteAPIBlobShareResponse = APIPayload<null>;

/** `GET /v1/shares/public/:token` — no authentication; used by the share page. `BLOB_SHARE_NOT_FOUND` / `BLOB_SHARE_EXHAUSTED`. */
export type RESTGetAPIBlobSharePublicResponse = APIPayload<APIBlobSharePublic>;

/** `POST /v1/shares/public/:token/download` — no authentication. Counts one download and returns a temporary link. A wrong password returns `BLOB_SHARE_PASSWORD_INVALID` (rate limited). */
export interface RESTPostAPIBlobSharePublicDownloadBody {
	password?: string;
}
export type RESTPostAPIBlobSharePublicDownloadResponse = APIPayload<APIBlobDownload>;

// ---------------------------------------------------------------------------
// Folder rules
// ---------------------------------------------------------------------------

/** Rule fields a client sends; `prefix` and `created_at` are not part of the body, `active_from` is set by the platform. */
export type RESTBlobRuleInput = Omit<APIBlobRule, "prefix" | "created_at" | "active_from">;

/** `GET /v1/rules`. */
export type RESTGetAPIBlobRulesQuery = RESTAPIWorkspaceQuery;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/rules/get
 */
export type RESTGetAPIBlobRulesResponse = APIPayload<APIBlobRules>;

/**
 * `PUT /v1/rules` — replaces the whole list. Requires the `If-Match` header with the `etag` of the list you read. Returns the saved list and its new `etag`.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/rules/replace
 */
export interface RESTPutAPIBlobRulesBody {
	rules: (RESTBlobRuleInput & { prefix: string })[];
}
export type RESTPutAPIBlobRulesQuery = RESTAPIWorkspaceQuery;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/rules/replace
 */
export interface RESTPutAPIBlobRulesHeaders {
	"If-Match": string;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/rules/replace
 */
export type RESTPutAPIBlobRulesResponse = APIPayload<APIBlobRules>;

/**
 * `PUT /v1/rules/:prefix` — creates or changes one rule (URL-encode the prefix). Returns the whole list and its new `etag`.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/rules/put
 */
export type RESTPutAPIBlobRuleBody = RESTBlobRuleInput;
export type RESTPutAPIBlobRuleQuery = RESTAPIWorkspaceQuery;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/rules/put
 */
export type RESTPutAPIBlobRuleResponse = APIPayload<APIBlobRules>;

/** `DELETE /v1/rules/:prefix` (URL-encode the prefix). Returns the remaining list and its new `etag`. */
export type RESTDeleteAPIBlobRuleQuery = RESTAPIWorkspaceQuery;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/rules/delete
 */
export type RESTDeleteAPIBlobRuleResponse = APIPayload<APIBlobRules>;

// ---------------------------------------------------------------------------
// Account, upload tokens, S3 and custom domains
// ---------------------------------------------------------------------------

/** `GET /v1/stats`. */
export type RESTGetAPIBlobStatsQuery = RESTAPIWorkspaceQuery;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/account/stats
 */
export type RESTGetAPIBlobStatsResponse = APIPayload<APIBlobStats>;

/**
 * `POST /v1/upload-tokens` — creates a token that fixes every constraint below. Send `path` (one
 * file) or `prefix` (any file under a folder, random suffix forced). It stops working when the
 * API key that created it is revoked.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/account/upload-tokens
 */
export interface RESTPostAPIBlobUploadTokenBody {
	path?: string;
	prefix?: string;
	visibility?: BlobVisibility;
	max_size?: number;
	/** 1–20 extensions, lowercase, without the dot. */
	allowed_extensions?: string[];
	cache_control?: string;
	content_disposition?: BlobContentDisposition;
	expires_at?: ISODateString;
	metadata?: Record<string, string>;
	/**
	 * Allow the token to replace an existing object. Default `false`: a token without `overwrite: true`
	 * never replaces an object, even if the upload asks for `overwrite`.
	 */
	overwrite?: boolean;
	/** Seconds the token stays valid, 60–3600. Default 900. */
	expires_in?: number;
	/** 1–100. Default 1. */
	max_uses?: number;
}
export type RESTPostAPIBlobUploadTokenQuery = RESTAPIWorkspaceQuery;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/account/upload-tokens
 */
export type RESTPostAPIBlobUploadTokenResponse = APIPayload<APIBlobUploadToken>;

/** `GET /v1/s3/credentials` — read-only access when the API key only has `blob:read`. Limited to 10 calls per hour. */
export type RESTGetAPIBlobS3CredentialsQuery = RESTAPIWorkspaceQuery;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/account/s3-credentials
 */
export type RESTGetAPIBlobS3CredentialsResponse = APIPayload<APIBlobS3Credentials>;

/** `GET /v1/domains`. */
export type RESTGetAPIBlobDomainsQuery = RESTAPIWorkspaceQuery;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/domains/list
 */
export type RESTGetAPIBlobDomainsResponse = APIPayload<APIBlobCustomDomain[]>;

/**
 * `POST /v1/domains` — responds `201`. Plan-dependent.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/domains/add
 */
export interface RESTPostAPIBlobDomainBody {
	hostname: string;
	prefix?: string;
	/** Defaults to `false`. See {@link APIBlobCustomDomain.web_content}. */
	web_content?: boolean;
}
export type RESTPostAPIBlobDomainQuery = RESTAPIWorkspaceQuery;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/domains/add
 */
export type RESTPostAPIBlobDomainResponse = APIPayload<APIBlobCustomDomain>;

/** `POST /v1/domains/:domain_id/verify` — checks the ownership record, the CNAME and the certificate again. */
export type RESTPostAPIBlobDomainVerifyQuery = RESTAPIWorkspaceQuery;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/domains/verify
 */
export type RESTPostAPIBlobDomainVerifyResponse = APIPayload<APIBlobCustomDomain>;

/** `PATCH /v1/domains/:domain_id`. */
export interface RESTPatchAPIBlobDomainBody {
	/** See {@link APIBlobCustomDomain.web_content}. Takes effect within about a minute. */
	web_content?: boolean;
}
export type RESTPatchAPIBlobDomainQuery = RESTAPIWorkspaceQuery;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/domains/update
 */
export type RESTPatchAPIBlobDomainResponse = APIPayload<APIBlobCustomDomain>;

/** `DELETE /v1/domains/:domain_id`. */
export type RESTDeleteAPIBlobDomainQuery = RESTAPIWorkspaceQuery;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/blob/domains/delete
 */
export type RESTDeleteAPIBlobDomainResponse = APIPayload<null>;
