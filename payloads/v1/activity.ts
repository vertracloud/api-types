import type { ISODateString, SnowFlake } from "../../v1";
import type { LocalizedContent } from "./notification";

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/activities
 */
export type ActivityStatus = "success" | "warning" | "error" | "info";
export const ActivityStatus = {
	Success: "success",
	Warning: "warning",
	Error: "error",
	Info: "info",
} as const;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/activities
 */
export type ActivityTargetType = "app" | "database" | "workspace" | "audit";
export const ActivityTargetType = {
	App: "app",
	Database: "database",
	Workspace: "workspace",
	Audit: "audit",
} as const;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/activities
 */
export interface APIActivity {
	id: SnowFlake;
	status: ActivityStatus;
	target_id: string;
	target_type: ActivityTargetType;
	author_id: SnowFlake | null;
	title: LocalizedContent;
	message: LocalizedContent;
	timestamp: ISODateString;
}
