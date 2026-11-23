---
"@vertracloud/api-types": patch
---

Database creation (`POST /v1/databases`), adding a database to a stack and deploying a template now return the database password once; afterwards reset it to see a new one. `APIDatabase.legacy_host` tells when a database still uses its original connection address, and resetting the certificates now returns the new `host` and `client_variables_with_old_host` (your own variables that still contain the previous address). Moving a database that has `legacy_host: true` to the current address is done only from the dashboard: resetting its certificates with an API key responds 403 `WEBSITE_ONLY`.
