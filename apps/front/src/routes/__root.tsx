import type { useAuth } from "@/provider/use-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { Toaster } from "sonner";

export const Route = createRootRouteWithContext<{
  auth: ReturnType<typeof useAuth>;
}>()({
  component: () => {
    const queryClient = new QueryClient();
    return (
      <>
        <QueryClientProvider client={queryClient}>
          <Outlet />
          <Toaster richColors />
        </QueryClientProvider>
      </>
    );
  },
});
