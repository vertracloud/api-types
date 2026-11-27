/**
 * Region where an application or database runs: `ny` (New York, USA) or `sp` (São Paulo, Brazil). Chosen on creation
 * (`region` in the create body); it never changes afterwards.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/get
 */
export type RegionId = "ny" | "sp";
export const RegionId = {
	NEW_YORK: "ny",
	SAO_PAULO: "sp",
} as const;

/** Country of a region, as an ISO 3166-1 alpha-2 code. Dashboard session only. */
export type RegionCountry = "US" | "BR";
export const RegionCountry = {
	UNITED_STATES: "US",
	BRAZIL: "BR",
} as const;

/** A region, as seen by the account that asks (`GET /v1/regions`). Dashboard session only. */
export interface APIRegion {
	id: RegionId;
	country: RegionCountry;
	/** `true` when the account can create applications and databases in this region now. */
	available: boolean;
	/** `true` for the region used when `region` is omitted on creation. Exactly one region has it. */
	default: boolean;
}
