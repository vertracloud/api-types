import type { ISODateString, SnowFlake } from "../../v1";

/**
 * @see https://docs.cloud.com/api-reference/endpoint/users
 */
export interface APIUser {
	id: SnowFlake;
	name: string;
	created_at: ISODateString;
	updated_at: ISODateString;
}
