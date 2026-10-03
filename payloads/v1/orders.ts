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
export type OrderProvider = "pix" | "card" | "redeem_code";
export const OrderProvider = {
	PIX: "pix",
	CARD: "card",
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
	/**
	 * Payment methods the order accepts. The Economy plan and a coupon restricted to one method narrow
	 * the list; otherwise `["pix", "card"]` when card payments are available, `["pix"]` when not.
	 * Starting a payment with a method outside the list returns 400 `COUPON_PAYMENT_METHOD` (coupon) or
	 * 400 `CARD_NOT_ALLOWED_FOR_PLAN` (Economy).
	 */
	allowed_payment_methods: OrderProvider[];
}

/**
 * Price an order would have with a coupon, without creating the order or using the coupon.
 * Prices already include the billing-period discount (3 months −5%, 12 −15%).
 */
export interface APIOrderCouponPreview {
	/** The coupon code as registered. */
	coupon: string;
	/** Price for the plan and period before the coupon. */
	price_before_discount: number;
	discount_amount: number;
	/** Final price with the coupon. */
	price: number;
	/** Payment methods the coupon allows, same rule as `APIOrderCreateResponse.allowed_payment_methods`. */
	allowed_payment_methods: OrderProvider[];
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
	/** Same semantics as in {@link APIOrderCreateResponse.allowed_payment_methods}. */
	allowed_payment_methods: OrderProvider[];
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
	/** A payment receipt exists for this order (`GET /v1/orders/:orderId/receipt`). */
	has_receipt: boolean;
}

/**
 * Payment receipt of a paid order (`GET /v1/orders/:orderId/receipt`). Dashboard session only.
 */
export interface APIOrderReceipt {
	/** Public page of the receipt, hosted by the payment processor. */
	url: string;
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

/**
 * Card charge of an order (`POST /v1/orders/:orderId/pay/card`). Dashboard session only.
 * - `succeeded`: paid; the plan is delivered in a few seconds.
 * - `requires_action`: the bank asks the customer to confirm (3-D Secure) in the browser with `client_secret`.
 * - `processing`: the bank is still confirming; poll the order status.
 */
export interface APIOrderCardPayment {
	client_secret: string;
	status: OrderCardPaymentStatus;
}

export type OrderCardPaymentStatus = "succeeded" | "requires_action" | "processing";
export const OrderCardPaymentStatus = {
	SUCCEEDED: "succeeded",
	REQUIRES_ACTION: "requires_action",
	PROCESSING: "processing",
} as const;
