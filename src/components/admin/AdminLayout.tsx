import { Outlet, Link } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { ArrowLeft } from "lucide-react";

const AdminLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center gap-3 border-b border-border px-4 bg-card shrink-0">
            <SidebarTrigger className="shrink-0" />
            <div className="h-5 w-px bg-border" />
            <Link to="/" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Store
            </Link>
          </header>
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
