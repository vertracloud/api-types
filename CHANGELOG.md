# @vertracloud/api-types

## 0.0.40 (2026-03-20)

### Breaking Changes
- **Credits types**: Renamed `free_per_month` to `free_per_week` in `APICreditCompute` and `APICreditAI` to reflect weekly credit reset cycle

---

## 0.0.39 (2026-03-20)

### Breaking Changes
- **Credits types**: Restructured `APIUserCredits` and `APICreditBalance` from flat fields to nested `{ compute, ai }` objects
  - `free`, `paid`, `free_per_month`, `free_reset_at`, `paid_expires_at` are now under `compute`
  - `ai_free`, `ai_paid`, `ai_free_per_month`, `ai_free_reset_at`, `ai_paid_expires_at` are now under `ai`
  - Added `APICreditCompute` and `APICreditAI` sub-interfaces
  - Removed deprecated `free_per_week` field (replaced by `free_per_month`)
- Added JSDoc route comments to all credit interfaces

---

## 0.0.38 (2026-03-21)

### Features
- **Wing types**: Added `WingPayload`, `WingServiceResult`, `WingsContainerMetric`, `WingsAppCreateResponse`, `WingsAppRebuildResponse`, `WingsDatabaseCreateResponse`, `WingsDatabaseRebuildResponse`, `WingsDatabaseCertificate`, `WingsFileUploadResponse`, `WingsFileMoveResponse`, `WingsSnapshotRestoreResponse`, `WingsDatabaseResetResponse`
- **Order types**: Added `APIOrderCreateResponse`, `APIOrderStatus`, `APIOrderListItem`, `APIPixPaymentResponse`, `OrderStatus`, `OrderType`, `OrderProvider`
- **Redeem types**: Added `APIRedeemResponse`
- **Credit REST types**: Added `RESTGetAPICreditBalanceResponse`, `RESTGetAPICreditUsageResponse`, `RESTGetAPICreditCostEstimateResponse`
- **Notification REST types**: Added `RESTGetAPINotificationsResponse`
- **Application types**: Added `APIApplicationOperationResponse`, `APIApplicationDeployment`, `APIDnsRecord`, `APIWebhookUrl`, `APISubdomainResponse`, `APICustomDomainResponse`
- **Database types**: Added `APIDatabasePasswordReset`
- **User types**: Added `APIUserApiKey`, `is_current` field to `APIUserSession`
- **Workspace types**: Added `APIWorkspaceMemberAdd`, `APIWorkspaceMemberRoleUpdate`
- **Snapshot types**: Added `APISnapshotRestoreResponse`

### REST Types
- Added `RESTPostAPIApplicationStartResponse`, `RESTPostAPIApplicationStopResponse`, `RESTPostAPIApplicationRestartResponse`, `RESTPostAPIApplicationUpdateConfigResponse`, `RESTPostAPIApplicationCreateResponse`, `RESTDeleteAPIApplicationResponse`, `RESTGetAPIApplicationDownloadResponse`, `RESTGetAPIApplicationRealtimeResponse`, `RESTGetAPIApplicationDnsRecordsResponse`, `RESTPostAPIApplicationCustomDomainResponse`, `RESTPatchAPIApplicationSubdomainResponse`, `RESTGetAPIApplicationWebhookUrlResponse`, `RESTGetAPIApplicationDeploymentsResponse`
- Added `RESTPostAPIDatabaseCreateResponse`, `RESTDeleteAPIDatabaseResponse`, `RESTPutAPIDatabaseUpdateResponse`, `RESTPostAPIDatabaseResetResponse`, `RESTGetAPIDatabaseCertificateResponse`, `RESTPostAPIDatabaseResetCertificateResponse`, `RESTPostAPIDatabaseResetPasswordResponse`
- Added `RESTPostAPIUserDowngradeResponse`, `RESTPostAPIUserGenerateApiKeyResponse`, `RESTGetAPIUserSessionsResponse`
- Added `RESTGetAPIWorkspacesResponse`, `RESTPostAPIWorkspaceCreateResponse`, `RESTPutAPIWorkspaceUpdateResponse`, `RESTDeleteAPIWorkspaceResponse`, `RESTPostAPIWorkspaceMemberAddResponse`, `RESTPutAPIWorkspaceMemberRoleResponse`
- Added `RESTPostAPISnapshotCreateResponse`, `RESTPostAPISnapshotRestoreResponse`, `RESTGetAPISnapshotDownloadResponse`
- Added Wing REST types: `WingPostAppCreateResponse`, `WingPostAppRebuildResponse`, `WingGetAppStatusResponse`, `WingPostAppAllStatusResponse`, `WingGetAppLogsResponse`, `WingGetAppDownloadResponse`, `WingPostAppFileUploadResponse`, `WingPostDatabaseCreateResponse`, `WingPostDatabaseRebuildResponse`, `WingGetDatabaseStatusResponse`, `WingPostDatabaseAllStatusResponse`, `WingGetDatabaseCertificateResponse`, `WingPostDatabaseResetCertificateResponse`, `WingPostDatabaseResetResponse`, `WingPostSnapshotRestoreResponse`

### Documentation
- Updated all `@see` JSDoc links to point to correct Mintlify documentation pages
- All REST types now have proper endpoint references

---

## 0.0.37 (2026-03-19)

