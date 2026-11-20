import type { APIErrorCode, ApplicationType, DatabaseType, ISODateString, SnowFlake } from "../../v1";

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/users/snapshots
 */
export type ResourceType = 1 | 2;
export const ResourceType = {
	APPLICATION: 1,
	DATABASE: 2,
} as const;

/**
 * `resource_type` of a snapshot: the resource's own type at snapshot time — `ApplicationType` for
 * an application snapshot, `DatabaseType` (the engine) for a database snapshot.
 * @see https://docs.vertracloud.app/api-reference/endpoint/users/snapshots
 */
export type SnapshotResourceType = ApplicationType | DatabaseType;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/users/snapshots
 */
export interface APIResourceSnapshot {
	id: SnowFlake;
	resource_id: SnowFlake;
	resource_type: SnapshotResourceType | null;
	size: string;
	date: ISODateString;
	/**
	 * Name the resource had when this snapshot was taken — frozen: it does not follow renames and
	 * is kept after the project is deleted. `null` for snapshots taken before this field existed.
	 * For the CURRENT resource name, use `APIGroupedResourceSnapshots.resource_name`.
	 */
	resource_name: string | null;
	/**
	 * `true` for a snapshot of an application that came from a closed template. It cannot be downloaded (not even after the
	 * application is deleted), only restores into an application of the same template, and an application created from it stays
	 * closed; anything else returns `TEMPLATE_CLOSED`. Absent or `false` otherwise.
	 */
	closed?: boolean;
	/** What took the snapshot. Absent on snapshots that predate this field. */
	origin?: SnapshotOrigin;
	/**
	 * Applications only: files that kept changing while the snapshot was read, so their content may be from different
	 * moments. `0` or absent: none.
	 */
	changed_files?: number;
}

/**
 * What took a snapshot: you (`manual`) or the platform (`automatic`: the plan's daily backup, or the snapshot taken before
 * the platform removes a resource, for example when the plan expires).
 */
export type SnapshotOrigin = "manual" | "automatic";
export const SnapshotOrigin = {
	MANUAL: "manual",
	AUTOMATIC: "automatic",
} as const;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/users/snapshots
 */
export interface APIGroupedResourceSnapshots {
	resource_id: SnowFlake;
	/**
	 * CURRENT resource name. If the resource was deleted, falls back to the `resource_name` of the
	 * group's most recent snapshot; `null` only when neither exists.
	 */
	resource_name: string | null;
	type: ResourceType;
	resource_type: SnapshotResourceType | null;
	snapshots: APIResourceSnapshot[];
}

/**
 * Query of the snapshot routes under `/v1/users/...`: which kind of resource the snapshot belongs
 * to. Required — a missing `scope` returns 400.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/users/snapshots
 */
export type SnapshotScope = "applications" | "databases";
export const SnapshotScope = {
	APPLICATIONS: "applications",
	DATABASES: "databases",
} as const;

/**
 * Warning of a snapshot of an application that runs a custom Docker image. `IMAGE_VERSION_NOT_FOUND`: the image version
 * the snapshot recorded was removed by retention, so the application stays on its current version.
 */
export type APISnapshotImageWarning = "IMAGE_VERSION_NOT_FOUND";

/**
 * The restore was accepted (HTTP 202) and runs as a job: the resource is not restored yet. Follow `job_id` on
 * `GET /v1/users/:id/snapshots/jobs/:job_id`, where `:id` is the resource being restored.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/snapshots/restore
 */
export interface APISnapshotRestoreAccepted {
	job_id: SnowFlake;
	/** Set when `restore_image_version` was requested but the image version recorded in the snapshot no longer exists: only the data is restored. */
	warning?: APISnapshotImageWarning;
}

/**
 * The snapshot was accepted (HTTP 202) but did not finish within 90 seconds: it is still being taken. Follow `job_id` on
 * `GET /v1/users/:id/snapshots/jobs/:job_id`; once the job is `ready` its `snapshot_id` is the new snapshot, which also shows up in the list.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/snapshots/create
 */
export interface APISnapshotCreateAccepted {
	job_id: SnowFlake;
}

/** Which limit refused the snapshot (the `scope` of `APISnapshotRateLimitedDetails`): the interval of the resource or the quota of the account. */
export type SnapshotRateLimitScope = "resource" | "account";
export const SnapshotRateLimitScope = {
	RESOURCE: "resource",
	ACCOUNT: "account",
} as const;

