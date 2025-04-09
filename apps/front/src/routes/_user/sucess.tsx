import SucessPage from "@/components/success-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/sucess")({
  component: SucessPage,
});
