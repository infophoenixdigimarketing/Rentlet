(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/property/PropertyCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PropertyCard",
    ()=>PropertyCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.mjs [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bed$2d$double$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BedDouble$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bed-double.mjs [app-client] (ecmascript) <export default as BedDouble>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bath$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bath$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bath.mjs [app-client] (ecmascript) <export default as Bath>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ruler$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ruler$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ruler.mjs [app-client] (ecmascript) <export default as Ruler>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.mjs [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.mjs [app-client] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$PropertyImage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/PropertyImage.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$amenities$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/amenities.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$favorites$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/favorites.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$favorite$2d$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/favorite-actions.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
function PropertyCard({ property, className }) {
    _s();
    const saved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$favorites$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsFavorited"])(property.id);
    const href = `/property/${property.slug}/${property.id}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("group flex w-full shrink-0 flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-navy/10", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative h-48 w-full overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: href,
                        className: "absolute inset-0 block",
                        "aria-label": property.title,
                        children: property.images[0] ? // eslint-disable-next-line @next/next/no-img-element -- local /public asset, not user-uploaded/remote
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: property.images[0],
                            alt: property.title,
                            className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        }, void 0, false, {
                            fileName: "[project]/src/components/property/PropertyCard.tsx",
                            lineNumber: 28,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$PropertyImage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PropertyImage"], {
                            id: property.id,
                            propertyType: property.propertyType,
                            locality: property.locality,
                            city: property.city,
                            className: "h-full w-full transition-transform duration-500 group-hover:scale-105"
                        }, void 0, false, {
                            fileName: "[project]/src/components/property/PropertyCard.tsx",
                            lineNumber: 34,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/property/PropertyCard.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pointer-events-none absolute left-3 right-11 top-3 flex flex-wrap gap-1.5",
                        children: [
                            property.featured && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                variant: "orange",
                                children: "FEATURED"
                            }, void 0, false, {
                                fileName: "[project]/src/components/property/PropertyCard.tsx",
                                lineNumber: 44,
                                columnNumber: 33
                            }, this),
                            property.verificationStatus === "approved" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                variant: "verified",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                        className: "h-3 w-3"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/property/PropertyCard.tsx",
                                        lineNumber: 47,
                                        columnNumber: 15
                                    }, this),
                                    " VERIFIED"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/property/PropertyCard.tsx",
                                lineNumber: 46,
                                columnNumber: 13
                            }, this),
                            property.postedBy === "owner" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                variant: "outline",
                                children: "OWNER"
                            }, void 0, false, {
                                fileName: "[project]/src/components/property/PropertyCard.tsx",
                                lineNumber: 50,
                                columnNumber: 45
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/property/PropertyCard.tsx",
                        lineNumber: 43,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "aria-label": saved ? "Remove from favorites" : "Save property",
                        "aria-pressed": saved,
                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$favorite$2d$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toggleFavorite"])(property.id),
                        className: "absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-brand-navy shadow transition-transform hover:scale-110",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-4 w-4 transition-colors", saved && "fill-brand-orange text-brand-orange")
                        }, void 0, false, {
                            fileName: "[project]/src/components/property/PropertyCard.tsx",
                            lineNumber: 59,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/property/PropertyCard.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/property/PropertyCard.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: href,
                className: "flex flex-1 flex-col p-4 pb-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-baseline justify-between gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-lg font-extrabold text-brand-navy",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["priceLabel"])(property)
                            }, void 0, false, {
                                fileName: "[project]/src/components/property/PropertyCard.tsx",
                                lineNumber: 65,
                                columnNumber: 11
                            }, this),
                            property.listingType === "rent" && property.deposit != null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs font-medium text-muted-foreground",
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(property.deposit),
                                    " Deposit"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/property/PropertyCard.tsx",
                                lineNumber: 67,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/property/PropertyCard.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "mt-1 line-clamp-1 text-sm font-semibold text-foreground",
                        children: property.title
                    }, void 0, false, {
                        fileName: "[project]/src/components/property/PropertyCard.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-0.5 text-xs text-muted-foreground",
                        children: [
                            property.locality,
                            ", ",
                            property.city
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/property/PropertyCard.tsx",
                        lineNumber: 74,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-foreground/70",
                        children: [
                            property.bedrooms != null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bed$2d$double$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BedDouble$3e$__["BedDouble"], {
                                        className: "h-3.5 w-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/property/PropertyCard.tsx",
                                        lineNumber: 81,
                                        columnNumber: 15
                                    }, this),
                                    " ",
                                    property.bedrooms,
                                    " BHK"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/property/PropertyCard.tsx",
                                lineNumber: 80,
                                columnNumber: 13
                            }, this),
                            property.bathrooms != null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bath$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bath$3e$__["Bath"], {
                                        className: "h-3.5 w-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/property/PropertyCard.tsx",
                                        lineNumber: 86,
                                        columnNumber: 15
                                    }, this),
                                    " ",
                                    property.bathrooms,
                                    " Bath"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/property/PropertyCard.tsx",
                                lineNumber: 85,
                                columnNumber: 13
                            }, this),
                            property.builtUpArea != null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ruler$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ruler$3e$__["Ruler"], {
                                        className: "h-3.5 w-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/property/PropertyCard.tsx",
                                        lineNumber: 91,
                                        columnNumber: 15
                                    }, this),
                                    " ",
                                    property.builtUpArea.toLocaleString("en-IN"),
                                    " sq.ft"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/property/PropertyCard.tsx",
                                lineNumber: 90,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/property/PropertyCard.tsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this),
                    property.amenities.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 flex flex-wrap gap-1.5",
                        children: property.amenities.slice(0, 3).map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-md bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$amenities$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["amenityMap"][a]?.label ?? a
                            }, a, false, {
                                fileName: "[project]/src/components/property/PropertyCard.tsx",
                                lineNumber: 99,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/property/PropertyCard.tsx",
                        lineNumber: 97,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/property/PropertyCard.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 flex items-center gap-2 border-t border-border p-4 pt-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "aria-pressed": saved,
                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$favorite$2d$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toggleFavorite"])(property.id),
                        className: "inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold text-foreground/70 hover:bg-muted",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-3.5 w-3.5", saved && "fill-brand-orange text-brand-orange")
                            }, void 0, false, {
                                fileName: "[project]/src/components/property/PropertyCard.tsx",
                                lineNumber: 114,
                                columnNumber: 11
                            }, this),
                            " Save"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/property/PropertyCard.tsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: href,
                        className: "inline-flex flex-1 items-center justify-center rounded-lg py-2 text-xs font-semibold text-brand-navy hover:bg-brand-navy-light",
                        children: "View Details"
                    }, void 0, false, {
                        fileName: "[project]/src/components/property/PropertyCard.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand-orange-light py-2 text-xs font-semibold text-brand-orange-dark hover:bg-brand-orange hover:text-white",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                className: "h-3.5 w-3.5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/property/PropertyCard.tsx",
                                lineNumber: 126,
                                columnNumber: 11
                            }, this),
                            " Contact"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/property/PropertyCard.tsx",
                        lineNumber: 122,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/property/PropertyCard.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/property/PropertyCard.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_s(PropertyCard, "feorcNk3wrPqMNUY3o0nnHL+fFU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$favorites$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsFavorited"]
    ];
});
_c = PropertyCard;
var _c;
__turbopack_context__.k.register(_c, "PropertyCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/property/PropertyListRow.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PropertyListRow",
    ()=>PropertyListRow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.mjs [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bed$2d$double$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BedDouble$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bed-double.mjs [app-client] (ecmascript) <export default as BedDouble>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bath$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bath$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bath.mjs [app-client] (ecmascript) <export default as Bath>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ruler$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ruler$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ruler.mjs [app-client] (ecmascript) <export default as Ruler>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.mjs [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.mjs [app-client] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$PropertyImage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/PropertyImage.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$amenities$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/amenities.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$favorites$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/favorites.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$favorite$2d$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/favorite-actions.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
function PropertyListRow({ property }) {
    _s();
    const saved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$favorites$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsFavorited"])(property.id);
    const href = `/property/${property.slug}/${property.id}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-4 rounded-2xl border border-border bg-white p-3 transition-shadow hover:shadow-lg hover:shadow-brand-navy/5 sm:flex-row",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: href,
                className: "relative block h-44 shrink-0 overflow-hidden rounded-xl sm:h-36 sm:w-56",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$PropertyImage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PropertyImage"], {
                        id: property.id,
                        propertyType: property.propertyType,
                        locality: property.locality,
                        city: property.city,
                        className: "h-full w-full"
                    }, void 0, false, {
                        fileName: "[project]/src/components/property/PropertyListRow.tsx",
                        lineNumber: 20,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute left-2 top-2 flex flex-wrap gap-1",
                        children: [
                            property.featured && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                variant: "orange",
                                children: "FEATURED"
                            }, void 0, false, {
                                fileName: "[project]/src/components/property/PropertyListRow.tsx",
                                lineNumber: 22,
                                columnNumber: 33
                            }, this),
                            property.verificationStatus === "approved" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                variant: "verified",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                        className: "h-3 w-3"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/property/PropertyListRow.tsx",
                                        lineNumber: 24,
                                        columnNumber: 39
                                    }, this),
                                    " VERIFIED"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/property/PropertyListRow.tsx",
                                lineNumber: 24,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/property/PropertyListRow.tsx",
                        lineNumber: 21,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/property/PropertyListRow.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-1 flex-col",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-w-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-lg font-extrabold text-brand-navy",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["priceLabel"])(property)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/property/PropertyListRow.tsx",
                                        lineNumber: 32,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "mt-0.5 line-clamp-1 text-sm font-semibold text-foreground",
                                        children: property.title
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/property/PropertyListRow.tsx",
                                        lineNumber: 33,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-0.5 text-xs text-muted-foreground",
                                        children: [
                                            property.locality,
                                            ", ",
                                            property.city
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/property/PropertyListRow.tsx",
                                        lineNumber: 34,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/property/PropertyListRow.tsx",
                                lineNumber: 31,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                "aria-pressed": saved,
                                onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$favorite$2d$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toggleFavorite"])(property.id),
                                className: "shrink-0 rounded-full p-2 text-muted-foreground hover:bg-muted",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-4 w-4", saved && "fill-brand-orange text-brand-orange")
                                }, void 0, false, {
                                    fileName: "[project]/src/components/property/PropertyListRow.tsx",
                                    lineNumber: 42,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/property/PropertyListRow.tsx",
                                lineNumber: 36,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/property/PropertyListRow.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-foreground/70",
                        children: [
                            property.bedrooms != null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bed$2d$double$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BedDouble$3e$__["BedDouble"], {
                                        className: "h-3.5 w-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/property/PropertyListRow.tsx",
                                        lineNumber: 47,
                                        columnNumber: 90
                                    }, this),
                                    " ",
                                    property.bedrooms,
                                    " BHK"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/property/PropertyListRow.tsx",
                                lineNumber: 47,
                                columnNumber: 41
                            }, this),
                            property.bathrooms != null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bath$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bath$3e$__["Bath"], {
                                        className: "h-3.5 w-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/property/PropertyListRow.tsx",
                                        lineNumber: 48,
                                        columnNumber: 91
                                    }, this),
                                    " ",
                                    property.bathrooms,
                                    " Bath"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/property/PropertyListRow.tsx",
                                lineNumber: 48,
                                columnNumber: 42
                            }, this),
                            property.builtUpArea != null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ruler$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ruler$3e$__["Ruler"], {
                                        className: "h-3.5 w-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/property/PropertyListRow.tsx",
                                        lineNumber: 49,
                                        columnNumber: 93
                                    }, this),
                                    " ",
                                    property.builtUpArea.toLocaleString("en-IN"),
                                    " sq.ft"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/property/PropertyListRow.tsx",
                                lineNumber: 49,
                                columnNumber: 44
                            }, this),
                            property.deposit != null && property.listingType === "rent" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(property.deposit),
                                    " Deposit"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/property/PropertyListRow.tsx",
                                lineNumber: 50,
                                columnNumber: 75
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/property/PropertyListRow.tsx",
                        lineNumber: 46,
                        columnNumber: 9
                    }, this),
                    property.amenities.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 flex flex-wrap gap-1.5",
                        children: property.amenities.slice(0, 4).map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded-md bg-muted px-2 py-1 text-[11px] font-medium text-muted-foreground",
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$amenities$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["amenityMap"][a]?.label ?? a
                            }, a, false, {
                                fileName: "[project]/src/components/property/PropertyListRow.tsx",
                                lineNumber: 56,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/property/PropertyListRow.tsx",
                        lineNumber: 54,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-auto flex gap-2 pt-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: href,
                                className: "inline-flex flex-1 items-center justify-center rounded-lg border border-border py-2 text-xs font-semibold text-brand-navy hover:bg-brand-navy-light sm:flex-none sm:px-5",
                                children: "View Details"
                            }, void 0, false, {
                                fileName: "[project]/src/components/property/PropertyListRow.tsx",
                                lineNumber: 64,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand-orange-light py-2 text-xs font-semibold text-brand-orange-dark hover:bg-brand-orange hover:text-white sm:flex-none sm:px-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                        className: "h-3.5 w-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/property/PropertyListRow.tsx",
                                        lineNumber: 68,
                                        columnNumber: 13
                                    }, this),
                                    " Contact"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/property/PropertyListRow.tsx",
                                lineNumber: 67,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/property/PropertyListRow.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/property/PropertyListRow.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/property/PropertyListRow.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
