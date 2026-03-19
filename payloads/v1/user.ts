import type { ISODateString, SnowFlake, UserPlan } from "../../v1";
import type { APIUserCredits } from "./credits";
import type { APIApplication, APIDatabase } from "./index";

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/users
 */
export interface APIUser {
	id: string;
	name: string;
	email: string;
	plan_id: UserPlan;
	language: string;
	created_at: ISODateString;
	updated_at: ISODateString;
}

export interface APIUserConnection {
	provider: string;
	username: string;
	created_at: ISODateString | string;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/users
 */
export interface APIUserInfoResponse extends APIUser {
	plan: APIUserPlan;
	applications: APIApplication[];
	databases: APIDatabase[];
	connections: APIUserConnection[];
	credits: APIUserCredits;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/users
 */
export interface APIUserPlanMemory {
	limit: number;
	used: number;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/users
 */
export interface APIUserPlan {
	id: UserPlan;
	name: string;
	expires_at: ISODateString | null;
	duration: number;
	memory: APIUserPlanMemory;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/users
 */
export interface APIUserWorkspaceInviteKey {
	code: SnowFlake;
	created_at: ISODateString;
	expires_at: ISODateString;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/users
 */
export interface APIUserSession {
	id: string;
	user_id: string;
	provider: string;
	ip_address: string | null;
	location: string | null;
	device: string | null;
	expires_at: ISODateString;
	created_at: ISODateString;
	updated_at: ISODateString;
}
