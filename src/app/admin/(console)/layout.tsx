import { AdminGate } from "@/components/admin/AdminGate";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminConsoleLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGate>
      <div className="flex min-h-screen flex-col bg-muted lg:flex-row">
        <div className="lg:h-screen lg:shrink-0 lg:sticky lg:top-0">
          <AdminSidebar />
        </div>
        <div className="min-w-0 flex-1 overflow-y-auto p-5 lg:p-8">{children}</div>
      </div>
    </AdminGate>
  );
}
