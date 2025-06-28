import type {
	APIApplication,
	APIDatabase,
	ISODateString,
	SnowFlake,
} from "../../v1";

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
	Owner: "owner",
	Admin: "admin",
	Developer: "developer",
	Operator: "operator",
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
