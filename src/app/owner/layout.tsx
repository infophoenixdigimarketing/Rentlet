import { OwnerSidebar } from "@/components/owner/OwnerSidebar";
import { OwnerGate } from "@/components/owner/OwnerGate";

export default function OwnerLayout({ children }: LayoutProps<"/owner">) {
  return (
    <OwnerGate>
      <div className="container-rentlet py-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          <OwnerSidebar />
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </div>
    </OwnerGate>
  );
}
