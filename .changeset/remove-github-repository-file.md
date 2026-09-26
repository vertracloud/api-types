---
"@vertracloud/api-types": patch
---

Remove `POST /v1/github/repository/file` from the public contract: `APIGitHubFile`, `RESTPostAPIGitHubFileBody` and `RESTPostAPIGitHubFileResponse` no longer exist. The route was built for the hosted AI, which has been removed from the product; nothing consumes it. Breaking for any client still importing these types.
