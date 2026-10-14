import type { ISODateString, SnowFlake } from "../../v1";
import type { APIErrorCode } from "./api-error";

/** Who can read an object by its public URL. `private` objects need a temporary link or a share. */
export type BlobVisibility = "public" | "private";
export const BlobVisibility = { PUBLIC: "public", PRIVATE: "private" } as const satisfies Record<string, BlobVisibility>;

/** How a browser treats the file: shown in the page (`inline`) or saved (`attachment`). */
export type BlobContentDisposition = "inline" | "attachment";
export const BlobContentDisposition = {
	INLINE: "inline",
	ATTACHMENT: "attachment",
} as const satisfies Record<string, BlobContentDisposition>;

/** `single` = one `PUT` to one URL; `multipart` = several parts, each with its own URL. */
export type BlobUploadMode = "single" | "multipart";
export const BlobUploadMode = { SINGLE: "single", MULTIPART: "multipart" } as const satisfies Record<string, BlobUploadMode>;

export type BlobUploadStatus = "pending" | "completed" | "aborted" | "expired";
export const BlobUploadStatus = {
	PENDING: "pending",
	COMPLETED: "completed",
	ABORTED: "aborted",
	EXPIRED: "expired",
} as const satisfies Record<string, BlobUploadStatus>;

export type BlobCustomDomainStatus = "pending" | "active" | "failed" | "suspended";
export const BlobCustomDomainStatus = {
	PENDING: "pending",
	ACTIVE: "active",
	FAILED: "failed",
	SUSPENDED: "suspended",
} as const satisfies Record<string, BlobCustomDomainStatus>;

/** A stored file. The `id` never changes; `path` can (move, rename). */
export interface APIBlobObject {
	id: SnowFlake;
	/** Full path inside the account, for example `images/avatars/joao.png`. */
	path: string;
	size: number;
	content_type: string;
	etag: string;
	/** SHA-256 (hex) of the content, when the upload sent a checksum. */
	sha256: string | null;
	visibility: BlobVisibility;
	/** Public URL; `null` while the object is private. */
	url: string | null;
	/** `immutable`, `max-age=<seconds>` or `no-cache` (plan-dependent); `null` = default. */
	cache_control: string | null;
	content_disposition: BlobContentDisposition;
	/** File name suggested on download; `null` = the last segment of `path`. */
	filename: string | null;
	/** Up to 5 keys (`[a-z0-9-]{1,64}`) and 512 bytes in total; plan-dependent. */
	metadata: Record<string, string>;
	expires_at: ISODateString | null;
	created_at: ISODateString;
	updated_at: ISODateString;
}

/** Result of listing objects: one page of files plus the folders found under the prefix. */
export interface APIBlobObjectList {
	objects: APIBlobObject[];
	/** Folder prefixes ending in `/` (empty without a `delimiter`). */
	folders: string[];
	/** Pass back as `cursor` for the next page; `null` = last page. */
	cursor: string | null;
}

/** A direct upload in progress. Bytes go straight to the URLs, not through the API. */
export interface APIBlobUpload {
	id: SnowFlake;
	/** Final path (with the random suffix, when requested). */
	path: string;
	mode: BlobUploadMode;
	status: BlobUploadStatus;
	size: number;
	/** When the URLs and the reserved storage expire. */
	expires_at: ISODateString;
	/** `single` mode: URL to `PUT` the whole file to. */
	url?: string;
	/** Headers the `PUT` must send exactly as given. */
	headers: Record<string, string>;
	/** `multipart` mode: fixed part size (the last part can be smaller). */
	part_size?: number;
	part_count?: number;
	/** Part numbers already stored; use it to resume an interrupted upload. */
	uploaded_parts?: number[];
	created_at: ISODateString;
}

export interface APIBlobUploadPart {
	part_number: number;
	url: string;
	size: number;
	/** Headers the `PUT` of this part must send exactly as given. */
	headers: Record<string, string>;
}

