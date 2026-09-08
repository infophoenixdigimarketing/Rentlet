import { UserGate } from "@/components/user/UserGate";
import { UserSidebar } from "@/components/user/UserSidebar";

export default function UserAccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserGate>
      <div className="container-rentlet py-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          <UserSidebar />
          <div className="min-w-0 flex-1">{children}</div>
        </div>
      </div>
    </UserGate>
  );
}
