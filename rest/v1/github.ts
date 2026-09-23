import type { APIGitHubFile, APIPayload } from "../../v1";

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/github/file
 */
export interface RESTPostAPIGitHubFileBody {
	/** Repository URL. A `/tree/<branch>` suffix selects the branch. */
	url: string;
	/** Path relative to the repository root. No `..`, no leading slash, no `.vertracloud/`. */
	path: string;
	/** Branch, tag or commit. Overrides the branch in the URL. */
	ref?: string;
	installation_id?: string;
}

/**
 * @see https://docs.vertracloud.app/api-reference/endpoint/github/file
 */
export type RESTPostAPIGitHubFileResponse = APIPayload<APIGitHubFile>;
