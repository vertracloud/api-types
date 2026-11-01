import type { APIPayload, APIPlansCatalog } from "../../v1";

/**
 * `GET /v1/plans`. Public, no authentication. The plans currently for sale and the billing periods
 * with their discounts.
 */
export type RESTGetAPIPlansResponse = APIPayload<APIPlansCatalog>;
