// Leaf module: the types an application, a stack and the template catalog share. It imports nothing, so the payload
// of an application can refer to its template without a circular dependency.

/**
 * Who publishes a template. `vertra` and `community` are public catalog entries (the community ones come in through a
 * reviewed contribution); `private` belongs to a user or a workspace and is shared by link.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/get
 */
export type TemplateOrigin = "vertra" | "community" | "private";
export const TemplateOrigin = {
	/** Made and maintained by the platform. */
	Vertra: "vertra",
	/** Contributed by the community, reviewed and maintained by the platform. */
	Community: "community",
	/** Created by a user or a workspace. */
	Private: "private",
} as const;

/**
 * A text in the three supported languages. `pt-br` is required; a missing `en` or `es` falls back to `pt-br`.
 * @see https://docs.vertracloud.app/api-reference/endpoint/templates/get
 */
export interface APITemplateI18nText {
	"pt-br": string;
	en?: string;
	es?: string;
}

/**
 * Permissions after defaults and derived restrictions, as they apply to an app created from the template.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/get
 */
export interface APITemplateEffectivePermissions {
	code_view: boolean;
	code_edit: boolean;
	ram_change: boolean;
	ram_below_min: boolean;
	ram_above_max: boolean;
	env_add: boolean;
	commands_edit: boolean;
	/** Terminal access to the container. */
	terminal: boolean;
	/** Whether the app can be saved as a template. */
	save_as_template: boolean;
	/** Whether editing the code detaches the app from the template (open templates only). */
	detach: boolean;
}

/**
 * Where an app or a stack came from, as shown on the resource.
 * @see https://docs.vertracloud.app/api-reference/endpoint/apps/get
 */
export interface APITemplateOrigin {
	template_id: string;
	slug: string;
	name: APITemplateI18nText;
	/** Stable icon URL of the template (same as `icon_url` in the catalog); `null` for a private template without icon or a removed one. */
	icon_url: string | null;
	origin: TemplateOrigin;
	version_id: string;
	/** Version the resource was created from or last updated to. */
	version: string;
	/** `true` for an app of a closed template: its code is not accessible. */
	closed: boolean;
	/** `true` when the resource left the template and no longer receives versions. */
	detached: boolean;
	/** `true` when the template has a newer version this resource can update to. */
	update_available: boolean;
	/** Latest version of the template; `null` when there is no newer one. */
	latest_version: string | null;
	/** `true` when the author removed the template: the resource keeps running but gets no more updates. */
	removed: boolean;
	/** `true` when the resource was created from a share link. */
	via_share_link: boolean;
}
