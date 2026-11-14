---
"@vertracloud/api-types": patch
---

`APIActionCodeAction` gains `revoke_sessions`: signing out of every other session (`DELETE /v1/users/me/sessions`) now asks for a confirmation code in the dashboard (`X-Action-Code`).
