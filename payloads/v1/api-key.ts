import type { ISODateString } from "../../common/v1";

/**
 * API key scope, in the form `<resource>:<action>`. Presets: `read` = every `*:read`;
 * `write` = `read` + every `*:write`; `full` = all of them, including the ones without a
 * `read`/`write` suffix (delete, envs, files, credentials).
 * @see https://docs.vertracloud.app/api-reference/introduction#scopes
 */
export type APIApiKeyScope =
	| "apps:read"
	| "apps:write"
	| "apps:delete"
	| "apps:envs"
	| "apps:files"
	| "databases:read"
	| "databases:write"
	| "databases:delete"
	| "databases:credentials"
	| "snapshots:read"
	| "snapshots:write"
	| "account:read"
	| "account:write"
	| "workspaces:read"
	| "workspaces:write"
	| "workspaces:delete"
	| "workspaces:invites"
	| "billing:read"
	| "billing:write"
	| "redeem:write";

export const APIApiKeyScope = {
	APPS_READ: "apps:read",
	APPS_WRITE: "apps:write",
	APPS_DELETE: "apps:delete",
	APPS_ENVS: "apps:envs",
	APPS_FILES: "apps:files",
	DATABASES_READ: "databases:read",
	DATABASES_WRITE: "databases:write",
	DATABASES_DELETE: "databases:delete",
	DATABASES_CREDENTIALS: "databases:credentials",
	SNAPSHOTS_READ: "snapshots:read",
	SNAPSHOTS_WRITE: "snapshots:write",
	ACCOUNT_READ: "account:read",
	ACCOUNT_WRITE: "account:write",
	WORKSPACES_READ: "workspaces:read",
	WORKSPACES_WRITE: "workspaces:write",
	WORKSPACES_DELETE: "workspaces:delete",
	WORKSPACES_INVITES: "workspaces:invites",
	BILLING_READ: "billing:read",
	BILLING_WRITE: "billing:write",
	REDEEM_WRITE: "redeem:write",
} as const satisfies Record<string, APIApiKeyScope>;

export type APIApiKeyPreset = "read" | "write" | "full";
export const APIApiKeyPreset = { Read: "read", Write: "write", Full: "full" } as const;

export type APIApiKeyRouteMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface APIApiKeyRoute {
	method: APIApiKeyRouteMethod;
	/** Full route pattern with `:param` placeholders (`/v1/apps/:id/files`). Matched exactly, no regex. */
	path: string;
}

export interface APIApiKeyScopeEntry {
	/** Display group the scope belongs to. */
	group: "apps" | "databases" | "snapshots" | "account" | "workspaces" | "billing";
	routes: APIApiKeyRoute[];
}

/**
 * Closed catalog of the routes an API key can reach, per scope. A key without the route's scope
 * gets 403 `API_KEY_SCOPE_DENIED`; a route that is not listed here always returns 403 to an API key.
 *
 * Intentionally left out (dashboard session only): key management, creating workspace invites
 * (an invite would outlive the key's revocation), revoking sessions, plan downgrade, and the
 * database **Data** tab (`/v1/databases/:id/data/*`).
 */
