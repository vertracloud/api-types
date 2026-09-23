import type { APIOrderCreateResponse, APIOrderListItem, APIOrderPixPayment, APIOrderStatus, APIPayload, OrderProvider, OrderType } from "../../v1";

/**
 * A missing `plan` or `months` returns 400 `MISSING_PLAN_OR_MONTHS`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/billing/create-order
 */
export interface RESTPostAPIOrderCreateBody {
	plan: string;
	/** 1, 3, 6 or 12. */
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
 * `POST /v1/orders/:orderId/initiate/pix`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/billing/initiate-pix
 */
export type RESTPostAPIOrderPixPaymentResponse = APIPayload<APIOrderPixPayment>;
