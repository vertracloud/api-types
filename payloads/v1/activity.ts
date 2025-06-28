import type { ISODateString, SnowFlake } from "../../v1";

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/activities
 */
export type ActivityStatus = "success" | "warning" | "error" | "info";
export const ActivityStatus = {
	Success: "success",
	Warning: "warning",
	Error: "error",
	Info: "info",
} as const;

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/activities
 */
export type ActivityTargetType = "app" | "database" | "organization" | "audit";
export const ActivityTargetType = {
	App: "app",
	Database: "database",
	Organization: "organization",
	Audit: "audit",
} as const;

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/activities
 */
export interface APIActivity {
	id: SnowFlake;
	status: ActivityStatus;
	target_id: string;
	target_type: ActivityTargetType;
	author_id: SnowFlake | null;
	title: string;
	message: string;
	timestamp: ISODateString;
}