export const API_KEY_SCOPES: Record<APIApiKeyScope, APIApiKeyScopeEntry> = {
	"apps:read": {
		group: "apps",
		routes: [
			{ method: "GET", path: "/v1/apps/runtimes" },
			{ method: "GET", path: "/v1/apps/status" },
			{ method: "GET", path: "/v1/apps/:id" },
			{ method: "GET", path: "/v1/apps/:id/status" },
			{ method: "GET", path: "/v1/apps/:id/realtime" },
			{ method: "GET", path: "/v1/apps/:id/metrics" },
			{ method: "GET", path: "/v1/apps/:id/logs" },
			{ method: "GET", path: "/v1/apps/:id/download" },
			{ method: "GET", path: "/v1/apps/:id/deploys" },
			{ method: "GET", path: "/v1/apps/:id/deploys/webhook" },
			{ method: "GET", path: "/v1/apps/:id/network/custom" },
			{ method: "GET", path: "/v1/apps/:id/network/dns" },
		],
	},
	"apps:write": {
		group: "apps",
		routes: [
			{ method: "POST", path: "/v1/apps" },
			{ method: "POST", path: "/v1/apps/:id/start" },
			{ method: "POST", path: "/v1/apps/:id/stop" },
			{ method: "POST", path: "/v1/apps/:id/restart" },
			{ method: "PATCH", path: "/v1/apps/:id/config" },
			{ method: "POST", path: "/v1/apps/:id/deploys/webhook" },
			{ method: "DELETE", path: "/v1/apps/:id/deploys/webhook" },
			{ method: "POST", path: "/v1/apps/:id/network/custom" },
			{ method: "DELETE", path: "/v1/apps/:id/network/custom" },
			{ method: "POST", path: "/v1/apps/:id/network/purge-cache" },
			{ method: "PATCH", path: "/v1/apps/:id/network/subdomain" },
			{ method: "POST", path: "/v1/apps/:id/network/publish" },
			{ method: "DELETE", path: "/v1/apps/:id/network/publish" },
		],
	},
	"apps:delete": { group: "apps", routes: [{ method: "DELETE", path: "/v1/apps/:id" }] },
	"apps:envs": {
		group: "apps",
		routes: [
			{ method: "GET", path: "/v1/apps/:id/envs" },
			{ method: "POST", path: "/v1/apps/:id/envs" },
			{ method: "DELETE", path: "/v1/apps/:id/envs/:envId" },
		],
	},
	"apps:files": {
		group: "apps",
		routes: [
			{ method: "GET", path: "/v1/apps/:id/files" },
			{ method: "GET", path: "/v1/apps/:id/files/tree" },
			{ method: "GET", path: "/v1/apps/:id/files/content" },
			{ method: "PUT", path: "/v1/apps/:id/files" },
			{ method: "PATCH", path: "/v1/apps/:id/files" },
			{ method: "DELETE", path: "/v1/apps/:id/files" },
			{ method: "POST", path: "/v1/apps/:id/files/upload" },
		],
	},
	"databases:read": {
		group: "databases",
		routes: [
			{ method: "GET", path: "/v1/databases/status" },
			{ method: "GET", path: "/v1/databases/:id" },
			{ method: "GET", path: "/v1/databases/:id/status" },
			{ method: "GET", path: "/v1/databases/:id/metrics" },
		],
	},
	"databases:write": {
		group: "databases",
		routes: [
			{ method: "POST", path: "/v1/databases" },
			{ method: "PUT", path: "/v1/databases/:id" },
			{ method: "POST", path: "/v1/databases/:id/start" },
			{ method: "POST", path: "/v1/databases/:id/stop" },
			{ method: "POST", path: "/v1/databases/:id/reset" },
		],
	},
	"databases:delete": { group: "databases", routes: [{ method: "DELETE", path: "/v1/databases/:id" }] },
	"databases:credentials": {
		group: "databases",
		routes: [
			{ method: "GET", path: "/v1/databases/:id/credentials/certificate" },
			{ method: "POST", path: "/v1/databases/:id/credentials/certificate/reset" },
			{ method: "POST", path: "/v1/databases/:id/credentials/reset" },
		],
	},
	"snapshots:read": {
		group: "snapshots",
		routes: [
			{ method: "GET", path: "/v1/users/snapshots" },
			{ method: "GET", path: "/v1/users/:id/snapshots" },
			{ method: "GET", path: "/v1/users/:id/snapshots/:snapshot_id/download" },
		],
	},
	"snapshots:write": {
		group: "snapshots",
		routes: [
			{ method: "POST", path: "/v1/users/:id/snapshots" },
			{ method: "POST", path: "/v1/users/:id/snapshots/:snapshot_id/restore" },
		],
	},
	"account:read": {
		group: "account",
		routes: [
			{ method: "GET", path: "/v1/users/me" },
			{ method: "GET", path: "/v1/users/me/sessions" },
		],
	},
	"account:write": {
		group: "account",
		routes: [
			{ method: "PATCH", path: "/v1/users/me" },
			{ method: "POST", path: "/v1/users/me/folders" },
			{ method: "PATCH", path: "/v1/users/me/folders/:folder_id" },
			{ method: "DELETE", path: "/v1/users/me/folders/:folder_id" },
			{ method: "PUT", path: "/v1/users/me/folders/:folder_id/resources/:resource_type/:resource_id" },
			{ method: "DELETE", path: "/v1/users/me/folders/:folder_id/resources/:resource_type/:resource_id" },
			{ method: "PUT", path: "/v1/users/me/favorites/:resource_type/:resource_id" },
			{ method: "DELETE", path: "/v1/users/me/favorites/:resource_type/:resource_id" },
		],
	},
	"workspaces:read": {
		group: "workspaces",
		routes: [
			{ method: "GET", path: "/v1/workspaces" },
			{ method: "GET", path: "/v1/workspaces/:id" },
			{ method: "GET", path: "/v1/workspaces/:id/members" },
			{ method: "GET", path: "/v1/workspaces/:id/roles" },
			{ method: "GET", path: "/v1/workspaces/:id/action-requests" },
		],
	},
	"workspaces:write": {
		group: "workspaces",
		routes: [
			{ method: "POST", path: "/v1/workspaces" },
			{ method: "PUT", path: "/v1/workspaces/:id" },
			{ method: "PUT", path: "/v1/workspaces/:id/members/:user_id" },
			{ method: "DELETE", path: "/v1/workspaces/:id/members/:user_id" },
			{ method: "POST", path: "/v1/workspaces/:id/roles" },
			{ method: "PUT", path: "/v1/workspaces/:id/roles/:role_id" },
			{ method: "DELETE", path: "/v1/workspaces/:id/roles/:role_id" },
			{ method: "POST", path: "/v1/workspaces/:id/apps/:app_id" },
			{ method: "DELETE", path: "/v1/workspaces/:id/apps/:app_id" },
			{ method: "POST", path: "/v1/workspaces/:id/databases/:db_id" },
			{ method: "DELETE", path: "/v1/workspaces/:id/databases/:db_id" },
			{ method: "POST", path: "/v1/workspaces/:id/folders" },
			{ method: "PATCH", path: "/v1/workspaces/:id/folders/:folder_id" },
			{ method: "DELETE", path: "/v1/workspaces/:id/folders/:folder_id" },
			{ method: "PUT", path: "/v1/workspaces/:id/folders/:folder_id/resources/:resource_type/:resource_id" },
			{ method: "DELETE", path: "/v1/workspaces/:id/folders/:folder_id/resources/:resource_type/:resource_id" },
			{ method: "PUT", path: "/v1/workspaces/:id/favorites/:resource_type/:resource_id" },
			{ method: "DELETE", path: "/v1/workspaces/:id/favorites/:resource_type/:resource_id" },
			{ method: "POST", path: "/v1/workspaces/:id/action-requests" },
		],
	},
	/**
	 * Intentionally left out (dashboard session only): creating invites (a leaked key could grant
	 * access that outlives its revocation), transferring ownership, approving/rejecting action
	 * requests (approval is a human decision) and exporting activities.
	 */
	/** Delete a workspace (soft delete). Only in the `full` preset, like `apps:delete`. */
	"workspaces:delete": {
		group: "workspaces",
		routes: [{ method: "DELETE", path: "/v1/workspaces/:id" }],
	},
	/** List and revoke workspace invites; view, accept and decline your own invite by token. Only in the `full` preset. */
	"workspaces:invites": {
		group: "workspaces",
		routes: [
			{ method: "GET", path: "/v1/workspaces/:id/invites" },
			{ method: "DELETE", path: "/v1/workspaces/:id/invites/:invite_id" },
			{ method: "GET", path: "/v1/workspaces/invites/:token" },
			{ method: "POST", path: "/v1/workspaces/invites/:token/accept" },
			{ method: "POST", path: "/v1/workspaces/invites/:token/decline" },
		],
	},
	"billing:read": {
		group: "billing",
		routes: [
			{ method: "GET", path: "/v1/orders" },
			{ method: "GET", path: "/v1/orders/:orderId/status" },
		],
	},
	/** Creates a plan order and generates the PIX charge; the payment itself is made by a person in their banking app. */
	"billing:write": {
		group: "billing",
		routes: [
			{ method: "POST", path: "/v1/orders" },
			{ method: "POST", path: "/v1/orders/:orderId/initiate/pix" },
		],
	},
	"redeem:write": { group: "billing", routes: [{ method: "POST", path: "/v1/redeem/:code" }] },
};

