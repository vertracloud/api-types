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
export type ServicesType = "up" | "down" | "unknown";
export const ServicesType = {
	UP: "up",
	DOWN: "down",
	Unknown: "unknown",
} as const;

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/status
 */
export interface APIStatusServices {
	database: {
		status: ServicesType;
		ping: number;
	};
	cache: {
		status: ServicesType;
		ping: number;
	};
}

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/status
 */
export interface APIStatus {
	status: StatusType;
	ping: number;
	services: APIStatusServices;
	uptime: number | null;
}
