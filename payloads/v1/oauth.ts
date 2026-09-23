import type { ISODateString } from "../../v1";

/**
 * OAuth client registered dynamically (RFC 7591) to connect an external agent to the account.
 * Public client: no secret, PKCE `S256` required.
 * @see https://docs.vertracloud.app/api-reference/introduction#connecting-through-oauth
 */
export interface APIOAuthClient {
	client_id: string;
	/** Name shown on the consent screen; the API key created on consent is named `oauth:<client_name>` (max. 40 characters). */
	client_name: string;
	/** Matched exactly on `authorize`; no wildcards. */
	redirect_uris: string[];
	created_at: ISODateString;
}

export type APIOAuthCodeChallengeMethod = "S256";
export const APIOAuthCodeChallengeMethod = { S256: "S256" } as const;

export type APIOAuthConsentDecision = "approve" | "deny";
export const APIOAuthConsentDecision = { Approve: "approve", Deny: "deny" } as const;
