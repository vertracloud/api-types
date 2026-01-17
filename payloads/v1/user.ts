import type { ISODateString, SnowFlake, UserPlan } from "../../v1";
import type { APIApplication, APIDatabase } from "./index";

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/users
 */
export interface APIUser {
	id: string;
	name: string;
	email: string;
	plan_id: UserPlan;
	created_at: ISODateString;
	updated_at: ISODateString;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/users
 */
export interface APIUserInfoResponse extends APIUser {
	plan: APIUserPlan;
	applications: APIApplication[];
	databases: APIDatabase[];
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
export interface APIUserOrgInviteKey {
	code: SnowFlake;
	created_at: ISODateString;
	expire_at: ISODateString;
}