### Features
- **Workspace types**: Introduced `APIWorkspace`, `APIWorkspaceInfoResponse`, `APIWorkspaceMember` with `WorkspaceMemberRole` enum replacing organization types
- **Credit types**: Added `APIUserCredits`, `APICreditBalance`, `APICreditUsage`, `APICreditCostEstimate` with compute and AI credit pools
- **Application updates**: Added `use_credits`, `credits_used`, `offline_since` fields to `APIApplication`
- **Database updates**: Added `use_credits`, `credits_used`, `offline_since` fields to `APIDatabase`

---

## 0.0.36 (2026-03-17)

### Features
- **New languages**: Added `ruby`, `java`, `rust` to `ApplicationLanguage` enum

---

## 0.0.35 (2026-03-10)

### Refactors
- **Snapshot module**: Moved and generalized application snapshot types into dedicated `snapshot` module
- **Types**: Added `APIResourceSnapshot`, `APIGroupedResourceSnapshots`, `ResourceType` enum

---

## 0.0.34 (2026-03-09)

### Breaking Changes
- **Backup → Snapshot**: Renamed all backup types and fields to snapshot terminology
- Removed `APIApplicationCommit` and commit-related types

---

## 0.0.33 (2026-03-08)

### Refactors
- Database type improvements and field updates

---

## 0.0.32 (2026-03-06)

### Features
- **Notification types**: Added `APINotification`, `NotificationType`, `NotificationImportance`, `LocalizedContent`
- **User enhancements**: Added `language` field to `APIUser`, `APIUserConnection` interface, `APIUserSession` interface
- **REST types**: Added `RESTGetAPIUserInfoResponse`

---

## 0.0.31 (2026-01-17)

### Refactors
- Made `description` optional in `APIApplication`
- Added `email` field to `APIUser`

---

## 0.0.30 (2025-12-01)

### Features
- **New languages**: Added `go` and `php` to `ApplicationLanguage` enum

---

## 0.0.29 (2025-11-24)

### Refactors
- User plan type improvements and updates

---

## 0.0.28 (2025-11-14)

### Features
- Added `static` to `ApplicationLanguage` enum for static site hosting

---

## 0.0.27 (2025-11-10)

### Features
- Added new cluster `USA_3` to `ApplicationCluster` and `DatabaseCluster`

---

## 0.0.26 (2025-10-22)

### Features
- Added `INTERMEDIARY` plan (id: 9) to `UserPlan` enum

---

## 0.0.25 (2025-09-22)

### Refactors
- Application language enum improvements

---

## 0.0.24 (2025-09-19)

### Refactors
- General typing improvements across payloads

---

## 0.0.23 (2025-08-03)

### Breaking Changes
- Removed `password` and `username` fields from `APIDatabase` payload
- Removed `connection` field from `APIDatabase`

---

## 0.0.22 (2025-07-25)

### Refactors
- Updated `APIUserPlan` memory structure
- Updated organization and user payload types

---

## 0.0.21 (2025-07-22)

### Refactors
- User plan payload improvements

---

## 0.0.20 (2025-07-12)

### Refactors
- Database connection type improvements

---

## 0.0.19 (2025-07-10)

### Features
- Added `APIApplicationEnvironment` type with `id`, `key`, `value`, `note`, `created_at` fields
- Added `RESTGetAPIApplicationEnvironmentResponse`

---

## 0.0.18 (2025-07-03)

### Features
- Added `APIApplicationNetwork` with `total` and `now` fields
- Added database metric and status types

---

## 0.0.17 (2025-06-28)

### Features
- **Activity types**: Added `APIActivity`, `ActivityStatus`, `ActivityTargetType`
- **REST types**: Added `RESTGetAPIActivityResponse`, `RESTGetAPIActivitiesResponse`

### Refactors
- Added `operator` to `WorkspaceMemberRole` enum

---

## 0.0.16 (2025-06-25)

### Features
- Added `APIApplicationBackup` types (later renamed to snapshot)

---

## 0.0.15 (2025-06-17)

### Features
- Added `APIApplicationCommit` types (later replaced by snapshots)

---

## 0.0.14 (2025-05-03)

### Features
- **File manager types**: Added `APIApplicationFile`, `APIApplicationFileTree`, `APIApplicationFileContent`, `APIApplicationFileType`, `ApplicationFileContentType`
- **Custom domain**: Added `custom_domain` field to `APIApplication`
- **REST types**: Added file manager and application REST response types

---

## 0.0.13 (2025-04-28)

### Features
- **Organization types**: Added `APIOrganization`, `APIOrganizationMember` (later renamed to Workspace)

---

## 0.0.12 (2025-04-21)

### Features
- **Initial release**: Core type definitions for Vertra Cloud API
- **User types**: `APIUser`, `APIUserPlan`, `APIUserPlanMemory`
- **Application types**: `APIApplication`, `APIApplicationStatus`, `APIApplicationStatusShort`, `APIApplicationMetric`, `APIApplicationConfig`
- **Database types**: `APIDatabase`, `APIDatabaseStatus`, `APIDatabaseStatusShort`, `APIDatabaseMetrics`, `APIDatabaseNetwork`
- **Status types**: `APIStatus`, `StatusType`
- **Common types**: `SnowFlake`, `ISODateString`, `UserPlan`, `APIPayload`, `APIReturnService`, `PaginationMeta`, `APIPaginatedPayload`
- **REST types**: Initial REST response type aliases
