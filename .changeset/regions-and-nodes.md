---
"@vertracloud/api-types": minor
---

Regions. Breaking: `APIApplication.cluster` and `APIDatabase.cluster` were removed, together with `ApplicationCluster` and `DatabaseCluster`. Applications and databases now have `region` (`RegionId`: `"ny"` or `"sp"`) and `node` (`NodeId`, the server inside the region, such as `ny1`). Dashboard route `GET /v1/regions` (`RESTGetAPIRegionsResponse`, `APIRegion`; session only). The create bodies of applications (`POST /v1/apps`, `POST /v1/apps/image`) and databases (`POST /v1/databases`) accept an optional `region` and `node`. New error codes `REGION_NOT_AVAILABLE`, `NODE_NOT_ALLOWED` and `NODE_NOT_IN_REGION`.
