import type { ISODateString, SnowFlake, UserPlan } from "../../v1";
import type { APIApplication, APIDatabase } from "./index";

/**
 * Granular workspace permission. Display group in `WORKSPACE_PERMISSIONS`.
 * The owner (`owner_id`) has no entry here: owner-only actions (rename/delete the workspace,
 * transfer ownership, link/unlink projects, deploy webhook, web publishing) are allowed for the
 * owner only, never through a permission.
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces/get
 */
export type WorkspacePermission =
	| "apps:read"
	| "apps:manage"
	| "apps:lifecycle"
	| "apps:envs"
	| "apps:files"
	| "apps:delete"
	| "databases:read"
	| "databases:manage"
	| "databases:lifecycle"
	| "databases:credentials"
	| "databases:data"
	| "databases:delete"
	| "snapshots:read"
	| "snapshots:manage"
	| "members:read"
	| "members:manage"
	| "roles:manage"
	| "activities:read";

export const WorkspacePermission = {
	APPS_READ: "apps:read",
	APPS_MANAGE: "apps:manage",
	APPS_LIFECYCLE: "apps:lifecycle",
	APPS_ENVS: "apps:envs",
	APPS_FILES: "apps:files",
	APPS_DELETE: "apps:delete",
	DATABASES_READ: "databases:read",
	DATABASES_MANAGE: "databases:manage",
	DATABASES_LIFECYCLE: "databases:lifecycle",
	DATABASES_CREDENTIALS: "databases:credentials",
	DATABASES_DATA: "databases:data",
	DATABASES_DELETE: "databases:delete",
	SNAPSHOTS_READ: "snapshots:read",
	SNAPSHOTS_MANAGE: "snapshots:manage",
	MEMBERS_READ: "members:read",
	MEMBERS_MANAGE: "members:manage",
	ROLES_MANAGE: "roles:manage",
	ACTIVITIES_READ: "activities:read",
} as const satisfies Record<string, WorkspacePermission>;

export interface WorkspacePermissionEntry {
	group: "apps" | "databases" | "snapshots" | "members" | "roles" | "activities";
}

/**
 * Closed catalog of workspace permissions. A member whose role lacks the permission a route
 * requires gets 403 `WORKSPACE_PERMISSION_DENIED`.
 */
export const WORKSPACE_PERMISSIONS: Record<WorkspacePermission, WorkspacePermissionEntry> = {
	"apps:read": { group: "apps" },
	"apps:manage": { group: "apps" },
	"apps:lifecycle": { group: "apps" },
	"apps:envs": { group: "apps" },
	"apps:files": { group: "apps" },
	"apps:delete": { group: "apps" },
	"databases:read": { group: "databases" },
	"databases:manage": { group: "databases" },
	"databases:lifecycle": { group: "databases" },
	"databases:credentials": { group: "databases" },
	"databases:data": { group: "databases" },
	"databases:delete": { group: "databases" },
	"snapshots:read": { group: "snapshots" },
	"snapshots:manage": { group: "snapshots" },
	"members:read": { group: "members" },
	"members:manage": { group: "members" },
	"roles:manage": { group: "roles" },
	"activities:read": { group: "activities" },
};

export const WORKSPACE_PERMISSION_LIST = Object.keys(WORKSPACE_PERMISSIONS) as WorkspacePermission[];

/**
 * Seed role, created together with the workspace. It can be renamed and deleted like any other
 * role (it becomes a regular role; `preset` is not restored) and counts toward the plan's role limit.
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces/get
 */
export type WorkspaceRolePreset = "admin" | "developer" | "operator" | "viewer";
export const WorkspaceRolePreset = {
	Admin: "admin",
	Developer: "developer",
	Operator: "operator",
	Viewer: "viewer",
} as const satisfies Record<string, WorkspaceRolePreset>;

/**
 * Permissions a seed role gets when the workspace is created. `admin` does NOT include
 * `snapshots:manage` (restoring/deleting snapshots is destructive); the owner can grant it per role.
 */
