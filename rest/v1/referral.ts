import type { APIPayload, APIReferralLedgerEntry, APIReferralReferee, APIReferralSummary } from "../../v1";

/**
 * `GET /v1/referrals` — Dashboard session only. Referral program summary of the account.
 */
export type RESTGetAPIReferralsResponse = APIPayload<APIReferralSummary>;

/**
 * `GET /v1/referrals/referees` — Dashboard session only.
 */
export interface RESTGetAPIReferralRefereesQuery {
	page?: number;
}

/**
 * `GET /v1/referrals/referees` — Dashboard session only. Anonymous list of referred accounts.
 */
export type RESTGetAPIReferralRefereesResponse = APIPayload<{ items: APIReferralReferee[]; has_more: boolean }>;

/**
 * `GET /v1/referrals/ledger` — Dashboard session only.
 */
export interface RESTGetAPIReferralLedgerQuery {
	cursor?: string;
}

/**
 * `GET /v1/referrals/ledger` — Dashboard session only. Balance statement, newest first; pass `next_cursor` as `cursor` for the next page.
 */
export type RESTGetAPIReferralLedgerResponse = APIPayload<{ items: APIReferralLedgerEntry[]; next_cursor: string | null }>;

/**
 * `PATCH /v1/referrals/settings` — Dashboard session only.
 */
export interface RESTPatchAPIReferralSettingsBody {
	auto_apply_renewal: boolean;
}

/**
 * `PATCH /v1/referrals/settings` — Dashboard session only. Returns the updated summary.
 */
export type RESTPatchAPIReferralSettingsResponse = APIPayload<APIReferralSummary>;

/**
 * `POST /v1/referrals/attribution` — Dashboard session only. Credits the signed-in account to a referral
 * link; answers 204. Fails with 400 `REFERRAL_CODE_INVALID`, 400 `REFERRAL_SELF`, 409 `REFERRAL_ALREADY_ATTRIBUTED`
 * and 409 `REFERRAL_ALREADY_PAID`.
 */
export interface RESTPostAPIReferralAttributionBody {
	code: string;
}
