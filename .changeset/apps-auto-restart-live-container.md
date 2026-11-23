---
"@vertracloud/api-types": patch
---

Add `auto_restart` to the application, to application creation (`POST /v1/apps`, and `POST /v1/apps/image` for Docker image apps) and to `PATCH /v1/apps/:id/config`: restart automatically when the app stops unexpectedly, on by default; changing it applies right away. Deleting a file now returns `space_released` (`now` or `on_restart`). New console notes: `install_note:done`, `run_note:started`, `image_note:*` and `restart_note:auto_restart_disabled`.
