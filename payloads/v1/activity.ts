import type { ISODateString, SnowFlake } from "../../v1";
import type { LocalizedContent } from "./notification";

/** Dashboard session only (not reachable with an API key). */
export type ActivityStatus = "success" | "warning" | "error" | "info";
export const ActivityStatus = {
	Success: "success",
	Warning: "warning",
	Error: "error",
	Info: "info",
} as const;

/** Dashboard session only (not reachable with an API key). */
export type ActivityTargetType = "app" | "database" | "workspace" | "audit";
export const ActivityTargetType = {
	App: "app",
	Database: "database",
	Workspace: "workspace",
	Audit: "audit",
} as const;

/** Dashboard session only (not reachable with an API key). */
export type ActivityOrigin = "user" | "agent" | "api_key" | "system" | "admin";
export const ActivityOrigin = {
	User: "user",
	Agent: "agent",
	ApiKey: "api_key",
	System: "system",
	Admin: "admin",
} as const;

/** Dashboard session only (not reachable with an API key). */
export interface APIActivity {
	id: SnowFlake;
	status: ActivityStatus;
	target_id: string;
	target_type: ActivityTargetType;
	author_id: SnowFlake | null;
	/** Workspace the resource belonged to; `null` outside a workspace. */
	workspace_id: SnowFlake | null;
	/** Who generated the activity; `null` when `origin` has no human author (`system`). */
	author: { id: SnowFlake; display_name: string } | null;
	origin: ActivityOrigin;
	title: LocalizedContent;
	message: LocalizedContent;
	timestamp: ISODateString;
}
