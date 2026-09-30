---
"@vertracloud/api-types": patch
---

Remove `SUBDOMAIN_ALREADY_IN_USE` from `API_ERROR_CODES`: the API returns `SUBDOMAIN_TAKEN` for a subdomain already in use on every route.
