(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/property/ActionBar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ActionBar",
    ()=>ActionBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.mjs [app-client] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-circle.mjs [app-client] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$messages$2d$square$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessagesSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/messages-square.mjs [app-client] (ecmascript) <export default as MessagesSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarClock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar-clock.mjs [app-client] (ecmascript) <export default as CalendarClock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/heart.mjs [app-client] (ecmascript) <export default as Heart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/share-2.mjs [app-client] (ecmascript) <export default as Share2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$round$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserRound$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-round.mjs [app-client] (ecmascript) <export default as UserRound>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.mjs [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.mjs [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$property$2f$ScheduleVisitModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/property/ScheduleVisitModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$property$2f$AgreementModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/property/AgreementModal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/toast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$chat$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/chat.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$notifications$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/notifications.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$leads$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/leads.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$favorites$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/favorites.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$favorite$2d$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/favorite-actions.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-client] (ecmascript)");
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
;
;
;
;
const GENDER_LABEL = {
    male: "For Men",
    female: "For Women",
    any: "For Anyone"
};
// Options shown when the gender pill is clicked.
const GENDER_OPTIONS = [
    {
        value: "female",
        label: "For Women"
    },
    {
        value: "male",
        label: "For Men"
    },
    {
        value: "any",
        label: "Both / Anyone"
    }
];
// Contact flow: every Call/WhatsApp/Chat tap creates a CRM lead (spec §76). It's written
// to `leads`, auto-assigned to a RENTLET relationship manager, and surfaced on the admin
// pipeline; the owner sees a read-only status on /owner/leads.
function trackLead(property, user, source) {
    if (!user) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])("Login to register your interest", "info");
        return false;
    }
    const messages = {
        call: "A RENTLET manager will call you about this property shortly.",
        whatsapp: "Opening WhatsApp — a RENTLET manager will follow up on this listing.",
        chat: "A RENTLET manager is now handling your enquiry."
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])(messages[source]);
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$leads$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["leadsService"].create({
        propertyId: property.id,
        propertyTitle: property.title,
        ownerId: property.ownerId,
        userName: user.name,
        userPhone: user.phone ?? "Not shared",
        source
    });
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$notifications$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notificationsService"].push("NEW_LEAD", `New ${source} enquiry for "${property.title}" — assigned to a manager.`, "/admin/pipeline");
    if (source === "whatsapp") {
        window.open(`https://wa.me/?text=${encodeURIComponent(`Hi, I'm interested in "${property.title}" on Rentlet.`)}`, "_blank");
    }
    return true;
}
function ActionBar({ property }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const saved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$favorites$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsFavorited"])(property.id);
    const [visitOpen, setVisitOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [agreementOpen, setAgreementOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [genderOpen, setGenderOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [genderChoice, setGenderChoice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(property.genderPreference ?? "any");
    const genderRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ActionBar.useEffect": ()=>{
            if (!genderOpen) return;
            function onDown(e) {
                if (genderRef.current && !genderRef.current.contains(e.target)) setGenderOpen(false);
            }
            document.addEventListener("mousedown", onDown);
            return ({
                "ActionBar.useEffect": ()=>document.removeEventListener("mousedown", onDown)
            })["ActionBar.useEffect"];
        }
    }["ActionBar.useEffect"], [
        genderOpen
    ]);
    function openChat() {
        if (!trackLead(property, user, "chat")) return;
        const roomId = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$chat$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chatService"].getOrCreateRoomForProperty({
            propertyId: property.id,
            propertyTitle: property.title,
            ownerName: property.ownerName,
            ownerRole: property.postedBy
        });
        router.push(`/messages?room=${roomId}`);
    }
    function toggleSave() {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$favorite$2d$actions$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toggleFavorite"])(property.id);
    }
    async function share() {
        const url = ("TURBOPACK compile-time truthy", 1) ? window.location.href : "TURBOPACK unreachable";
        if (typeof navigator !== "undefined" && navigator.share) {
            try {
                await navigator.share({
                    title: property.title,
                    url
                });
                return;
            } catch  {
            // user cancelled — fall through to clipboard
            }
        }
        try {
            await navigator.clipboard.writeText(url);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])("Link copied to clipboard");
        } catch  {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])("Couldn't copy link", "error");
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hidden flex-wrap items-center gap-2 sm:flex",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>trackLead(property, user, "call"),
                        className: "inline-flex items-center gap-2 rounded-xl bg-brand-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-navy-dark",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/property/ActionBar.tsx",
                                lineNumber: 125,
                                columnNumber: 11
                            }, this),
                            " Call"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/property/ActionBar.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>trackLead(property, user, "whatsapp"),
                        className: "inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/property/ActionBar.tsx",
                                lineNumber: 132,
                                columnNumber: 11
                            }, this),
                            " WhatsApp"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/property/ActionBar.tsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: openChat,
                        className: "inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-muted",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$messages$2d$square$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessagesSquare$3e$__["MessagesSquare"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/property/ActionBar.tsx",
                                lineNumber: 139,
                                columnNumber: 11
                            }, this),
                            " Chat"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/property/ActionBar.tsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setVisitOpen(true),
                        className: "inline-flex items-center gap-2 rounded-xl bg-brand-orange px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-orange-dark",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarClock$3e$__["CalendarClock"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/property/ActionBar.tsx",
                                lineNumber: 146,
                                columnNumber: 11
                            }, this),
                            " Schedule Visit"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/property/ActionBar.tsx",
                        lineNumber: 141,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "aria-pressed": saved,
                        onClick: toggleSave,
                        className: "inline-flex items-center gap-2 rounded-xl border border-border px-3.5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-4 w-4", saved && "fill-brand-orange text-brand-orange")
                            }, void 0, false, {
                                fileName: "[project]/src/components/property/ActionBar.tsx",
                                lineNumber: 154,
                                columnNumber: 11
                            }, this),
                            " Save"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/property/ActionBar.tsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: share,
                        className: "inline-flex items-center gap-2 rounded-xl border border-border px-3.5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__["Share2"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/property/ActionBar.tsx",
                                lineNumber: 161,
                                columnNumber: 11
                            }, this),
                            " Share"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/property/ActionBar.tsx",
                        lineNumber: 156,
                        columnNumber: 9
                    }, this),
                    property.listingType === "rent" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setAgreementOpen(true),
                        className: "inline-flex items-center gap-2 rounded-xl border border-border px-3.5 py-2.5 text-sm font-semibold text-foreground hover:bg-muted",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/property/ActionBar.tsx",
                                lineNumber: 169,
                                columnNumber: 13
                            }, this),
                            " Agreement"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/property/ActionBar.tsx",
                        lineNumber: 164,
                        columnNumber: 11
                    }, this),
                    property.genderPreference && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: genderRef,
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setGenderOpen((v)=>!v),
                                "aria-haspopup": "true",
                                "aria-expanded": genderOpen,
                                className: "inline-flex items-center gap-2 rounded-xl border border-brand-orange/30 bg-brand-orange-light px-3.5 py-2.5 text-sm font-semibold text-brand-orange-dark hover:bg-brand-orange-light/70",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$round$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserRound$3e$__["UserRound"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/property/ActionBar.tsx",
                                        lineNumber: 182,
                                        columnNumber: 15
                                    }, this),
                                    GENDER_LABEL[genderChoice] ?? "For Anyone",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-3.5 w-3.5 transition-transform", genderOpen && "rotate-180")
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/property/ActionBar.tsx",
                                        lineNumber: 184,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/property/ActionBar.tsx",
                                lineNumber: 175,
                                columnNumber: 13
                            }, this),
                            genderOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute left-0 top-full z-30 mt-2 w-44 overflow-hidden rounded-xl border border-border bg-white p-1.5 shadow-xl shadow-black/10",
                                children: GENDER_OPTIONS.map((o)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>{
                                            setGenderChoice(o.value);
                                            setGenderOpen(false);
                                        },
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("block w-full rounded-lg px-2.5 py-2 text-left text-sm font-medium hover:bg-muted", genderChoice === o.value ? "text-brand-navy" : "text-foreground/85"),
                                        children: o.label
                                    }, o.value, false, {
                                        fileName: "[project]/src/components/property/ActionBar.tsx",
                                        lineNumber: 190,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/property/ActionBar.tsx",
                                lineNumber: 188,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/property/ActionBar.tsx",
                        lineNumber: 174,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/property/ActionBar.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-x-0 bottom-0 z-40 flex items-center gap-2 border-t border-border bg-white/95 p-3 backdrop-blur sm:hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        "aria-label": "Save property",
                        "aria-pressed": saved,
                        onClick: toggleSave,
                        className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border text-foreground",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$heart$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Heart$3e$__["Heart"], {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-5 w-5", saved && "fill-brand-orange text-brand-orange")
                        }, void 0, false, {
                            fileName: "[project]/src/components/property/ActionBar.tsx",
                            lineNumber: 220,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/property/ActionBar.tsx",
                        lineNumber: 213,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>trackLead(property, user, "call"),
                        className: "flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-brand-navy py-3 text-sm font-semibold text-white",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/property/ActionBar.tsx",
                                lineNumber: 227,
                                columnNumber: 11
                            }, this),
                            " Call"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/property/ActionBar.tsx",
                        lineNumber: 222,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: openChat,
                        className: "flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border py-3 text-sm font-semibold text-foreground",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$messages$2d$square$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessagesSquare$3e$__["MessagesSquare"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/property/ActionBar.tsx",
                                lineNumber: 234,
                                columnNumber: 11
                            }, this),
                            " Chat"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/property/ActionBar.tsx",
                        lineNumber: 229,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setVisitOpen(true),
                        className: "flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-brand-orange py-3 text-sm font-semibold text-white",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$clock$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarClock$3e$__["CalendarClock"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/property/ActionBar.tsx",
                                lineNumber: 241,
                                columnNumber: 11
                            }, this),
                            " Visit"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/property/ActionBar.tsx",
                        lineNumber: 236,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/property/ActionBar.tsx",
                lineNumber: 212,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$property$2f$ScheduleVisitModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScheduleVisitModal"], {
                open: visitOpen,
                onClose: ()=>setVisitOpen(false),
                propertyId: property.id,
                propertyTitle: property.title,
                ownerId: property.ownerId
            }, void 0, false, {
                fileName: "[project]/src/components/property/ActionBar.tsx",
                lineNumber: 245,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$property$2f$AgreementModal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AgreementModal"], {
                open: agreementOpen,
                onClose: ()=>setAgreementOpen(false),
                property: property
            }, void 0, false, {
                fileName: "[project]/src/components/property/ActionBar.tsx",
                lineNumber: 246,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/property/ActionBar.tsx",
        lineNumber: 117,
        columnNumber: 5
    }, this);
}
_s(ActionBar, "r4WIE93EtkgPdUYJsELTmLRTnLk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$favorites$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsFavorited"]
    ];
});
_c = ActionBar;
var _c;
__turbopack_context__.k.register(_c, "ActionBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/property/AgreementModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AgreementModal",
    ()=>AgreementModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Modal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function AgreementModal({ open, onClose, property }) {
    const isSale = property.listingType === "sale";
    const amount = isSale ? property.price != null ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(property.price, true) : "Price on request" : property.rent != null ? `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(property.rent)} / month` : "Rent on request";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Modal"], {
        open: open,
        onClose: onClose,
        title: isSale ? "Sale Agreement — Terms" : "Rental Agreement — Terms",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-muted-foreground",
                children: property.title
            }, void 0, false, {
                fileName: "[project]/src/components/property/AgreementModal.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 space-y-4 text-sm text-foreground/90",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            "This is an indicative summary of the terms for ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: property.title
                            }, void 0, false, {
                                fileName: "[project]/src/components/property/AgreementModal.tsx",
                                lineNumber: 33,
                                columnNumber: 58
                            }, this),
                            property.locality ? `, ${property.locality}` : "",
                            ", ",
                            property.city,
                            ". It is not a binding contract — the final agreement is the one signed by the owner and the",
                            " ",
                            isSale ? "buyer" : "tenant",
                            "."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/property/AgreementModal.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-semibold text-foreground",
                                children: "1. Parties"
                            }, void 0, false, {
                                fileName: "[project]/src/components/property/AgreementModal.tsx",
                                lineNumber: 40,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1",
                                children: [
                                    "Owner: ",
                                    property.ownerName,
                                    ". ",
                                    isSale ? "Buyer" : "Tenant",
                                    ": the person entering into this agreement through Rentlet."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/property/AgreementModal.tsx",
                                lineNumber: 41,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/property/AgreementModal.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-semibold text-foreground",
                                children: [
                                    "2. ",
                                    isSale ? "Consideration" : "Rent & deposit"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/property/AgreementModal.tsx",
                                lineNumber: 48,
                                columnNumber: 11
                            }, this),
                            isSale ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1",
                                children: [
                                    "Agreed price: ",
                                    amount,
                                    ", payable as per the schedule mutually agreed in writing."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/property/AgreementModal.tsx",
                                lineNumber: 50,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1",
                                children: [
                                    "Monthly rent: ",
                                    amount,
                                    property.deposit != null ? `, security deposit: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(property.deposit)}` : "",
                                    property.maintenance != null ? `, maintenance: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(property.maintenance)} / month` : "",
                                    ". Rent is due on or before the 5th of each month."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/property/AgreementModal.tsx",
                                lineNumber: 54,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/property/AgreementModal.tsx",
                        lineNumber: 47,
                        columnNumber: 9
                    }, this),
                    !isSale && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-semibold text-foreground",
                                children: "3. Term & renewal"
                            }, void 0, false, {
                                fileName: "[project]/src/components/property/AgreementModal.tsx",
                                lineNumber: 67,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1",
                                children: "11 months from the date of possession, renewable by mutual consent. Either party may end the agreement with one month's written notice."
                            }, void 0, false, {
                                fileName: "[project]/src/components/property/AgreementModal.tsx",
                                lineNumber: 68,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/property/AgreementModal.tsx",
                        lineNumber: 66,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-semibold text-foreground",
                                children: [
                                    isSale ? "3" : "4",
                                    ". Condition & handover"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/property/AgreementModal.tsx",
                                lineNumber: 76,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1",
                                children: [
                                    "The property is handed over in its current condition. The ",
                                    isSale ? "buyer" : "tenant",
                                    " shall keep it in good repair and return it in the same state, normal wear and tear excepted."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/property/AgreementModal.tsx",
                                lineNumber: 77,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/property/AgreementModal.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-semibold text-foreground",
                                children: [
                                    isSale ? "4" : "5",
                                    ". Charges & taxes"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/property/AgreementModal.tsx",
                                lineNumber: 84,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1",
                                children: "Electricity, water and usage-based charges are borne by the occupant. Property tax and structural repairs remain the owner's responsibility."
                            }, void 0, false, {
                                fileName: "[project]/src/components/property/AgreementModal.tsx",
                                lineNumber: 85,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/property/AgreementModal.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "font-semibold text-foreground",
                                children: [
                                    isSale ? "5" : "6",
                                    ". Rentlet's role"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/property/AgreementModal.tsx",
                                lineNumber: 92,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1",
                                children: [
                                    "Rentlet is a listings marketplace and is not a party to this agreement. Verify every detail directly with the owner before signing. See our full",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "/terms",
                                        className: "font-semibold text-brand-navy underline",
                                        target: "_blank",
                                        rel: "noreferrer",
                                        children: "Terms & Conditions"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/property/AgreementModal.tsx",
                                        lineNumber: 96,
                                        columnNumber: 13
                                    }, this),
                                    "."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/property/AgreementModal.tsx",
                                lineNumber: 93,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/property/AgreementModal.tsx",
                        lineNumber: 91,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/property/AgreementModal.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                onClick: onClose,
                className: "mt-5 w-full rounded-xl bg-brand-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-navy-dark",
                children: "Close"
            }, void 0, false, {
                fileName: "[project]/src/components/property/AgreementModal.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/property/AgreementModal.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_c = AgreementModal;
var _c;
__turbopack_context__.k.register(_c, "AgreementModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/property/Gallery.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Gallery",
    ()=>Gallery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$expand$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Expand$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/expand.mjs [app-client] (ecmascript) <export default as Expand>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.mjs [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.mjs [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.mjs [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-grid.mjs [app-client] (ecmascript) <export default as LayoutGrid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image.mjs [app-client] (ecmascript) <export default as ImageIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$PropertyImage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/PropertyImage.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
// Real listings (Firebase mode, spec §51) carry `images`/`videos`/`floorPlanUrl` — genuine
// Storage URLs from lib/firebase/storage-upload.ts. Mock/seed listings have none (spec §64 —
// no fake external URLs), so this falls back to a fixed set of on-brand generated placeholders.
const PLACEHOLDER_PHOTO_COUNT = 6;
function PhotoSlide({ url, seed, propertyType, className }) {
    if (url) {
        // eslint-disable-next-line @next/next/no-img-element -- Firebase Storage URL, not a local asset next/image needs to optimize
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            src: url,
            alt: "",
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("object-cover", className)
        }, void 0, false, {
            fileName: "[project]/src/components/property/Gallery.tsx",
            lineNumber: 19,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$PropertyImage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PropertyImage"], {
        id: seed,
        propertyType: propertyType,
        className: className
    }, void 0, false, {
        fileName: "[project]/src/components/property/Gallery.tsx",
        lineNumber: 21,
        columnNumber: 10
    }, this);
}
_c = PhotoSlide;
function Gallery({ property }) {
    _s();
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("photos");
    const [active, setActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [lightbox, setLightbox] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const hasRealPhotos = property.images.length > 0;
    const photos = hasRealPhotos ? property.images : Array.from({
        length: PLACEHOLDER_PHOTO_COUNT
    }, ()=>undefined);
    const photoSeed = (i)=>`${property.id}-photo-${i}`;
    const videoUrl = property.videos?.[0];
    const floorPlanUrl = property.floorPlanUrl;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative overflow-hidden rounded-2xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative h-64 w-full sm:h-96 lg:h-[26rem]",
                        children: [
                            tab === "photos" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PhotoSlide, {
                                url: photos[active],
                                seed: photoSeed(active),
                                propertyType: property.propertyType,
                                className: "h-full w-full"
                            }, void 0, false, {
                                fileName: "[project]/src/components/property/Gallery.tsx",
                                lineNumber: 43,
                                columnNumber: 13
                            }, this),
                            tab === "floorplan" && (floorPlanUrl ? // eslint-disable-next-line @next/next/no-img-element -- Firebase Storage URL
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: floorPlanUrl,
                                alt: "Floor plan",
                                className: "h-full w-full object-contain bg-brand-navy-light"
                            }, void 0, false, {
                                fileName: "[project]/src/components/property/Gallery.tsx",
                                lineNumber: 48,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex h-full w-full flex-col items-center justify-center gap-2 bg-brand-navy-light text-brand-navy",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__["LayoutGrid"], {
                                        className: "h-12 w-12",
                                        strokeWidth: 1.25
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/property/Gallery.tsx",
                                        lineNumber: 51,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-semibold",
                                        children: "No floor plan uploaded"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/property/Gallery.tsx",
                                        lineNumber: 52,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/property/Gallery.tsx",
                                lineNumber: 50,
                                columnNumber: 15
                            }, this)),
                            tab === "video" && (videoUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                src: videoUrl,
                                controls: true,
                                className: "h-full w-full bg-black object-contain"
                            }, void 0, false, {
                                fileName: "[project]/src/components/property/Gallery.tsx",
                                lineNumber: 57,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative h-full w-full",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$PropertyImage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PropertyImage"], {
                                        id: `${property.id}-video`,
                                        propertyType: property.propertyType,
                                        className: "h-full w-full"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/property/Gallery.tsx",
                                        lineNumber: 60,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 flex items-center justify-center bg-black/20",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-brand-navy shadow-lg",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                                className: "h-6 w-6 translate-x-0.5",
                                                fill: "currentColor"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/property/Gallery.tsx",
                                                lineNumber: 63,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/property/Gallery.tsx",
                                            lineNumber: 62,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/property/Gallery.tsx",
                                        lineNumber: 61,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/property/Gallery.tsx",
                                lineNumber: 59,
                                columnNumber: 15
                            }, this)),
                            tab === "photos" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setLightbox(true),
                                "aria-label": "View fullscreen",
                                className: "absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg bg-black/50 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur hover:bg-black/70",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$expand$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Expand$3e$__["Expand"], {
                                        className: "h-3.5 w-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/property/Gallery.tsx",
                                        lineNumber: 76,
                                        columnNumber: 15
                                    }, this),
                                    " ",
                                    active + 1,
                                    "/",
                                    photos.length
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/property/Gallery.tsx",
                                lineNumber: 70,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/property/Gallery.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute left-3 top-3 flex gap-1 rounded-lg bg-black/40 p-1 backdrop-blur",
                        children: [
                            {
                                id: "photos",
                                label: "Photos",
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageIcon$3e$__["ImageIcon"]
                            },
                            {
                                id: "floorplan",
                                label: "Floor Plan",
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__["LayoutGrid"]
                            },
                            {
                                id: "video",
                                label: "Video",
                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"]
                            }
                        ].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setTab(t.id),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-semibold transition-colors", tab === t.id ? "bg-white text-brand-navy" : "text-white/80 hover:text-white"),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(t.icon, {
                                        className: "h-3.5 w-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/property/Gallery.tsx",
                                        lineNumber: 98,
                                        columnNumber: 15
                                    }, this),
                                    " ",
                                    t.label
                                ]
                            }, t.id, true, {
                                fileName: "[project]/src/components/property/Gallery.tsx",
                                lineNumber: 89,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/property/Gallery.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/property/Gallery.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            tab === "photos" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "no-scrollbar mt-2.5 flex gap-2 overflow-x-auto",
                children: photos.map((url, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>setActive(i),
                        "aria-label": `Photo ${i + 1}`,
                        "aria-current": active === i,
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-16 w-24 shrink-0 overflow-hidden rounded-lg ring-2 transition-all", active === i ? "ring-brand-orange" : "ring-transparent opacity-70 hover:opacity-100"),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PhotoSlide, {
                            url: url,
                            seed: photoSeed(i),
                            propertyType: property.propertyType,
                            className: "h-full w-full"
                        }, void 0, false, {
                            fileName: "[project]/src/components/property/Gallery.tsx",
                            lineNumber: 118,
                            columnNumber: 15
                        }, this)
                    }, url ?? photoSeed(i), false, {
                        fileName: "[project]/src/components/property/Gallery.tsx",
                        lineNumber: 107,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/property/Gallery.tsx",
                lineNumber: 105,
                columnNumber: 9
            }, this),
            lightbox && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-[100] flex flex-col bg-black/95",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between p-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-medium text-white/70",
                                children: [
                                    active + 1,
                                    " / ",
                                    photos.length
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/property/Gallery.tsx",
                                lineNumber: 127,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                "aria-label": "Close fullscreen",
                                onClick: ()=>setLightbox(false),
                                className: "rounded-full p-2 text-white hover:bg-white/10",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "h-5 w-5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/property/Gallery.tsx",
                                    lineNumber: 136,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/property/Gallery.tsx",
                                lineNumber: 130,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/property/Gallery.tsx",
                        lineNumber: 126,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex flex-1 items-center justify-center px-4 pb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                "aria-label": "Previous photo",
                                onClick: ()=>setActive((i)=>(i - 1 + photos.length) % photos.length),
                                className: "absolute left-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                    className: "h-5 w-5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/property/Gallery.tsx",
                                    lineNumber: 146,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/property/Gallery.tsx",
                                lineNumber: 140,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-full w-full max-w-3xl",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PhotoSlide, {
                                    url: photos[active],
                                    seed: photoSeed(active),
                                    propertyType: property.propertyType,
                                    className: "h-full w-full rounded-xl"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/property/Gallery.tsx",
                                    lineNumber: 149,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/property/Gallery.tsx",
                                lineNumber: 148,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                "aria-label": "Next photo",
                                onClick: ()=>setActive((i)=>(i + 1) % photos.length),
                                className: "absolute right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                    className: "h-5 w-5"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/property/Gallery.tsx",
                                    lineNumber: 157,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/property/Gallery.tsx",
                                lineNumber: 151,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/property/Gallery.tsx",
                        lineNumber: 139,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/property/Gallery.tsx",
                lineNumber: 125,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/property/Gallery.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
_s(Gallery, "TwrbmQQFCSdbewIE0/JVUMS376g=");
_c1 = Gallery;
var _c, _c1;
__turbopack_context__.k.register(_c, "PhotoSlide");
__turbopack_context__.k.register(_c1, "Gallery");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/property/OwnerCard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OwnerCard",
    ()=>OwnerCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$badge$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BadgeCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/badge-check.mjs [app-client] (ecmascript) <export default as BadgeCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2d$3$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock-3.mjs [app-client] (ecmascript) <export default as Clock3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square.mjs [app-client] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/building-2.mjs [app-client] (ecmascript) <export default as Building2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$chat$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/chat.service.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
// Owner aggregate stats (response rate/time, listing count, member-since) live on the `users`
// doc in production (docs/01-database-schema.md). Deterministic mock values here stand in until
// Phase 12 wires the real query.
function ownerStats(ownerId) {
    let h = 0;
    for(let i = 0; i < ownerId.length; i++)h = h * 31 + ownerId.charCodeAt(i) >>> 0;
    return {
        listings: 3 + h % 12,
        responseRate: 80 + h % 20,
        responseTimeHrs: 1 + h % 6,
        memberSinceYear: 2021 + h % 4
    };
}
function OwnerCard({ property }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const stats = ownerStats(property.ownerId);
    const initials = property.ownerName.split(" ").map((n)=>n[0]).join("").slice(0, 2);
    function contact() {
        const roomId = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$chat$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["chatService"].getOrCreateRoomForProperty({
            propertyId: property.id,
            propertyTitle: property.title,
            ownerName: property.ownerName,
            ownerRole: property.postedBy
        });
        router.push(`/messages?room=${roomId}`);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "rounded-2xl border border-border bg-white p-5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex h-12 w-12 items-center justify-center rounded-full bg-brand-navy-light text-base font-bold text-brand-navy",
                        children: initials
                    }, void 0, false, {
                        fileName: "[project]/src/components/property/OwnerCard.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "flex items-center gap-1 text-sm font-bold text-foreground",
                                children: [
                                    property.ownerName,
                                    property.ownerVerified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$badge$2d$check$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BadgeCheck$3e$__["BadgeCheck"], {
                                        className: "h-4 w-4 shrink-0 text-emerald-600"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/property/OwnerCard.tsx",
                                        lineNumber: 51,
                                        columnNumber: 40
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/property/OwnerCard.tsx",
                                lineNumber: 49,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs capitalize text-muted-foreground",
                                children: property.postedBy
                            }, void 0, false, {
                                fileName: "[project]/src/components/property/OwnerCard.tsx",
                                lineNumber: 53,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/property/OwnerCard.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/property/OwnerCard.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                className: "mt-4 grid grid-cols-3 gap-2 border-y border-border py-3 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                className: "text-[10px] font-medium uppercase tracking-wide text-muted-foreground",
                                children: "Listings"
                            }, void 0, false, {
                                fileName: "[project]/src/components/property/OwnerCard.tsx",
                                lineNumber: 59,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                className: "mt-0.5 text-sm font-bold text-foreground",
                                children: stats.listings
                            }, void 0, false, {
                                fileName: "[project]/src/components/property/OwnerCard.tsx",
                                lineNumber: 60,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/property/OwnerCard.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                className: "text-[10px] font-medium uppercase tracking-wide text-muted-foreground",
                                children: "Response"
                            }, void 0, false, {
                                fileName: "[project]/src/components/property/OwnerCard.tsx",
                                lineNumber: 63,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                className: "mt-0.5 text-sm font-bold text-foreground",
                                children: [
                                    stats.responseRate,
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/property/OwnerCard.tsx",
                                lineNumber: 64,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/property/OwnerCard.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                className: "text-[10px] font-medium uppercase tracking-wide text-muted-foreground",
                                children: "Since"
                            }, void 0, false, {
                                fileName: "[project]/src/components/property/OwnerCard.tsx",
                                lineNumber: 67,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                className: "mt-0.5 text-sm font-bold text-foreground",
                                children: stats.memberSinceYear
                            }, void 0, false, {
                                fileName: "[project]/src/components/property/OwnerCard.tsx",
                                lineNumber: 68,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/property/OwnerCard.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/property/OwnerCard.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-3 flex items-center gap-1.5 text-xs text-muted-foreground",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2d$3$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock3$3e$__["Clock3"], {
                        className: "h-3.5 w-3.5"
                    }, void 0, false, {
                        fileName: "[project]/src/components/property/OwnerCard.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    " Typically responds within ",
                    stats.responseTimeHrs,
                    "h"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/property/OwnerCard.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 flex gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: contact,
                        className: "inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand-navy py-2.5 text-xs font-semibold text-white hover:bg-brand-navy-dark",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                className: "h-3.5 w-3.5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/property/OwnerCard.tsx",
                                lineNumber: 82,
                                columnNumber: 11
                            }, this),
                            " Contact"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/property/OwnerCard.tsx",
                        lineNumber: 77,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: `/properties?owner=${property.ownerId}`,
                        className: "inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border py-2.5 text-xs font-semibold text-foreground hover:bg-muted",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"], {
                                className: "h-3.5 w-3.5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/property/OwnerCard.tsx",
                                lineNumber: 88,
                                columnNumber: 11
                            }, this),
                            " All Properties"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/property/OwnerCard.tsx",
                        lineNumber: 84,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/property/OwnerCard.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/property/OwnerCard.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
_s(OwnerCard, "fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = OwnerCard;
var _c;
__turbopack_context__.k.register(_c, "OwnerCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
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
"[project]/src/components/property/RecordView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RecordView",
    ()=>RecordView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$recently$2d$viewed$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/recently-viewed.service.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function RecordView({ propertyId }) {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RecordView.useEffect": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$recently$2d$viewed$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["recentlyViewedService"].record(propertyId);
        }
    }["RecordView.useEffect"], [
        propertyId
    ]);
    return null;
}
_s(RecordView, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = RecordView;
var _c;
__turbopack_context__.k.register(_c, "RecordView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/property/ScheduleVisitModal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScheduleVisitModal",
    ()=>ScheduleVisitModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minus.mjs [app-client] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.mjs [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Modal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/Button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/toast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$notifications$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/notifications.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$visits$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/visits.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-client] (ecmascript)");
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
const SLOTS = [
    "10:00 AM",
    "11:30 AM",
    "2:00 PM",
    "4:30 PM",
    "6:00 PM"
];
function nextDays(count) {
    return Array.from({
        length: count
    }, (_, i)=>{
        const d = new Date();
        d.setDate(d.getDate() + i);
        return d;
    });
}
function ScheduleVisitModal({ open, onClose, propertyId, propertyTitle, ownerId, onSubmit }) {
    _s();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const days = nextDays(7);
    const [dayIndex, setDayIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [slot, setSlot] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(SLOTS[0]);
    const [visitors, setVisitors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [phone, setPhone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const phoneInvalid = phone.length > 0 && phone.length !== 10;
    function submit() {
        if (!user) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])("Login to schedule a visit", "info");
            return;
        }
        if (phone.length !== 10) {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])("Contact number must be exactly 10 digits.", "error");
            return;
        }
        setSubmitting(true);
        const dateLabel = days[dayIndex].toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short"
        });
        const contactLine = `Contact: +91 ${phone}`;
        const fullMessage = message.trim() ? `${contactLine} — ${message.trim()}` : contactLine;
        setTimeout(()=>{
            setSubmitting(false);
            onClose();
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$visits$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["visitsService"].create({
                propertyId,
                propertyTitle,
                ownerId,
                requesterId: user.id,
                requesterName: user.name,
                date: dateLabel,
                slot,
                visitorCount: visitors,
                message: fullMessage
            });
            onSubmit?.({
                date: dateLabel,
                slot,
                visitors,
                message: fullMessage
            });
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$notifications$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notificationsService"].push("VISIT_REQUEST", `Visit requested for ${propertyTitle} — ${dateLabel}, ${slot}.`, "/owner/visits");
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"])(`Visit request sent for ${dateLabel}, ${slot}. The owner has been notified.`);
        }, 500);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Modal"], {
        open: open,
        onClose: onClose,
        title: "Schedule a Visit",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-muted-foreground",
                children: propertyTitle
            }, void 0, false, {
                fileName: "[project]/src/components/property/ScheduleVisitModal.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
                        children: "Select Date"
                    }, void 0, false, {
                        fileName: "[project]/src/components/property/ScheduleVisitModal.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "no-scrollbar mt-2 flex gap-2 overflow-x-auto pb-1",
                        children: days.map((d, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setDayIndex(i),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex shrink-0 flex-col items-center rounded-xl border px-3.5 py-2 text-center", dayIndex === i ? "border-brand-orange bg-brand-orange-light text-brand-orange-dark" : "border-border text-foreground hover:bg-muted"),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] font-semibold uppercase",
                                        children: d.toLocaleDateString("en-IN", {
                                            weekday: "short"
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/property/ScheduleVisitModal.tsx",
                                        lineNumber: 100,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-bold",
                                        children: d.getDate()
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/property/ScheduleVisitModal.tsx",
                                        lineNumber: 101,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, d.toISOString(), true, {
                                fileName: "[project]/src/components/property/ScheduleVisitModal.tsx",
                                lineNumber: 91,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/property/ScheduleVisitModal.tsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/property/ScheduleVisitModal.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
                        children: "Select Time"
                    }, void 0, false, {
                        fileName: "[project]/src/components/property/ScheduleVisitModal.tsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 flex flex-wrap gap-2",
                        children: SLOTS.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setSlot(s),
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-lg border px-3 py-1.5 text-sm font-medium", slot === s ? "border-brand-navy bg-brand-navy text-white" : "border-border text-foreground hover:bg-muted"),
                                children: s
                            }, s, false, {
                                fileName: "[project]/src/components/property/ScheduleVisitModal.tsx",
                                lineNumber: 111,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/property/ScheduleVisitModal.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/property/ScheduleVisitModal.tsx",
                lineNumber: 107,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
                        children: "Number of Visitors"
                    }, void 0, false, {
                        fileName: "[project]/src/components/property/ScheduleVisitModal.tsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 inline-flex items-center gap-3 rounded-lg border border-border px-3 py-1.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                "aria-label": "Decrease visitors",
                                onClick: ()=>setVisitors((v)=>Math.max(1, v - 1)),
                                className: "text-muted-foreground hover:text-foreground",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/property/ScheduleVisitModal.tsx",
                                    lineNumber: 135,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/property/ScheduleVisitModal.tsx",
                                lineNumber: 129,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-4 text-center text-sm font-semibold",
                                children: visitors
                            }, void 0, false, {
                                fileName: "[project]/src/components/property/ScheduleVisitModal.tsx",
                                lineNumber: 137,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                "aria-label": "Increase visitors",
                                onClick: ()=>setVisitors((v)=>Math.min(6, v + 1)),
                                className: "text-muted-foreground hover:text-foreground",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/property/ScheduleVisitModal.tsx",
                                    lineNumber: 144,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/property/ScheduleVisitModal.tsx",
                                lineNumber: 138,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/property/ScheduleVisitModal.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/property/ScheduleVisitModal.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "visit-phone",
                        className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
                        children: "Contact Number"
                    }, void 0, false, {
                        fileName: "[project]/src/components/property/ScheduleVisitModal.tsx",
                        lineNumber: 150,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 flex items-stretch",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-flex items-center rounded-l-lg border border-r-0 border-border bg-muted px-3 text-sm font-semibold text-muted-foreground",
                                children: "+91"
                            }, void 0, false, {
                                fileName: "[project]/src/components/property/ScheduleVisitModal.tsx",
                                lineNumber: 154,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                id: "visit-phone",
                                type: "tel",
                                inputMode: "numeric",
                                maxLength: 10,
                                value: phone,
                                onChange: (e)=>setPhone(e.target.value.replace(/\D/g, "").slice(0, 10)),
                                placeholder: "10-digit mobile",
                                "aria-invalid": phoneInvalid,
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full rounded-r-lg border border-border px-3 py-2 text-sm outline-none focus:border-brand-navy", phoneInvalid && "border-red-400 focus:border-red-500")
                            }, void 0, false, {
                                fileName: "[project]/src/components/property/ScheduleVisitModal.tsx",
                                lineNumber: 157,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/property/ScheduleVisitModal.tsx",
                        lineNumber: 153,
                        columnNumber: 9
                    }, this),
                    phoneInvalid && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 text-xs font-medium text-red-600",
                        children: [
                            "Enter exactly 10 digits (",
                            phone.length,
                            "/10)."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/property/ScheduleVisitModal.tsx",
                        lineNumber: 173,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/property/ScheduleVisitModal.tsx",
                lineNumber: 149,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "visit-message",
                        className: "text-xs font-semibold uppercase tracking-wide text-muted-foreground",
                        children: "Message (optional)"
                    }, void 0, false, {
                        fileName: "[project]/src/components/property/ScheduleVisitModal.tsx",
                        lineNumber: 178,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        id: "visit-message",
                        rows: 2,
                        value: message,
                        onChange: (e)=>setMessage(e.target.value),
                        placeholder: "Anything the owner should know before your visit?",
                        className: "mt-2 w-full resize-none rounded-lg border border-border px-3 py-2 text-sm outline-none focus:border-brand-navy"
                    }, void 0, false, {
                        fileName: "[project]/src/components/property/ScheduleVisitModal.tsx",
                        lineNumber: 181,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/property/ScheduleVisitModal.tsx",
                lineNumber: 177,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$Button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                className: "mt-5 w-full",
                size: "lg",
                onClick: submit,
                disabled: submitting || phone.length !== 10,
                children: submitting ? "Sending..." : "Submit Visit Request"
            }, void 0, false, {
                fileName: "[project]/src/components/property/ScheduleVisitModal.tsx",
                lineNumber: 191,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/property/ScheduleVisitModal.tsx",
        lineNumber: 84,
        columnNumber: 5
    }, this);
}
_s(ScheduleVisitModal, "KwObEoByW22XgOFUIvxJjTgER5M=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = ScheduleVisitModal;
var _c;
__turbopack_context__.k.register(_c, "ScheduleVisitModal");
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
"[project]/src/lib/data/staff.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// RENTLET's in-house relationship managers — the staff who work leads through the
// CRM pipeline (assignment → follow-up → site visit → negotiation → documentation →
// deal closed). Mock roster until a real `staff` user role + directory exists.
__turbopack_context__.s([
    "RENTLET_STAFF",
    ()=>RENTLET_STAFF
]);
const RENTLET_STAFF = [
    "Neha Rao",
    "Arjun Mehta",
    "Priya Sharma",
    "Rahul Verma",
    "Sana Qureshi"
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
"[project]/src/lib/services/leads.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "leadsService",
    ()=>leadsService
]);
// Leads = the RENTLET CRM pipeline (spec §23, §76 + the staff-operated deal flow).
// Mock mode deterministically generates realistic-looking leads against the owner's
// property slice, seeds them across the pipeline stages with a handling staff member,
// and accepts real create() calls from the contact flow (ActionBar's trackLead).
// Firebase mode is a live `leads` query scoped to `where('ownerId', '==', session.uid)`.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__aL__as__collection$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/common-CE5hrKY-.esm.js [app-client] (ecmascript) <export aL as collection>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__v__as__doc$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/common-CE5hrKY-.esm.js [app-client] (ecmascript) <export v as doc>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__b0__as__serverTimestamp$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/common-CE5hrKY-.esm.js [app-client] (ecmascript) <export b0 as serverTimestamp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/auth.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$owner$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/owner.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$firestore$2d$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase/firestore-helpers.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$staff$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/staff.ts [app-client] (ecmascript)");
;
;
;
;
;
;
;
const NAMES = [
    "Kavya Iyer",
    "Rohan Das",
    "Sneha Pillai",
    "Vikram Nair",
    "Ananya Joshi",
    "Farhan Ali",
    "Meera Krishnan",
    "Aditya Kumar",
    "Divya Menon",
    "Karthik Reddy",
    "Priyanka Rao",
    "Suresh Babu"
];
const SOURCES = [
    "contact",
    "call",
    "whatsapp",
    "chat",
    "visit"
];
const SEED_STAGES = [
    "lead",
    "assigned",
    "follow_up",
    "site_visit",
    "negotiation",
    "documentation",
    "deal_closed",
    "recorded"
];
function generateSeedLeads() {
    const properties = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$owner$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ownerPropertiesService"].getAll();
    const leads = [];
    let n = 0;
    for (const property of properties){
        const count = 2 + property.id.charCodeAt(1) % 4;
        for(let i = 0; i < count; i++){
            n++;
            const name = NAMES[n % NAMES.length];
            const stage = SEED_STAGES[n % SEED_STAGES.length];
            const assigned = stage === "lead" ? null : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$staff$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RENTLET_STAFF"][n % __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$staff$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RENTLET_STAFF"].length];
            leads.push({
                id: `lead${n}`,
                propertyId: property.id,
                propertyTitle: property.title,
                userName: name,
                userPhone: `+91 9${String(100000000 + n * 37).slice(0, 9)}`,
                source: SOURCES[n % SOURCES.length],
                stage,
                assignedStaff: assigned,
                nextAction: stage === "lead" || stage === "recorded" || stage === "deal_closed" ? null : new Date(2026, 8, 1 + n % 20).toISOString().slice(0, 10),
                notes: assigned ? [
                    `${new Date(2026, 7, 1 + n % 24).toISOString().slice(0, 10)} — ${assigned} picked up the lead.`
                ] : [],
                createdAt: new Date(2026, 7, 1 + n % 24).toISOString().slice(0, 10)
            });
        }
    }
    return leads.sort((a, b)=>b.createdAt.localeCompare(a.createdAt));
}
class MockLeadsService {
    store = generateSeedLeads();
    listeners = [];
    snapshot = this.store.slice();
    nextId = this.store.length + 1;
    assignCursor = 0;
    /** Round-robin the next incoming lead onto a relationship manager. */ nextStaff() {
        const s = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$staff$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RENTLET_STAFF"][this.assignCursor % __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$staff$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RENTLET_STAFF"].length];
        this.assignCursor++;
        return s;
    }
    emit() {
        this.snapshot = this.store.slice();
        this.listeners.forEach((l)=>l());
    }
    patch(id, fn) {
        this.store = this.store.map((l)=>l.id === id ? fn(l) : l);
        this.emit();
    }
    getAll() {
        return this.snapshot;
    }
    subscribe(listener) {
        this.listeners.push(listener);
        return ()=>{
            this.listeners = this.listeners.filter((l)=>l !== listener);
        };
    }
    setStage(id, stage) {
        this.patch(id, (l)=>({
                ...l,
                stage,
                // moving off "lead" without an owner auto-claims nothing — assignment is explicit
                nextAction: stage === "deal_closed" || stage === "recorded" ? null : l.nextAction
            }));
    }
    assign(id, staff) {
        this.patch(id, (l)=>({
                ...l,
                assignedStaff: staff,
                stage: staff && l.stage === "lead" ? "assigned" : l.stage
            }));
    }
    addNote(id, note) {
        const stamped = `${new Date().toISOString().slice(0, 10)} — ${note.trim()}`;
        this.patch(id, (l)=>({
                ...l,
                notes: [
                    stamped,
                    ...l.notes
                ]
            }));
    }
    setNextAction(id, date) {
        this.patch(id, (l)=>({
                ...l,
                nextAction: date || null
            }));
    }
    create(input) {
        const staff = this.nextStaff();
        const today = new Date().toISOString().slice(0, 10);
        const lead = {
            id: `lead-live-${this.nextId++}`,
            propertyId: input.propertyId,
            propertyTitle: input.propertyTitle,
            userName: input.userName,
            userPhone: input.userPhone,
            source: input.source,
            stage: "assigned",
            assignedStaff: staff,
            nextAction: today,
            notes: [
                `${today} — Auto-assigned to ${staff} from a ${input.source} enquiry.`
            ],
            createdAt: today
        };
        this.store = [
            lead,
            ...this.store
        ];
        this.emit();
    }
}
// ---------------------------------------------------------------------------------------------
const COLLECTION = "leads";
class FirebaseLeadsService {
    snapshot = [];
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
            this.snapshot = [];
            this.emit();
            return;
        }
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__aL__as__collection$3e$__["collection"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDb"])(), COLLECTION), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["where"])("ownerId", "==", uid), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["orderBy"])("createdAt", "desc"));
        this.unsub = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["onSnapshot"])(q, (snap)=>{
            this.snapshot = snap.docs.map((d)=>{
                const data = d.data();
                return {
                    id: d.id,
                    propertyId: data.propertyId,
                    propertyTitle: data.propertyTitle,
                    userName: data.userName,
                    userPhone: data.userPhone,
                    source: data.source,
                    stage: data.stage ?? "lead",
                    assignedStaff: data.assignedStaff ?? null,
                    nextAction: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$firestore$2d$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toIso"])(data.nextAction) ?? null,
                    notes: Array.isArray(data.notes) ? data.notes : [],
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
        return this.snapshot;
    }
    subscribe(listener) {
        this.listeners.push(listener);
        return ()=>{
            this.listeners = this.listeners.filter((l)=>l !== listener);
        };
    }
    setStage(id, stage) {
        void (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["updateDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__v__as__doc$3e$__["doc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDb"])(), COLLECTION, id), {
            stage
        });
    }
    assign(id, staff) {
        void (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["updateDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__v__as__doc$3e$__["doc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDb"])(), COLLECTION, id), {
            assignedStaff: staff
        });
    }
    addNote(id, note) {
        const stamped = `${new Date().toISOString().slice(0, 10)} — ${note.trim()}`;
        const current = this.snapshot.find((l)=>l.id === id)?.notes ?? [];
        void (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["updateDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__v__as__doc$3e$__["doc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDb"])(), COLLECTION, id), {
            notes: [
                stamped,
                ...current
            ]
        });
    }
    setNextAction(id, date) {
        void (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["updateDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__v__as__doc$3e$__["doc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDb"])(), COLLECTION, id), {
            nextAction: date || null
        });
    }
    create(input) {
        const staff = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$staff$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RENTLET_STAFF"][Date.now() % __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$staff$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RENTLET_STAFF"].length];
        const today = new Date().toISOString().slice(0, 10);
        void (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["addDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__aL__as__collection$3e$__["collection"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDb"])(), COLLECTION), {
            propertyId: input.propertyId,
            propertyTitle: input.propertyTitle,
            ownerId: input.ownerId,
            userName: input.userName,
            userPhone: input.userPhone,
            source: input.source,
            stage: "assigned",
            assignedStaff: staff,
            nextAction: today,
            notes: [
                `${today} — Auto-assigned to ${staff} from a ${input.source} enquiry.`
            ],
            createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__b0__as__serverTimestamp$3e$__["serverTimestamp"])()
        });
    }
}
const leadsService = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFirestoreEnabled"])() ? new FirebaseLeadsService() : new MockLeadsService();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/services/owner.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ownerPropertiesService",
    ()=>ownerPropertiesService
]);
// "My properties" store for the owner dashboard (spec §22-23). Mock mode uses a fixed
// in-memory slice of the seed catalogue (demo simplification — every signed-in owner sees the
// same portfolio). Firebase mode is a live `properties` query scoped to
// `where('ownerId', '==', session.uid)`, re-bound whenever the signed-in user changes.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__aL__as__collection$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/common-CE5hrKY-.esm.js [app-client] (ecmascript) <export aL as collection>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$seed$2d$properties$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/seed-properties.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/auth.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$properties$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/properties.service.ts [app-client] (ecmascript)");
;
;
;
;
;
;
class MockOwnerPropertiesService {
    store = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$seed$2d$properties$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allProperties"].slice(0, 9).map((p)=>({
            ...p
        }));
    listeners = [];
    snapshot = this.store.slice();
    emit() {
        this.snapshot = this.store.slice();
        this.listeners.forEach((l)=>l());
    }
    getAll() {
        return this.snapshot;
    }
    subscribe(listener) {
        this.listeners.push(listener);
        return ()=>{
            this.listeners = this.listeners.filter((l)=>l !== listener);
        };
    }
    addProperty(property) {
        this.store = [
            property,
            ...this.store
        ];
        this.emit();
    }
    setStatus(id, status) {
        this.store = this.store.map((p)=>p.id === id ? {
                ...p,
                status
            } : p);
        this.emit();
    }
    toggleFeatured(id) {
        this.store = this.store.map((p)=>p.id === id ? {
                ...p,
                featured: !p.featured
            } : p);
        this.emit();
    }
    remove(id) {
        this.store = this.store.filter((p)=>p.id !== id);
        this.emit();
    }
}
class FirebaseOwnerPropertiesService {
    snapshot = [];
    listeners = [];
    unsubQuery = null;
    boundUid = undefined;
    constructor(){
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].subscribe((user)=>this.bindToUser(user?.id ?? null));
        this.bindToUser(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].getCurrentUser()?.id ?? null);
    }
    bindToUser(uid) {
        if (uid === this.boundUid) return;
        this.boundUid = uid;
        this.unsubQuery?.();
        this.unsubQuery = null;
        if (!uid) {
            this.snapshot = [];
            this.listeners.forEach((l)=>l());
            return;
        }
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__aL__as__collection$3e$__["collection"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDb"])(), __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$properties$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PROPERTIES_COLLECTION"]), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["where"])("ownerId", "==", uid), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["orderBy"])("createdAt", "desc"));
        this.unsubQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["onSnapshot"])(q, (snap)=>{
            this.snapshot = snap.docs.map((d)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$properties$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapPropertyDoc"])(d.id, d.data()));
            this.listeners.forEach((l)=>l());
        });
    }
    getAll() {
        return this.snapshot;
    }
    subscribe(listener) {
        this.listeners.push(listener);
        return ()=>{
            this.listeners = this.listeners.filter((l)=>l !== listener);
        };
    }
    addProperty(property) {
        void property; // no-op — the onSnapshot listener above already reflects the newly created document
    }
    setStatus(id, status) {
        void __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$properties$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["propertyRepository"].update(id, {
            status
        });
    }
    toggleFeatured(id) {
        const current = this.snapshot.find((p)=>p.id === id);
        if (current) void __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$properties$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["propertyRepository"].update(id, {
            featured: !current.featured
        });
    }
    remove(id) {
        void __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$properties$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["propertyRepository"].remove(id);
    }
}
const ownerPropertiesService = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFirestoreEnabled"])() ? new FirebaseOwnerPropertiesService() : new MockOwnerPropertiesService();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/services/properties.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PROPERTIES_COLLECTION",
    ()=>PROPERTIES_COLLECTION,
    "mapPropertyDoc",
    ()=>mapPropertyDoc,
    "propertyRepository",
    ()=>propertyRepository
]);
// PropertyRepository interface — see docs/00-architecture.md §3. Mock implementation reads the
// static seed catalogue; the Firebase-backed one below reads/writes the real `properties`
// Firestore collection. Both implement the exact same interface, so every component that calls
// `propertyRepository.*` needs zero changes when NEXT_PUBLIC_FIREBASE_* env vars are set.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__aL__as__collection$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/common-CE5hrKY-.esm.js [app-client] (ecmascript) <export aL as collection>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__v__as__doc$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/common-CE5hrKY-.esm.js [app-client] (ecmascript) <export v as doc>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__b0__as__serverTimestamp$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/common-CE5hrKY-.esm.js [app-client] (ecmascript) <export b0 as serverTimestamp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$properties$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/properties.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$seed$2d$properties$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/data/seed-properties.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$firestore$2d$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase/firestore-helpers.ts [app-client] (ecmascript)");
;
;
;
;
;
;
class MockPropertyRepository {
    async getFeatured(limit = 6) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$properties$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["featuredProperties"].slice(0, limit);
    }
    async getById(id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$seed$2d$properties$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allProperties"].find((p)=>p.id === id) ?? null;
    }
    async getBySlugAndId(slug, id) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$seed$2d$properties$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allProperties"].find((p)=>p.id === id && p.slug === slug) ?? null;
    }
    async getSimilar(property, limit = 3) {
        const sameCity = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$seed$2d$properties$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allProperties"].filter((p)=>p.id !== property.id && p.city === property.city);
        const rest = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$seed$2d$properties$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allProperties"].filter((p)=>p.id !== property.id && p.city !== property.city);
        return [
            ...sameCity,
            ...rest
        ].slice(0, limit);
    }
    async create(input) {
        const property = {
            ...input,
            id: `own${Date.now()}`,
            views: 0,
            leadsCount: 0,
            savedCount: 0,
            createdAt: new Date().toISOString().slice(0, 10)
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$seed$2d$properties$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allProperties"].unshift(property);
        return property;
    }
    async update(id, patch) {
        const idx = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$seed$2d$properties$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allProperties"].findIndex((p)=>p.id === id);
        if (idx !== -1) __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$seed$2d$properties$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allProperties"][idx] = {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$seed$2d$properties$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allProperties"][idx],
            ...patch
        };
    }
    async remove(id) {
        const idx = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$seed$2d$properties$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allProperties"].findIndex((p)=>p.id === id);
        if (idx !== -1) __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$seed$2d$properties$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allProperties"][idx] = {
            ...__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$2f$seed$2d$properties$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allProperties"][idx],
            status: "deleted"
        };
    }
}
const PROPERTIES_COLLECTION = "properties";
const COLLECTION = PROPERTIES_COLLECTION;
function propertiesCol() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__aL__as__collection$3e$__["collection"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDb"])(), COLLECTION);
}
function propertyDoc(id) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__v__as__doc$3e$__["doc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDb"])(), COLLECTION, id);
}
function mapPropertyDoc(id, data) {
    return {
        ...data,
        id,
        createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$firestore$2d$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toIso"])(data.createdAt) ?? new Date().toISOString()
    };
}
const toProperty = mapPropertyDoc;
class FirebasePropertyRepository {
    async getFeatured(limitCount = 6) {
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["query"])(propertiesCol(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["where"])("status", "==", "active"), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["where"])("featured", "==", true), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["orderBy"])("createdAt", "desc"), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["limit"])(limitCount));
        const snap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getDocs"])(q);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$firestore$2d$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapSnapshot"])(snap, toProperty);
    }
    async getById(id) {
        const snap = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getDoc"])(propertyDoc(id));
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$firestore$2d$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapDoc"])(snap, toProperty);
    }
    async getBySlugAndId(slug, id) {
        const property = await this.getById(id);
        return property && property.slug === slug ? property : null;
    }
    async getSimilar(property, limitCount = 3) {
        const sameCity = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getDocs"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["query"])(propertiesCol(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["where"])("status", "==", "active"), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["where"])("city", "==", property.city), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["limit"])(limitCount + 1)));
        let results = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$firestore$2d$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapSnapshot"])(sameCity, toProperty).filter((p)=>p.id !== property.id);
        if (results.length < limitCount) {
            const rest = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getDocs"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["query"])(propertiesCol(), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["where"])("status", "==", "active"), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["limit"])(limitCount + 1)));
            const extra = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$firestore$2d$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mapSnapshot"])(rest, toProperty).filter((p)=>p.id !== property.id && !results.some((r)=>r.id === p.id));
            results = [
                ...results,
                ...extra
            ];
        }
        return results.slice(0, limitCount);
    }
    async create(input) {
        const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__v__as__doc$3e$__["doc"])(propertiesCol());
        const payload = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$firestore$2d$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stripUndefined"])({
            ...input,
            views: 0,
            leadsCount: 0,
            savedCount: 0,
            createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__b0__as__serverTimestamp$3e$__["serverTimestamp"])()
        });
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["setDoc"])(ref, payload);
        const created = await this.getById(ref.id);
        if (!created) throw new Error("Property was created but could not be re-read.");
        return created;
    }
    async update(id, patch) {
        const clean = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$firestore$2d$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["stripUndefined"])(patch);
        // Firestore rejects `undefined`; a caller passing `rejectionReason: null` to clear it is
        // fine as-is (null is a valid Firestore value), so only true `undefined`s get filtered.
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["updateDoc"])(propertyDoc(id), clean);
    }
    async remove(id) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["updateDoc"])(propertyDoc(id), {
            status: "deleted",
            deletedAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__b0__as__serverTimestamp$3e$__["serverTimestamp"])()
        });
    }
}
const propertyRepository = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFirestoreEnabled"])() ? new FirebasePropertyRepository() : new MockPropertyRepository();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/services/recently-viewed.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "recentlyViewedService",
    ()=>recentlyViewedService
]);
// Recently viewed properties (spec §17) — localStorage per signed-in user, capped at 12,
// most-recent first. Phase 12 could move this server-side (property_views collection already
// exists in the schema) but per-device localStorage is arguably the right home even then.
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/auth.service.ts [app-client] (ecmascript)");
;
function isBrowser() {
    return ("TURBOPACK compile-time value", "object") !== "undefined";
}
function storageKey(userId) {
    return `rentlet_recently_viewed_${userId}`;
}
const MAX = 12;
const recentlyViewedService = {
    record (propertyId) {
        const user = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].getCurrentUser();
        if (!user || !isBrowser()) return;
        let ids = [];
        try {
            ids = JSON.parse(window.localStorage.getItem(storageKey(user.id)) ?? "[]");
        } catch  {
            ids = [];
        }
        ids = [
            propertyId,
            ...ids.filter((id)=>id !== propertyId)
        ].slice(0, MAX);
        window.localStorage.setItem(storageKey(user.id), JSON.stringify(ids));
    },
    getIds (userId) {
        if (!isBrowser()) //TURBOPACK unreachable
        ;
        try {
            return JSON.parse(window.localStorage.getItem(storageKey(userId)) ?? "[]");
        } catch  {
            return [];
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/services/visits.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "visitsService",
    ()=>visitsService
]);
// Visits (spec §15 / §77). Mock mode deterministically seeds owner-side demo visits and accepts
// real create() calls from ScheduleVisitModal. Firebase mode is two live `visits` queries — one
// scoped to `ownerId` (what the owner dashboard shows) and one scoped to `requesterId` (what the
// requester's own /visits page shows) — both reading the same collection.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__aL__as__collection$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/common-CE5hrKY-.esm.js [app-client] (ecmascript) <export aL as collection>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__v__as__doc$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/common-CE5hrKY-.esm.js [app-client] (ecmascript) <export v as doc>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__b0__as__serverTimestamp$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/common-CE5hrKY-.esm.js [app-client] (ecmascript) <export b0 as serverTimestamp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/auth.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$owner$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/owner.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$notifications$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services/notifications.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase/config.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase/client.ts [app-client] (ecmascript)");
;
;
;
;
;
;
function notifyStatusChange(visit, status) {
    if (status === "confirmed") {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$notifications$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notificationsService"].push("VISIT_ACCEPTED", `Your visit for ${visit.propertyTitle} on ${visit.date} was confirmed.`, "/visits");
    } else if (status === "rejected") {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$notifications$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["notificationsService"].push("VISIT_REJECTED", `Your visit request for ${visit.propertyTitle} was declined.`, "/visits");
    }
}
const NAMES = [
    "Ritika Shah",
    "Arjun Malhotra",
    "Pooja Verma",
    "Nikhil Bhatt",
    "Shreya Gupta",
    "Manish Tiwari"
];
const SLOTS = [
    "10:00 AM",
    "11:30 AM",
    "2:00 PM",
    "4:30 PM",
    "6:00 PM"
];
const STATUSES = [
    "requested",
    "requested",
    "confirmed",
    "completed",
    "cancelled"
];
function generateSeedVisits() {
    const properties = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$owner$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ownerPropertiesService"].getAll().slice(0, 6);
    return properties.map((property, i)=>({
            id: `visit${i + 1}`,
            propertyId: property.id,
            propertyTitle: property.title,
            ownerId: property.ownerId,
            userName: NAMES[i % NAMES.length],
            requesterId: null,
            date: new Date(2026, 7, 26 + i).toISOString().slice(0, 10),
            slot: SLOTS[i % SLOTS.length],
            visitorCount: 1 + i % 3,
            message: i % 2 === 0 ? "Looking to move in within a month." : null,
            status: STATUSES[i % STATUSES.length]
        }));
}
class MockVisitsService {
    store = generateSeedVisits();
    listeners = [];
    snapshot = this.store.slice();
    nextId = this.store.length + 1;
    mineCache = {};
    emit() {
        this.snapshot = this.store.slice();
        this.mineCache = {};
        this.listeners.forEach((l)=>l());
    }
    getAll() {
        return this.snapshot;
    }
    getMine(userId) {
        if (!this.mineCache[userId]) {
            this.mineCache[userId] = this.snapshot.filter((v)=>v.requesterId === userId);
        }
        return this.mineCache[userId];
    }
    subscribe(listener) {
        this.listeners.push(listener);
        return ()=>{
            this.listeners = this.listeners.filter((l)=>l !== listener);
        };
    }
    create(input) {
        const visit = {
            id: `visit${this.nextId++}`,
            propertyId: input.propertyId,
            propertyTitle: input.propertyTitle,
            ownerId: input.ownerId,
            userName: input.requesterName,
            requesterId: input.requesterId,
            date: input.date,
            slot: input.slot,
            visitorCount: input.visitorCount,
            message: input.message,
            status: "requested"
        };
        this.store = [
            visit,
            ...this.store
        ];
        this.emit();
        return visit;
    }
    setStatus(id, status) {
        this.store = this.store.map((v)=>v.id === id ? {
                ...v,
                status
            } : v);
        this.emit();
        const visit = this.store.find((v)=>v.id === id);
        if (visit) notifyStatusChange(visit, status);
    }
}
// ---------------------------------------------------------------------------------------------
const COLLECTION = "visits";
function toVisit(id, data) {
    return {
        id,
        propertyId: data.propertyId,
        propertyTitle: data.propertyTitle,
        ownerId: data.ownerId ?? null,
        userName: data.userName,
        requesterId: data.requesterId ?? null,
        date: data.date,
        slot: data.slot,
        visitorCount: data.visitorCount ?? 1,
        message: data.message ?? null,
        status: data.status
    };
}
class FirebaseVisitsService {
    ownerSnapshot = [];
    mineSnapshots = {};
    mineUnsubs = {};
    listeners = [];
    boundUid = undefined;
    unsubOwner = null;
    constructor(){
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].subscribe((user)=>this.bindToUser(user?.id ?? null));
        this.bindToUser(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].getCurrentUser()?.id ?? null);
    }
    bindToUser(uid) {
        if (uid === this.boundUid) return;
        this.boundUid = uid;
        this.unsubOwner?.();
        this.unsubOwner = null;
        if (!uid) {
            this.ownerSnapshot = [];
            this.emit();
            return;
        }
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__aL__as__collection$3e$__["collection"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDb"])(), COLLECTION), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["where"])("ownerId", "==", uid), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["orderBy"])("date", "desc"));
        this.unsubOwner = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["onSnapshot"])(q, (snap)=>{
            this.ownerSnapshot = snap.docs.map((d)=>toVisit(d.id, d.data()));
            this.emit();
        });
    }
    emit() {
        this.listeners.forEach((l)=>l());
    }
    getAll() {
        return this.ownerSnapshot;
    }
    getMine(userId) {
        if (!this.mineUnsubs[userId]) {
            const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["query"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__aL__as__collection$3e$__["collection"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDb"])(), COLLECTION), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["where"])("requesterId", "==", userId), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["orderBy"])("date", "desc"));
            this.mineUnsubs[userId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["onSnapshot"])(q, (snap)=>{
                this.mineSnapshots[userId] = snap.docs.map((d)=>toVisit(d.id, d.data()));
                this.emit();
            });
        }
        return this.mineSnapshots[userId] ?? [];
    }
    subscribe(listener) {
        this.listeners.push(listener);
        return ()=>{
            this.listeners = this.listeners.filter((l)=>l !== listener);
        };
    }
    create(input) {
        const optimistic = {
            id: `pending-${Date.now()}`,
            propertyId: input.propertyId,
            propertyTitle: input.propertyTitle,
            ownerId: input.ownerId,
            userName: input.requesterName,
            requesterId: input.requesterId,
            date: input.date,
            slot: input.slot,
            visitorCount: input.visitorCount,
            message: input.message,
            status: "requested"
        };
        void (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["addDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__aL__as__collection$3e$__["collection"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDb"])(), COLLECTION), {
            propertyId: input.propertyId,
            propertyTitle: input.propertyTitle,
            ownerId: input.ownerId,
            userName: input.requesterName,
            requesterId: input.requesterId,
            date: input.date,
            slot: input.slot,
            visitorCount: input.visitorCount,
            message: input.message,
            status: "requested",
            createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__b0__as__serverTimestamp$3e$__["serverTimestamp"])()
        });
        return optimistic;
    }
    setStatus(id, status) {
        void (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["updateDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$common$2d$CE5hrKY$2d2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__v__as__doc$3e$__["doc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDb"])(), COLLECTION, id), {
            status
        }).then(()=>{
            const visit = this.ownerSnapshot.find((v)=>v.id === id);
            if (visit) notifyStatusChange({
                ...visit,
                status
            }, status);
        });
    }
}
const visitsService = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isFirestoreEnabled"])() ? new FirebaseVisitsService() : new MockVisitsService();
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

//# sourceMappingURL=src_1vq6dgv._.js.map