import type { APITemplateOrigin, ApplicationLanguage, ApplicationStatus, DatabaseStatus, DatabaseType, ISODateString, SnowFlake, TemplateBlobVisibility } from "../../v1";

/**
 * How the members of a stack reach each other. `public` uses the public addresses of the services (databases with client
 * certificates); `private` is reserved for a plan with the private network and is not available yet.
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/network-mode
 */
export type StackNetworkMode = "public" | "private";
export const StackNetworkMode = {
	Public: "public",
	Private: "private",
} as const;

/**
 * Kind of a member of a stack.
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/get
 */
export type StackMemberType = "application" | "database" | "blob";
export const StackMemberType = {
	Application: "application",
	Database: "database",
	/** A folder of the account's Blob Storage, with a key restricted to it. */
	Blob: "blob",
} as const;

/**
 * What happens to a Blob folder when it leaves a stack or the stack is deleted: `keep` leaves the files where they are,
 * `delete` removes them. In both cases the key the platform created for the stack is revoked.
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/delete
 */
export type StackBlobDisposition = "keep" | "delete";
export const StackBlobDisposition = {
	Keep: "keep",
	Delete: "delete",
} as const;

/**
 * What happens to the variables of a connection when a member leaves a stack or a connection is removed. `keep_connection`
 * rewrites them to the public address with certificates and turns them into ordinary variables; `remove_variables` deletes
 * them (and the certificates copied to the app).
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/members/remove
 */
export type StackBindingRemoval = "keep_connection" | "remove_variables";
export const StackBindingRemoval = {
	KeepConnection: "keep_connection",
	RemoveVariables: "remove_variables",
} as const;

/**
 * How a stack is deleted. `dissolve` removes only the stack: the members stay as loose resources, without the network and
 * the managed variables, and Blob files are kept. `delete_all` deletes every member as well (each by its own deletion rule).
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/delete
 */
export type StackDeleteMode = "dissolve" | "delete_all";
export const StackDeleteMode = {
	Dissolve: "dissolve",
	DeleteAll: "delete_all",
} as const;

/**
 * What a managed variable of a connection receives. For a database: `url`, `host`, `port`, `user`, `password`,
 * `database` and the paths of the client certificates `ssl.ca_path`, `ssl.cert_path`, `ssl.key_path`, `ssl.pem_path`
 * (key, certificate and CA in one file, the format MongoDB reads) and `ssl.p12_path` (PKCS#12 with an empty password, the format
 * Prisma 6 and earlier read); `prisma_url` is a PostgreSQL URL written for Prisma 6 and earlier (`sslidentity` points to the PKCS#12 file) and
 * is never added by default: add it to the connection when the application uses that Prisma. For another app:
 * `url`. For a Blob folder: `endpoint`, `bucket`, `region`, `prefix`, `access_key_id`, `secret_access_key` and
 * `public_base_url` (empty when the folder is private).
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/bindings/create
 */
export type StackBindingValue = "url" | "host" | "port" | "user" | "password" | "database" | "ssl.ca_path" | "ssl.cert_path" | "ssl.key_path" | "ssl.p12_path" | "ssl.pem_path" | "prisma_url" | "endpoint" | "bucket" | "region" | "prefix" | "access_key_id" | "secret_access_key" | "public_base_url";
export const StackBindingValue = {
	Url: "url",
	Host: "host",
	Port: "port",
	User: "user",
	Password: "password",
	Database: "database",
	SslCaPath: "ssl.ca_path",
	SslCertPath: "ssl.cert_path",
	SslKeyPath: "ssl.key_path",
	SslP12Path: "ssl.p12_path",
	SslPemPath: "ssl.pem_path",
	PrismaUrl: "prisma_url",
	Endpoint: "endpoint",
	Bucket: "bucket",
	Region: "region",
	Prefix: "prefix",
	AccessKeyId: "access_key_id",
	SecretAccessKey: "secret_access_key",
	PublicBaseUrl: "public_base_url",
} as const;

/**
 * Why a stack snapshot was taken.
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/snapshots/list
 */
export type StackSnapshotReason = "manual" | "update" | "delete";
export const StackSnapshotReason = {
	Manual: "manual",
	/** Safety snapshot taken before an update to a newer template version. */
	Update: "update",
	/** Taken when the stack and its members were deleted. */
	Delete: "delete",
} as const;

/**
 * Details of a Blob folder that belongs to a stack.
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/get
 */
export interface APIStackBlob {
	/** Folder of the account's Blob, ending in `/`. */
	prefix: string;
	visibility: TemplateBlobVisibility;
	/** Bytes stored under the folder; `null` when it is not available. */
	used_bytes: number | null;
	/** Id of the API key the platform created for the stack, restricted to the folder. */
	api_key_id: string | null;
}

/**
 * A member of a stack: an application, a database or a Blob folder.
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/get
 */
