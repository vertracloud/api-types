/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/redeem
 */
export interface APIRedeemResponse {
	plan: {
		name: string;
		duration: number;
	};
}
