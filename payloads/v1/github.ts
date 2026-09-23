/**
 * A file read from a GitHub repository, with secrets redacted.
 *
 * Secret values found in the file are redacted before the content is returned.
 *
 * @see https://docs.vertracloud.app/api-reference/endpoint/github/file
 */
export interface APIGitHubFile {
	path: string;
	content: string;
	/** Size in bytes of the original file in the repository, before redaction. */
	size: number;
	/**
	 * Always `false` today: files above the size limit are rejected with `FILE_TOO_LARGE` instead
	 * of being truncated. Reserved so truncation can be added later without a breaking change.
	 */
	truncated: boolean;
}
