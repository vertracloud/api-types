import type { APIPayload, APIWorkspace, APIWorkspaceInfoResponse } from "../../v1";

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces
 */
export type RESTGetAPIWorkspaceResponse = APIPayload<APIWorkspace>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/workspaces
 */
export type RESTGetAPIWorkspaceInfoResponse = APIPayload<APIWorkspaceInfoResponse>;