/** Plan limits that apply to Blob Storage, so clients need not hardcode them. */
export interface APIBlobLimits {
	/** Largest file accepted by the single-request upload. */
	max_simple_upload_bytes: number;
	/** Largest file that can be sent in one part of a direct upload. */
	max_single_put_bytes: number;
	max_object_bytes: number;
	min_part_bytes: number;
	max_part_bytes: number;
	max_parts: number;
	max_open_uploads: number;
	/** `null` = no limit of its own. */
	uploads_per_second: number | null;
	max_rules: number;
	max_custom_domains: number;
	metadata_enabled: boolean;
	share_password_enabled: boolean;
	/** Whether `cache_control: "no-cache"` is allowed. */
	no_cache_enabled: boolean;
	/** Shortest accepted `expires_at` from now, in seconds. */
	min_expiration_seconds: number;
	/** 0 = image transformation is not included in the plan. */
	image_transformations_per_month: number;
}

export interface APIBlobStats {
	objects: number;
	used_bytes: number;
	quota_bytes: number;
	/** Above 0 only after a plan downgrade. */
	over_quota_bytes: number;
	/** Estimated overage charge, in cents, billed on renewal. */
	estimated_overage_cents: number;
	month_average_bytes: number;
	/** Image transformations used in the current month. */
	image_transformations_used: number;
	/** Base URL of the public files of the account. */
	public_base_url: string;
	limits: APIBlobLimits;
}

/** One item of a batch update. */
export interface APIBlobBatchResult {
	id: SnowFlake;
	ok: boolean;
	/** Set when `ok` is `false`. */
	code?: APIErrorCode;
	/** Set when `ok` is `true`. */
	object?: APIBlobObject;
}

export interface APIBlobDeleteResult {
	deleted: SnowFlake[];
	not_found: SnowFlake[];
	/** `true` when more objects match and another call is needed. */
	remaining: boolean;
}

/** Temporary download link, returned when `redirect=false`. */
export interface APIBlobDownload {
	url: string;
	expires_at: ISODateString;
}

/** Short-lived credential for browsers and untrusted clients; usable only on the upload routes. */
export interface APIBlobUploadToken {
	/** Starts with `vcup_`. Shown once. */
	token: string;
	expires_at: ISODateString;
	max_uses: number;
}

export interface APIBlobShare {
	id: SnowFlake;
	object_id: SnowFlake;
	/** Share page URL. */
	url: string;
	expires_at: ISODateString;
	max_downloads: number | null;
	remaining_downloads: number | null;
	has_password: boolean;
	/** `true` = the object is public, so the share does not protect it. */
	object_is_public: boolean;
	created_at: ISODateString;
}

/** What the public share page shows before the download. No sign-in needed; the token is the credential. */
export interface APIBlobSharePublic {
	filename: string;
	size: number;
	content_type: string;
	has_password: boolean;
	expires_at: ISODateString;
	remaining_downloads: number | null;
}

/** Defaults and limits applied to every object under a folder prefix. The longest matching prefix wins. */
export interface APIBlobRule {
	/** Folder prefix, always stored with a trailing `/`. */
	prefix: string;
	/** Default visibility of new objects in the folder. */
	visibility?: BlobVisibility;
	/** Default expiration of each new object, in seconds. */
	expire_seconds?: number;
	/** Largest accepted file, 512 bytes to 10 GB. */
	max_size?: number;
	/** Accepted extensions (1–50), lowercase, without the dot. */
	extensions?: string[];
	cache_control?: string;
	/** Delete objects this many days after upload (1–3650). */
	delete_after_days?: number;
	/** When `delete_after_days` starts to apply. */
	active_from?: ISODateString;
	created_at: ISODateString;
}

/** The rule list and the version tag to send back as `If-Match` when replacing it. */
export interface APIBlobRules {
	rules: APIBlobRule[];
	etag: string;
}

/** S3-compatible credentials, derived from the API key that requested them. */
export interface APIBlobS3Credentials {
	access_key_id: string;
	secret_access_key: string;
	endpoint: string;
	region: "auto";
	buckets: ["public", "private"];
	access: { read: boolean; write: boolean };
}

export interface APIBlobCustomDomain {
	id: SnowFlake;
	/** Subdomain only (`cdn.example.com`). */
	hostname: string;
	status: BlobCustomDomainStatus;
	ssl_status: string;
	/** Point a CNAME record of `hostname` to this value. */
	cname_target: string;
	/** When set, the domain serves only this folder. */
	prefix: string | null;
	/**
	 * Ownership proof: publish this `TXT` record at `name` with the exact `value`. The domain only becomes
	 * `active` after it resolves (and the CNAME and certificate are ready). `null` once the domain is active.
	 */
	verification?: { type: "txt"; name: string; value: string } | null;
	created_at: ISODateString;
}
