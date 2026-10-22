---
"@vertracloud/api-types": patch
---

Add the `deno`, `dotnet` and `elixir` application languages. `POST /v1/apps` accepts an optional `language` to force the language (without it the platform detects it from the project manifest). The project-detection response types gain `language`, `main`, `version`, `has_manifest` and `candidates`. Remove `missing_dependencies` from the application, the file upload response and the project-detection response. Remove `cleanup_old_runtime_language` from the restart body and the `CLEANUP_LANGUAGE_SAME_AS_CURRENT` error code: the platform now cleans the previous runtime's dependencies automatically when the language changes.
