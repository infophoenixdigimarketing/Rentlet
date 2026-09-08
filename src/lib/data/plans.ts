// Subscription plans (spec §38). Shared by /owner/subscription (where an owner picks one) and
// /admin/settings (where they're listed as platform config) so the two never drift.
export const PLANS = [
  { id: "free", name: "Free", price: "₹0", period: "forever", features: ["2 active listings", "Standard visibility", "Basic lead inbox"], popular: false },
  { id: "basic", name: "Basic", price: "₹499", period: "/month", features: ["10 active listings", "5 featured credits/mo", "Lead status tracking"], popular: false },
  { id: "premium", name: "Premium", price: "₹1,499", period: "/month", features: ["30 active listings", "Unlimited featured", "Verified badge", "Analytics dashboard"], popular: true },
  { id: "pro", name: "Pro", price: "₹3,499", period: "/month", features: ["Unlimited listings", "Priority support", "Video listings", "Advanced analytics"], popular: false },
  { id: "builder", name: "Builder", price: "Custom", period: "", features: ["New-project microsites", "Dedicated account manager", "Bulk uploads", "Custom reporting"], popular: false },
] as const;

export const PLAN_NAMES = PLANS.map((p) => p.name);
