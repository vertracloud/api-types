import type {
	APIPayload,
	APIRestartRequired,
	APISnapshotRestoreResponse,
	APIStack,
	APIStackBinding,
	APIStackBindingChange,
	APIStackBlobAdded,
	APIStackChange,
	APIStackConnectionInfo,
	APIStackDatabaseAdded,
	APIStackSnapshot,
	ApplicationLanguage,
	DatabaseType,
	RESTAPIWorkspaceQuery,
	SnowFlake,
	StackBindingRemoval,
	StackBindingValue,
	StackBlobDisposition,
	StackDeleteMode,
	StackMemberType,
	StackNetworkMode,
	TemplateBlobVisibility,
} from "../../v1";

/**
 * Query of the stack routes: the workspace the stack belongs to. Required for a workspace member acting on a stack they do not own; the owner may omit it.
 */
export type RESTAPIStackQuery = RESTAPIWorkspaceQuery;

/**
 * `GET /v1/stacks`. With `workspace_id`, lists the stacks of that workspace.
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/list
 */
export type RESTGetAPIStacksResponse = APIPayload<APIStack[]>;

/**
 * `GET /v1/stacks/:stack_id`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/get
 */
export type RESTGetAPIStackResponse = APIPayload<APIStack>;

/**
 * A connection to create together with a member that joins a stack or with a new database or Blob folder.
 */
export interface RESTPostAPIStackBindingInput {
	/** Application of the stack that receives the variables. */
	app_id: SnowFlake;
	/** Variable names and what each receives. Default: the standard names of the engine (`DATABASE_URL`, `MONGODB_URI`, `REDIS_URL`, `MYSQL_URL`), with the service name as prefix from the second of an engine. */
	env_map?: Record<string, StackBindingValue>;
}

/**
 * Body of `POST /v1/stacks` (JSON). Creates a stack from resources that already exist, all in the same account or workspace and none in another stack.
 *
 * Error codes: `STACK_MEMBER_CONFLICT`, `STACK_NETWORK_MODE_UNAVAILABLE`, `APP_NOT_FOUND`, `DATABASE_NOT_FOUND`, `WORKSPACE_OWNER_ONLY`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/create
 */
export interface RESTPostAPIStackBody {
	name: string;
	description?: string | null;
	/** Only `public` is available for now (`private` answers 400 `STACK_NETWORK_MODE_UNAVAILABLE`). Default `public`. */
	network_mode?: StackNetworkMode;
	members?: { resource_type: Exclude<StackMemberType, "blob">; resource_id: SnowFlake }[];
	/** Connections between the members. */
	bindings?: (RESTPostAPIStackBindingInput & { database_id?: SnowFlake; target_app_id?: SnowFlake })[];
	workspace_id?: string;
}

/**
 * `201`. With connections created, `restart_required` and `apps_to_restart` say which applications must restart to read the new variables.
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/create
 */
export type RESTPostAPIStackResponse = APIPayload<APIStackChange>;

/**
 * Body of `POST /v1/stacks/transform` (JSON). Turns the applications and databases of a folder into a stack. The folder stays. With
 * `inject_variables` the platform adds the connection variables and certificates to the applications; without it they are assumed to
 * connect on their own.
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/transform
 */
export interface RESTPostAPIStackTransformBody {
	/** Folder to take the resources from. */
	folder_id: string;
	/** Workspace of the folder; absent = your own folder. */
	workspace_id?: string;
	name?: string;
	inject_variables: boolean;
	/** Connections to create when `inject_variables` is `true`. */
	bindings?: (RESTPostAPIStackBindingInput & { database_id: SnowFlake })[];
}

/**
 * `201`. Error codes: `STACK_TRANSFORM_EMPTY`, `STACK_MEMBER_CONFLICT`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/transform
 */
export type RESTPostAPIStackTransformResponse = APIPayload<APIStackChange>;

/**
 * Body of `PATCH /v1/stacks/:stack_id` (JSON). At least one field is required.
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/update
 */
