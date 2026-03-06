import type { ISODateString, SnowFlake } from "../../v1";

/**
 * Notification type:
 * 1 = Simple text notification
 * 2 = Notification with image/video attachment
 */
export type NotificationType = 1 | 2;

export const NotificationType = {
	SIMPLE: 1,
	ATTACHMENT: 2,
} as const;

/**
 * Notification importance level.
 */
export type NotificationImportance = "low" | "medium" | "high" | "critical";

export const NotificationImportance = {
	LOW: "low",
	MEDIUM: "medium",
	HIGH: "high",
	CRITICAL: "critical",
} as const;

export interface LocalizedContent {
	"en-us": string;
	"pt-br"?: string;
	"es-es"?: string;
	[key: string]: string | undefined;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/notifications
 */
export interface APINotification {
	id: SnowFlake;
	type: NotificationType;
	importance: NotificationImportance;
	title: LocalizedContent;
	message: LocalizedContent;
	attachment_url: string | null;
	show_on_dashboard: boolean;
	is_read: boolean;
	created_at: ISODateString;
	expires_at: ISODateString;
}
