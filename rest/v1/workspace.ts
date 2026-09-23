import type {
	APIPayload,
	APIWorkspace,
	APIWorkspaceActionRequest,
	APIWorkspaceInfoResponse,
	APIWorkspaceInvite,
	APIWorkspaceInviteCreated,
	APIWorkspaceInvitePreview,
	APIWorkspaceMember,
	APIWorkspaceResourceFolder,
	APIWorkspaceResourceOrganization,
	APIWorkspaceRole,
	ISODateString,
	WorkspaceActionRequestAction,
	WorkspaceActionRequestParams,
	WorkspaceActionRequestStatus,
	WorkspaceFolderColor,
	WorkspacePermission,
} from "../../v1";

// ---------------------------------------------------------------------------
// Workspace
// ---------------------------------------------------------------------------

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces/get
 */
export type RESTGetAPIWorkspaceInfoResponse = APIPayload<APIWorkspaceInfoResponse>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces/get-all
 */
export type RESTGetAPIWorkspacesResponse = APIPayload<APIWorkspace[]>;

/**
 * `POST /v1/workspaces` — the caller becomes the owner (requires a plan with workspaces).
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces/create
 */
export interface RESTPostAPIWorkspaceCreateBody {
	name: string;
	description?: string;
}
/** Returns the full workspace view, same as `GET /v1/workspaces/:id`. */
export type RESTPostAPIWorkspaceCreateResponse = APIPayload<APIWorkspaceInfoResponse>;

/**
 * `PUT /v1/workspaces/:id` — owner only. At least one field.
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces/update
 */
export type RESTPutAPIWorkspaceUpdateBody = Partial<RESTPostAPIWorkspaceCreateBody>;
export type RESTPutAPIWorkspaceUpdateResponse = APIPayload<APIWorkspace>;

/**
 * `DELETE /v1/workspaces/:id` — soft delete, owner only.
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces/delete
 */
export type RESTDeleteAPIWorkspaceResponse = APIPayload<null>;

/**
 * `POST /v1/workspaces/:id/transfer-ownership` — owner only.
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces/transfer-ownership
 */
export interface RESTPostAPIWorkspaceTransferOwnershipBody {
	user_id: string;
}
export type RESTPostAPIWorkspaceTransferOwnershipResponse = APIPayload<APIWorkspace>;

// ---------------------------------------------------------------------------
// Saved resource organization
// ---------------------------------------------------------------------------

export interface RESTPostAPIWorkspaceResourceFolderBody {
	name: string;
	color?: WorkspaceFolderColor;
	position?: number;
}
export type RESTPostAPIWorkspaceResourceFolderResponse = APIPayload<APIWorkspaceResourceFolder>;

export interface RESTPatchAPIWorkspaceResourceFolderBody {
	name?: string;
	color?: WorkspaceFolderColor;
	position?: number;
}
export type RESTPatchAPIWorkspaceResourceFolderResponse = APIPayload<APIWorkspaceResourceFolder>;
export type RESTDeleteAPIWorkspaceResourceFolderResponse = APIPayload<null>;

export interface RESTPutAPIWorkspaceResourceFolderResourceBody {
	position?: number;
}
export type RESTPutAPIWorkspaceResourceFolderResourceResponse = APIPayload<APIWorkspaceResourceOrganization>;
export type RESTDeleteAPIWorkspaceResourceFolderResourceResponse = APIPayload<APIWorkspaceResourceOrganization>;

export interface RESTPutAPIWorkspaceFavoriteBody {
	position?: number;
}
export type RESTPutAPIWorkspaceFavoriteResponse = APIPayload<APIWorkspaceResourceOrganization>;
export type RESTDeleteAPIWorkspaceFavoriteResponse = APIPayload<APIWorkspaceResourceOrganization>;

// ---------------------------------------------------------------------------
// Members
// ---------------------------------------------------------------------------

/**
 * `GET /v1/workspaces/:id/members` — permission `members:read`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces/members/list
 */
export type RESTGetAPIWorkspaceMembersResponse = APIPayload<APIWorkspaceMember[]>;

/**
 * `PUT /v1/workspaces/:id/members/:user_id` — permission `members:manage`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces/members/update
 */
export interface RESTPutAPIWorkspaceMemberBody {
	role_id?: string;
	expires_at?: ISODateString | null;
}
export type RESTPutAPIWorkspaceMemberResponse = APIPayload<APIWorkspaceMember>;

/**
 * `DELETE /v1/workspaces/:id/members/:user_id` — permission `members:manage`, or the member leaving on their own.
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces/members/remove
 */
export type RESTDeleteAPIWorkspaceMemberResponse = APIPayload<null>;

// ---------------------------------------------------------------------------
// Roles
// ---------------------------------------------------------------------------

/**
 * `GET /v1/workspaces/:id/roles` — permission `members:read`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces/roles/list
 */
export type RESTGetAPIWorkspaceRolesResponse = APIPayload<APIWorkspaceRole[]>;

/**
 * `POST /v1/workspaces/:id/roles` — permission `roles:manage`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces/roles/create
 */
