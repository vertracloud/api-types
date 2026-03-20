import type { APIPayload, APIWorkspace, APIWorkspaceInfoResponse, APIWorkspaceMemberAdd, APIWorkspaceMemberRoleUpdate } from "../../v1";

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/organizations/get
 */
export type RESTGetAPIWorkspaceResponse = APIPayload<APIWorkspace>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/organizations/get
 */
export type RESTGetAPIWorkspaceInfoResponse = APIPayload<APIWorkspaceInfoResponse>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/organizations/getall
 */
export type RESTGetAPIWorkspacesResponse = APIPayload<APIWorkspace[]>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/organizations/create
 */
export type RESTPostAPIWorkspaceCreateResponse = APIPayload<APIWorkspace>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/organizations/update
 */
export type RESTPutAPIWorkspaceUpdateResponse = APIPayload<APIWorkspace>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/organizations/delete
 */
export type RESTDeleteAPIWorkspaceResponse = APIPayload<void>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/organizations/members/add
 */
export type RESTPostAPIWorkspaceMemberAddResponse = APIPayload<APIWorkspaceMemberAdd>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/organizations/members/role
 */
export type RESTPutAPIWorkspaceMemberRoleResponse = APIPayload<APIWorkspaceMemberRoleUpdate>;