export interface APIStackMember {
	resource_type: StackMemberType;
	/** Id of the application or database. For a Blob folder, the id of the member. */
	resource_id: SnowFlake;
	name: string;
	/** `null` for a Blob folder. */
	status: ApplicationStatus | DatabaseStatus | null;
	/** Memory in MB; `0` for a Blob folder. */
	ram: number;
	/** Id of the service in the template the stack came from; `null` for a member the user added. */
	service_key: string | null;
	/** Engine of a database member; `null` otherwise. */
	database_type: DatabaseType | null;
	/** `true` for an application of a closed template: its code is not accessible. */
	closed: boolean;
	/** Set for a Blob member. */
	blob: APIStackBlob | null;
}

/**
 * Members online, offline and building, added up.
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/get
 */
export interface APIStackStatus {
	up: number;
	down: number;
	building: number;
	/** Members that have a status (applications and databases). */
	total: number;
}

/**
 * A connection between members: the platform injects the connection variables (and the certificates, for a database) into
 * the application and keeps them up to date. Exactly one of `database_id`, `blob_id` and `target_app_id` is set.
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/bindings/list
 */
export interface APIStackBinding {
	id: string;
	stack_id: SnowFlake;
	/** The application that receives the variables. */
	app_id: SnowFlake;
	/** Database the application connects to. */
	database_id: SnowFlake | null;
	/** Blob member the application connects to. */
	blob_id: SnowFlake | null;
	/** Another application the application calls; the application itself when the variable carries its own address. */
	target_app_id: SnowFlake | null;
	/** Variable name to what it receives. */
	env_map: Record<string, StackBindingValue>;
	/** Folder inside the application where the client certificates of the database are written; `null` without a database. */
	certs_path: string | null;
	created_at: ISODateString;
}

/**
 * A stack: applications, databases and Blob folders created together or grouped by the user, with the connections between them.
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/get
 */
export interface APIStack {
	id: SnowFlake;
	name: string;
	description: string | null;
	network_mode: StackNetworkMode;
	owner_id: SnowFlake;
	/** Workspace the stack belongs to; `null` when it belongs to the user. */
	workspace_id: SnowFlake | null;
	members: APIStackMember[];
	/** Status of the members, added up. */
	status: APIStackStatus;
	/** Memory of every member, in MB. */
	ram_total: number;
	bindings: APIStackBinding[];
	/** Template and version the stack came from; `null` for a stack assembled by hand. */
	template: APITemplateOrigin | null;
	/** `true` when the template has a newer version the stack can update to. */
	update_available: boolean;
	created_at: ISODateString;
	updated_at: ISODateString;
}

/**
 * One piece of code that connects an application to a member of a stack, in the language of the application and with the
 * real names of the variables the platform injected.
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/connection
 */
export interface APIStackConnectionSnippet {
	language: ApplicationLanguage;
	/** Driver or client library the code uses (`pg`, `psycopg`, `ioredis`...). */
	driver: string;
	/** Engine of the database; `null` for a Blob folder. */
	database_type: DatabaseType | null;
	/** `true` for a Blob folder (S3-compatible client). */
	blob: boolean;
	title: string;
	code: string;
	/** Names of the variables the code reads. */
	env_vars: string[];
}

/**
 * How to connect an application to the members it is linked to.
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/connection
 */
export interface APIStackConnectionInfo {
	app_id: SnowFlake;
	/** Language of the application. */
	language: ApplicationLanguage;
	snippets: APIStackConnectionSnippet[];
}

/**
 * Added to the answer of every change that can alter the variables or the certificates an application reads: an application reads them
 * only when it starts, so the platform does not restart it by itself. `restart_required` is `true` when at least one application needs a
 * restart to see the change, and `apps_to_restart` lists them.
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/bindings/create
 */
export interface APIRestartRequired {
	restart_required: boolean;
	/** Applications that need a restart to read the new variables or certificates. Empty when `restart_required` is `false`. */
	apps_to_restart: SnowFlake[];
}

/**
 * A stack together with the restart notice of the change that returned it.
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/members/add
 */
export type APIStackChange = APIStack & APIRestartRequired;

/**
 * A connection together with the restart notice of the change that returned it.
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/bindings/create
 */
export type APIStackBindingChange = APIStackBinding & APIRestartRequired;

/**
 * A snapshot of every member of a stack taken together.
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/snapshots/list
 */
export interface APIStackSnapshot {
	id: SnowFlake;
	stack_id: SnowFlake;
	reason: StackSnapshotReason;
	date: ISODateString;
	/** Total size, human readable. */
	size: string;
	/** Snapshot of each member that has data (applications and databases). */
	members: { resource_type: "application" | "database"; resource_id: SnowFlake; snapshot_id: SnowFlake }[];
	/** `true` when the stack runs a closed template: the snapshot cannot be downloaded. */
	closed: boolean;
}

/**
 * Result of adding a database to a stack.
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/databases/create
 */
export interface APIStackDatabaseAdded extends APIRestartRequired {
	stack: APIStack;
	database_id: SnowFlake;
}

/**
 * Result of adding a Blob folder to a stack.
 * @see https://docs.vertracloud.app/api-reference/endpoint/stacks/blob/create
 */
export interface APIStackBlobAdded extends APIRestartRequired {
	stack: APIStack;
	blob: APIStackMember;
}
