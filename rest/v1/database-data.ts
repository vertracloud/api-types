import type {
	APIDatabaseCollection,
	APIDatabaseColumn,
	APIDatabaseDataOverview,
	APIDatabaseDocumentsPage,
	APIDatabaseIndex,
	APIDatabaseMongoIndex,
	APIDatabaseQueryResult,
	APIDatabaseRedisInfo,
	APIDatabaseRedisKeyValue,
	APIDatabaseRedisKeysPage,
	APIDatabaseRowsPage,
	APIDatabaseSchema,
	APIDatabaseTable,
	DatabaseRedisKeyType,
} from "../../v1";

/**
 * Envelopes of the database **Data** tab.
 *
 * **`Result`** suffix (not `Response`): these routes return `{ response }` with a **required**
 * `response` — never `{ code }` on a 2xx. `APIPayload<T>` marks `response` as optional. This is
 * the only endpoint family with that guarantee; the rest of the contract uses
 * `REST…Response = APIPayload<T>`.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/overview
 */

// ---------------------------------------------------------------------------
// Common
// ---------------------------------------------------------------------------

/**
 * `GET /v1/databases/:id/data/overview`
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/overview
 */
export interface RESTGetAPIDatabaseDataOverviewResult {
	response: APIDatabaseDataOverview;
}

// ---------------------------------------------------------------------------
// SQL (PostgreSQL / MySQL)
// ---------------------------------------------------------------------------

/**
 * `GET /v1/databases/:id/data/schemas`
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/schemas
 */
export interface RESTGetAPIDatabaseSchemasResult {
	response: APIDatabaseSchema[];
}

/**
 * `GET /v1/databases/:id/data/tables?schema=`
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/tables
 */
export interface RESTGetAPIDatabaseTablesResult {
	response: APIDatabaseTable[];
}

/**
 * `GET /v1/databases/:id/data/tables/:table/columns?schema=`
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/tables
 */
export interface RESTGetAPIDatabaseTableColumnsResult {
	response: { columns: APIDatabaseColumn[]; indexes: APIDatabaseIndex[] };
}

/**
 * `GET /v1/databases/:id/data/tables/:table/rows?schema=&page=&per_page=&filter=&sort=&direction=`
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/rows
 */
export interface RESTGetAPIDatabaseTableRowsResult {
	response: APIDatabaseRowsPage;
}

/**
 * `POST /v1/databases/:id/data/query` — SQL console. Runs as the database's own user, with a
 * time limit (10 s), a row limit (`limit`) and a serialized size limit.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/query
 */
export interface RESTPostAPIDatabaseQueryBody {
	sql: string;
	/** Maximum rows returned. The result is cut and marked `truncated`. */
	limit?: number;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/query
 */
export interface RESTPostAPIDatabaseQueryResult {
	response: APIDatabaseQueryResult;
}

/**
 * `POST /v1/databases/:id/data/rows` — new row. No `primary_key`, since it does not exist yet.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/rows
 */
export interface RESTPostAPIDatabaseRowCreateBody {
	schema: string;
	table: string;
	values: Record<string, unknown>;
}

/**
 * `PUT /v1/databases/:id/data/rows` — an existing row is **always** identified by its full
 * primary key (`{ id: 42 }` or composite `{ tenant_id: 1, user_id: 9 }`), never by its
 * position on the page.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/rows
 */
export interface RESTPutAPIDatabaseRowUpdateBody {
	schema: string;
	table: string;
	primary_key: Record<string, unknown>;
	values: Record<string, unknown>;
}

/**
 * `DELETE /v1/databases/:id/data/rows`
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/rows
 */
export interface RESTDeleteAPIDatabaseRowsBody {
	schema: string;
	table: string;
	primary_keys: Record<string, unknown>[];
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/rows
 */
export interface RESTMutateAPIDatabaseRowsResult {
	response: { affected: number };
}

// ---------------------------------------------------------------------------
// MongoDB
// ---------------------------------------------------------------------------

/**
 * `GET /v1/databases/:id/data/collections`
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/collections
 */
export interface RESTGetAPIDatabaseCollectionsResult {
	response: APIDatabaseCollection[];
}

/**
 * `GET /v1/databases/:id/data/collections/:name/indexes`
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/collections
 */
export interface RESTGetAPIDatabaseCollectionIndexesResult {
	response: APIDatabaseMongoIndex[];
}

/**
 * `GET /v1/databases/:id/data/collections/:name/documents?page=&per_page=&filter=&sort=`
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/documents
 */
export interface RESTGetAPIDatabaseDocumentsResult {
	response: APIDatabaseDocumentsPage;
}

/**
 * `POST /v1/databases/:id/data/collections/:name/documents` — the collection goes in the path.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/documents
 */
export interface RESTPostAPIDatabaseDocumentCreateBody {
	document: Record<string, unknown>;
}

/**
 * `PUT /v1/databases/:id/data/collections/:name/documents/:doc_id` — collection and `doc_id`
 * come from the path.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/documents
 */
export interface RESTPutAPIDatabaseDocumentUpdateBody {
	document: Record<string, unknown>;
}

/**
 * `DELETE /v1/databases/:id/data/collections/:name/documents` — the collection goes in the path.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/documents
 */
export interface RESTDeleteAPIDatabaseDocumentsBody {
	ids: string[];
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/documents
 */
export interface RESTMutateAPIDatabaseDocumentsResult {
	response: { affected: number };
}

// ---------------------------------------------------------------------------
// Redis
// ---------------------------------------------------------------------------

/**
 * `GET /v1/databases/:id/data/keys?pattern=&cursor=&count=` — uses `SCAN`, never `KEYS`.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/keys
 */
export interface RESTGetAPIDatabaseRedisKeysResult {
	response: APIDatabaseRedisKeysPage;
}

/**
 * `GET /v1/databases/:id/data/keys/:key`
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/keys
 */
export interface RESTGetAPIDatabaseRedisKeyValueResult {
	response: APIDatabaseRedisKeyValue;
}

/**
 * `GET /v1/databases/:id/data/info`
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/info
 */
export interface RESTGetAPIDatabaseRedisInfoResult {
	response: APIDatabaseRedisInfo;
}

/**
 * `PUT /v1/databases/:id/data/keys/:key`
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/keys
 */
export interface RESTPutAPIDatabaseRedisKeyBody {
	/** The key also goes in the path (`:key`); the path wins — this field is redundant by design. */
	key: string;
	type: DatabaseRedisKeyType;
	value: APIDatabaseRedisKeyValue["value"];
	/** `null` = remove the TTL; absent = keep the current one. */
	ttl_seconds?: number | null;
}

/**
 * `DELETE /v1/databases/:id/data/keys`
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/keys
 */
export interface RESTDeleteAPIDatabaseRedisKeysBody {
	keys: string[];
}

/**
 * `PUT /v1/databases/:id/data/keys/:key/expire` — `ttl_seconds: null` = `PERSIST`.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/keys
 */
export interface RESTPutAPIDatabaseRedisKeyExpireBody {
	/** `null` = `PERSIST`. */
	ttl_seconds: number | null;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/databases/data/keys
 */
export interface RESTMutateAPIDatabaseRedisKeysResult {
	response: { affected: number };
}
