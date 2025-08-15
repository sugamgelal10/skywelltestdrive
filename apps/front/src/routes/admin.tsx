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
    <SidebarProvider className="">
      <div className="flex min-h-screen  w-full">
        <AdminSidebar />
        <main className=" w-full  bg-blue">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
