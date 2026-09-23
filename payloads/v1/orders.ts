import type { ISODateString } from "../../v1";

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/billing/create-order
 */
export type OrderStatus = "unpaid" | "paid" | "cancelled" | "expired";
export const OrderStatus = {
	UNPAID: "unpaid",
	PAID: "paid",
	CANCELLED: "cancelled",
	EXPIRED: "expired",
} as const;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/billing/create-order
 */
export type OrderType = "purchase" | "renew" | "upgrade";
export const OrderType = {
	PURCHASE: "purchase",
	RENEW: "renew",
	UPGRADE: "upgrade",
} as const;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/billing/create-order
 */
export type OrderProvider = "pix" | "redeem_code";
export const OrderProvider = {
	PIX: "pix",
	REDEEM_CODE: "redeem_code",
} as const;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/billing/create-order
 */
export interface APIOrderCreateResponse {
	id: string;
	code: string | null;
	/** Usually `"unpaid"`; `"paid"` right away when a coupon brings the price to zero. */
	status: OrderStatus;
	plan: string;
	/** Duration in days. */
	duration: number;
	discount: APIOrderDiscount;
	/** Final price, after the discount. */
	price: number;
	expires_at: ISODateString | null;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/billing/create-order
 */
export interface APIOrderDiscount {
	/** `null` when no coupon was applied. */
	percent: number | null;
	coupon: string | null;
	/** Price before the discount. */
	price: number;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/billing/order-status
 */
export interface APIOrderStatus {
	id: string;
	status: OrderStatus;
	price: number;
	related_to: { plan: { name: string; months: number } };
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/billing/list-orders
 */
export interface APIOrderListItem {
	id: string;
	status: OrderStatus;
	price: number;
	provider: OrderProvider;
	type: OrderType;
	related_to: { plan: { name: string; duration: number; months: number } };
	created_at: ISODateString;
	paid_at: ISODateString | null;
}

/**
 * PIX charge of an order (`POST /v1/orders/:orderId/initiate/pix`).
 * @see https://docs.vertracloud.app/api-reference/endpoint/billing/initiate-pix
 */
export interface APIOrderPixPayment {
	/** Amount charged, in BRL. */
	transaction_amount: number;
	external_reference: string | null;
	txid: string;
	qrcode: { copy: string | null; base64: string | null };
}
