import type { ISODateString } from "../../v1";

/** Postal address used for billing. `country` is a two-letter ISO code (`"BR"`). */
export interface APIBillingAddress {
	line1: string;
	line2: string | null;
	city: string;
	/** Two-letter state code in Brazil (`"CE"`); free text elsewhere. */
	state: string | null;
	postal_code: string | null;
	country: string;
}

/** Brazilian tax document kind. */
export type BillingTaxIdType = "cpf" | "cnpj";
export const BillingTaxIdType = {
	CPF: "cpf",
	CNPJ: "cnpj",
} as const;

/** Tax document as returned by the API: never the full number. */
export interface APIBillingTaxId {
	type: BillingTaxIdType;
	/** Masked, for example `"CPF ••• 47"`. */
	masked: string;
}

/**
 * Billing details of the logged-in account, used on receipts, invoices and fraud checks.
 * Dashboard session only.
 */
export interface APIBillingDetails {
	name: string | null;
	address: APIBillingAddress | null;
	/** E.164, for example `"+5585999990000"`. */
	phone: string | null;
	tax_id: APIBillingTaxId | null;
	/** `true` when every required field is filled. */
	complete: boolean;
}

/** Saved card of the logged-in account. Dashboard session only. */
export interface APIBillingCard {
	id: string;
	/** Card brand as reported by the card network, for example `"visa"` or `"mastercard"`. */
	brand: string;
	last4: string;
	exp_month: number;
	exp_year: number;
	/** The plan renews automatically on the default card. */
	is_default: boolean;
	created_at: ISODateString;
}

/** Automatic renewal of the paid plan on the default card. Dashboard session only. */
export interface APIBillingRenewal {
	/** Preference of the account. `false` means the plan simply expires on its date; the saved cards are kept. */
	auto_renew: boolean;
	/** Plan expiry date, or `null` when the plan has none. */
	renews_at: ISODateString | null;
	/** Default card the renewal would charge, or `null` without one. */
	card: { brand: string; last4: string } | null;
	/** `true` when the current plan can renew on a card (paid plan, not Economy) and a default card exists. */
	eligible: boolean;
}
