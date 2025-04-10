import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Fetch } from "@/lib/fetcher";
import { useAuth } from "@/provider/use-auth";
import type { JWTS } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Navigate, redirect } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/login")({
  beforeLoad({ context }) {
    const { auth } = context;
    if (auth?.isAuthenticated) {
      throw redirect({
        to: "/admin",
      });
    }
  },
  component: LoginForm,
});

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
type LoginData = z.infer<typeof LoginSchema>;
function LoginForm() {
  const { isAuthenticated, setJwts } = useAuth();
  const loginForm = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const mutation = useMutation({
    mutationFn: async (data: LoginData) => {
      try {
        const res = await Fetch<JWTS>({
          url: "/auth/signin",
          method: "POST",
          data: data,
        });

        setJwts(res);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error(error?.message);
        console.error("Error during login:", error);
      }
    },
  });

  const onSubmit = (data: LoginData) => {
    mutation.mutate(data);
  };
  if (isAuthenticated) {
    return <Navigate to={"/admin"} />;
  }

  return (
    <div className="h-[100dvh] flex  flex-col items-center justify-center bg-primary text-white">
      <div className="text-xl text-center">
        Sign in to <br />
        <span className=" font-bold text-2xl bg-gradient-to-r from-red-600 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Sky Well Test Drive
        </span>
      </div>

      <Form {...loginForm}>
        <form
          className="flex flex-col gap-4"
          onSubmit={loginForm.handleSubmit(onSubmit)}
        >
          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="......" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="bg-gradient-to-r from-blue-600 via-purple-400 to-pink-300 ">
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default LoginForm;
