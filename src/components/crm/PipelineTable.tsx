"use client";

import { Fragment, useState } from "react";
import { MessageSquarePlus } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { Workflow } from "lucide-react";
import { leadsService } from "@/lib/services/leads.service";
import { dealsService } from "@/lib/services/deals.service";
import { allProperties } from "@/lib/data/seed-properties";
import { getOwnerContact } from "@/lib/data/owner-contacts";
import { STAGE_META } from "@/lib/lead-pipeline";
import { RENTLET_STAFF } from "@/lib/data/staff";
import { cn } from "@/lib/utils";
import { DEFAULT_DOCUMENTS, LEAD_STAGES, type Lead, type LeadStage } from "@/types/dashboard";

const SOURCE_LABEL: Record<string, string> = {
  contact: "Contact Form",
  call: "Call",
  whatsapp: "WhatsApp",
  chat: "Chat",
  visit: "Visit Request",
};

export const ALL_STAGES: LeadStage[] = [...LEAD_STAGES, "lost"];

// Moving a lead to "Deal closed" writes it to the admin deal ledger (with the agreed
// price, if negotiated); "Admin record" acknowledges that entry.
function changeStage(lead: Lead, stage: LeadStage) {
  leadsService.setStage(lead.id, stage);
  if (stage === "deal_closed")
    dealsService.recordFromLead({ ...lead, stage }, { value: lead.negotiation?.agreed ?? null });
  if (stage === "recorded") dealsService.markRecorded(lead.id);
}

const NUM = (v: string) => (v.trim() === "" ? null : Number(v.replace(/[^\d]/g, "")) || null);