export interface RESTPostAPIWorkspaceRoleBody {
	name: string;
	permissions: WorkspacePermission[];
	position?: number;
}
export type RESTPostAPIWorkspaceRoleResponse = APIPayload<APIWorkspaceRole>;

/**
 * `PUT /v1/workspaces/:id/roles/:role_id` — permission `roles:manage`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces/roles/update
 */
export type RESTPutAPIWorkspaceRoleBody = RESTPostAPIWorkspaceRoleBody;
export type RESTPutAPIWorkspaceRoleResponse = APIPayload<APIWorkspaceRole>;

/**
 * `DELETE /v1/workspaces/:id/roles/:role_id` — permission `roles:manage`. A role still used by a
 * member or pending invite is rejected with `WORKSPACE_ROLE_IN_USE`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces/roles/delete
 */
export type RESTDeleteAPIWorkspaceRoleResponse = APIPayload<null>;

// ---------------------------------------------------------------------------
// Invites
// ---------------------------------------------------------------------------

/**
 * `GET /v1/workspaces/:id/invites` — permission `members:manage`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces/invites/list
 */
export type RESTGetAPIWorkspaceInvitesResponse = APIPayload<APIWorkspaceInvite[]>;

/**
 * `POST /v1/workspaces/:id/invites` — permission `members:manage`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces/invites/create
 */
export type RESTPostAPIWorkspaceInviteBody = { kind: "email"; email: string; role_id: string; expires_in_days?: number } | { kind: "link"; role_id: string; max_uses?: number; expires_in_days?: number };
export type RESTPostAPIWorkspaceInviteResponse = APIPayload<APIWorkspaceInviteCreated>;

/**
 * `DELETE /v1/workspaces/:id/invites/:invite_id` — permission `members:manage`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces/invites/revoke
 */
export type RESTDeleteAPIWorkspaceInviteResponse = APIPayload<null>;

/**
 * `GET /v1/workspaces/invites/:token` — any authenticated user.
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces/invites/preview
 */
export type RESTGetAPIWorkspaceInvitePreviewResponse = APIPayload<APIWorkspaceInvitePreview>;

/**
 * `POST /v1/workspaces/invites/:token/accept` — any authenticated user.
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces/invites/accept
 */
export type RESTPostAPIWorkspaceInviteAcceptResponse = APIPayload<Pick<APIWorkspace, "id" | "name">>;

/**
 * `POST /v1/workspaces/invites/:token/decline` — any authenticated user.
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces/invites/decline
 */
export type RESTPostAPIWorkspaceInviteDeclineResponse = APIPayload<null>;

// ---------------------------------------------------------------------------
// Projects (apps/databases) — owner only
// ---------------------------------------------------------------------------

/**
 * `POST /v1/workspaces/:id/apps/:app_id` and `POST /v1/workspaces/:id/databases/:db_id` — owner only.
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces/links/add-app
 */
export type RESTPostAPIWorkspaceResourceLinkResponse = APIPayload<null>;

/**
 * `DELETE /v1/workspaces/:id/apps/:app_id` and `DELETE /v1/workspaces/:id/databases/:db_id` — owner only.
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces/links/remove-app
 */
export type RESTDeleteAPIWorkspaceResourceLinkResponse = APIPayload<null>;

// ---------------------------------------------------------------------------
// Action requests
// ---------------------------------------------------------------------------

/**
 * `GET /v1/workspaces/:id/action-requests` — permission `members:manage`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces/action-requests/list
 */
export interface RESTGetAPIWorkspaceActionRequestsQuery {
	status?: WorkspaceActionRequestStatus;
}
export type RESTGetAPIWorkspaceActionRequestsResponse = APIPayload<APIWorkspaceActionRequest[]>;

/**
 * `POST /v1/workspaces/:id/action-requests` — any member (who lacks the action's permission).
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces/action-requests/create
 */
export type RESTPostAPIWorkspaceActionRequestBody = {
	[A in WorkspaceActionRequestAction]: { action: A; resource_id: string } & (WorkspaceActionRequestParams[A] extends Record<string, never> ? { params?: WorkspaceActionRequestParams[A] } : { params: WorkspaceActionRequestParams[A] });
}[WorkspaceActionRequestAction];
export type RESTPostAPIWorkspaceActionRequestResponse = APIPayload<APIWorkspaceActionRequest>;

/**
 * `POST /v1/workspaces/:id/action-requests/:rid/approve` — permission `members:manage` plus
 * the permission the action requires.
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces/action-requests/approve
 */
export type RESTPostAPIWorkspaceActionRequestApproveResponse = APIPayload<APIWorkspaceActionRequest>;

/**
 * `POST /v1/workspaces/:id/action-requests/:rid/reject` — permission `members:manage`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces/action-requests/reject
 */
export type RESTPostAPIWorkspaceActionRequestRejectResponse = APIPayload<APIWorkspaceActionRequest>;

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

/**
 * `GET /v1/workspaces/:id/activities/export` — permission `activities:read`. CSV, 90-day window.
 * Dashboard session only.
 */
export interface RESTGetAPIWorkspaceActivitiesExportQuery {
	from?: ISODateString;
	to?: ISODateString;
}
