import { MinimalOtpVerification } from "@/components/otp-page";
import { createFileRoute } from "@tanstack/react-router";
import { fallback, zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";
const otpVerifySchema = z.object({
  email: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/_user/verify")({
  validateSearch: zodValidator(otpVerifySchema),
  component: MinimalOtpVerification,
});
