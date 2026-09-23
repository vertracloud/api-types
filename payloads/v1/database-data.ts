/**
 * Payloads of the database **Data** tab (content management: SQL, Mongo, Redis).
 *
 * The resource here is the **content** of the user's database, not the database instance itself
 * (see `database.ts`). No field carries credentials: password, connection string and certificate
 * are never returned by these routes.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/overview
 */

// ---------------------------------------------------------------------------
// Common to every engine
// ---------------------------------------------------------------------------

/**
 * Tab header: which engine this is and how much it currently stores.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/overview
 */
export interface APIDatabaseDataOverview {
	engine_version: string;
	size_bytes: number;
	/** Tables (SQL), collections (Mongo) or keys (Redis). */
	objects_count: number;
	connections_active: number;
	connections_max: number;
	uptime_seconds: number;
	/** Engine-specific fields (e.g. `wal_size_bytes`, `replica_set`). Optional per engine. */
	extra?: Record<string, string | number | boolean | null>;
}

/**
 * Sort direction for any listing in the tab.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/overview
 */
export type DatabaseSortDirection = "asc" | "desc";
export const DatabaseSortDirection = {
	Asc: "asc",
	Desc: "desc",
} as const satisfies Record<string, DatabaseSortDirection>;

/**
 * Operators accepted by the structured row filter (`APIDatabaseRowFilter.op`). Closed list —
 * anything else is rejected.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/rows
 */
export type DatabaseFilterOperator = "=" | "!=" | "<" | "<=" | ">" | ">=" | "LIKE" | "IS NULL" | "IS NOT NULL";
export const DatabaseFilterOperator = {
	Eq: "=",
	Ne: "!=",
	Lt: "<",
	Lte: "<=",
	Gt: ">",
	Gte: ">=",
	Like: "LIKE",
	IsNull: "IS NULL",
	IsNotNull: "IS NOT NULL",
} as const satisfies Record<string, DatabaseFilterOperator>;

/**
 * One item of the structured row filter. `value` is omitted for `IS NULL`/`IS NOT NULL`.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/rows
 */
export interface APIDatabaseRowFilter {
	column: string;
	op: DatabaseFilterOperator;
	value?: unknown;
}

/**
 * Query-string parameters for paginated **row** listing. `per_page` is capped at 200.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/rows
 */
export interface APIDatabaseListParams {
	page?: number;
	per_page?: number;
	/** Simple "contains" filter applied to the column/field given by `filter_field`. */
	filter?: string;
	filter_field?: string;
	sort?: string;
	direction?: DatabaseSortDirection;
	/**
	 * Structured filter: `APIDatabaseRowFilter[]` serialized as JSON. Up to 20 items and 4096
	 * bytes — anything larger is rejected.
	 */
	filters?: string;
}

/**
 * Query-string parameters for paginated **document** listing. `filter` is a serialized Mongo
 * query JSON; `sort` is a serialized `{ field: 1 | -1 }`. No `direction`/`filter_field` — the
 * Mongo filter already carries the operator.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/documents
 */
export interface APIDatabaseDocumentListParams {
	page?: number;
	per_page?: number;
	filter?: string;
	sort?: string;
}

/**
 * Data operation error. Same error envelope as the rest of the API — `code` is a stable English
 * sentinel (`DB_NOT_RUNNING`, `QUERY_TIMEOUT`, …) meant to be translated by the client.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/errors
 */
export interface APIDatabaseDataError {
	code: string;
	message?: string;
	details?: unknown;
}

// ---------------------------------------------------------------------------
// SQL (PostgreSQL / MySQL)
// ---------------------------------------------------------------------------

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/schemas
 */