/** The `details` of the `SNAPSHOT_RATE_LIMITED` error (HTTP 429). The `Retry-After` header carries `retry_after`. */
export interface APISnapshotRateLimitedDetails {
	scope: SnapshotRateLimitScope;
	/** Seconds until a new snapshot is accepted. */
	retry_after: number;
	/** ISO 8601 time at which the account quota frees a slot again. Sent only when `scope` is `account`. */
	resets_at?: ISODateString;
}

/** The `details` of the `SNAPSHOT_TOO_LARGE` error (HTTP 413). */
export interface APISnapshotTooLargeDetails {
	/** Largest content, in bytes, a snapshot of the resource can have. */
	max_bytes: number;
}

/** The `details` of the `SNAPSHOT_EXCEEDS_STORAGE` error (HTTP 400): the snapshot does not fit in the target. */
export interface APISnapshotExceedsStorageDetails {
	/** Space the snapshot needs, in bytes. */
	required_bytes: number;
	/** Space the target has, in bytes. */
	available_bytes: number;
	/** Databases only: the smallest memory size, in MB, whose storage has room for the snapshot. */
	required_ram_mb?: number;
}

/** The `details` of the `RESTORE_COOLDOWN` error (HTTP 429). The `Retry-After` header carries the same seconds. */
export interface APIRestoreCooldownDetails {
	/** Seconds until a restore of this resource is accepted again. */
	retry_after: number;
}

/**
 * The `details` of the `OPERATION_IN_PROGRESS` error (HTTP 409) when creating a snapshot: a manual snapshot is already queued or running.
 * `job_id` is sent only when that snapshot is of the same resource; follow it on `GET /v1/users/:id/snapshots/jobs/:job_id`.
 */
export interface APIOperationInProgressDetails {
	job_id?: SnowFlake;
}

/** What a job does: take a snapshot or restore one. */
export type SnapshotJobKind = "snapshot" | "restore";
export const SnapshotJobKind = {
	SNAPSHOT: "snapshot",
	RESTORE: "restore",
} as const;

/**
 * Where a job is: `queued` (waiting to start), `running`, `ready` (done), `skipped` (nothing was done: the resource
 * went away meanwhile, or the database was stopped; `reason` says which) or `failed` (`reason` says why). `ready`, `skipped`
 * and `failed` are final: the job does not change again.
 */
export type SnapshotJobStatus = "queued" | "running" | "ready" | "skipped" | "failed";
export const SnapshotJobStatus = {
	QUEUED: "queued",
	RUNNING: "running",
	READY: "ready",
	SKIPPED: "skipped",
	FAILED: "failed",
} as const;

export type SnapshotJobPhase = "preparing" | "copying" | "finishing";
export const SnapshotJobPhase = { PREPARING: "preparing", COPYING: "copying", FINISHING: "finishing" } as const;

/** Progress of a running job. Absent while the job is queued, once it ends, or when it is not known. */
export interface APISnapshotJobProgress {
	phase: SnapshotJobPhase;
	/** Overall progress, 0–100. Absent when the total size is not known (database snapshots). */
	percent?: number;
	done_bytes?: number;
	total_bytes?: number;
	/** Estimated seconds left. Absent until there is a stable rate. */
	eta_seconds?: number;
}

/**
 * A snapshot or restore job of a resource: what the dashboard shows as the last backup and as "in progress".
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/snapshots/jobs/get
 */
export interface APISnapshotJob {
	id: SnowFlake;
	kind: SnapshotJobKind;
	/** The resource the job acts on: the one being backed up, or the target of a restore. */
	resource_id: SnowFlake;
	/** Snapshot jobs only: what asked for the snapshot (the `origin` the snapshot gets). Absent on restore jobs. */
	origin?: SnapshotOrigin;
	status: SnapshotJobStatus;
	/** Why the job `failed` or was `skipped`, as an error code. Absent otherwise. */
	reason?: APIErrorCode;
	/** The same `details` the error `reason` would carry on a direct response, when it has any. Only with `reason`. */
	details?: APISnapshotTooLargeDetails | APISnapshotExceedsStorageDetails;
	/**
	 * Snapshot jobs: the snapshot the job produced; always set once the job is `ready`. Restore jobs: the snapshot being
	 * restored, set from the start.
	 */
	snapshot_id?: SnowFlake;
	created_at: ISODateString;
	/** Absent while `queued`. */
	started_at?: ISODateString;
	/** Absent until the job ends. */
	finished_at?: ISODateString;
	/** Only while `running`. */
	progress?: APISnapshotJobProgress;
}
