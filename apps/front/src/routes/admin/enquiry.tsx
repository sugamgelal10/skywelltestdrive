import EnquiryAdmin from "@/components/admin-pages/enquiry";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/enquiry")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <EnquiryAdmin />
    </div>
  );
}