_s(PropertyListRow, "feorcNk3wrPqMNUY3o0nnHL+fFU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$favorites$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsFavorited"]
    ];
});
_c = PropertyListRow;
var _c;
__turbopack_context__.k.register(_c, "PropertyListRow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/search/FilterPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FilterPanel",
    ()=>FilterPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.mjs [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.mjs [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$locate$2d$fixed$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LocateFixed$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/locate-fixed.mjs [app-client] (ecmascript) <export default as LocateFixed>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$search$2d$params$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/search-params.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$search$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/search.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$amenities$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/amenities.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$cities$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/cities.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Button.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
const PROPERTY_TYPES = [
    {
        id: "apartment",
        label: "Apartment"
    },
    {
        id: "independent_house",
        label: "Independent House"
    },
    {
        id: "villa",
        label: "Villa"
    },
    {
        id: "plot",
        label: "Plot / Land"
    },
    {
        id: "pg",
        label: "PG / Hostel"
    },
    {
        id: "office",
        label: "Office"
    },
    {
        id: "shop",
        label: "Shop"
    },
    {
        id: "warehouse",
        label: "Warehouse"
    }
];
const FURNISHING_OPTIONS = [
    {
        id: "unfurnished",
        label: "Unfurnished"
    },
    {
        id: "semi_furnished",
        label: "Semi Furnished"
    },
    {
        id: "fully_furnished",
        label: "Fully Furnished"
    }
];
const POSTED_BY_OPTIONS = [
    {
        id: "owner",
        label: "Owner"
    },
    {
        id: "agent",
        label: "Agent"
    },
    {
        id: "builder",
        label: "Builder"
    }
];
function toggleIn(arr, value) {
    const set = new Set(arr ?? []);
    if (set.has(value)) set.delete(value);
    else set.add(value);
    return Array.from(set);
}
function FilterPanel({ initial, onApplied }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [filters, setFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initial);
    const [locating, setLocating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Keep `sort: "nearest"` in step with whether a reference point exists, unless the user
    // has deliberately picked a price/newest sort.
    function normalizeSort(f) {
        const hasReference = Boolean(f.near) || f.nearLat != null;
        if (hasReference && (f.sort == null || f.sort === "relevance")) return {
            ...f,
            sort: "nearest"
        };
        if (!hasReference && f.sort === "nearest") return {
            ...f,
            sort: undefined
        };
        return f;
    }
    function apply() {
        router.push(`/properties?${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$search$2d$params$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["filtersToSearchString"])(normalizeSort(filters))}`);
        onApplied?.();
    }
    // Merge a patch and navigate straight away — used by the Listing Type toggle so it
    // takes effect without an "Apply Filters" click.
    function applyNow(patch) {
        const next = normalizeSort({
            ...filters,
            ...patch
        });
        setFilters(next);
        router.push(`/properties?${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$search$2d$params$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["filtersToSearchString"])(next)}`);
        onApplied?.();
    }
    function pickListingType(lt) {
        const nextType = filters.listingType === lt ? undefined : lt;
        // Choosing "Rent" auto-orders results by nearest place. Reuse an existing reference
        // if there is one, otherwise ask the browser for the user's location, then apply.
        const hasReference = Boolean(filters.near) || filters.nearLat != null;
        if (nextType === "rent" && !hasReference && typeof navigator !== "undefined" && navigator.geolocation) {
            setLocating(true);
            navigator.geolocation.getCurrentPosition((pos)=>{
                setLocating(false);
                applyNow({
                    listingType: "rent",
                    nearLat: Number(pos.coords.latitude.toFixed(5)),
                    nearLng: Number(pos.coords.longitude.toFixed(5)),
                    sort: "nearest"
                });
            }, ()=>{
                setLocating(false);
                applyNow({
                    listingType: "rent"
                });
            }, {
                timeout: 8000,
                maximumAge: 300000
            });
            return;
        }
        applyNow({
            listingType: nextType
        });
    }
    function reset() {
        setFilters({});
        router.push("/properties");
        onApplied?.();
    }
    function useMyLocation() {
        if (typeof navigator === "undefined" || !navigator.geolocation) return;
        setLocating(true);
        navigator.geolocation.getCurrentPosition((pos)=>{
            setLocating(false);
            const next = normalizeSort({
                ...filters,
                near: undefined,
                nearLat: Number(pos.coords.latitude.toFixed(5)),
                nearLng: Number(pos.coords.longitude.toFixed(5))
            });
            setFilters(next);
            router.push(`/properties?${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$search$2d$params$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["filtersToSearchString"])(next)}`);
            onApplied?.();
        }, ()=>setLocating(false), {
            timeout: 8000,
            maximumAge: 300000
        });
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
                        children: "Listing Type"
                    }, void 0, false, {
                        fileName: "[project]/src/components/search/FilterPanel.tsx",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-[11px] text-muted-foreground",
                        children: "Picking a type applies right away — Rent also orders results by nearest place."
                    }, void 0, false, {
                        fileName: "[project]/src/components/search/FilterPanel.tsx",
                        lineNumber: 140,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 flex gap-2",
                        children: (filters.listingType === "sale" ? [
                            "sale"
                        ] : [
                            "rent"
                        ]).map((lt)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>pickListingType(lt),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex-1 rounded-lg border px-3 py-2 text-sm font-semibold capitalize", filters.listingType === lt ? "border-brand-navy bg-brand-navy text-white" : "border-border text-foreground hover:bg-muted"),
                                children: lt === "sale" ? "Buy" : "Rent"
                            }, lt, false, {
                                fileName: "[project]/src/components/search/FilterPanel.tsx",
                                lineNumber: 145,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/search/FilterPanel.tsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/search/FilterPanel.tsx",
                lineNumber: 138,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
                        children: "City"
                    }, void 0, false, {
                        fileName: "[project]/src/components/search/FilterPanel.tsx",
                        lineNumber: 161,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: filters.city ?? "",
                        onChange: (e)=>setFilters((f)=>({
                                    ...f,
                                    city: e.target.value || undefined
                                })),
                        className: "mt-2 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-brand-navy",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "All cities"
                            }, void 0, false, {
                                fileName: "[project]/src/components/search/FilterPanel.tsx",
                                lineNumber: 167,
                                columnNumber: 11
                            }, this),
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$cities$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["popularCities"].map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: c.name,
                                    children: c.name
                                }, c.id, false, {
                                    fileName: "[project]/src/components/search/FilterPanel.tsx",
                                    lineNumber: 169,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/search/FilterPanel.tsx",
                        lineNumber: 162,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/search/FilterPanel.tsx",
                lineNumber: 160,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
                        children: "Show Nearest To"
                    }, void 0, false, {
                        fileName: "[project]/src/components/search/FilterPanel.tsx",
                        lineNumber: 175,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-[11px] text-muted-foreground",
                        children: "Order results by distance — closest areas first."
                    }, void 0, false, {
                        fileName: "[project]/src/components/search/FilterPanel.tsx",
                        lineNumber: 176,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: filters.near ?? "",
                        onChange: (e)=>setFilters((f)=>({
                                    ...f,
                                    near: e.target.value || undefined,
                                    nearLat: undefined,
                                    nearLng: undefined
                                })),
                        className: "mt-2 w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-brand-navy",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "Any area"
                            }, void 0, false, {
                                fileName: "[project]/src/components/search/FilterPanel.tsx",
                                lineNumber: 184,
                                columnNumber: 11
                            }, this),
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$search$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLocalities"])(filters.city).map((loc)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: loc,
                                    children: loc
                                }, loc, false, {
                                    fileName: "[project]/src/components/search/FilterPanel.tsx",
                                    lineNumber: 186,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/search/FilterPanel.tsx",
                        lineNumber: 177,
                        columnNumber: 9
                    }, this),
                    filters.nearLat != null && !filters.near && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1.5 flex items-center gap-1 text-[11px] font-semibold text-brand-navy",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                className: "h-3 w-3"
                            }, void 0, false, {
                                fileName: "[project]/src/components/search/FilterPanel.tsx",
                                lineNumber: 191,
                                columnNumber: 13
                            }, this),
                            " Using your current location"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/search/FilterPanel.tsx",
                        lineNumber: 190,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: useMyLocation,
                        disabled: locating,
                        className: "mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-navy hover:underline disabled:opacity-60",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$locate$2d$fixed$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LocateFixed$3e$__["LocateFixed"], {
                                className: "h-3.5 w-3.5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/search/FilterPanel.tsx",
                                lineNumber: 200,
                                columnNumber: 11
                            }, this),
                            locating ? "Locating…" : "Use my current location"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/search/FilterPanel.tsx",
                        lineNumber: 194,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/search/FilterPanel.tsx",
                lineNumber: 174,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
                        children: "Bedrooms"
                    }, void 0, false, {
                        fileName: "[project]/src/components/search/FilterPanel.tsx",
                        lineNumber: 206,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 flex flex-wrap gap-2",
                        children: [
                            1,
                            2,
                            3,
                            4,
                            5
                        ].map((b)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setFilters((f)=>({
                                            ...f,
                                            bedrooms: toggleIn(f.bedrooms, b)
                                        })),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex h-9 min-w-9 items-center justify-center rounded-lg border px-2.5 text-sm font-semibold", filters.bedrooms?.includes(b) ? "border-brand-navy bg-brand-navy text-white" : "border-border text-foreground hover:bg-muted"),
                                children: b === 5 ? "5+" : b
                            }, b, false, {
                                fileName: "[project]/src/components/search/FilterPanel.tsx",
                                lineNumber: 209,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/search/FilterPanel.tsx",
                        lineNumber: 207,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/search/FilterPanel.tsx",
                lineNumber: 205,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
                        children: "Price Range (₹)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/search/FilterPanel.tsx",
                        lineNumber: 225,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                min: 0,
                                placeholder: "Min",
                                value: filters.minPrice ?? "",
                                onChange: (e)=>setFilters((f)=>({
                                            ...f,
                                            minPrice: e.target.value ? Number(e.target.value) : undefined
                                        })),
                                className: "w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-brand-navy"
                            }, void 0, false, {
                                fileName: "[project]/src/components/search/FilterPanel.tsx",
                                lineNumber: 227,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-muted-foreground",
                                children: "–"
                            }, void 0, false, {
                                fileName: "[project]/src/components/search/FilterPanel.tsx",
                                lineNumber: 235,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                min: 0,
                                placeholder: "Max",
                                value: filters.maxPrice ?? "",
                                onChange: (e)=>setFilters((f)=>({
                                            ...f,
                                            maxPrice: e.target.value ? Number(e.target.value) : undefined
                                        })),
                                className: "w-full rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-brand-navy"
                            }, void 0, false, {
                                fileName: "[project]/src/components/search/FilterPanel.tsx",
                                lineNumber: 236,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/search/FilterPanel.tsx",
                        lineNumber: 226,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/search/FilterPanel.tsx",
                lineNumber: 224,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
                        children: "Property Type"
                    }, void 0, false, {
                        fileName: "[project]/src/components/search/FilterPanel.tsx",
                        lineNumber: 248,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 flex flex-col gap-2",
                        children: PROPERTY_TYPES.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-center gap-2 text-sm text-foreground",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        checked: filters.propertyTypes?.includes(t.id) ?? false,
                                        onChange: ()=>setFilters((f)=>({
                                                    ...f,
                                                    propertyTypes: toggleIn(f.propertyTypes, t.id)
                                                })),
                                        className: "h-4 w-4 rounded border-border accent-brand-orange"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/search/FilterPanel.tsx",
                                        lineNumber: 252,
                                        columnNumber: 15
                                    }, this),
                                    t.label
                                ]
                            }, t.id, true, {
                                fileName: "[project]/src/components/search/FilterPanel.tsx",
                                lineNumber: 251,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/search/FilterPanel.tsx",
                        lineNumber: 249,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/search/FilterPanel.tsx",
                lineNumber: 247,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
                        children: "Furnishing"
                    }, void 0, false, {
                        fileName: "[project]/src/components/search/FilterPanel.tsx",
                        lineNumber: 265,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 flex flex-col gap-2",
                        children: FURNISHING_OPTIONS.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-center gap-2 text-sm text-foreground",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        checked: filters.furnishing?.includes(t.id) ?? false,
                                        onChange: ()=>setFilters((f)=>({
                                                    ...f,
                                                    furnishing: toggleIn(f.furnishing, t.id)
                                                })),
                                        className: "h-4 w-4 rounded border-border accent-brand-orange"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/search/FilterPanel.tsx",
                                        lineNumber: 269,
                                        columnNumber: 15
                                    }, this),
                                    t.label
                                ]
                            }, t.id, true, {
                                fileName: "[project]/src/components/search/FilterPanel.tsx",
                                lineNumber: 268,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/search/FilterPanel.tsx",
                        lineNumber: 266,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/search/FilterPanel.tsx",
                lineNumber: 264,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
                        children: "Posted By"
                    }, void 0, false, {
                        fileName: "[project]/src/components/search/FilterPanel.tsx",
                        lineNumber: 282,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 flex flex-col gap-2",
                        children: POSTED_BY_OPTIONS.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-center gap-2 text-sm text-foreground",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        checked: filters.postedBy?.includes(t.id) ?? false,
                                        onChange: ()=>setFilters((f)=>({
                                                    ...f,
                                                    postedBy: toggleIn(f.postedBy, t.id)
                                                })),
                                        className: "h-4 w-4 rounded border-border accent-brand-orange"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/search/FilterPanel.tsx",
                                        lineNumber: 286,
                                        columnNumber: 15
                                    }, this),
                                    t.label
                                ]
                            }, t.id, true, {
                                fileName: "[project]/src/components/search/FilterPanel.tsx",
                                lineNumber: 285,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/search/FilterPanel.tsx",
                        lineNumber: 283,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/search/FilterPanel.tsx",
                lineNumber: 281,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
                        children: "Amenities"
                    }, void 0, false, {
                        fileName: "[project]/src/components/search/FilterPanel.tsx",
                        lineNumber: 299,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 grid grid-cols-2 gap-2",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$amenities$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["amenities"].map((a)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-center gap-2 text-xs text-foreground",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        checked: filters.amenities?.includes(a.id) ?? false,
                                        onChange: ()=>setFilters((f)=>({
                                                    ...f,
                                                    amenities: toggleIn(f.amenities, a.id)
                                                })),
                                        className: "h-3.5 w-3.5 rounded border-border accent-brand-orange"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/search/FilterPanel.tsx",
                                        lineNumber: 303,
                                        columnNumber: 15
                                    }, this),
                                    a.label
                                ]
                            }, a.id, true, {
                                fileName: "[project]/src/components/search/FilterPanel.tsx",
                                lineNumber: 302,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/search/FilterPanel.tsx",
                        lineNumber: 300,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/search/FilterPanel.tsx",
                lineNumber: 298,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
                        children: "More Filters"
                    }, void 0, false, {
                        fileName: "[project]/src/components/search/FilterPanel.tsx",
                        lineNumber: 316,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 flex flex-col gap-2",
                        children: [
                            {
                                key: "verifiedOnly",
                                label: "Verified Only"
                            },
                            {
                                key: "noBrokerage",
                                label: "No Brokerage"
                            },
                            {
                                key: "petFriendly",
                                label: "Pet Friendly"
                            },
                            {
                                key: "featuredOnly",
                                label: "Featured"
                            }
                        ].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "flex items-center gap-2 text-sm text-foreground",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "checkbox",
                                        checked: Boolean(filters[t.key]),
                                        onChange: ()=>setFilters((f)=>({
                                                    ...f,
                                                    [t.key]: !f[t.key]
                                                })),
                                        className: "h-4 w-4 rounded border-border accent-brand-orange"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/search/FilterPanel.tsx",
                                        lineNumber: 327,
                                        columnNumber: 15
                                    }, this),
                                    t.label
                                ]
                            }, t.key, true, {
                                fileName: "[project]/src/components/search/FilterPanel.tsx",
                                lineNumber: 326,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/search/FilterPanel.tsx",
                        lineNumber: 317,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/search/FilterPanel.tsx",
                lineNumber: 315,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sticky bottom-0 flex gap-2 border-t border-border bg-white pt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: reset,
                        className: "inline-flex items-center gap-1.5 rounded-xl border border-border px-3.5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/search/FilterPanel.tsx",
                                lineNumber: 345,
                                columnNumber: 11
                            }, this),
                            " Reset"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/search/FilterPanel.tsx",
                        lineNumber: 340,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        className: "flex-1",
                        onClick: apply,
                        children: "Apply Filters"
                    }, void 0, false, {
                        fileName: "[project]/src/components/search/FilterPanel.tsx",
                        lineNumber: 347,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/search/FilterPanel.tsx",
                lineNumber: 339,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/search/FilterPanel.tsx",
        lineNumber: 137,
        columnNumber: 5
    }, this);
}
_s(FilterPanel, "lfAqMniZevi/8ZzOWUgMlP42ESs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = FilterPanel;
var _c;
__turbopack_context__.k.register(_c, "FilterPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/search/MapView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MapView",
    ()=>MapView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.mjs [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$PropertyImage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/PropertyImage.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function MapView({ properties }) {
    _s();
    const [selected, setSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(properties[0] ?? null);
    const positioned = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "MapView.useMemo[positioned]": ()=>{
            const lats = properties.map({
                "MapView.useMemo[positioned].lats": (p)=>p.latitude
            }["MapView.useMemo[positioned].lats"]);
            const lngs = properties.map({
                "MapView.useMemo[positioned].lngs": (p)=>p.longitude
            }["MapView.useMemo[positioned].lngs"]);
            const minLat = Math.min(...lats), maxLat = Math.max(...lats);
            const minLng = Math.min(...lngs), maxLng = Math.max(...lngs);
            const spreadLat = maxLat - minLat || 1;
            const spreadLng = maxLng - minLng || 1;
            return properties.map({
                "MapView.useMemo[positioned]": (p)=>({
                        property: p,
                        top: 12 + (1 - (p.latitude - minLat) / spreadLat) * 72,
                        left: 14 + (p.longitude - minLng) / spreadLng * 72
                    })
            }["MapView.useMemo[positioned]"]);
        }
    }["MapView.useMemo[positioned]"], [
        properties
    ]);
    if (properties.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative h-[32rem] overflow-hidden rounded-2xl bg-brand-navy-light",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 opacity-40",
                        style: {
                            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(6,59,120,0.15) 28px), repeating-linear-gradient(90deg, transparent, transparent 27px, rgba(6,59,120,0.15) 28px)"
                        },
                        "aria-hidden": true
                    }, void 0, false, {
                        fileName: "[project]/src/components/search/MapView.tsx",
                        lineNumber: 37,
                        columnNumber: 9
                    }, this),
                    positioned.map(({ property, top, left })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>setSelected(property),
                            style: {
                                top: `${top}%`,
                                left: `${left}%`
                            },
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute -translate-x-1/2 -translate-y-full rounded-full px-2.5 py-1 text-xs font-bold shadow-md transition-transform hover:z-10 hover:scale-110", selected?.id === property.id ? "z-10 bg-brand-orange text-white" : "bg-white text-brand-navy"),
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["priceLabel"])(property)
                        }, property.id, false, {
                            fileName: "[project]/src/components/search/MapView.tsx",
                            lineNumber: 46,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/search/MapView.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            selected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative overflow-hidden rounded-2xl border border-border bg-white",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "aria-label": "Close preview",
                        onClick: ()=>setSelected(null),
                        className: "absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-foreground shadow",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                            className: "h-3.5 w-3.5"
                        }, void 0, false, {
                            fileName: "[project]/src/components/search/MapView.tsx",
                            lineNumber: 69,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/search/MapView.tsx",
                        lineNumber: 63,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$PropertyImage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PropertyImage"], {
                        id: selected.id,
                        propertyType: selected.propertyType,
                        className: "h-40 w-full"
                    }, void 0, false, {
                        fileName: "[project]/src/components/search/MapView.tsx",
                        lineNumber: 71,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg font-extrabold text-brand-navy",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["priceLabel"])(selected)
                            }, void 0, false, {
                                fileName: "[project]/src/components/search/MapView.tsx",
                                lineNumber: 73,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "mt-1 line-clamp-1 text-sm font-semibold text-foreground",
                                children: selected.title
                            }, void 0, false, {
                                fileName: "[project]/src/components/search/MapView.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-0.5 flex items-center gap-1 text-xs text-muted-foreground",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                        className: "h-3 w-3"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/search/MapView.tsx",
                                        lineNumber: 76,
                                        columnNumber: 15
                                    }, this),
                                    " ",
                                    selected.locality,
                                    ", ",
                                    selected.city
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/search/MapView.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: `/property/${selected.slug}/${selected.id}`,
                                className: "mt-3 inline-flex w-full items-center justify-center rounded-lg bg-brand-navy py-2 text-xs font-semibold text-white hover:bg-brand-navy-dark",
                                children: "View Details"
                            }, void 0, false, {
                                fileName: "[project]/src/components/search/MapView.tsx",
                                lineNumber: 78,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/search/MapView.tsx",
                        lineNumber: 72,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/search/MapView.tsx",
                lineNumber: 62,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/search/MapView.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
_s(MapView, "NACDvZBQQQeNn17B2ZcjVTkxD94=");
_c = MapView;
var _c;
__turbopack_context__.k.register(_c, "MapView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/search/MobileFilters.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MobileFilters",
    ()=>MobileFilters
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sliders-horizontal.mjs [app-client] (ecmascript) <export default as SlidersHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Modal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$search$2f$FilterPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/search/FilterPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$search$2d$params$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/search-params.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function MobileFilters({ initial }) {
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const count = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$search$2d$params$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["activeFilterCount"])(initial);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: ()=>setOpen(true),
                className: "inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-foreground lg:hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sliders$2d$horizontal$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SlidersHorizontal$3e$__["SlidersHorizontal"], {
                        className: "h-4 w-4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/search/MobileFilters.tsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this),
                    " Filters",
                    count > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-orange px-1 text-[11px] font-bold text-white"),
                        children: count
                    }, void 0, false, {
                        fileName: "[project]/src/components/search/MobileFilters.tsx",
                        lineNumber: 24,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/search/MobileFilters.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Modal"], {
                open: open,
                onClose: ()=>setOpen(false),
                title: "Filters",
                className: "sm:max-w-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$search$2f$FilterPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FilterPanel"], {
                    initial: initial,
                    onApplied: ()=>setOpen(false)
                }, void 0, false, {
                    fileName: "[project]/src/components/search/MobileFilters.tsx",
                    lineNumber: 31,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/search/MobileFilters.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/search/MobileFilters.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_s(MobileFilters, "xG1TONbKtDWtdOTrXaTAsNhPg/Q=");
_c = MobileFilters;
var _c;
__turbopack_context__.k.register(_c, "MobileFilters");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/search/PropertiesView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PropertiesView",
    ()=>PropertiesView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-grid.mjs [app-client] (ecmascript) <export default as LayoutGrid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/list.mjs [app-client] (ecmascript) <export default as List>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Map$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map.mjs [app-client] (ecmascript) <export default as Map>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2d$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SearchX$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search-x.mjs [app-client] (ecmascript) <export default as SearchX>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$property$2f$PropertyCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/property/PropertyCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$property$2f$PropertyListRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/property/PropertyListRow.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$search$2f$MapView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/search/MapView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$EmptyState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/EmptyState.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
const PAGE_SIZE = 9;
function PropertiesView({ properties }) {
    _s();
    const [view, setView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("grid");
    const [visible, setVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(PAGE_SIZE);
    const shown = properties.slice(0, visible);
    if (properties.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$EmptyState$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EmptyState"], {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2d$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SearchX$3e$__["SearchX"],
            title: "No properties found",
            description: "Try changing your filters or searching a different locality.",
            className: "mt-4"
        }, void 0, false, {
            fileName: "[project]/src/components/search/PropertiesView.tsx",
            lineNumber: 23,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-end",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "inline-flex gap-0.5 rounded-lg border border-border bg-white p-1",
                    children: [
                        {
                            id: "grid",
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__["LayoutGrid"],
                            label: "Grid"
                        },
                        {
                            id: "list",
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"],
                            label: "List"
                        },
                        {
                            id: "map",
                            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Map$3e$__["Map"],
                            label: "Map"
                        }
                    ].map((v)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            "aria-pressed": view === v.id,
                            "aria-label": v.label,
                            onClick: ()=>setView(v.id),
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold", view === v.id ? "bg-brand-navy text-white" : "text-muted-foreground hover:bg-muted"),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(v.icon, {
                                    className: "h-3.5 w-3.5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/search/PropertiesView.tsx",
                                    lineNumber: 54,
                                    columnNumber: 15
                                }, this),
                                " ",
                                v.label
                            ]
                        }, v.id, true, {
                            fileName: "[project]/src/components/search/PropertiesView.tsx",
                            lineNumber: 43,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/search/PropertiesView.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/search/PropertiesView.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4",
                children: [
                    view === "map" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$search$2f$MapView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MapView"], {
                        properties: properties
                    }, void 0, false, {
                        fileName: "[project]/src/components/search/PropertiesView.tsx",
                        lineNumber: 61,
                        columnNumber: 28
                    }, this),
                    view === "grid" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3",
                        children: shown.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$property$2f$PropertyCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PropertyCard"], {
                                property: p
                            }, p.id, false, {
                                fileName: "[project]/src/components/search/PropertiesView.tsx",
                                lineNumber: 66,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/search/PropertiesView.tsx",
                        lineNumber: 64,
                        columnNumber: 11
                    }, this),
                    view === "list" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col gap-4",
                        children: shown.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$property$2f$PropertyListRow$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PropertyListRow"], {
                                property: p
                            }, p.id, false, {
                                fileName: "[project]/src/components/search/PropertiesView.tsx",
                                lineNumber: 74,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/search/PropertiesView.tsx",
                        lineNumber: 72,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/search/PropertiesView.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            view !== "map" && visible < properties.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-8 flex justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    onClick: ()=>setVisible((v)=>v + PAGE_SIZE),
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buttonVariants"])({
                        variant: "outline",
                        size: "md"
                    })),
                    children: [
                        "Load More (",
                        properties.length - visible,
                        " more)"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/search/PropertiesView.tsx",
                    lineNumber: 82,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/search/PropertiesView.tsx",
                lineNumber: 81,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/search/PropertiesView.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, this);
}
_s(PropertiesView, "I+rbMlDPoFpgtdDYUvLGgYWNrRk=");
_c = PropertiesView;
var _c;
__turbopack_context__.k.register(_c, "PropertiesView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/search/SaveSearchButton.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SaveSearchButton",
    ()=>SaveSearchButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bookmark$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bookmark$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bookmark.mjs [app-client] (ecmascript) <export default as Bookmark>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Modal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$saved$2d$searches$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/saved-searches.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/auth.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/toast.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
function defaultLabel(filters) {
    const parts = [];
    if (filters.bedrooms?.length) parts.push(filters.bedrooms.map((b)=>b >= 5 ? "5+" : b).join("/") + " BHK");
    if (filters.propertyTypes?.length) parts.push(filters.propertyTypes[0].replace("_", " "));
    if (filters.maxPrice) parts.push(`under ₹${filters.maxPrice.toLocaleString("en-IN")}`);
    if (filters.city) parts.push(`in ${filters.city}`);
    return parts.length ? parts.join(" ") : "My search";
}
function SaveSearchButton({ filters }) {
    _s();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [label, setLabel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    function openModal() {
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].getCurrentUser()) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])("Login to save searches", "info");
            return;
        }
        setLabel(defaultLabel(filters));
        setOpen(true);
    }
    function save() {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$saved$2d$searches$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["savedSearchesService"].save(label.trim() || defaultLabel(filters), filters);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])("Search saved — we'll notify you about new matches.");
        setOpen(false);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: openModal,
                className: "inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-2 text-sm font-semibold text-foreground hover:bg-muted",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bookmark$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bookmark$3e$__["Bookmark"], {
                        className: "h-4 w-4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/search/SaveSearchButton.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    " Save Search"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/search/SaveSearchButton.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Modal"], {
                open: open,
                onClose: ()=>setOpen(false),
                title: "Save this search",
                className: "sm:max-w-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                        label: "Name",
                        value: label,
                        onChange: (e)=>setLabel(e.target.value),
                        placeholder: defaultLabel(filters)
                    }, void 0, false, {
                        fileName: "[project]/src/components/search/SaveSearchButton.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-2 text-xs text-muted-foreground",
                        children: "You'll be notified when new properties match these filters."
                    }, void 0, false, {
                        fileName: "[project]/src/components/search/SaveSearchButton.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        className: "mt-4 w-full",
                        onClick: save,
                        children: "Save Search"
                    }, void 0, false, {
                        fileName: "[project]/src/components/search/SaveSearchButton.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/search/SaveSearchButton.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/search/SaveSearchButton.tsx",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
_s(SaveSearchButton, "ES+5f8wAxeNIyVYqPpQbVD1TgKs=");
_c = SaveSearchButton;
var _c;
__turbopack_context__.k.register(_c, "SaveSearchButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/search/SortSelect.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SortSelect",
    ()=>SortSelect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const OPTIONS = [
    {
        id: "relevance",
        label: "Relevance"
    },
    {
        id: "nearest",
        label: "Nearest first"
    },
    {
        id: "newest",
        label: "Newest"
    },
    {
        id: "price_asc",
        label: "Price: Low to High"
    },
    {
        id: "price_desc",
        label: "Price: High to Low"
    }
];
function SortSelect() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const current = searchParams.get("sort") ?? "relevance";
    function onChange(value) {
        const qs = new URLSearchParams(searchParams.toString());
        if (value === "relevance") qs.delete("sort");
        else qs.set("sort", value);
        // "Nearest first" needs a reference point. If the URL doesn't already carry one
        // (a locality via `near`, or coords), ask the browser for the user's location.
        const hasReference = qs.get("near") || qs.get("nearLat");
        if (value === "nearest" && !hasReference && typeof navigator !== "undefined" && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos)=>{
                qs.set("nearLat", pos.coords.latitude.toFixed(5));
                qs.set("nearLng", pos.coords.longitude.toFixed(5));
                router.push(`/properties?${qs.toString()}`);
            }, // denied / unavailable: still switch — the service falls back to relevance order
            ()=>router.push(`/properties?${qs.toString()}`), {
                timeout: 8000,
                maximumAge: 300000
            });
            return;
        }
        router.push(`/properties?${qs.toString()}`);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
        value: current,
        onChange: (e)=>onChange(e.target.value),
        "aria-label": "Sort properties",
        className: "rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium text-foreground outline-none focus:border-brand-navy",
        children: OPTIONS.map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                value: o.id,
                children: [
                    "Sort: ",
                    o.label
                ]
            }, o.id, true, {
                fileName: "[project]/src/components/search/SortSelect.tsx",
                lineNumber: 52,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/search/SortSelect.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_s(SortSelect, "A57ZQKsSKoH4xi482IWIv7kTTfs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = SortSelect;
var _c;
__turbopack_context__.k.register(_c, "SortSelect");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/Badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide", {
    variants: {
        variant: {
            orange: "bg-brand-orange text-white",
            navy: "bg-brand-navy text-white",
            verified: "bg-emerald-600 text-white",
            outline: "border border-border bg-white/90 text-foreground backdrop-blur",
            subtleOrange: "bg-brand-orange-light text-brand-orange-dark",
            subtleNavy: "bg-brand-navy-light text-brand-navy"
        }
    },
    defaultVariants: {
        variant: "navy"
    }
});
function Badge({ className, variant, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/Badge.tsx",
        lineNumber: 27,
        columnNumber: 10
    }, this);
}
_c = Badge;
var _c;
__turbopack_context__.k.register(_c, "Badge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/EmptyState.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EmptyState",
    ()=>EmptyState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
function EmptyState({ icon: Icon, title, description, action, className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/60 px-6 py-12 text-center", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand-navy shadow-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                    className: "h-6 w-6",
                    strokeWidth: 1.5
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/EmptyState.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/EmptyState.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "mt-4 text-sm font-bold text-foreground",
                children: title
            }, void 0, false, {
                fileName: "[project]/src/components/ui/EmptyState.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-1.5 max-w-sm text-sm text-muted-foreground",
                children: description
            }, void 0, false, {
                fileName: "[project]/src/components/ui/EmptyState.tsx",
                lineNumber: 24,
                columnNumber: 7
            }, this),
            action && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-5",
                children: action
            }, void 0, false, {
                fileName: "[project]/src/components/ui/EmptyState.tsx",
                lineNumber: 25,
                columnNumber: 18
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/EmptyState.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_c = EmptyState;
var _c;
__turbopack_context__.k.register(_c, "EmptyState");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/Input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Input = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, label, error, id, ...props }, ref)=>{
    const inputId = id ?? props.name;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        className: "flex flex-col gap-1.5",
        htmlFor: inputId,
        children: [
            label && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs font-semibold text-foreground/80",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Input.tsx",
                lineNumber: 14,
                columnNumber: 19
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: ref,
                id: inputId,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-11 w-full rounded-xl border border-border bg-white px-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-brand-navy", error && "border-red-400 focus:border-red-500", className),
                "aria-invalid": Boolean(error),
                ...props
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Input.tsx",
                lineNumber: 15,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-xs font-medium text-red-600",
                children: error
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Input.tsx",
                lineNumber: 26,
                columnNumber: 19
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Input.tsx",
        lineNumber: 13,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Input;
Input.displayName = "Input";
var _c, _c1;
__turbopack_context__.k.register(_c, "Input$React.forwardRef");
__turbopack_context__.k.register(_c1, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/Modal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Modal",
    ()=>Modal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function Modal({ open, onClose, title, children, className }) {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Modal.useEffect": ()=>{
            if (!open) return;
            const onKey = {
                "Modal.useEffect.onKey": (e)=>e.key === "Escape" && onClose()
            }["Modal.useEffect.onKey"];
            document.addEventListener("keydown", onKey);
            const prevOverflow = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            return ({
                "Modal.useEffect": ()=>{
                    document.removeEventListener("keydown", onKey);
                    document.body.style.overflow = prevOverflow;
                }
            })["Modal.useEffect"];
        }
    }["Modal.useEffect"], [
        open,
        onClose
    ]);
    if (!open || typeof document === "undefined") return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-brand-navy-dark/60 backdrop-blur-sm animate-fade-up",
                style: {
                    animationDuration: "200ms"
                },
                onClick: onClose,
                "aria-hidden": true
            }, void 0, false, {
                fileName: "[project]/src/components/ui/Modal.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                role: "dialog",
                "aria-modal": "true",
                "aria-labelledby": "modal-title",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative w-full max-h-[90vh] overflow-y-auto rounded-t-2xl bg-white p-5 shadow-2xl animate-fade-up sm:max-w-md sm:rounded-2xl sm:p-6", className),
                style: {
                    animationDuration: "250ms"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                id: "modal-title",
                                className: "text-lg font-bold text-foreground",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/Modal.tsx",
                                lineNumber: 54,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                "aria-label": "Close",
                                onClick: onClose,
                                className: "rounded-full p-1.5 text-muted-foreground hover:bg-muted",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "h-5 w-5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/Modal.tsx",
                                    lineNumber: 63,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/Modal.tsx",
                                lineNumber: 57,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/Modal.tsx",
                        lineNumber: 53,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/Modal.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/Modal.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/Modal.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this), document.body);
}
_s(Modal, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = Modal;
var _c;
__turbopack_context__.k.register(_c, "Modal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/PropertyImage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PropertyImage",
    ()=>PropertyImage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// On-brand generated placeholder — no external image URLs to break (spec §64).
// Deterministic per-id gradient + property-type icon watermark so cards still feel distinct.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building-2.mjs [app-client] (ecmascript) <export default as Building2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/house.mjs [app-client] (ecmascript) <export default as Home>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trees$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trees$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trees.mjs [app-client] (ecmascript) <export default as Trees>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$warehouse$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Warehouse$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/warehouse.mjs [app-client] (ecmascript) <export default as Warehouse>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$store$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Store$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/store.mjs [app-client] (ecmascript) <export default as Store>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/briefcase.mjs [app-client] (ecmascript) <export default as Briefcase>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bed$2d$double$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BedDouble$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bed-double.mjs [app-client] (ecmascript) <export default as BedDouble>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$castle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Castle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/castle.mjs [app-client] (ecmascript) <export default as Castle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$land$2d$plot$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LandPlot$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/land-plot.mjs [app-client] (ecmascript) <export default as LandPlot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const ICONS = {
    apartment: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"],
    independent_house: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"],
    villa: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$castle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Castle$3e$__["Castle"],
    plot: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$land$2d$plot$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LandPlot$3e$__["LandPlot"],
    land: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trees$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trees$3e$__["Trees"],
    pg: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bed$2d$double$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BedDouble$3e$__["BedDouble"],
    flatmate: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bed$2d$double$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BedDouble$3e$__["BedDouble"],
    office: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__["Briefcase"],
    shop: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$store$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Store$3e$__["Store"],
    showroom: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$store$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Store$3e$__["Store"],
    warehouse: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$warehouse$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Warehouse$3e$__["Warehouse"],
    other: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"]
};
const GRADIENTS = [
    "from-brand-navy to-brand-navy-dark",
    "from-brand-navy-dark via-brand-navy to-[#0a4f9e]",
    "from-[#0a4f9e] to-brand-navy-dark",
    "from-brand-navy to-[#083a70]"
];
function hashIndex(seed, mod) {
    let h = 0;
    for(let i = 0; i < seed.length; i++)h = h * 31 + seed.charCodeAt(i) >>> 0;
    return h % mod;
}
function PropertyImage({ id, propertyType, locality, city, className }) {
    const Icon = ICONS[propertyType] ?? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"];
    const gradient = GRADIENTS[hashIndex(id, GRADIENTS.length)];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative flex items-center justify-center overflow-hidden bg-gradient-to-br", gradient, className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                className: "h-16 w-16 text-white/15",
                strokeWidth: 1.25,
                "aria-hidden": true
            }, void 0, false, {
                fileName: "[project]/src/components/ui/PropertyImage.tsx",
                lineNumber: 70,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,90,0,0.25),transparent_45%)]"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/PropertyImage.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            (locality || city) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute bottom-2.5 left-3 text-[11px] font-medium text-white/70",
                children: [
                    locality,
                    city
                ].filter(Boolean).join(", ")
            }, void 0, false, {
                fileName: "[project]/src/components/ui/PropertyImage.tsx",
                lineNumber: 73,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/PropertyImage.tsx",
        lineNumber: 63,
        columnNumber: 5
    }, this);
}
_c = PropertyImage;
var _c;
__turbopack_context__.k.register(_c, "PropertyImage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/data/amenities.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Central amenity registry (spec §16 step 7, §47 admin-editable list). Both PropertyCard's
// compact chips and the property-detail Amenities grid read from here so labels/icons never
// drift between views. Admin CMS (Phase 11) will make this list editable without a deploy.
__turbopack_context__.s([
    "amenities",
    ()=>amenities,
    "amenityMap",
    ()=>amenityMap
]);
const amenities = [
    {
        id: "parking",
        label: "Parking",
        icon: "car"
    },
    {
        id: "lift",
        label: "Lift",
        icon: "move-vertical"
    },
    {
        id: "power_backup",
        label: "Power Backup",
        icon: "zap"
    },
    {
        id: "security",
        label: "Security",
        icon: "shield-check"
    },
    {
        id: "gym",
        label: "Gym",
        icon: "dumbbell"
    },
    {
        id: "swimming_pool",
        label: "Swimming Pool",
        icon: "waves"
    },
    {
        id: "club_house",
        label: "Club House",
        icon: "building-2"
    },
    {
        id: "garden",
        label: "Garden",
        icon: "trees"
    },
    {
        id: "cctv",
        label: "CCTV",
        icon: "camera"
    },
    {
        id: "water_supply",
        label: "Water Supply",
        icon: "droplets"
    },
    {
        id: "wifi",
        label: "Internet",
        icon: "wifi"
    },
    {
        id: "gas_pipeline",
        label: "Gas Pipeline",
        icon: "flame"
    },
    {
        id: "pet_friendly",
        label: "Pet Friendly",
        icon: "paw-print"
    },
    {
        id: "gated_layout",
        label: "Gated Layout",
        icon: "layers"
    }
];
const amenityMap = Object.fromEntries(amenities.map((a)=>[
        a.id,
        a
    ]));
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/data/cities.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "popularCities",
    ()=>popularCities
]);
const popularCities = [
    {
        id: "bengaluru",
        name: "Bengaluru",
        state: "Karnataka",
        propertyCount: 4820,
        imageUrl: ""
    },
    {
        id: "mumbai",
        name: "Mumbai",
        state: "Maharashtra",
        propertyCount: 6210,
        imageUrl: "/images/cities/mumbai.jpg"
    },
    {
        id: "chennai",
        name: "Chennai",
        state: "Tamil Nadu",
        propertyCount: 3140,
        imageUrl: "/images/cities/chennai.jpg"
    },
    {
        id: "hyderabad",
        name: "Hyderabad",
        state: "Telangana",
        propertyCount: 3980,
        imageUrl: ""
    },
    {
        id: "delhi-ncr",
        name: "Delhi NCR",
        state: "Delhi",
        propertyCount: 7350,
        imageUrl: "/images/cities/delhi-ncr.jpg"
    },
    {
        id: "pune",
        name: "Pune",
        state: "Maharashtra",
        propertyCount: 3410,
        imageUrl: ""
    },
    {
        id: "kolkata",
        name: "Kolkata",
        state: "West Bengal",
        propertyCount: 1980,
        imageUrl: ""
    },
    {
        id: "coimbatore",
        name: "Coimbatore",
        state: "Tamil Nadu",
        propertyCount: 940,
        imageUrl: ""
    },
    {
        id: "ahmedabad",
        name: "Ahmedabad",
        state: "Gujarat",
        propertyCount: 1620,
        imageUrl: ""
    },
    {
        id: "kochi",
        name: "Kochi",
        state: "Kerala",
        propertyCount: 780,
        imageUrl: ""
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/data/seed-properties.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "allProperties",
    ()=>allProperties,
    "buyShowcaseIds",
    ()=>buyShowcaseIds,
    "commercialShowcaseIds",
    ()=>commercialShowcaseIds,
    "generatedProperties",
    ()=>generatedProperties,
    "landShowcaseIds",
    ()=>landShowcaseIds,
    "luxuryVillaShowcaseIds",
    ()=>luxuryVillaShowcaseIds,
    "pgFlatmatesShowcaseIds",
    ()=>pgFlatmatesShowcaseIds,
    "rentShowcaseIds",
    ()=>rentShowcaseIds
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$properties$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/properties.ts [app-client] (ecmascript)");
;
const CITIES = [
    {
        city: "Bengaluru",
        state: "Karnataka",
        localities: [
            "Whitefield",
            "Indiranagar",
            "HSR Layout",
            "Koramangala",
            "Sarjapur Road",
            "Electronic City"
        ],
        lat: 12.9716,
        lng: 77.5946
    },
    {
        city: "Mumbai",
        state: "Maharashtra",
        localities: [
            "Bandra West",
            "Andheri East",
            "Powai",
            "Malad West",
            "Thane West",
            "Chembur"
        ],
        lat: 19.076,
        lng: 72.8777
    },
    {
        city: "Chennai",
        state: "Tamil Nadu",
        localities: [
            "Adyar",
            "Anna Nagar",
            "T. Nagar",
            "Velachery",
            "OMR",
            "Porur"
        ],
        lat: 13.0827,
        lng: 80.2707
    },
    {
        city: "Hyderabad",
        state: "Telangana",
        localities: [
            "Gachibowli",
            "Madhapur",
            "Kondapur",
            "Banjara Hills",
            "Kukatpally",
            "Manikonda"
        ],
        lat: 17.385,
        lng: 78.4867
    }
];
const TYPE_CYCLE = [
    {
        type: "apartment",
        category: "residential",
        listingType: "rent"
    },
    {
        type: "apartment",
        category: "residential",
        listingType: "sale"
    },
    {
        type: "independent_house",
        category: "residential",
        listingType: "rent"
    },
    {
        type: "villa",
        category: "residential",
        listingType: "sale"
    },
    {
        type: "plot",
        category: "land",
        listingType: "sale"
    },
    {
        type: "pg",
        category: "pg_flatmate",
        listingType: "rent"
    },
    {
        type: "office",
        category: "commercial",
        listingType: "rent"
    },
    {
        type: "shop",
        category: "commercial",
        listingType: "rent"
    },
    {
        type: "warehouse",
        category: "commercial",
        listingType: "sale"
    }
];
const FURNISHING = [
    "unfurnished",
    "semi_furnished",
    "fully_furnished"
];
const AMENITY_POOL = [
    "parking",
    "lift",
    "power_backup",
    "security",
    "gym",
    "swimming_pool",
    "club_house",
    "garden",
    "cctv",
    "water_supply",
    "wifi",
    "gas_pipeline"
];
const OWNER_NAMES = [
    "Rahul Iyer",
    "Sneha Kapoor",
    "Manoj Pillai",
    "Divya Krishnan",
    "Aditya Verma",
    "Lakshmi Narayanan",
    "Rohit Bhatia",
    "Meera Suresh",
    "Sanjay Gowda",
    "Nisha Reddy"
];
const POSTED_BY = [
    "owner",
    "owner",
    "agent",
    "owner",
    "builder"
];
function titleFor(type, bhk, listingType, locality) {
    const action = listingType === "rent" ? "for Rent" : "for Sale";
    switch(type){
        case "apartment":
            return `${bhk} BHK Apartment ${action} in ${locality}`;
        case "independent_house":
            return `${bhk} BHK Independent House ${action} in ${locality}`;
        case "villa":
            return `${bhk} BHK Villa ${action} in ${locality}`;
        case "plot":
            return `Residential Plot ${action} in ${locality}`;
        case "pg":
            return `Premium PG Accommodation ${action} in ${locality}`;
        case "office":
            return `Office Space ${action} in ${locality}`;
        case "shop":
            return `Commercial Shop ${action} in ${locality}`;
        case "warehouse":
            return `Warehouse ${action} in ${locality}`;
        default:
            return `Property ${action} in ${locality}`;
    }
}
function slugify(s) {
    return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function generate() {
    const out = [];
    let n = 0;
    for (const cityDef of CITIES){
        for(let i = 0; i < 12; i++){
            n++;
            const cycle = TYPE_CYCLE[i % TYPE_CYCLE.length];
            const locality = cityDef.localities[i % cityDef.localities.length];
            const isResidential = cycle.category === "residential";
            const bhk = isResidential ? 1 + i % 4 : null;
            const id = `s${n}`;
            const owner = OWNER_NAMES[n % OWNER_NAMES.length];
            const basePrice = 12000 + (i * 3700 + cityDef.lat * 100) % 60000;
            const rent = cycle.listingType === "rent" ? Math.round(basePrice / 500) * 500 : null;
            const saleBase = 3000000 + (i * 850000 + n * 210000) % 25000000;
            const price = cycle.listingType === "sale" ? Math.round(saleBase / 50000) * 50000 : null;
            // Every TYPE_CYCLE entry occurs exactly once per city (fixed `i`), so keying builtUpArea
            // off `i` alone made every listing of a given type — across every city — report the
            // identical area (most visible on the homepage's Land and PG & Flatmates rails, which
            // each showcase one listing per type per city side by side). Keyed off `n` (unique per
            // listing in the whole catalogue) instead so it actually varies.
            const area = cycle.category === "land" ? 800 + n * 137 % 2600 : 450 + n * 97 % 2200;
            const amenities = AMENITY_POOL.filter((_, ai)=>(n + ai) % 3 !== 0).slice(0, 3 + i % 4);
            const title = titleFor(cycle.type, bhk, cycle.listingType, locality);
            out.push({
                id,
                slug: `${slugify(title)}-${slugify(cityDef.city)}`,
                ownerId: `su${n % OWNER_NAMES.length}`,
                ownerName: owner,
                ownerVerified: n % 3 !== 0,
                postedBy: POSTED_BY[n % POSTED_BY.length],
                title,
                description: `${title}. Well-connected to major roads and everyday conveniences, close to ${locality}'s commercial strip.`,
                listingType: cycle.listingType,
                propertyType: cycle.type,
                category: cycle.category,
                price,
                rent,
                deposit: cycle.listingType === "rent" ? (rent ?? 0) * (2 + i % 3) : null,
                maintenance: isResidential ? 500 + i % 6 * 300 : null,
                negotiable: i % 2 === 0,
                city: cityDef.city,
                state: cityDef.state,
                locality,
                address: `${locality} Main Road`,
                pincode: `${560000 + n}`.slice(0, 6),
                latitude: cityDef.lat + (i % 6 - 3) * 0.01,
                longitude: cityDef.lng + (i % 5 - 2) * 0.01,
                bedrooms: bhk,
                bathrooms: isResidential ? Math.max(1, (bhk ?? 1) - i % 2) : cycle.category === "commercial" ? 1 : null,
                balconies: isResidential ? i % 3 : null,
                builtUpArea: area,
                carpetArea: cycle.category === "land" ? null : Math.round(area * 0.86),
                floor: cycle.category === "land" ? null : i % 12,
                totalFloors: cycle.category === "land" ? null : 4 + i % 15,
                facing: [
                    "East",
                    "West",
                    "North",
                    "South"
                ][i % 4],
                furnishing: isResidential || cycle.category === "commercial" ? FURNISHING[i % FURNISHING.length] : null,
                propertyAge: cycle.category === "land" ? null : `${1 + i % 12} years`,
                availableFrom: i % 4 === 0 ? "Immediate" : "Within 30 days",
                genderPreference: cycle.category === "pg_flatmate" ? [
                    "male",
                    "female",
                    "any"
                ][n % 3] : null,
                amenities,
                images: [],
                verificationStatus: n % 5 === 0 ? "pending" : "approved",
                status: "active",
                featured: n % 7 === 0,
                noBrokerage: i % 2 === 0,
                views: 80 + n * 37 % 2400,
                leadsCount: 2 + n * 5 % 60,
                savedCount: 4 + n * 3 % 140,
                createdAt: new Date(2026, 7, 1 + n % 24).toISOString().slice(0, 10)
            });
        }
    }
    return out;
}
// Hand-picked real photos + light title/listingType touch-ups for a specific, deterministic
// subset of the generated catalogue — used to power the homepage's Rent/Buy/Land/Commercial/
// PG & Flatmates sections with real, working property detail pages (not fake homepage-only
// data): every id below already exists in `generatedProperties` with a real slug that
// propertyRepository.getById/getBySlugAndId resolves, so "View Details" always lands somewhere
// real. Only images/title/listingType/propertyType/price/rent/deposit are touched — a title
// change means the slug is recomputed too, so old links to the untouched auto-title would 404;
// nothing links to these by their pre-override slug anywhere in the app.
const SHOWCASE_OVERRIDES = {
    // Rent
    s1: {
        images: [
            "/images/showcase/studio-1bhk.jpg"
        ]
    },
    s10: {
        images: [
            "/images/properties/p3-apartment-interior.jpg"
        ]
    },
    s3: {
        images: [
            "/images/showcase/living-3bhk.jpg"
        ]
    },
    s16: {
        title: "4 BHK Luxury Villa for Rent in Malad West",
        listingType: "rent",
        price: null,
        rent: 95000,
        deposit: 285000,
        images: [
            "/images/categories/independent-houses.jpg"
        ]
    },
    s25: {
        images: [
            "/images/categories/new-projects.jpg"
        ]
    },
    s34: {
        images: [
            "/images/showcase/coliving.jpg"
        ]
    },
    // Buy
    s2: {
        images: [
            "/images/categories/new-projects.jpg"
        ]
    },
    s4: {
        images: [
            "/images/categories/independent-houses.jpg"
        ]
    },
    s28: {
        images: [
            "/images/showcase/villa-premium.jpg"
        ]
    },
    s14: {
        images: [
            "/images/properties/p3-apartment-interior.jpg"
        ]
    },
    s27: {
        title: "3 BHK Independent House for Sale in T. Nagar",
        listingType: "sale",
        rent: null,
        deposit: null,
        price: 18500000,
        images: [
            "/images/categories/buy-property.jpg"
        ]
    },
    // Land & Plots
    s5: {
        images: [
            "/images/categories/land.jpg"
        ]
    },
    s17: {
        title: "Gated Community Plot for Sale in Thane West",
        images: [
            "/images/showcase/gated-community.jpg"
        ]
    },
    s29: {
        title: "Farm Land for Sale near OMR",
        images: [
            "/images/showcase/farmland.jpg"
        ]
    },
    // Genuine vacant-land photography for a 4th, visually distinct card wasn't findable (several
    // sourcing attempts this session returned unrelated photos, discarded) — using a commercial
    // building photo instead, on the reasoning real listings for zoned commercial land often
    // market the type of development the plot is approved for.
    s41: {
        title: "Commercial Land for Sale in Kukatpally",
        images: [
            "/images/categories/apartments.jpg"
        ]
    },
    // Commercial
    s7: {
        images: [
            "/images/showcase/office-modern.jpg"
        ]
    },
    s8: {
        images: [
            "/images/categories/commercial.jpg"
        ]
    },
    s20: {
        title: "Showroom Space for Rent in Andheri East",
        propertyType: "showroom",
        images: [
            "/images/properties/p5-apartment.jpg"
        ]
    },
    s9: {
        images: [
            "/images/showcase/warehouse.jpg"
        ]
    },
    s33: {
        title: "Commercial Building for Sale in T. Nagar",
        images: [
            "/images/properties/p1-apartment-exterior.jpg"
        ]
    },
    // PG & Flatmates
    s6: {
        title: "Premium PG for Men in Electronic City",
        genderPreference: "male",
        images: [
            "/images/categories/pg.jpg"
        ]
    },
    s18: {
        title: "Premium PG for Women in Chembur",
        genderPreference: "female",
        images: [
            "/images/showcase/coliving.jpg"
        ]
    },
    s30: {
        title: "Co-living Space in Porur",
        genderPreference: "any",
        images: [
            "/images/categories/flatmates.jpg"
        ]
    },
    s42: {
        title: "Flatmate Wanted — Shared Room in Manikonda",
        propertyType: "flatmate",
        genderPreference: "any",
        images: [
            "/images/showcase/studio-1bhk.jpg"
        ]
    },
    // Luxury Villas (s28 also appears in Buy, s16 also appears in Rent — both genuinely are
    // villas, so showing them again in a dedicated villas showcase is consistent, not a bug)
    s40: {
        images: [
            "/images/categories/buy-property.jpg"
        ]
    }
};
function applyShowcaseOverrides(properties) {
    return properties.map((p)=>{
        const patch = SHOWCASE_OVERRIDES[p.id];
        if (!patch) return p;
        const merged = {
            ...p,
            ...patch
        };
        if (patch.title) merged.slug = `${slugify(merged.title)}-${slugify(merged.city)}`;
        return merged;
    });
}
const generatedProperties = applyShowcaseOverrides(generate());
const rentShowcaseIds = [
    "s1",
    "s10",
    "s3",
    "s16",
    "s25",
    "s34"
];
const buyShowcaseIds = [
    "s2",
    "s4",
    "s28",
    "s14",
    "s27"
];
const landShowcaseIds = [
    "s5",
    "s17",
    "s29",
    "s41"
];
const commercialShowcaseIds = [
    "s7",
    "s8",
    "s20",
    "s9",
    "s33"
];
const pgFlatmatesShowcaseIds = [
    "s6",
    "s18",
    "s30",
    "s42"
];
const luxuryVillaShowcaseIds = [
    "p2",
    "s40",
    "s16",
    "s28"
];
const allProperties = [
    ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$properties$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["featuredProperties"],
    ...generatedProperties
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/favorite-actions.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "toggleFavorite",
    ()=>toggleFavorite
]);
// Shared handler for every "Save"/heart button in the app (PropertyCard, PropertyListRow,
// ActionBar, MapView preview, ...) so the login-check + toast wording never drifts between them.
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/auth.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$favorites$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/favorites.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/toast.ts [app-client] (ecmascript)");
;
;
;
function toggleFavorite(propertyId) {
    const user = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].getCurrentUser();
    if (!user) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])("Login to save properties", "info");
        return;
    }
    const wasSaved = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$favorites$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["favoritesService"].isSaved(propertyId);
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$favorites$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["favoritesService"].toggle(propertyId);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])(wasSaved ? "Removed from favorites" : "Saved to favorites");
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/favorites.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFavorites",
    ()=>useFavorites,
    "useIsFavorited",
    ()=>useIsFavorited
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$favorites$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/favorites.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
function useFavorites() {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"])({
        "useFavorites.useSyncExternalStore": (cb)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$favorites$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["favoritesService"].subscribe(cb)
    }["useFavorites.useSyncExternalStore"], {
        "useFavorites.useSyncExternalStore": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$favorites$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["favoritesService"].getAll()
    }["useFavorites.useSyncExternalStore"], {
        "useFavorites.useSyncExternalStore": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EMPTY_ARRAY"]
    }["useFavorites.useSyncExternalStore"]);
}
_s(useFavorites, "FpwL93IKMLJZuQQXefVtWynbBPQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"]
    ];
});
function useIsFavorited(propertyId) {
    _s1();
    const subscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useIsFavorited.useCallback[subscribe]": (cb)=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$favorites$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["favoritesService"].subscribe(cb)
    }["useIsFavorited.useCallback[subscribe]"], []);
    const getSnapshot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useIsFavorited.useCallback[getSnapshot]": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$favorites$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["favoritesService"].isSaved(propertyId)
    }["useIsFavorited.useCallback[getSnapshot]"], [
        propertyId
    ]);
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"])(subscribe, getSnapshot, {
        "useIsFavorited.useSyncExternalStore": ()=>false
    }["useIsFavorited.useSyncExternalStore"]);
}
_s1(useIsFavorited, "rUsu0urmp2LB4luW/6H994MS1H4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSyncExternalStore"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/firebase/firestore-helpers.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mapDoc",
    ()=>mapDoc,
    "mapSnapshot",
    ()=>mapSnapshot,
    "stripUndefined",
    ()=>stripUndefined,
    "toIso",
    ()=>toIso
]);
// Small shared helpers so every Firebase-backed service (lib/services/*.ts) talks to Firestore
// the same way — consistent id-injection, timestamp handling, and snapshot mapping.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__av__as__Timestamp$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/common-CE5hrKY-.esm.js [app-client] (ecmascript) <export av as Timestamp>");
;
function toIso(value) {
    if (value == null) return null;
    if (value instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__av__as__Timestamp$3e$__["Timestamp"]) return value.toDate().toISOString();
    if (value instanceof Date) return value.toISOString();
    if (typeof value === "string") return value;
    return null;
}
function mapSnapshot(snap, mapper) {
    return snap.docs.map((d)=>mapper(d.id, d.data()));
}
function mapDoc(snap, mapper) {
    if (!snap.exists()) return null;
    return mapper(snap.id, snap.data());
}
function stripUndefined(obj) {
    const out = {
        ...obj
    };
    for (const key of Object.keys(out)){
        if (out[key] === undefined) delete out[key];
    }
    return out;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/search-params.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Single source of truth for turning the /properties URL query string into a SearchFilters
// object and back. Used server-side (page.tsx parses incoming searchParams) and client-side
// (FilterPanel/SortSelect build the next URL) so the two never drift.
__turbopack_context__.s([
    "activeFilterCount",
    ()=>activeFilterCount,
    "filtersToSearchString",
    ()=>filtersToSearchString,
    "parseFilters",
    ()=>parseFilters
]);
function first(v) {
    return Array.isArray(v) ? v[0] : v;
}
function list(v) {
    const s = first(v);
    return s ? s.split(",").filter(Boolean) : [];
}
function parseFilters(params) {
    const filters = {};
    const city = first(params.city);
    if (city) filters.city = city;
    const listingType = first(params.listingType);
    if (listingType === "rent" || listingType === "sale") filters.listingType = listingType;
    const propertyTypes = list(params.type);
    if (propertyTypes.length) filters.propertyTypes = propertyTypes;
    const minPrice = first(params.minPrice);
    if (minPrice) filters.minPrice = Number(minPrice);
    const maxPrice = first(params.maxPrice);
    if (maxPrice) filters.maxPrice = Number(maxPrice);
    const minArea = first(params.minArea);
    if (minArea) filters.minArea = Number(minArea);
    const maxArea = first(params.maxArea);
    if (maxArea) filters.maxArea = Number(maxArea);
    const gender = first(params.gender);
    if (gender === "male" || gender === "female" || gender === "any") filters.gender = gender;
    const bhk = list(params.bhk).map(Number).filter((n)=>!Number.isNaN(n));
    if (bhk.length) filters.bedrooms = bhk;
    const furnishing = list(params.furnishing);
    if (furnishing.length) filters.furnishing = furnishing;
    const amenities = list(params.amenities);
    if (amenities.length) filters.amenities = amenities;
    const postedBy = list(params.postedBy);
    if (postedBy.length) filters.postedBy = postedBy;
    if (first(params.verified) === "1") filters.verifiedOnly = true;
    if (first(params.noBrokerage) === "1") filters.noBrokerage = true;
    if (first(params.pet) === "1") filters.petFriendly = true;
    if (first(params.featured) === "1") filters.featuredOnly = true;
    const sort = first(params.sort);
    if (sort) filters.sort = sort;
    const near = first(params.near);
    if (near) filters.near = near;
    const nearLat = first(params.nearLat);
    if (nearLat && !Number.isNaN(Number(nearLat))) filters.nearLat = Number(nearLat);
    const nearLng = first(params.nearLng);
    if (nearLng && !Number.isNaN(Number(nearLng))) filters.nearLng = Number(nearLng);
    return filters;
}
function filtersToSearchString(filters) {
    const qs = new URLSearchParams();
    if (filters.city) qs.set("city", filters.city);
    if (filters.listingType) qs.set("listingType", filters.listingType);
    if (filters.propertyTypes?.length) qs.set("type", filters.propertyTypes.join(","));
    if (filters.minPrice != null) qs.set("minPrice", String(filters.minPrice));
    if (filters.maxPrice != null) qs.set("maxPrice", String(filters.maxPrice));
    if (filters.minArea != null) qs.set("minArea", String(filters.minArea));
    if (filters.maxArea != null) qs.set("maxArea", String(filters.maxArea));
    if (filters.gender) qs.set("gender", filters.gender);
    if (filters.bedrooms?.length) qs.set("bhk", filters.bedrooms.join(","));
    if (filters.furnishing?.length) qs.set("furnishing", filters.furnishing.join(","));
    if (filters.amenities?.length) qs.set("amenities", filters.amenities.join(","));
    if (filters.postedBy?.length) qs.set("postedBy", filters.postedBy.join(","));
    if (filters.verifiedOnly) qs.set("verified", "1");
    if (filters.noBrokerage) qs.set("noBrokerage", "1");
    if (filters.petFriendly) qs.set("pet", "1");
    if (filters.featuredOnly) qs.set("featured", "1");
    if (filters.sort) qs.set("sort", filters.sort);
    if (filters.near) qs.set("near", filters.near);
    if (filters.nearLat != null) qs.set("nearLat", String(filters.nearLat));
    if (filters.nearLng != null) qs.set("nearLng", String(filters.nearLng));
    return qs.toString();
}
function activeFilterCount(filters) {
    return (filters.propertyTypes?.length ?? 0) + (filters.bedrooms?.length ?? 0) + (filters.furnishing?.length ?? 0) + (filters.amenities?.length ?? 0) + (filters.postedBy?.length ?? 0) + (filters.minPrice != null ? 1 : 0) + (filters.maxPrice != null ? 1 : 0) + (filters.minArea != null ? 1 : 0) + (filters.maxArea != null ? 1 : 0) + (filters.gender ? 1 : 0) + (filters.near || filters.nearLat != null ? 1 : 0) + (filters.verifiedOnly ? 1 : 0) + (filters.noBrokerage ? 1 : 0) + (filters.petFriendly ? 1 : 0) + (filters.featuredOnly ? 1 : 0);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/services/favorites.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "favoritesService",
    ()=>favoritesService
]);
// Favorites (spec §18) — folder support (My Homes / Investment / Shortlist / custom). Mock
// mode persists to localStorage per signed-in user. Firebase mode is a live `favorites` query
// (doc id `{uid}_{propertyId}`, so toggling is naturally idempotent) plus a `favoriteFolders`
// array field on the user's own `users/{uid}` document.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__aL__as__collection$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/common-CE5hrKY-.esm.js [app-client] (ecmascript) <export aL as collection>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__v__as__doc$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/common-CE5hrKY-.esm.js [app-client] (ecmascript) <export v as doc>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__aJ__as__arrayUnion$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/common-CE5hrKY-.esm.js [app-client] (ecmascript) <export aJ as arrayUnion>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__b0__as__serverTimestamp$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/common-CE5hrKY-.esm.js [app-client] (ecmascript) <export b0 as serverTimestamp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/auth.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$firestore$2d$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase/firestore-helpers.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$favorites$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/favorites.ts [app-client] (ecmascript)");
;
;
;
;
;
;
function isBrowser() {
    return ("TURBOPACK compile-time value", "object") !== "undefined";
}
class MockFavoritesService {
    entries = [];
    folders = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$favorites$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_FOLDERS"];
    loadedForUserId = undefined;
    listeners = [];
    storageKey(userId) {
        return `rentlet_favorites_${userId}`;
    }
    foldersKey(userId) {
        return `rentlet_favorite_folders_${userId}`;
    }
    ensureLoaded() {
        const uid = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].getCurrentUser()?.id ?? null;
        if (uid === this.loadedForUserId) return;
        this.loadedForUserId = uid;
        if (!uid || !isBrowser()) {
            this.entries = [];
            this.folders = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$favorites$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_FOLDERS"];
            return;
        }
        try {
            this.entries = JSON.parse(window.localStorage.getItem(this.storageKey(uid)) ?? "[]");
        } catch  {
            this.entries = [];
        }
        try {
            const stored = JSON.parse(window.localStorage.getItem(this.foldersKey(uid)) ?? "null");
            this.folders = Array.isArray(stored) && stored.length ? stored : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$favorites$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_FOLDERS"];
        } catch  {
            this.folders = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$favorites$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_FOLDERS"];
        }
    }
    persist() {
        const uid = this.loadedForUserId;
        if (!uid || !isBrowser()) return;
        window.localStorage.setItem(this.storageKey(uid), JSON.stringify(this.entries));
        window.localStorage.setItem(this.foldersKey(uid), JSON.stringify(this.folders));
    }
    emit() {
        this.listeners.forEach((l)=>l());
    }
    getAll() {
        this.ensureLoaded();
        return this.entries;
    }
    getFolders() {
        this.ensureLoaded();
        return this.folders;
    }
    isSaved(propertyId) {
        this.ensureLoaded();
        return this.entries.some((e)=>e.propertyId === propertyId);
    }
    subscribe(listener) {
        this.listeners.push(listener);
        return ()=>{
            this.listeners = this.listeners.filter((l)=>l !== listener);
        };
    }
    toggle(propertyId, folder = "Saved") {
        this.ensureLoaded();
        if (this.entries.some((e)=>e.propertyId === propertyId)) {
            this.entries = this.entries.filter((e)=>e.propertyId !== propertyId);
        } else {
            this.entries = [
                ...this.entries,
                {
                    propertyId,
                    folder,
                    savedAt: new Date().toISOString()
                }
            ];
        }
        this.persist();
        this.emit();
    }
    remove(propertyId) {
        this.ensureLoaded();
        this.entries = this.entries.filter((e)=>e.propertyId !== propertyId);
        this.persist();
        this.emit();
    }
    moveToFolder(propertyId, folder) {
        this.ensureLoaded();
        this.entries = this.entries.map((e)=>e.propertyId === propertyId ? {
                ...e,
                folder
            } : e);
        this.persist();
        this.emit();
    }
    addFolder(name) {
        this.ensureLoaded();
        if (!name.trim() || this.folders.includes(name.trim())) return;
        this.folders = [
            ...this.folders,
            name.trim()
        ];
        this.persist();
        this.emit();
    }
}
// ---------------------------------------------------------------------------------------------
const COLLECTION = "favorites";
function favDocId(uid, propertyId) {
    return `${uid}_${propertyId}`;
}
class FirebaseFavoritesService {
    entries = [];
    folders = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$favorites$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_FOLDERS"];
    listeners = [];
    boundUid = undefined;
    unsubEntries = null;
    unsubUser = null;
    constructor(){
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].subscribe((user)=>this.bindToUser(user?.id ?? null));
        this.bindToUser(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].getCurrentUser()?.id ?? null);
    }
    bindToUser(uid) {
        if (uid === this.boundUid) return;
        this.boundUid = uid;
        this.unsubEntries?.();
        this.unsubUser?.();
        this.unsubEntries = null;
        this.unsubUser = null;
        if (!uid) {
            this.entries = [];
            this.folders = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$favorites$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_FOLDERS"];
            this.emit();
            return;
        }
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__aL__as__collection$3e$__["collection"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDb"])(), COLLECTION), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["where"])("userId", "==", uid), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["orderBy"])("savedAt", "desc"));
        this.unsubEntries = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["onSnapshot"])(q, (snap)=>{
            this.entries = snap.docs.map((d)=>{
                const data = d.data();
                return {
                    propertyId: data.propertyId,
                    folder: data.folder ?? "Saved",
                    savedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$firestore$2d$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toIso"])(data.savedAt) ?? new Date().toISOString()
                };
            });
            this.emit();
        });
        this.unsubUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["onSnapshot"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__v__as__doc$3e$__["doc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDb"])(), "users", uid), (snap)=>{
            const stored = snap.data()?.favoriteFolders;
            this.folders = Array.isArray(stored) && stored.length ? stored : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$favorites$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_FOLDERS"];
            this.emit();
        });
    }
    emit() {
        this.listeners.forEach((l)=>l());
    }
    getAll() {
        return this.entries;
    }
    getFolders() {
        return this.folders;
    }
    isSaved(propertyId) {
        return this.entries.some((e)=>e.propertyId === propertyId);
    }
    subscribe(listener) {
        this.listeners.push(listener);
        return ()=>{
            this.listeners = this.listeners.filter((l)=>l !== listener);
        };
    }
    toggle(propertyId, folder = "Saved") {
        const uid = this.boundUid;
        if (!uid) return;
        const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__v__as__doc$3e$__["doc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDb"])(), COLLECTION, favDocId(uid, propertyId));
        if (this.isSaved(propertyId)) {
            void (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["deleteDoc"])(ref);
        } else {
            void (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["setDoc"])(ref, {
                userId: uid,
                propertyId,
                folder,
                savedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__b0__as__serverTimestamp$3e$__["serverTimestamp"])()
            });
        }
    }
    remove(propertyId) {
        const uid = this.boundUid;
        if (!uid) return;
        void (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["deleteDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__v__as__doc$3e$__["doc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDb"])(), COLLECTION, favDocId(uid, propertyId)));
    }
    moveToFolder(propertyId, folder) {
        const uid = this.boundUid;
        if (!uid) return;
        void (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["updateDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__v__as__doc$3e$__["doc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDb"])(), COLLECTION, favDocId(uid, propertyId)), {
            folder
        });
    }
    addFolder(name) {
        const uid = this.boundUid;
        if (!uid || !name.trim()) return;
        // setDoc(..., {merge: true}) rather than updateDoc(): auth.service.ts no longer creates a
        // users/{uid} document (Firebase Auth is the only Firebase product login touches — see
        // auth.service.ts), so this doc may not exist yet. updateDoc() throws "No document to
        // update" in that case; a merge-write creates it on first use instead.
        void (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["setDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__v__as__doc$3e$__["doc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDb"])(), "users", uid), {
            favoriteFolders: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__aJ__as__arrayUnion$3e$__["arrayUnion"])(name.trim())
        }, {
            merge: true
        });
    }
}
const favoritesService = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFirestoreEnabled"])() ? new FirebaseFavoritesService() : new MockFavoritesService();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/services/saved-searches.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "savedSearchesService",
    ()=>savedSearchesService
]);
// Saved searches (spec §19). Mock mode persists to localStorage per signed-in user. Firebase
// mode is a live `saved_searches` query scoped to the signed-in uid. The "notify" flag is where
// a Cloud Function (onPropertyWrite -> match saved searches -> NEW_MATCH notification) attaches
// without this service's shape changing — see functions/src/index.ts.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__aL__as__collection$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/common-CE5hrKY-.esm.js [app-client] (ecmascript) <export aL as collection>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__v__as__doc$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/common-CE5hrKY-.esm.js [app-client] (ecmascript) <export v as doc>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__b0__as__serverTimestamp$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/common-CE5hrKY-.esm.js [app-client] (ecmascript) <export b0 as serverTimestamp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/auth.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$firestore$2d$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase/firestore-helpers.ts [app-client] (ecmascript)");
;
;
;
;
;
function isBrowser() {
    return ("TURBOPACK compile-time value", "object") !== "undefined";
}
class MockSavedSearchesService {
    entries = [];
    loadedForUserId = undefined;
    listeners = [];
    nextId = 1;
    storageKey(userId) {
        return `rentlet_saved_searches_${userId}`;
    }
    ensureLoaded() {
        const uid = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].getCurrentUser()?.id ?? null;
        if (uid === this.loadedForUserId) return;
        this.loadedForUserId = uid;
        if (!uid || !isBrowser()) {
            this.entries = [];
            return;
        }
        try {
            this.entries = JSON.parse(window.localStorage.getItem(this.storageKey(uid)) ?? "[]");
        } catch  {
            this.entries = [];
        }
    }
    persist() {
        const uid = this.loadedForUserId;
        if (!uid || !isBrowser()) return;
        window.localStorage.setItem(this.storageKey(uid), JSON.stringify(this.entries));
    }
    emit() {
        this.listeners.forEach((l)=>l());
    }
    getAll() {
        this.ensureLoaded();
        return this.entries;
    }
    subscribe(listener) {
        this.listeners.push(listener);
        return ()=>{
            this.listeners = this.listeners.filter((l)=>l !== listener);
        };
    }
    save(label, filters) {
        this.ensureLoaded();
        const entry = {
            id: `ss${this.nextId++}`,
            label,
            filters,
            notify: true,
            createdAt: new Date().toISOString()
        };
        this.entries = [
            entry,
            ...this.entries
        ];
        this.persist();
        this.emit();
        return entry;
    }
    rename(id, label) {
        this.ensureLoaded();
        this.entries = this.entries.map((e)=>e.id === id ? {
                ...e,
                label
            } : e);
        this.persist();
        this.emit();
    }
    toggleNotify(id) {
        this.ensureLoaded();
        this.entries = this.entries.map((e)=>e.id === id ? {
                ...e,
                notify: !e.notify
            } : e);
        this.persist();
        this.emit();
    }
    remove(id) {
        this.ensureLoaded();
        this.entries = this.entries.filter((e)=>e.id !== id);
        this.persist();
        this.emit();
    }
}
// ---------------------------------------------------------------------------------------------
const COLLECTION = "saved_searches";
class FirebaseSavedSearchesService {
    entries = [];
    listeners = [];
    boundUid = undefined;
    unsub = null;
    constructor(){
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].subscribe((user)=>this.bindToUser(user?.id ?? null));
        this.bindToUser(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].getCurrentUser()?.id ?? null);
    }
    bindToUser(uid) {
        if (uid === this.boundUid) return;
        this.boundUid = uid;
        this.unsub?.();
        this.unsub = null;
        if (!uid) {
            this.entries = [];
            this.emit();
            return;
        }
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__aL__as__collection$3e$__["collection"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDb"])(), COLLECTION), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["where"])("userId", "==", uid), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["orderBy"])("createdAt", "desc"));
        this.unsub = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["onSnapshot"])(q, (snap)=>{
            this.entries = snap.docs.map((d)=>{
                const data = d.data();
                return {
                    id: d.id,
                    label: data.label,
                    filters: data.filters ?? {},
                    notify: data.notify ?? true,
                    createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$firestore$2d$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toIso"])(data.createdAt) ?? new Date().toISOString()
                };
            });
            this.emit();
        });
    }
    emit() {
        this.listeners.forEach((l)=>l());
    }
    getAll() {
        return this.entries;
    }
    subscribe(listener) {
        this.listeners.push(listener);
        return ()=>{
            this.listeners = this.listeners.filter((l)=>l !== listener);
        };
    }
    save(label, filters) {
        const uid = this.boundUid;
        const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__v__as__doc$3e$__["doc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__aL__as__collection$3e$__["collection"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDb"])(), COLLECTION));
        const optimistic = {
            id: ref.id,
            label,
            filters,
            notify: true,
            createdAt: new Date().toISOString()
        };
        if (uid) void (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["setDoc"])(ref, {
            userId: uid,
            label,
            filters,
            notify: true,
            createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__b0__as__serverTimestamp$3e$__["serverTimestamp"])()
        });
        return optimistic;
    }
    rename(id, label) {
        void (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["updateDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__v__as__doc$3e$__["doc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDb"])(), COLLECTION, id), {
            label
        });
    }
    toggleNotify(id) {
        const current = this.entries.find((e)=>e.id === id);
        if (current) void (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["updateDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__v__as__doc$3e$__["doc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDb"])(), COLLECTION, id), {
            notify: !current.notify
        });
    }
    remove(id) {
        void (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["deleteDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__v__as__doc$3e$__["doc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDb"])(), COLLECTION, id));
    }
}
const savedSearchesService = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFirestoreEnabled"])() ? new FirebaseSavedSearchesService() : new MockSavedSearchesService();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/services/search.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// SearchProvider interface — see docs/00-architecture.md §3 and §36 (search architecture).
// Mock implementation filters/sorts the in-memory catalogue; a later phase swaps this for
// Algolia/Elasticsearch/OpenSearch behind the same interface, with zero change to
// FilterPanel/PropertiesView, which only ever call `searchProvider.search(filters)`.
__turbopack_context__.s([
    "getLocalities",
    ()=>getLocalities,
    "localityPoint",
    ()=>localityPoint,
    "searchProvider",
    ()=>searchProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$seed$2d$properties$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/seed-properties.ts [app-client] (ecmascript)");
;
function priceOf(p) {
    return p.listingType === "rent" ? p.rent ?? 0 : p.price ?? 0;
}
const localityIndex = (()=>{
    const acc = new Map();
    for (const p of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$seed$2d$properties$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allProperties"]){
        if (p.latitude == null || p.longitude == null || !p.locality) continue;
        const key = `${p.city.toLowerCase()}||${p.locality.toLowerCase()}`;
        const cur = acc.get(key) ?? {
            lat: 0,
            lng: 0,
            n: 0,
            city: p.city,
            locality: p.locality
        };
        cur.lat += p.latitude;
        cur.lng += p.longitude;
        cur.n += 1;
        acc.set(key, cur);
    }
    const out = new Map();
    for (const [key, v] of acc)out.set(key, {
        lat: v.lat / v.n,
        lng: v.lng / v.n,
        city: v.city,
        locality: v.locality
    });
    return out;
})();
function getLocalities(city) {
    const seen = new Set();
    const res = [];
    for (const v of localityIndex.values()){
        if (city && v.city.toLowerCase() !== city.toLowerCase()) continue;
        if (!seen.has(v.locality)) {
            seen.add(v.locality);
            res.push(v.locality);
        }
    }
    return res.sort((a, b)=>a.localeCompare(b));
}
function localityPoint(locality, city) {
    if (!locality) return null;
    if (city) {
        const hit = localityIndex.get(`${city.toLowerCase()}||${locality.toLowerCase()}`);
        if (hit) return {
            lat: hit.lat,
            lng: hit.lng
        };
    }
    for (const v of localityIndex.values()){
        if (v.locality.toLowerCase() === locality.toLowerCase()) return {
            lat: v.lat,
            lng: v.lng
        };
    }
    return null;
}
function haversineKm(aLat, aLng, bLat, bLng) {
    const R = 6371;
    const dLat = (bLat - aLat) * Math.PI / 180;
    const dLng = (bLng - aLng) * Math.PI / 180;
    const s = Math.sin(dLat / 2) ** 2 + Math.cos(aLat * Math.PI / 180) * Math.cos(bLat * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(s));
}
class MockSearchProvider {
    async search(filters) {
        let items = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$seed$2d$properties$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allProperties"].filter((p)=>p.status === "active");
        if (filters.city) items = items.filter((p)=>p.city.toLowerCase() === filters.city.toLowerCase());
        if (filters.listingType) items = items.filter((p)=>p.listingType === filters.listingType);
        if (filters.propertyTypes?.length) items = items.filter((p)=>filters.propertyTypes.includes(p.propertyType));
        if (filters.minPrice != null) items = items.filter((p)=>priceOf(p) >= filters.minPrice);
        if (filters.maxPrice != null) items = items.filter((p)=>priceOf(p) <= filters.maxPrice);
        if (filters.minArea != null) items = items.filter((p)=>(p.builtUpArea ?? 0) >= filters.minArea);
        if (filters.maxArea != null) items = items.filter((p)=>(p.builtUpArea ?? 0) <= filters.maxArea);
        if (filters.gender === "male" || filters.gender === "female") {
            items = items.filter((p)=>p.genderPreference === filters.gender || p.genderPreference === "any");
        }
        if (filters.bedrooms?.length) {
            items = items.filter((p)=>{
                if (p.bedrooms == null) return false;
                return filters.bedrooms.some((b)=>b >= 5 ? p.bedrooms >= 5 : p.bedrooms === b);
            });
        }
        if (filters.furnishing?.length) items = items.filter((p)=>p.furnishing && filters.furnishing.includes(p.furnishing));
        if (filters.amenities?.length) items = items.filter((p)=>filters.amenities.every((a)=>p.amenities.includes(a)));
        if (filters.postedBy?.length) items = items.filter((p)=>filters.postedBy.includes(p.postedBy));
        if (filters.verifiedOnly) items = items.filter((p)=>p.verificationStatus === "approved");
        if (filters.noBrokerage) items = items.filter((p)=>p.noBrokerage);
        if (filters.petFriendly) items = items.filter((p)=>p.amenities.includes("pet_friendly"));
        if (filters.featuredOnly) items = items.filter((p)=>p.featured);
        // Reference point for "nearest" ordering: explicit coords (browser geolocation) win,
        // otherwise the centroid of the chosen "near" locality. If neither resolves, "nearest"
        // gracefully degrades to relevance.
        const refPoint = filters.nearLat != null && filters.nearLng != null ? {
            lat: filters.nearLat,
            lng: filters.nearLng
        } : filters.near ? localityPoint(filters.near, filters.city) : null;
        // A "near" reference with no explicit sort choice auto-selects "nearest" (the requested
        // automatic behaviour); an explicit price/newest choice is always respected.
        const sort = filters.sort ?? (refPoint ? "nearest" : "relevance");
        const relevance = (a, b)=>Number(b.featured) - Number(a.featured) || b.views - a.views;
        items = [
            ...items
        ].sort((a, b)=>{
            switch(sort){
                case "newest":
                    return b.createdAt.localeCompare(a.createdAt);
                case "price_asc":
                    return priceOf(a) - priceOf(b);
                case "price_desc":
                    return priceOf(b) - priceOf(a);
                case "nearest":
                    if (!refPoint) return relevance(a, b);
                    return haversineKm(refPoint.lat, refPoint.lng, a.latitude, a.longitude) - haversineKm(refPoint.lat, refPoint.lng, b.latitude, b.longitude) || relevance(a, b);
                default:
                    return relevance(a, b);
            }
        });
        return {
            items,
            total: items.length
        };
    }
}
const searchProvider = new MockSearchProvider();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/types/favorites.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Mirrors docs/01-database-schema.md `favorites` collection (spec §18 — folders supported).
__turbopack_context__.s([
    "DEFAULT_FOLDERS",
    ()=>DEFAULT_FOLDERS
]);
const DEFAULT_FOLDERS = [
    "Saved",
    "My Homes",
    "Investment",
    "Shortlist"
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_1p07tv1._.js.map