import type { APICreditBalance, APICreditCostEstimate, APICreditUsage, APIPayload } from "../../v1";

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/credits/balance
 */
export type RESTGetAPICreditBalanceResponse = APIPayload<APICreditBalance>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/credits/usage
 */
export type RESTGetAPICreditUsageResponse = APIPayload<APICreditUsage[]>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/credits/cost
 */
export type RESTGetAPICreditCostEstimateResponse = APIPayload<APICreditCostEstimate>;
