import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_user")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <div className="py-2 te shadow-md mb-4 px-8 font-extrabold text-xl">
        Skywell Test Drive
      </div>
      <Outlet />
    </div>
  );
}
