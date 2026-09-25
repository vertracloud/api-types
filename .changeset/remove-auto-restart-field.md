---
"@vertracloud/api-types": minor
---

Remove the `autorestart`/`auto_restart` field from `RESTPostAPIApplicationCreateBody`, `RESTPatchAPIApplicationUpdateConfigBody` and `APIApplication`. Auto-restart has been unconditionally on for every plan since 2026-09-17 and the field was only accepted-and-ignored; it is now gone from the wire entirely. Breaking for any client still reading `auto_restart` off the application payload.