export function PipelineTable({ leads, canAssign = true }: { leads: Lead[]; canAssign?: boolean }) {
  const [openNotes, setOpenNotes] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const cols = canAssign ? 7 : 6;

  function submitNote(id: string) {
    if (!draft.trim()) return;
    leadsService.addNote(id, draft);
    setDraft("");
  }

  if (leads.length === 0) {
    return (
      <EmptyState className="mt-6" icon={Workflow} title="Nothing here" description="Try a different filter." />
    );
  }

  return (
    <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-white">
      <table className="w-full min-w-[860px] text-left text-sm">
        <thead>
          <tr className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
            <th className="px-4 py-3 font-semibold">Enquirer</th>
            <th className="px-4 py-3 font-semibold">Property</th>
            <th className="px-4 py-3 font-semibold">Source</th>
            {canAssign && <th className="px-4 py-3 font-semibold">Assigned to</th>}
            <th className="px-4 py-3 font-semibold">Stage</th>
            <th className="px-4 py-3 font-semibold">Next action</th>
            <th className="px-4 py-3 font-semibold">Notes</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <Fragment key={lead.id}>
              <tr className="border-b border-border align-top last:border-0">
                <td className="px-4 py-3">
                  <p className="font-semibold text-foreground">{lead.userName}</p>
                  <p className="text-xs tabular-nums text-muted-foreground">{lead.userPhone}</p>
                  <p className="text-xs text-muted-foreground">{lead.createdAt}</p>
                </td>
                <td className="max-w-[220px] px-4 py-3 text-foreground/80">
                  <span className="line-clamp-2">{lead.propertyTitle}</span>
                  {(() => {
                    const prop = allProperties.find((p) => p.id === lead.propertyId);
                    const oc = prop ? getOwnerContact(prop.ownerId) : null;
                    if (!prop) return null;
                    return (
                      <span className="mt-1 block text-[11px] text-muted-foreground">
                        Owner: {prop.ownerName}
                        {oc ? (
                          <>
                            {" · "}
                            <span className="tabular-nums">{oc.phone}</span>
                          </>
                        ) : null}
                      </span>
                    );
                  })()}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{SOURCE_LABEL[lead.source]}</td>
                {canAssign && (
                  <td className="px-4 py-3">
                    <select
                      value={lead.assignedStaff ?? ""}
                      onChange={(e) => leadsService.assign(lead.id, e.target.value || null)}
                      className="rounded-lg border border-border bg-white px-2 py-1 text-xs font-semibold outline-none"
                    >
                      <option value="">Unassigned</option>
                      {RENTLET_STAFF.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                )}
                <td className="px-4 py-3">
                  <select
                    value={lead.stage}
                    onChange={(e) => changeStage(lead, e.target.value as LeadStage)}
                    className={cn(
                      "rounded-full border-0 px-2.5 py-1 text-xs font-bold outline-none",
                      STAGE_META[lead.stage].style
                    )}
                  >
                    {ALL_STAGES.map((s) => (
                      <option key={s} value={s}>
                        {STAGE_META[s].label}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3">
                  <input
                    type="date"
                    value={lead.nextAction ?? ""}
                    onChange={(e) => leadsService.setNextAction(lead.id, e.target.value || null)}
                    className="rounded-lg border border-border bg-white px-2 py-1 text-xs outline-none"
                  />
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => {
                      setOpenNotes(openNotes === lead.id ? null : lead.id);
                      setDraft("");
                    }}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand-navy hover:underline"
                  >
                    <MessageSquarePlus className="h-3.5 w-3.5" />
                    {lead.notes.length}
                  </button>
                </td>
              </tr>
              {openNotes === lead.id && (
                <tr className="border-b border-border bg-muted/30">
                  <td colSpan={cols} className="px-4 py-4">
                    <div className="grid gap-5 md:grid-cols-3">
                      {/* Site visit */}
                      <section>
                        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Site visit</p>
                        <div className="mt-2 flex flex-col gap-2">
                          <input
                            type="date"
                            value={lead.visit?.date ?? ""}
                            onChange={(e) =>
                              leadsService.setVisit(lead.id, {
                                date: e.target.value,
                                slot: lead.visit?.slot ?? "",
                                done: lead.visit?.done ?? false,
                              })
                            }
                            className="rounded-lg border border-border bg-white px-2 py-1.5 text-sm outline-none"
                          />
                          <input
                            type="text"
                            value={lead.visit?.slot ?? ""}
                            onChange={(e) =>
                              leadsService.setVisit(lead.id, {
                                date: lead.visit?.date ?? "",
                                slot: e.target.value,
                                done: lead.visit?.done ?? false,
                              })
                            }
                            placeholder="Time slot, e.g. 4:00 PM"
                            className="rounded-lg border border-border bg-white px-2 py-1.5 text-sm outline-none"
                          />
                          <label className="flex items-center gap-2 text-sm">
                            <input
                              type="checkbox"
                              checked={lead.visit?.done ?? false}
                              onChange={(e) =>
                                leadsService.setVisit(lead.id, {
                                  date: lead.visit?.date ?? "",
                                  slot: lead.visit?.slot ?? "",
                                  done: e.target.checked,
                                })
                              }
                              className="h-4 w-4 rounded border-border accent-brand-navy"
                            />
                            Visit completed
                          </label>
                        </div>
                      </section>

                      {/* Negotiation */}
                      <section>
                        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Negotiation</p>
                        <div className="mt-2 flex flex-col gap-2">
                          {(["asking", "offer", "agreed"] as const).map((k) => (
                            <label key={k} className="flex items-center gap-2 text-sm">
                              <span className="w-16 capitalize text-muted-foreground">{k}</span>
                              <span className="flex flex-1 items-center gap-1 rounded-lg border border-border bg-white px-2">
                                <span className="text-xs text-muted-foreground">₹</span>
                                <input
                                  type="text"
                                  inputMode="numeric"
                                  value={lead.negotiation?.[k] ?? ""}
                                  onChange={(e) =>
                                    leadsService.setNegotiation(lead.id, { [k]: NUM(e.target.value) })
                                  }
                                  className="w-full py-1.5 text-sm outline-none"
                                />
                              </span>
                            </label>
                          ))}
                        </div>
                      </section>

                      {/* Documents */}
                      <section>
                        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Documentation</p>
                        <ul className="mt-2 flex flex-col gap-1.5">
                          {(lead.documents.length ? lead.documents : DEFAULT_DOCUMENTS).map((d) => (
                            <li key={d.label}>
                              <label className="flex items-center gap-2 text-sm">
                                <input
                                  type="checkbox"
                                  checked={d.done}
                                  onChange={() => leadsService.toggleDocument(lead.id, d.label)}
                                  className="h-4 w-4 rounded border-border accent-emerald-600"
                                />
                                <span className={cn(d.done && "text-muted-foreground line-through")}>{d.label}</span>
                              </label>
                            </li>
                          ))}
                        </ul>
                      </section>
                    </div>

                    {/* Notes */}
                    <div className="mt-5 border-t border-border pt-4">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={draft}
                          onChange={(e) => setDraft(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && submitNote(lead.id)}
                          placeholder="Add a follow-up note…"
                          className="flex-1 rounded-lg border border-border bg-white px-3 py-1.5 text-sm outline-none focus:border-brand-navy"
                        />
                        <button
                          type="button"
                          onClick={() => submitNote(lead.id)}
                          disabled={!draft.trim()}
                          className="rounded-lg bg-brand-navy px-3 py-1.5 text-sm font-semibold text-white disabled:opacity-50"
                        >
                          Add
                        </button>
                      </div>
                      {lead.notes.length > 0 ? (
                        <ul className="mt-2 flex flex-col gap-1 text-xs text-muted-foreground">
                          {lead.notes.map((note, i) => (
                            <li key={i} className="tabular-nums">
                              {note}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-2 text-xs italic text-muted-foreground">No notes yet.</p>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
