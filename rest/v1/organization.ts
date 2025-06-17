import type {
	APIOrganization,
	APIOrganizationInfoResponse,
	APIPayload,
} from "../../v1";

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/organizations
 */
export type RESTGetAPIOrganizationResponse = APIPayload<APIOrganization>;

/**
 * @see https://docs.vertracloud.com/api-reference/endpoint/organizations
 */
export type RESTGetAPIOrganizationInfoResponse =
	APIPayload<APIOrganizationInfoResponse>;
