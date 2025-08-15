import Enquiry from "@/components/pages/enquiry";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/enquiry")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Enquiry />
    </div>
  );
}
