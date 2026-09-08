import { StaffGate } from "@/components/staff/StaffGate";
import { StaffSidebar } from "@/components/staff/StaffSidebar";

export default function StaffConsoleLayout({ children }: { children: React.ReactNode }) {
  return (
    <StaffGate>
      <div className="flex min-h-screen flex-col bg-muted lg:flex-row">
        <div className="lg:sticky lg:top-0 lg:h-screen lg:shrink-0">
          <StaffSidebar />
        </div>
        <div className="min-w-0 flex-1 overflow-y-auto p-5 lg:p-8">{children}</div>
      </div>
    </StaffGate>
  );
}