export function workspacePresetPermissions(preset: WorkspaceRolePreset): WorkspacePermission[] {
	switch (preset) {
		case "admin":
			return WORKSPACE_PERMISSION_LIST.filter((p) => p !== "snapshots:manage");
		case "developer":
			return ["apps:read", "apps:manage", "apps:lifecycle", "apps:envs", "apps:files", "databases:read", "databases:manage", "databases:lifecycle", "databases:credentials", "databases:data", "snapshots:read", "members:read", "activities:read"];
		case "operator":
			return ["apps:read", "apps:lifecycle", "databases:read", "databases:lifecycle", "snapshots:read", "members:read", "activities:read"];
		case "viewer":
			return ["apps:read", "databases:read", "snapshots:read", "members:read", "activities:read"];
	}
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces/roles/list
 */
export interface APIWorkspaceRole {
	id: SnowFlake;
	workspace_id: SnowFlake;
	name: string;
	permissions: WorkspacePermission[];
	/** Seed role it came from; `null` for a manually created role. Informational only. */
	preset: WorkspaceRolePreset | null;
	/** Display order. */
	position: number;
	members_count: number;
	created_at: ISODateString;
	updated_at: ISODateString;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces/members/list
 */
export interface APIWorkspaceMember {
	user_id: SnowFlake;
	role_id: SnowFlake;
	role_name: string;
	joined_at: ISODateString;
	/** When the member's access expires; `null` = never. */
	expires_at: ISODateString | null;
	user: {
		display_name: string;
		email: string;
	};
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces/get
 */
export interface APIWorkspace {
	id: SnowFlake;
	name: string;
	description: string | null;
	owner_id: SnowFlake;
	owner: { display_name: string };
	members_count: number;
	/** Soft delete timestamp. `null` = active. */
	deleted_at: ISODateString | null;
	/**
	 * `true` when the OWNER's plan does not include workspaces (it expired or was downgraded):
	 * reads keep working, every write returns `PLAN_RESTRICTED_FEATURE`. Nobody is removed — the
	 * owner must upgrade to unfreeze it.
	 */
	frozen: boolean;
	created_at: ISODateString;
	updated_at: ISODateString;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces/get
 */
export interface APIWorkspaceInfoResponse extends APIWorkspace {
	members: APIWorkspaceMember[];
	roles: APIWorkspaceRole[];
	applications: APIApplication[];
	databases: APIDatabase[];
	/** Resolved permissions of the caller. The owner always gets the full list, regardless of role. */
	permissions: WorkspacePermission[];
	is_owner: boolean;
	/** Owner's plan — it determines which features the workspace has. */
	owner_plan_id: UserPlan;
	/** The caller's saved resource organization (folders, favorites) in this workspace. */
	resource_organization: APIWorkspaceResourceOrganization;
}

export type WorkspaceResourceType = "application" | "database";
export const WorkspaceResourceType = { Application: "application", Database: "database" } as const satisfies Record<string, WorkspaceResourceType>;

export type WorkspaceResourceOrganizationScope = "personal" | "workspace";
export const WorkspaceResourceOrganizationScope = { Personal: "personal", Workspace: "workspace" } as const satisfies Record<string, WorkspaceResourceOrganizationScope>;

export type WorkspaceFolderColor = "neutral" | "red" | "orange" | "yellow" | "green" | "blue" | "purple";
export const WorkspaceFolderColor = { Neutral: "neutral", Red: "red", Orange: "orange", Yellow: "yellow", Green: "green", Blue: "blue", Purple: "purple" } as const satisfies Record<string, WorkspaceFolderColor>;
export const WORKSPACE_FOLDER_COLORS = Object.values(WorkspaceFolderColor) as WorkspaceFolderColor[];

export interface APIWorkspaceResourceRef {
	resource_type: WorkspaceResourceType;
	resource_id: SnowFlake;
}

export interface APIWorkspaceFolderItem extends APIWorkspaceResourceRef {
	position: number;
}

export interface APIWorkspaceResourceFolder {
	id: SnowFlake;
	name: string;
	color: WorkspaceFolderColor;
	position: number;
	resources: APIWorkspaceFolderItem[];
	created_at: ISODateString;
	updated_at: ISODateString;
}

export interface APIWorkspaceFavorite extends APIWorkspaceResourceRef {
	position: number;
	created_at: ISODateString;
}

export interface APIWorkspaceResourceOrganization {
	scope: WorkspaceResourceOrganizationScope;
	user_id: SnowFlake;
	workspace_id: SnowFlake | null;
	folders: APIWorkspaceResourceFolder[];
	favorites: APIWorkspaceFavorite[];
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces/invites/list
 */
export type WorkspaceInviteKind = "email" | "link";
export const WorkspaceInviteKind = { Email: "email", Link: "link" } as const satisfies Record<string, WorkspaceInviteKind>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces/invites/list
 */
export interface APIWorkspaceInvite {
	id: SnowFlake;
	workspace_id: SnowFlake;
	kind: WorkspaceInviteKind;
	/** Bound e-mail; only for `kind: "email"`. */
	email: string | null;
	role_id: SnowFlake;
	role_name: string;
	invited_by: { id: SnowFlake; display_name: string };
	expires_at: ISODateString;
	accepted_at: ISODateString | null;
	revoked_at: ISODateString | null;
	uses: number;
	/** Only for `kind: "link"`; `null` = unlimited uses. */
	max_uses: number | null;
	/** Access expiration applied to members who join through this invite; `null` = never. */
	expires_in_days: number | null;
	created_at: ISODateString;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces/invites/create
 */
export interface APIWorkspaceInviteCreated extends APIWorkspaceInvite {
	/** Invite URL; only for `kind: "link"`, shown once. */
	url: string | null;
}

/**
 * What the invitee sees before accepting (`GET /v1/workspaces/invites/:token`).
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces/invites/preview
 */
export interface APIWorkspaceInvitePreview {
	workspace: { id: SnowFlake; name: string };
	inviter: { display_name: string };
	role_name: string;
	kind: WorkspaceInviteKind;
	expires_at: ISODateString;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces/action-requests/list
 */
export type WorkspaceActionRequestAction = "app_delete" | "database_delete" | "snapshot_create" | "snapshot_restore";
export const WorkspaceActionRequestAction = {
	AppDelete: "app_delete",
	DatabaseDelete: "database_delete",
	SnapshotCreate: "snapshot_create",
	SnapshotRestore: "snapshot_restore",
} as const satisfies Record<string, WorkspaceActionRequestAction>;

export type WorkspaceActionRequestStatus = "pending" | "approved" | "rejected" | "expired";
export const WorkspaceActionRequestStatus = {
	Pending: "pending",
	Approved: "approved",
	Rejected: "rejected",
	Expired: "expired",
} as const satisfies Record<string, WorkspaceActionRequestStatus>;

/**
 * `params` of an action request, per `action`. Actions without parameters take an empty object;
 * unknown keys are rejected with `WORKSPACE_ACTION_INVALID_PARAMS`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces/action-requests/create
 */
export interface WorkspaceActionRequestParams {
	app_delete: Record<string, never>;
	database_delete: Record<string, never>;
	snapshot_create: Record<string, never>;
	/** The snapshot must belong to the request's resource. */
	snapshot_restore: { snapshot_id: SnowFlake };
}

interface APIWorkspaceActionRequestBase {
	id: SnowFlake;
	workspace_id: SnowFlake;
	resource_type: WorkspaceResourceType;
	resource_id: SnowFlake;
	resource_name: string | null;
	status: WorkspaceActionRequestStatus;
	requested_by: { id: SnowFlake; display_name: string };
	decided_by: { id: SnowFlake; display_name: string } | null;
	decided_at: ISODateString | null;
	expires_at: ISODateString;
	created_at: ISODateString;
}

/**
 * A request for a destructive/sensitive action made by a member who lacks its permission, to be
 * approved by someone who has it. Expires after 24 h without a decision. Discriminated by `action`,
 * which decides the shape of `params`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces/action-requests/list
 */
export type APIWorkspaceActionRequest = {
	[A in WorkspaceActionRequestAction]: APIWorkspaceActionRequestBase & { action: A; params: WorkspaceActionRequestParams[A] };
}[WorkspaceActionRequestAction];

/**
 * Workspace error codes. Stable English sentinels returned in `code`; clients are expected to
 * translate them.
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces/get
 */
export const WORKSPACE_ERROR_CODES = {
	WORKSPACE_NOT_FOUND: "WORKSPACE_NOT_FOUND",
	WORKSPACE_NAME_ALREADY_EXISTS: "WORKSPACE_NAME_ALREADY_EXISTS",
	WORKSPACE_MEMBER_LIMIT_REACHED: "WORKSPACE_MEMBER_LIMIT_REACHED",
	WORKSPACE_ROLE_LIMIT_REACHED: "WORKSPACE_ROLE_LIMIT_REACHED",
	WORKSPACE_ROLE_IN_USE: "WORKSPACE_ROLE_IN_USE",
	WORKSPACE_ROLE_NOT_FOUND: "WORKSPACE_ROLE_NOT_FOUND",
	WORKSPACE_ROLE_NAME_ALREADY_EXISTS: "WORKSPACE_ROLE_NAME_ALREADY_EXISTS",
	WORKSPACE_PERMISSION_DENIED: "WORKSPACE_PERMISSION_DENIED",
	WORKSPACE_PERMISSION_ESCALATION: "WORKSPACE_PERMISSION_ESCALATION",
	WORKSPACE_INVITE_NOT_FOUND: "WORKSPACE_INVITE_NOT_FOUND",
	WORKSPACE_INVITE_EXPIRED: "WORKSPACE_INVITE_EXPIRED",
	WORKSPACE_INVITE_EMAIL_MISMATCH: "WORKSPACE_INVITE_EMAIL_MISMATCH",
	/** 400 — the invited account turned off workspace invites by email. */
	WORKSPACE_INVITES_DISABLED: "WORKSPACE_INVITES_DISABLED",
	/** 409 — the account is already the owner or a member of the workspace. */
	WORKSPACE_ALREADY_MEMBER: "WORKSPACE_ALREADY_MEMBER",
	WORKSPACE_OWNER_ONLY: "WORKSPACE_OWNER_ONLY",
	WORKSPACE_ACTION_REQUEST_NOT_FOUND: "WORKSPACE_ACTION_REQUEST_NOT_FOUND",
	/** 410 — the request expired before anyone decided on it. */
	WORKSPACE_ACTION_REQUEST_EXPIRED: "WORKSPACE_ACTION_REQUEST_EXPIRED",
	/** 409 — the request was already approved or rejected. */
	WORKSPACE_ACTION_REQUEST_ALREADY_DECIDED: "WORKSPACE_ACTION_REQUEST_ALREADY_DECIDED",
	/** 400 — the requester already has the permission; perform the action directly. */
	WORKSPACE_ACTION_NOT_NEEDED: "WORKSPACE_ACTION_NOT_NEEDED",
	/** 400 — the request `params` failed the action's validation (e.g. a snapshot of another resource). */
	WORKSPACE_ACTION_INVALID_PARAMS: "WORKSPACE_ACTION_INVALID_PARAMS",
	/** 409 — a pending request already exists for the same action on the same resource. */
	WORKSPACE_ACTION_REQUEST_PENDING: "WORKSPACE_ACTION_REQUEST_PENDING",
	WORKSPACE_RESOURCE_FOLDER_NOT_FOUND: "WORKSPACE_RESOURCE_FOLDER_NOT_FOUND",
	WORKSPACE_RESOURCE_FOLDER_NAME_CONFLICT: "WORKSPACE_RESOURCE_FOLDER_NAME_CONFLICT",
	WORKSPACE_RESOURCE_NOT_FOUND: "WORKSPACE_RESOURCE_NOT_FOUND",
	PLAN_RESTRICTED_FEATURE: "PLAN_RESTRICTED_FEATURE",
} as const;
export type WorkspaceErrorCode = (typeof WORKSPACE_ERROR_CODES)[keyof typeof WORKSPACE_ERROR_CODES];
