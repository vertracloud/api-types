---
"@vertracloud/api-types": patch
---

`node` on applications and databases is now the name of the server that runs the resource, such as `amethyst` (`string`; `NodeId` was removed). Creation bodies no longer accept `node`: the platform always picks the server inside the chosen `region`. `NODE_NOT_ALLOWED` and `NODE_NOT_IN_REGION` were removed.
