import type { APIApiKeyScope, APIOAuthClient, APIOAuthCodeChallengeMethod, APIOAuthConsentDecision, APIPayload } from "../../v1";

/**
 * `POST /v1/oauth/register` (RFC 7591). Body and response follow the RFC format, WITHOUT the
 * `{ response }` envelope.
 * @see https://docs.vertracloud.app/api-reference/introduction#connecting-through-oauth
 */
export interface RESTPostAPIOAuthRegisterBody {
	client_name: string;
	redirect_uris: string[];
}
export interface RESTPostAPIOAuthRegisterResponse extends APIOAuthClient {
	client_id_issued_at: number;
	token_endpoint_auth_method: "none";
	grant_types: ["authorization_code"];
	response_types: ["code"];
}

/** `GET /v1/oauth/clients/:client_id` — what the consent screen shows. */
export type RESTGetAPIOAuthClientResponse = APIPayload<APIOAuthClient>;

/**
 * `POST /v1/oauth/consent` — dashboard session only. Approving creates an API key with `scopes`
 * (named `oauth:<client_name>`) and returns the redirect URL with the `code`; denying returns the URL
 * with `error=access_denied`. The key shows up in the key list and is revoked from there.
 */
export interface RESTPostAPIOAuthConsentBody {
	client_id: string;
	redirect_uri: string;
	/** At least one scope when `decision` is `approve`. */
	scopes?: APIApiKeyScope[];
	state?: string;
	code_challenge: string;
	code_challenge_method: APIOAuthCodeChallengeMethod;
	decision: APIOAuthConsentDecision;
}
export type RESTPostAPIOAuthConsentResponse = APIPayload<{ redirect_to: string }>;

/**
 * `POST /v1/oauth/token` (RFC 6749 §4.1.3, `application/x-www-form-urlencoded` or JSON). Only
 * `authorization_code`; no refresh token. The `access_token` is the API key created on consent
 * and does not expire — revoke it by deleting the key. Response in RFC format, without envelope.
 */
export interface RESTPostAPIOAuthTokenBody {
	grant_type: "authorization_code";
	code: string;
	redirect_uri: string;
	client_id: string;
	code_verifier: string;
}
export interface RESTPostAPIOAuthTokenResponse {
	access_token: string;
	token_type: "bearer";
	/** Granted scopes, space-separated. */
	scope: string;
}
