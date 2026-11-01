import type { BillingMonths, PlanFamily, PlanName } from "../../v1";

/** Plan grid in force: `"v3"` is the current one, `"legacy"` the previous one. */
export type PlanGrid = "legacy" | "v3";

export const PlanGrid = {
	LEGACY: "legacy",
	V3: "v3",
} as const satisfies Record<string, PlanGrid>;

/** A billing period and its discount over the monthly price. */
export interface APIPlanCycle {
	months: BillingMonths;
	discount_percent: number;
}

export interface APIPlanBlobLimits {
	quota_bytes: number;
	max_rules: number;
	max_custom_domains: number;
	image_transformations_per_month: number;
	s3_requests_per_10s: number;
}

export interface APIPlanLimits {
	deploys_per_hour: number;
	requests_per_minute: number;
	requests_per_day: number;
	max_domains: number;
	max_domain_ports: number;
	manual_backups_per_day: number;
	workspace_members: number;
	workspace_roles: number;
	release_versions: number;
	release_retention_days: number;
	max_custom_images: number;
	blob: APIPlanBlobLimits;
}

export interface APIPlanFeatures {
	web_published: boolean;
	daily_backups: boolean;
	create_backup: boolean;
	advanced_metrics: boolean;
	create_workspace: boolean;
	custom_domain: boolean;
	custom_subdomain: boolean;
	file_manager: boolean;
	database_manager: boolean;
	auto_deploy: boolean;
	rollback: boolean;
	auto_rollback: boolean;
	zero_downtime: boolean;
	delete_snapshot: boolean;
	powered_by_badge: boolean;
	blob_metadata: boolean;
	blob_share_password: boolean;
	blob_unlimited_upload_rate: boolean;
	blob_no_cache: boolean;
	blob_short_expiration: boolean;
}

export interface APIPlan {
	name: PlanName;
	/** `null` for legacy plans. */
	family: PlanFamily | null;
	/** `true` for plans of the previous grid. */
	legacy: boolean;
	memory_mb: number;
	/** Highest vCPU count one application can use. */
	max_vcpus_per_app: number;
	/** Monthly price, in BRL. */
	price: number;
	payment_methods: ("pix" | "card")[];
	limits: APIPlanLimits;
	features: APIPlanFeatures;
}

/** The plans currently for sale and the billing periods with their discounts. */
export interface APIPlansCatalog {
	grid: PlanGrid;
	cycles: APIPlanCycle[];
	plans: APIPlan[];
}
