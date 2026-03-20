import type { APIOrderCreateResponse, APIOrderListItem, APIOrderStatus, APIPayload, APIPixPaymentResponse } from "../../v1";

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/orders/create
 */
export type RESTPostAPIOrderCreateResponse = APIPayload<APIOrderCreateResponse>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/orders/status
 */
export type RESTGetAPIOrderStatusResponse = APIPayload<APIOrderStatus>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/orders/list
 */
export type RESTGetAPIOrderListResponse = APIPayload<APIOrderListItem[]>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/orders/pix
 */
export type RESTPostAPIPixPaymentResponse = APIPayload<APIPixPaymentResponse>;
