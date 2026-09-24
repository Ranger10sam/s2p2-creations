export type ShowroomEventName =
  | "showroom_view"
  | "showroom_search"
  | "showroom_filter"
  | "showroom_product_view"
  | "showroom_customize_click"
  | "showroom_live_demo_click";

export function trackShowroomEvent(name: ShowroomEventName, detail: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(name, { detail }));
}