import { createFileRoute, Outlet } from "@tanstack/react-router";
import logo from "@/logo.png";

export const Route = createFileRoute("/_user")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <div className="py-2 te shadow-md mb-1 px-8 font-extrabold text-md md:text-xl text-primary">
        <img src={logo} alt="Logo" className="md:h-10 h-4 inline-block mr-2 " />
        Test Drive
      </div>
      <div>
        {/* <div className="flex justify-center w-full">
          <img src={banner} className="h-full w-full object-cover" />
        </div> */}
        <Outlet />
      </div>
    </div>
  );
}
