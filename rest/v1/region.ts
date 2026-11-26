import type { APIPayload, APIRegion } from "../../v1";

/** `GET /v1/regions` — every region, with `available` and `default` for the account that asks. Dashboard session only. */
export type RESTGetAPIRegionsResponse = APIPayload<APIRegion[]>;
