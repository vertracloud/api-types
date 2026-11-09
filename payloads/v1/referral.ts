import type { ISODateString, PlanFamily } from "../../v1";

/**
 * Status of a referral link. Dashboard session only.
 */
export type ReferralLinkStatus = "active" | "disabled";
export const ReferralLinkStatus = {
	ACTIVE: "active",
	DISABLED: "disabled",
} as const;

/**
 * Status of a referral. Dashboard session only.
 * - `attributed`: the account came through the link and has not paid yet.
 * - `qualified`: the account paid; the referrer earns balance on its payments.
 * - `no_reward`: this referral doesn't earn a reward.
 *
 * Referred accounts are anonymous: the status never says why a referral earns nothing.
 */
export type ReferralStatus = "attributed" | "qualified" | "no_reward";
export const ReferralStatus = {
	ATTRIBUTED: "attributed",
	QUALIFIED: "qualified",
	NO_REWARD: "no_reward",
} as const;

/**
 * Kind of a referral balance movement. Dashboard session only.
 */
export type ReferralLedgerKind = "release" | "spend" | "spend_return" | "revoke" | "restore" | "expire" | "adjustment";
export const ReferralLedgerKind = {
	RELEASE: "release",
	SPEND: "spend",
	SPEND_RETURN: "spend_return",
	REVOKE: "revoke",
	RESTORE: "restore",
	EXPIRE: "expire",
	ADJUSTMENT: "adjustment",
} as const;

/**
 * The account's referral link. Dashboard session only.
 */
export interface APIReferralLink {
	code: string;
	/** Full shareable URL of the link. */
	url: string;
	status: ReferralLinkStatus;
}

/**
 * Referral balance of the account, in BRL. Dashboard session only.
 */
export interface APIReferralBalance {
	/** Balance that can be used at checkout now. Can be negative after a chargeback of an amount already spent. */
	available: number;
	/** Earned but not yet released (released 7 days after the referred account pays). */
	pending: number;
	/** Earned but on hold for now. */
	held: number;
	/** When the available balance expires if nothing moves. `null` when there is no balance to expire. */
	expires_at: ISODateString | null;
}

/**
 * Referral program summary of the account (`GET /v1/referrals`). Dashboard session only.
 */
export interface APIReferralSummary {
	/** `true` when the account can have a referral link (it paid at least one order with PIX or card). */
	eligible: boolean;
	/** `null` when the account is not eligible. */
	link: APIReferralLink | null;
	balance: APIReferralBalance;
	/** Use the available balance automatically when a renewal order is created. */
	auto_apply_renewal: boolean;
	/** The dashboard should show the invitation prompt: eligible and no paying referral yet. */
	show_prompt: boolean;
	/** `true` when this account itself was referred. */
	referred: boolean;
	counts: { attributed: number; paying: number };
}

/**
 * An anonymous referred account (`GET /v1/referrals/referees`). Dashboard session only.
 */
export interface APIReferralReferee {
	/** Position in the list (`#n`). No identity of the referred account is exposed. */
	position: number;
	/** Plan family of the referred account. `null` while it has no plan. */
	plan_family: PlanFamily | null;
	status: ReferralStatus;
	/** When the account was attributed to the link. */
	since: ISODateString;
	/** Total balance earned from this referral so far, in BRL. */
	earned: number;
}

/**
 * A movement of the referral balance (`GET /v1/referrals/ledger`). Dashboard session only.
 */
export interface APIReferralLedgerEntry {
	id: string;
	kind: ReferralLedgerKind;
	/** Signed amount in BRL: positive adds to the balance, negative subtracts. */
	amount: number;
	created_at: ISODateString;
}
