import type { ISODateString, SnowFlake } from "../../v1";
import type { APIApplication, APIDatabase } from "./index";

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/organizations
 */
export type OrganizationMemberRole =
	| "owner"
	| "admin"
	| "developer"
	| "operator"
	| "viewer";
export const OrganizationMemberRole = {
	OWNER: "owner",
	ADMIN: "admin",
	DEVELOPER: "developer",
	OPERATOR: "operator",
	VIEWER: "viewer",
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
	id: SnowFlake;
	name: SnowFlake;
	description: string;
	tags: string[];
	owner_id: SnowFlake;
	members: APIOrganizationMember[];
	created_at: ISODateString;
	updated_at: ISODateString;
}

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/organizations
 */
export interface APIOrganizationInfoResponse extends APIOrganization {
	applications: APIApplication[];
	databases: APIDatabase[];
}