export interface RESTPatchAPIStackBody {
	name?: string;
	description?: string | null;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/update
 */
export type RESTPatchAPIStackResponse = APIPayload<APIStack>;

/**
 * Body of `DELETE /v1/stacks/:stack_id` (JSON). `delete_all` deletes every member as well, each by its own deletion rule (with the safety
 * snapshot where there is one); `dissolve` only removes the stack. Either way the API key the platform created for the stack's Blob folder is revoked.
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/delete
 */
export interface RESTDeleteAPIStackBody {
	mode: StackDeleteMode;
	/** Must be equal to the stack name, otherwise the call fails with `STACK_NAME_MISMATCH`. */
	confirm_name: string;
	/**
	 * What to do with the files of the stack's Blob folder when `mode` is `delete_all`. Default `keep`. `dissolve` always keeps them.
	 */
	blob?: StackBlobDisposition;
}

/**
 * Resources deleted together with the stack. Empty with `dissolve`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/delete
 */
export type RESTDeleteAPIStackResponse = APIPayload<{
	deleted_apps: SnowFlake[];
	deleted_databases: SnowFlake[];
	/** `true` when the files of the Blob folder were deleted. */
	deleted_blob: boolean;
}>;

/**
 * Body of `POST /v1/stacks/:stack_id/members` (JSON). Puts an application or database that you already have into the stack: same account or
 * workspace, and not in another stack.
 *
 * Error codes: `STACK_MEMBER_CONFLICT`, `APP_NOT_FOUND`, `DATABASE_NOT_FOUND`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/members/add
 */
export interface RESTPostAPIStackMemberBody {
	resource_type: Exclude<StackMemberType, "blob">;
	resource_id: SnowFlake;
	/** Connections to create, to the applications of the stack. May be empty. */
	bindings?: (RESTPostAPIStackBindingInput & { database_id?: SnowFlake; target_app_id?: SnowFlake })[];
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/members/add
 */
export type RESTPostAPIStackMemberResponse = APIPayload<APIStackChange>;

/**
 * Query of `DELETE /v1/stacks/:stack_id/members/:resource_type/:resource_id`. Takes a member out of the stack without deleting it. Taking out a
 * member that came from a template detaches the stack from the template; an application of a closed template cannot leave (`STACK_SERVICE_LOCKED`).
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/members/remove
 */
export interface RESTDeleteAPIStackMemberQuery extends RESTAPIWorkspaceQuery {
	/** What happens to the variables the connections of the member created. Default `keep_connection`. */
	bindings?: StackBindingRemoval;
	/** For a Blob member: what happens to the files. Default `keep`. */
	blob?: StackBlobDisposition;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/members/remove
 */
export type RESTDeleteAPIStackMemberResponse = APIPayload<APIStackChange>;

/**
 * `GET /v1/stacks/:stack_id/bindings`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/bindings/list
 */
export type RESTGetAPIStackBindingsResponse = APIPayload<APIStackBinding[]>;

/**
 * Body of `POST /v1/stacks/:stack_id/bindings` (JSON). Connects an application of the stack to a database, a Blob folder or another application of
 * the stack. Exactly one of `database_id`, `blob_id` and `target_app_id`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/bindings/create
 */
export interface RESTPostAPIStackBindingBody extends RESTPostAPIStackBindingInput {
	database_id?: SnowFlake;
	/** Id of the Blob member. */
	blob_id?: SnowFlake;
	target_app_id?: SnowFlake;
}

/**
 * `201`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/bindings/create
 */
export type RESTPostAPIStackBindingResponse = APIPayload<APIStackBindingChange>;

/**
 * Body of `PATCH /v1/stacks/:stack_id/bindings/:binding_id` (JSON). Replaces the variable names of the connection.
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/bindings/update
 */
export interface RESTPatchAPIStackBindingBody {
	env_map: Record<string, StackBindingValue>;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/bindings/update
 */
export type RESTPatchAPIStackBindingResponse = APIPayload<APIStackBindingChange>;

/**
 * Query of `DELETE /v1/stacks/:stack_id/bindings/:binding_id`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/bindings/delete
 */
export interface RESTDeleteAPIStackBindingQuery extends RESTAPIWorkspaceQuery {
	/** Default `keep_connection`. */
	variables?: StackBindingRemoval;
}

/**
 * `restart_required` is `true` when the variables the connection created were removed from an application (`variables=remove_variables`).
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/bindings/delete
 */
export type RESTDeleteAPIStackBindingResponse = APIPayload<APIRestartRequired>;

/**
 * Query of `GET /v1/stacks/:stack_id/connection`: code to connect an application of the stack to what it is linked to.
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/connection
 */
export interface RESTGetAPIStackConnectionQuery extends RESTAPIWorkspaceQuery {
	app_id: SnowFlake;
	/** Language of the code; default: the language of the application. */
	language?: ApplicationLanguage;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/connection
 */
export type RESTGetAPIStackConnectionResponse = APIPayload<APIStackConnectionInfo>;

/**
 * Body of `POST /v1/stacks/:stack_id/network-mode` (JSON). Only `public` is accepted for now; `private` returns `STACK_NETWORK_MODE_UNAVAILABLE`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/network-mode
 */
export interface RESTPostAPIStackNetworkModeBody {
	network_mode: StackNetworkMode;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/network-mode
 */
export type RESTPostAPIStackNetworkModeResponse = APIPayload<APIStack>;

/**
 * Body of `POST /v1/stacks/:stack_id/databases` and of `POST /v1/apps/:id/stack/databases` (JSON). Creates a database already inside the stack and connects
 * it to the applications you choose. On an application that is not in a stack, the second route creates the stack too (named by `stack_name`).
 *
 * Error codes: `MAX_DATABASES_REACHED`, `INSUFFICIENT_MEMORY`, `INVALID_DATABASE_VERSION`, `STACK_MEMBER_CONFLICT`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/databases/create
 */
export interface RESTPostAPIStackDatabaseBody {
	type: DatabaseType;
	name: string;
	/** RAM in MB. */
	ram: number;
	version?: string;
	description?: string | null;
	/** Applications to connect it to. */
	bindings?: RESTPostAPIStackBindingInput[];
	/** Only for `POST /v1/apps/:id/stack/databases` on an application that is not in a stack. */
	stack_name?: string;
}

/**
 * `201`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/databases/create
 */
export type RESTPostAPIStackDatabaseResponse = APIPayload<APIStackDatabaseAdded>;

/**
 * Body of `POST /v1/stacks/:stack_id/blob` (JSON). Adds a folder of your Blob Storage to the stack: the platform creates an API key restricted to that
 * folder (`blob_prefix`), keeps it in the stack and injects the connection variables into the applications you choose. The plan must include Blob Storage.
 * Without `prefix` the platform picks a folder named after the stack.
 *
 * Error codes: `STACK_BLOB_PREFIX_TAKEN`, `VALIDATION_ERROR` (invalid prefix), `BLOB_NAMESPACE_SUSPENDED`, `PLAN_RESTRICTED_FEATURE`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/blob/create
 */
export interface RESTPostAPIStackBlobBody {
	/** Folder of the Blob, ending in `/`. */
	prefix?: string;
	/** Default `private`. */
	visibility?: TemplateBlobVisibility;
	/** Applications to connect it to. */
	bindings?: RESTPostAPIStackBindingInput[];
}

/**
 * `201`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/blob/create
 */
export type RESTPostAPIStackBlobResponse = APIPayload<APIStackBlobAdded>;

/**
 * `GET /v1/stacks/:stack_id/snapshots`. Newest first.
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/snapshots/list
 */
export type RESTGetAPIStackSnapshotsResponse = APIPayload<APIStackSnapshot[]>;

/**
 * `POST /v1/stacks/:stack_id/snapshots` — takes a snapshot of every member that has data, together.
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/snapshots/create
 */
export type RESTPostAPIStackSnapshotResponse = APIPayload<APIStackSnapshot>;

/**
 * Body of `POST /v1/stacks/:stack_id/snapshots/:snapshot_id/restore` (JSON). Brings every member back, together.
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/snapshots/restore
 */
export interface RESTPostAPIStackSnapshotRestoreBody {
	/** Applications on a custom image also go back to the image version of the snapshot, if it still exists. Default `false`. */
	restore_image_version?: boolean;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/snapshots/restore
 */
export type RESTPostAPIStackSnapshotRestoreResponse = APIPayload<APISnapshotRestoreResponse>;

/**
 * `POST /v1/stacks/:stack_id/template/detach`. The stack stops receiving versions of its template and becomes a stack assembled by hand.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/detach
 */
export type RESTPostAPIStackTemplateDetachResponse = APIPayload<APIStack>;
