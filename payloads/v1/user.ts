import type { ISODateString, SnowFlake } from "../../v1";
import type { APIApplication, APIDatabase } from "./index";

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/users
 */
export type UserPlan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export const UserPlan = {
	FREE: 1,
	ECONOMY: 2,
	PRO: 3,
	SCALE: 4,
	ENTERPRISE_4: 5,
	ENTERPRISE_8: 6,
	ENTERPRISE_16: 7,
	ENTERPRISE_32: 8,
} as const;

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/users
 */
export interface APIUser {
	id: SnowFlake;
	name: string;
	plan: UserPlan;
	created_at: ISODateString;
	updated_at: ISODateString;
}

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/users
 */
export interface APIUserPlanMemory {
	limit: number;
	used: number;
}

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/users
 */
export interface APIUserPlan {
	id: UserPlan;
	name: string;
	expires_at: ISODateString | null;
	memory: APIUserPlanMemory;
}

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/users
 */
export interface APIUserInfoResponse {
	id: SnowFlake;
	name: string;
	plan: APIUserPlan;
	applications: APIApplication[];
	databases: APIDatabase[];
	created_at: ISODateString;
	updated_at: ISODateString;
}

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/users
 */
export interface APIUserOrgInviteKey {
	code: SnowFlake;
	created_at: ISODateString;
	expire_at: ISODateString;
}
