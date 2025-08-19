import {
  createFileRoute,
  Link,
  Outlet,
  useLocation,
} from "@tanstack/react-router";
import logo from "@/logo.png";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_user")({
  component: RouteComponent,
});

function RouteComponent() {
  const location = useLocation();

  return (
    <div>
      <div className="py-2 te shadow-md mb-1 px-8 font-extrabold text-md md:text-xl text-primary">
        <div className="flex flex-row justify-between">
          <div>
            <img
              src={logo}
              alt="Logo"
              className="md:h-10 h-4 inline-block mr-2 "
            />
            {/* Test Drive */}
          </div>
          <div className="flex items-center gap-2 font-semibold text-black">
            <Link
              to="/"
              className={cn("hover:text-primary", {
                "text-primary": location.pathname === "/",
              })}
            >
              Test Drive
            </Link>

            <Link
              to="/enquiry"
              className={cn("hover:text-primary", {
                "text-primary": location.pathname === "/enquiry",
              })}
            >
              Enquiry
            </Link>
            <Link
              to="/gallery"
              className={cn("hover:text-primary", {
                "text-primary": location.pathname === "/gallery",
              })}
            >
              Gallery
            </Link>
          </div>
        </div>
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
