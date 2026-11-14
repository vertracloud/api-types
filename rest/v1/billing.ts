import type { APIBillingAddress, APIBillingCard, APIBillingDetails, APIBillingRenewal, APIPayload, BillingTaxIdType } from "../../v1";

/** `GET /v1/users/me/billing` — API key scope `billing:read`. `response` is `null` until details are saved. */
export type RESTGetAPIBillingDetailsResponse = APIPayload<APIBillingDetails | null>;

/**
 * `PUT /v1/users/me/billing` — API key scope `billing:write`. Replaces the billing details.
 * Fails with 400 `BILLING_DETAILS_INVALID` (the field in `details.path`), 400 `TAX_ID_INVALID` and
 * 400 `PAYMENT_METHOD_UNAVAILABLE` when online payments are not available.
 */
export interface RESTPutAPIBillingDetailsBody {
	name: string;
	address: APIBillingAddress;
	/** Optional. E.164. `null` or omitted removes the saved phone. */
	phone?: string | null;
	/** Optional. `null` removes the saved document; omitting it keeps the saved one. */
	tax_id?: { type: BillingTaxIdType; value: string } | null;
}

/** `PUT /v1/users/me/billing` — API key scope `billing:write`. */
export type RESTPutAPIBillingDetailsResponse = APIPayload<APIBillingDetails>;

/** `GET /v1/users/me/cards` — Dashboard session only. Default card first. */
export type RESTGetAPIBillingCardsResponse = APIPayload<APIBillingCard[]>;

/**
 * `POST /v1/users/me/cards/setup` — Dashboard session only. Secret that saves a new card in the
 * browser. The card shows up in `GET /v1/users/me/cards` once confirmed; the first card becomes the default.
 * 400 `PAYMENT_METHOD_UNAVAILABLE` when online payments are not available. 429 `CARD_ATTEMPTS_LOCKED` after too many
 * declined attempts or new cards (`APICardAttemptsLockedDetails`). 403 `CAPTCHA_REQUIRED` when a captcha is needed right
 * now: repeat with `turnstile_token`.
 */
export interface RESTPostAPIBillingCardSetupBody {
	/** Captcha token; only needed after a `CAPTCHA_REQUIRED` answer. */
	turnstile_token?: string;
}

export type RESTPostAPIBillingCardSetupResponse = APIPayload<{ client_secret: string }>;

/** `POST /v1/users/me/cards/:cardId/default` — Dashboard session only. 404 `CARD_NOT_FOUND`. */
export type RESTPostAPIBillingCardDefaultResponse = APIPayload<APIBillingCard[]>;

/**
 * `DELETE /v1/users/me/cards/:cardId` — Dashboard session only: requires `X-Action-Code` (action `remove_card`, target the card id;
 * see `RESTPostAPIUserActionCodeBody`). 404 `CARD_NOT_FOUND` (checked before the code). Without the header: 403 `ACTION_CODE_REQUIRED`; wrong, expired or used code: 400 `ACTION_CODE_INVALID`; after too many wrong codes: 429 `TOO_MANY_ATTEMPTS`.
 * Removing the default card makes the most recent remaining card the default; without cards,
 * the plan no longer renews automatically. 400 `PAYMENT_METHOD_UNAVAILABLE` when online payments are
 * not available.
 */
export type RESTDeleteAPIBillingCardResponse = APIPayload<null>;

/** `GET /v1/users/me/billing/renewal` — Dashboard session only. */
export type RESTGetAPIBillingRenewalResponse = APIPayload<APIBillingRenewal>;

/**
 * `PATCH /v1/users/me/billing/renewal` — Dashboard session only. 400 `INVALID_PAYLOAD` for a malformed body. Turning the renewal off
 * (`auto_renew: false`) requires `X-Action-Code` (action `disable_renewal`, see `RESTPostAPIUserActionCodeBody`); turning it on does not.
 * Without the header: 403 `ACTION_CODE_REQUIRED`; wrong, expired or used code: 400 `ACTION_CODE_INVALID`; after too many wrong codes: 429 `TOO_MANY_ATTEMPTS`.
 */
export interface RESTPatchAPIBillingRenewalBody {
	/** `false` cancels the automatic renewal (no charge is made later); `true` turns it back on. */
	auto_renew: boolean;
}

/** `PATCH /v1/users/me/billing/renewal` — Dashboard session only. */
export type RESTPatchAPIBillingRenewalResponse = APIPayload<APIBillingRenewal>;
