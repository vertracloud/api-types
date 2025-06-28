import type { ISODateString, SnowFlake } from "../../v1";

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/activities
 */
export type ActivityType = "success" | "warning" | "error" | "info";
export const ActivityType = {
	Success: "success",
	Warning: "warning",
	Error: "error",
	Info: "info",
} as const;

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/activities
 */
export interface APIActivity {
	id: SnowFlake;
	author_id: SnowFlake | null;
	type: ActivityType;
	message: string;
	timestamp: ISODateString;
}
