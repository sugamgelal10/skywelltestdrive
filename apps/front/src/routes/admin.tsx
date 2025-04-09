import { AdminSidebar } from "@/components/side-bar-admin";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/provider/use-auth";
import {
  createFileRoute,
  Navigate,
  Outlet,
  redirect,
} from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  beforeLoad({ context }) {
    if (!context.auth?.isAuthenticated) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const auth = useAuth();
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 overflow-x-auto">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
