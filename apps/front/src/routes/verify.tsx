import { MinimalOtpVerification } from "@/components/otp-page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/verify")({
  component: MinimalOtpVerification,
});
