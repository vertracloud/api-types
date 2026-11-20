---
"@vertracloud/api-types": patch
---

Remove `APIApplicationScanSuggestions`, `RESTPostAPIApplicationScanBody` and `RESTPostAPIApplicationScanResponse`: `POST /v1/apps/scan` no longer exists and answers `404`. The route was only used by the dashboard, which now pre-fills the new application form in the browser. Breaking change, consciously taken before 1.0.
