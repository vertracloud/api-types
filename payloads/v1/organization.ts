import type { ISODateString } from "../../v1";

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/organizations
 */
export type OrganizationMemberRole = "owner" | "admin" | "developer" | "viewer";
export const OrganizationMemberRole = {
	Owner: "owner",
	Admin: "admin",
	Developer: "developer",
	Viewer: "viewer",
} as const;

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/organizations
 */
export interface APIOrganizationMember {
	user_id: string;
	role: OrganizationMemberRole;
	joined_at: ISODateString;
}

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/organizations
 */
export interface APIOrganization {
	id: string;
	name: string;
	description: string;
	tags: string[];
	owner: string;
	members: APIOrganizationMember[];
	created_at: ISODateString;
	updated_at: ISODateString;
}