export interface APIDatabaseSchema {
	name: string;
	tables_count: number;
	size_bytes: number;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/tables
 */
export type DatabaseTableKind = "table" | "view";
export const DatabaseTableKind = {
	Table: "table",
	View: "view",
} as const satisfies Record<string, DatabaseTableKind>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/tables
 */
export interface APIDatabaseTable {
	schema: string;
	name: string;
	kind: DatabaseTableKind;
	/** Engine estimate — an exact count would require a full scan. */
	rows_estimate: number;
	size_bytes: number;
	columns_count: number;
	indexes_count: number;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/tables
 */
export interface APIDatabaseColumnReference {
	schema: string;
	table: string;
	column: string;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/tables
 */
export interface APIDatabaseColumn {
	name: string;
	/** Raw engine type (`text`, `bigint`, `timestamptz`, `varchar(255)`…). */
	data_type: string;
	nullable: boolean;
	default_value: string | null;
	is_primary_key: boolean;
	is_unique: boolean;
	is_foreign_key: boolean;
	references?: APIDatabaseColumnReference;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/tables
 */
export interface APIDatabaseIndex {
	name: string;
	columns: string[];
	unique: boolean;
	primary: boolean;
	size_bytes: number;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/rows
 */
export interface APIDatabaseRowsPage {
	columns: APIDatabaseColumn[];
	rows: Record<string, unknown>[];
	total: number;
	page: number;
	per_page: number;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/query
 */
export interface APIDatabaseQueryResult {
	columns: string[];
	/** Positional matrix — order matches `columns`. */
	rows: unknown[][];
	row_count: number;
	duration_ms: number;
	/** `true` when the result was cut at the row limit. */
	truncated: boolean;
}

// ---------------------------------------------------------------------------
// MongoDB
// ---------------------------------------------------------------------------

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/collections
 */
export interface APIDatabaseCollection {
	name: string;
	documents_count: number;
	size_bytes: number;
	avg_document_size: number;
	indexes_count: number;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/documents
 */
export interface APIDatabaseDocumentsPage {
	documents: Record<string, unknown>[];
	total: number;
	page: number;
	per_page: number;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/collections
 */
export interface APIDatabaseMongoIndex {
	name: string;
	/** `{ created_at: -1 }` — same shape as `createIndex`. */
	keys: Record<string, 1 | -1>;
	unique: boolean;
	sparse: boolean;
}

// ---------------------------------------------------------------------------
// Redis
// ---------------------------------------------------------------------------

/**
 * `SCAN` query-string parameters. `cursor` absent = start of the scan.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/keys
 */
export interface APIDatabaseRedisScanParams {
	pattern?: string;
	cursor?: string;
	count?: number;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/keys
 */
export type DatabaseRedisKeyType = "string" | "hash" | "list" | "set" | "zset" | "stream";
export const DatabaseRedisKeyType = {
	String: "string",
	Hash: "hash",
	List: "list",
	Set: "set",
	ZSet: "zset",
	Stream: "stream",
} as const satisfies Record<string, DatabaseRedisKeyType>;

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/keys
 */
export interface APIDatabaseRedisKey {
	key: string;
	type: DatabaseRedisKeyType;
	/** `null` = no expiration. */
	ttl_seconds: number | null;
	size_bytes: number;
	/** Cardinality (items in the hash/list/set/zset/stream). Absent for `string`. */
	length?: number;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/keys
 */
export interface APIDatabaseRedisKeysPage {
	keys: APIDatabaseRedisKey[];
	/** `SCAN` cursor. `null` = the scan is complete. */
	cursor: string | null;
	scanned: number;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/keys
 */
export interface APIDatabaseRedisZSetMember {
	member: string;
	score: number;
}

/**
 * Value of a key, discriminated by `type`. Collections are truncated at 1000 items **or** at the
 * read byte limit — `truncated: true` when the value was cut for either reason. Absent/`false` =
 * the full value was returned.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/keys
 */
export type APIDatabaseRedisKeyValue =
	| { key: string; type: "string"; ttl_seconds: number | null; value: string; truncated?: boolean }
	| { key: string; type: "hash"; ttl_seconds: number | null; value: Record<string, string>; truncated?: boolean }
	| { key: string; type: "list"; ttl_seconds: number | null; value: string[]; truncated?: boolean }
	| { key: string; type: "set"; ttl_seconds: number | null; value: string[]; truncated?: boolean }
	| { key: string; type: "zset"; ttl_seconds: number | null; value: APIDatabaseRedisZSetMember[]; truncated?: boolean }
	| { key: string; type: "stream"; ttl_seconds: number | null; value: string[]; truncated?: boolean };

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/info
 */
export interface APIDatabaseRedisInfo {
	version: string;
	used_memory_bytes: number;
	/** `null` = no `maxmemory` configured. */
	max_memory_bytes: number | null;
	keys_total: number;
	expires_total: number;
	hits: number;
	misses: number;
	connected_clients: number;
	ops_per_second: number;
}
