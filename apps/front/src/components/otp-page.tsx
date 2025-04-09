import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

// Define the schema for OTP validation
const otpSchema = z.object({
  code: z
    .string()
    .length(6, {
      message: "Verification code must be exactly 6 digits",
    })
    .regex(/^\d+$/, {
      message: "Verification code must contain only numbers",
    }),
});

type MinimalOtpVerificationProps = {
  email?: string;
  onSuccess?: () => void;
};

export function MinimalOtpVerification({
  email = "your email",
  onSuccess,
}: MinimalOtpVerificationProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  // Initialize the form with Zod validation
  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      code: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof otpSchema>) => {
    setIsVerifying(true);
    console.log(data);
    setIsSuccess(true);
  };
  if (isSuccess) {
    return navigate({ to: "/sucess" });
  }
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Verification Code
        </CardTitle>
        <CardDescription className="text-center">
          Enter the 6-digit code sent to {email}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter 6-digit code"
                      {...field}
                      maxLength={6}
                      inputMode="numeric"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isVerifying}>
              {isVerifying ? "Verifying..." : "Verify"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
