import RegistrationsPage from "@/components/registration-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/registrations")({
  component: RegistrationsPage,
});
