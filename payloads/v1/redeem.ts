/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/redeem/redeem
 */
export interface APIRedeemResponse {
	plan: {
		name: string;
		duration: number;
	};
}
