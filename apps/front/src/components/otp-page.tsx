// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-otpForm";
// import { z } from "zod";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Fetch } from "@/lib/fetcher";
// import { useMutation } from "@tanstack/react-query";
// import { getRouteApi, useNavigate } from "@tanstack/react-router";
// import { useState } from "react";

// // Define the schema for OTP validation
// const otpSchema = z.object({
//   code: z
//     .string()
//     .length(6, {
//       message: "Verification code must be exactly 6 digits",
//     })
//     .regex(/^\d+$/, {
//       message: "Verification code must contain only numbers",
//     }),
// });

// type MinimalOtpVerificationProps = {
//   email?: string;
//   onSuccess?: () => void;
// };

// export function MinimalOtpVerification(props: any) {
//   const [isVerifying, setIsVerifying] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const navigate = useNavigate();
//   // const route = getRouteApi("/_user/verify");
//   // const { email } = route.useSearch();
//   // Initialize the otpForm with Zod validation
//   const otpForm = useForm<z.infer<typeof otpSchema>>({
//     resolver: zodResolver(otpSchema),
//     defaultValues: {
//       code: "",
//     },
//   });
//   const createOTP = useMutation({
//     mutationFn: (data: z.infer<typeof otpSchema>) => {
//       return Fetch({
//         url: "/auth/verify",
//         method: "POST",
//         data: {
//           email: email,
//           code: data,
//         },
//       });
//     },
//   });

//   // Handle otpForm submission
//   const onSubmit = async (data: z.infer<typeof otpSchema>) => {
//     setIsVerifying(true);
//     console.log(data);
//     createOTP.mutate(data);
//     setIsSuccess(true);
//   };
//   if (isSuccess) {
//     return navigate({ to: "/sucess" });
//   }
//   return (
//     <Card className="w-full max-w-md mx-auto">
//       <CardHeader>
//         <CardTitle className="text-2xl text-center">
//           Verification Code
//         </CardTitle>
//         <CardDescription className="text-center">
//           Enter the 6-digit code sent to {email}
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <Form {...otpForm}>
//           <form onSubmit={otpForm.handleSubmit(onSubmit)} className="space-y-6">
//             <FormField
//               control={otpForm.control}
//               name="code"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Input
//                       placeholder="Enter 6-digit code"
//                       {...field}
//                       maxLength={6}
//                       inputMode="numeric"
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button type="submit" className="w-full" disabled={isVerifying}>
//               {isVerifying ? "Verifying..." : "Verify"}
//             </Button>
//           </form>
//         </Form>
//       </CardContent>
//     </Card>
//   );
// }
