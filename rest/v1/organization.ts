import type {
	APIOrganization,
	APIOrganizationInfoResponse,
	APIPayload,
} from "../../v1";

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/organizations
 */
export type RESTGetAPIOrganizationResponse = APIPayload<APIOrganization>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/organizations
 */
export type RESTGetAPIOrganizationInfoResponse =
	APIPayload<APIOrganizationInfoResponse>;
