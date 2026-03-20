import type { WingPayload, WingsAppCreateResponse, WingsAppRebuildResponse, WingsContainerMetric, WingsDatabaseCertificate, WingsDatabaseCreateResponse, WingsDatabaseRebuildResponse, WingsDatabaseResetResponse, WingsFileUploadResponse, WingsSnapshotRestoreResponse } from "../../v1";

/** @see Wing: POST /api/v1/apps */
export type WingPostAppCreateResponse = WingPayload<WingsAppCreateResponse>;

/** @see Wing: POST /api/v1/apps/:app_id/rebuild */
export type WingPostAppRebuildResponse = WingPayload<WingsAppRebuildResponse>;

/** @see Wing: GET /api/v1/apps/:app_id/status */
export type WingGetAppStatusResponse = WingPayload<WingsContainerMetric>;

/** @see Wing: POST /api/v1/apps/status */
export type WingPostAppAllStatusResponse = WingPayload<WingsContainerMetric[]>;

/** @see Wing: GET /api/v1/apps/:app_id/logs */
export type WingGetAppLogsResponse = WingPayload<string>;

/** @see Wing: GET /api/v1/apps/:app_id/download */
export type WingGetAppDownloadResponse = WingPayload<string>;

/** @see Wing: POST /api/v1/apps/:app_id/files/upload */
export type WingPostAppFileUploadResponse = WingPayload<WingsFileUploadResponse>;

/** @see Wing: POST /api/v1/databases */
export type WingPostDatabaseCreateResponse = WingPayload<WingsDatabaseCreateResponse>;

/** @see Wing: POST /api/v1/databases/:db_id/rebuild */
export type WingPostDatabaseRebuildResponse = WingPayload<WingsDatabaseRebuildResponse>;

/** @see Wing: GET /api/v1/databases/:db_id/status */
export type WingGetDatabaseStatusResponse = WingPayload<WingsContainerMetric>;

/** @see Wing: POST /api/v1/databases/status */
export type WingPostDatabaseAllStatusResponse = WingPayload<WingsContainerMetric[]>;

/** @see Wing: GET /api/v1/databases/:db_id/certificate */
export type WingGetDatabaseCertificateResponse = WingPayload<WingsDatabaseCertificate>;

/** @see Wing: POST /api/v1/databases/:db_id/certificate/reset */
export type WingPostDatabaseResetCertificateResponse = WingPayload<WingsDatabaseCertificate>;

/** @see Wing: POST /api/v1/databases/:db_id/reset */
export type WingPostDatabaseResetResponse = WingPayload<WingsDatabaseResetResponse>;

/** @see Wing: POST /api/v1/apps/:app_id/snapshots/:snapshot_id/restore */
export type WingPostSnapshotRestoreResponse = WingPayload<WingsSnapshotRestoreResponse>;
