import type { ISODateString } from "../../v1";

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/orders
 */
export type OrderStatus = "unpaid" | "paid" | "cancelled" | "expired";

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/orders
 */
export type OrderType = "purchase" | "renew" | "upgrade" | "credits";

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/orders
 */
export type OrderProvider = "pix" | "redeem_code";

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/orders
 */
export interface APIOrderCreateResponse {
	id: string;
	code: string | null;
	status: string;
	plan?: string;
	amount?: number;
	duration?: number;
	price: number;
	expires_at: ISODateString | null;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/orders
 */
export interface APIOrderStatus {
	id: string;
	status: string;
	price: number;
	related_to: { credits?: { amount: number }; plan?: { name: string; months: number } };
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/orders
 */
export interface APIOrderListItem {
	id: string;
	status: string;
	price: number;
	provider: string;
	type: string;
	related_to: { credits?: { amount: number }; plan?: { name: string; duration: number; months: number } };
	created_at: ISODateString;
	paid_at: ISODateString | null;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/orders
 */
export interface APIPixPaymentResponse {
	transaction_amount: number | string;
	external_reference: string | null;
	txid: string;
	qrcode: { copy: string | null; base64: string | null };
}
