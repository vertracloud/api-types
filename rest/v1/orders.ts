import type { APIOrderCardPayment, APIOrderCouponPreview, APIOrderCreateResponse, APIOrderListItem, APIOrderPixPayment, APIOrderReceipt, APIOrderStatus, APIPayload, OrderProvider, OrderType } from "../../v1";

/**
 * A missing `plan` or `months` returns 400 `MISSING_PLAN_OR_MONTHS`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/billing/create-order
 */
export interface RESTPostAPIOrderCreateBody {
	plan: string;
	/** 1, 3 or 12. The Economy plan only accepts 1. Anything else returns 400 `INVALID_MONTHS`. */
	months: number;
	coupon?: string;
	/** Defaults to `"purchase"`. */
	type?: OrderType;
	source?: string;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/billing/create-order
 */
export type RESTPostAPIOrderCreateResponse = APIPayload<APIOrderCreateResponse>;

/**
 * `POST /v1/orders/coupon-preview` — Dashboard session only. Checks a coupon against a plan and
 * period for the signed-in account without creating an order or using the coupon. Fails with 400
 * `INVALID_PAYLOAD`, 400 `INVALID_PLAN`, 400 `INVALID_MONTHS` and the `COUPON_*` codes that
 * `POST /v1/orders` returns for the same coupon.
 */
export interface RESTPostAPIOrderCouponPreviewBody {
	coupon: string;
	plan: string;
	/** 1, 3 or 12. */
	months: number;
}

export type RESTPostAPIOrderCouponPreviewResponse = APIPayload<APIOrderCouponPreview>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/billing/order-status
 */
export type RESTGetAPIOrderStatusResponse = APIPayload<APIOrderStatus>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/billing/list-orders
 */
export interface RESTGetAPIOrderListQuery {
	provider?: OrderProvider;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/billing/list-orders
 */
export type RESTGetAPIOrderListResponse = APIPayload<APIOrderListItem[]>;

/**
 * `GET /v1/orders/:orderId/receipt`. Dashboard session only. `ORDER_RECEIPT_UNAVAILABLE` when the
 * order has no receipt (`has_receipt: false`).
 */
export type RESTGetAPIOrderReceiptResponse = APIPayload<APIOrderReceipt>;

/**
 * `POST /v1/orders/:orderId/initiate/pix`. Calling it again returns the same QR code while it is valid;
 * it expires with the order (`expires_at`).
 * Fails with 404 `ORDER_NOT_FOUND`, 403 `FORBIDDEN` when the order belongs to another account,
 * 400 `ORDER_NOT_PAYABLE` when the order is paid, cancelled or expired, 400 `COUPON_PAYMENT_METHOD`
 * when the order's coupon excludes PIX, 409 `ORDER_NOT_PAYABLE` while a card payment of the order is
 * being confirmed, 400 `PAYMENT_METHOD_UNAVAILABLE` when online payments are not available, 400
 * `INVALID_PARAMS` for a malformed `orderId`, and 429 `RATE_LIMIT_EXCEEDED` while another payment of the
 * account is being started.
 * Starting a PIX cancels a card payment of the same order that was not completed.
 * @see https://docs.vertracloud.app/api-reference/endpoint/billing/initiate-pix
 */
export type RESTPostAPIOrderPixPaymentResponse = APIPayload<APIOrderPixPayment>;

/** `POST /v1/orders/:orderId/pay/card` — Dashboard session only. */
export interface RESTPostAPIOrderCardPaymentBody {
	/** Saved card (`GET /v1/users/me/cards`). */
	card_id: string;
}

/**
 * `POST /v1/orders/:orderId/pay/card` — Dashboard session only. Charges a saved card. Paying by card
 * keeps the plan renewing automatically on the default card.
 * Fails with 403 `WEBSITE_ONLY` for API keys, 400 `INVALID_PARAMS` for a malformed `orderId`, 400
 * `INVALID_PAYLOAD` without a `card_id`, 404 `ORDER_NOT_FOUND`, 403 `FORBIDDEN` when the order belongs to
 * another account, 404 `CARD_NOT_FOUND`, 400 `ORDER_NOT_PAYABLE` when the order is paid, cancelled or expired,
 * 400 `CARD_NOT_ALLOWED_FOR_PLAN` for the Economy plan, 400 `COUPON_PAYMENT_METHOD` when the order's
 * coupon excludes card, 400 `PAYMENT_METHOD_UNAVAILABLE` when card payments are not available,
 * 402 `CARD_DECLINED` when the bank refuses the charge, 409 `ORDER_NOT_PAYABLE` while a PIX payment of
 * the order is being confirmed, and 429 `RATE_LIMIT_EXCEEDED` while another payment of the account is
 * being started.
 */
export type RESTPostAPIOrderCardPaymentResponse = APIPayload<APIOrderCardPayment>;
