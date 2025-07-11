/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/status
 */
export type StatusType = "healthy" | "degraded" | "unknown";
export const StatusType = {
	Healthy: "healthy",
	Degraded: "degraded",
	Unknown: "unknown",
} as const;

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/status
 */
export interface APIStatus {
	status: StatusType;
	message: string;
}