export const API_KEY_SCOPE_LIST = Object.keys(API_KEY_SCOPES) as APIApiKeyScope[];

/** Scopes selected by a preset. `full` is the whole catalog. */
export function apiKeyPresetScopes(preset: APIApiKeyPreset): APIApiKeyScope[] {
	if (preset === "full") return API_KEY_SCOPE_LIST;
	return API_KEY_SCOPE_LIST.filter((s) => s.endsWith(":read") || (preset === "write" && s.endsWith(":write")));
}

/** Maximum keys per account, entries in `allowed_ips`, and key name length. */
export const API_KEY_MAX_PER_USER = 10;
export const API_KEY_MAX_ALLOWED_IPS = 20;
export const API_KEY_NAME_MAX_LENGTH = 40;

/**
 * An API key as listed. The secret is returned only ONCE, in `APIApiKeyCreated`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/users/api-keys/list
 */
export interface APIApiKey {
	id: string;
	name: string;
	/** Public start of the key (`vc_live_a1b2c3d4`; older keys: 8 hex characters). */
	prefix: string;
	/** Last 4 characters; `null` for keys generated before the `vc_live_` format. */
	last4: string | null;
	scopes: APIApiKeyScope[];
	/** Allowed IPs/CIDRs. Empty list = any IP. */
	allowed_ips: string[];
	created_at: ISODateString;
	last_used_at: ISODateString | null;
}

export interface APIApiKeyCreated extends APIApiKey {
	/** The full secret. Shown once; it cannot be recovered. */
	api_key: string;
}
