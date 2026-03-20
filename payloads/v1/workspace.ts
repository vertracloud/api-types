import type { ISODateString, SnowFlake } from "../../v1";
import type { APIApplication, APIDatabase } from "./index";

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces
 */
export type WorkspaceMemberRole = "owner" | "admin" | "developer" | "operator" | "viewer";
export const WorkspaceMemberRole = {
	OWNER: "owner",
	ADMIN: "admin",
	DEVELOPER: "developer",
	OPERATOR: "operator",
	VIEWER: "viewer",
} as const;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces
 */
export interface APIWorkspaceMember {
	user_id: string;
	role: WorkspaceMemberRole;
	joined_at: ISODateString;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces
 */
export interface APIWorkspace {
	id: SnowFlake;
	name: string;
	description: string | null;
	owner_id: SnowFlake;
	members: APIWorkspaceMember[];
	created_at: ISODateString;
	updated_at: ISODateString;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces
 */
export interface APIWorkspaceInfoResponse extends APIWorkspace {
	applications: APIApplication[];
	databases: APIDatabase[];
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces
 */
export interface APIWorkspaceMemberAdd {
	id: string;
	email: string;
	role: WorkspaceMemberRole;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces
 */
export interface APIWorkspaceMemberRoleUpdate {
	user_id: string;
	role: WorkspaceMemberRole;
}
