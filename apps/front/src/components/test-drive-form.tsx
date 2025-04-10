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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Fetch } from "@/lib/fetcher";
import poster from "@/poster.jpg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { CalendarIcon, CheckCircle, MapPin } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const phoneRegex = /^\+?[0-9]{10,15}$/;

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().regex(phoneRegex, {
    message:
      "Please enter a valid phone number (10-15 digits, may include + prefix).",
  }),
  vehicle: z.string({
    required_error: "Please select a vehicle.",
  }),
  address: z.string({
    required_error: "Please enter a valid address",
  }),
  date: z.date({
    required_error: "Please select a date for your test drive.",
  }),
  location: z.string().min(5, {
    message: "Please enter a valid pickup location.",
  }),
  additionalInfo: z.string().optional(),
});

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

export default function TestDriveForm() {
  const [_isSubmitted, setIsSubmitted] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [_isSuccess, setIsSuccess] = useState(false);

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      code: "",
    },
  });
  const createOTP = useMutation({
    mutationFn: (data: z.infer<typeof otpSchema>) => {
      return Fetch({
        url: "/auth/verify",
        method: "POST",
        data: {
          email: form.getValues("email"),
          code: data,
        },
      });
    },
  });

  // Handle otpForm submission
  const onSubmit = async (data: z.infer<typeof otpSchema>) => {
    setIsVerifying(true);
    console.log(data);
    createOTP.mutate(data);
    setIsSuccess(true);
  };
  // if (isSuccess) {
  //   return navigate({ to: "/sucess" });
  // }
  const createTestDrive = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      Fetch({
        url: "/test-drive-registration",
        method: "POST",
        data: data,
      });
    },
    onSuccess: () => {
      setIsSubmitted(true);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      location: "",
      address: "",
      additionalInfo: "",
    },
  });

  function onTestSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setIsSubmitted(true);
    createTestDrive.mutate(values);
  }

  const vehicles = {
    be11410: "BE11 410",
    be11520: "BE11 520",
    et5620: "ET5 620",
  };
  if (_isSubmitted)
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Verification Code
          </CardTitle>
          <CardDescription className="text-center">
            Enter the 6-digit code sent to {form.getValues("phone")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...otpForm}>
            <form
              onSubmit={otpForm.handleSubmit(onSubmit)}
              className="space-y-6"
            >
              <FormField
                control={otpForm.control}
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
  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-slate-50">
      {/* Form Column */}
      <div className="w-full lg:w-1/2 p-4 md:p-8 lg:p-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Experience Excellence
          </h1>
          <p className="text-slate-600 mb-8">
            Register for a test drive and feel the road like never before.
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onTestSubmit)}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="john.doe@example.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+1234567890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2  gap-2 w-full">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Street, City, State, Zip"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="vehicle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Model</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder="Select a vehicle model"
                              className=""
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="w-full">
                          {Object.entries(vehicles).map(([value, label]) => (
                            <SelectItem key={value} value={value}>
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Showroom Location</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            className="pl-10"
                            placeholder="City or dealership"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Test Drive Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date() ||
                              date >
                                new Date(
                                  new Date().setMonth(new Date().getMonth() + 3)
                                )
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Test Drive Date</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <div className="flex">
                            <div className="relative w-full">
                              <Input
                                type="date"
                                className="w-full pl-10"
                                min={new Date().toISOString().split("T")[0]}
                                max={
                                  new Date(
                                    new Date().setMonth(
                                      new Date().getMonth() + 3
                                    )
                                  )
                                    .toISOString()
                                    .split("T")[0]
                                }
                                onChange={(e) => {
                                  const date = e.target.valueAsDate;
                                  if (date) {
                                    field.onChange(date);
                                  }
                                }}
                                value={
                                  field.value
                                    ? new Date(field.value)
                                        .toISOString()
                                        .split("T")[0]
                                    : ""
                                }
                              />
                              <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            </div>
                          </div>
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Information</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any specific requirements or questions..."
                        className="resize-none"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4">
                <Button type="submit" className="w-full">
                  Submit Registration
                </Button>
              </div>
            </form>
          </Form>

          <div className="mt-6 space-y-2">
            <div className="flex items-center text-sm text-slate-600">
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
              <span>No payment required for test drive registration</span>
            </div>
            <div className="flex items-center text-sm text-slate-600">
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
              <span>Confirmation Message with details will be sent</span>
            </div>
            <div className="flex items-center text-sm text-slate-600">
              <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
              <span>Personalized experience with our experts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Image Column */}
      <div className="w-full lg:w-1/2 bg-slate-900 relative overflow-hidden">
        {/* <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-40 z-10"></div> */}

        {/* Placeholder image - in a real app you would use a real image here */}
        <img
          src={poster}
          alt="Luxury car on a scenic road"
          className="object-cover w-full h-full"
        />

        {/* <div className="absolute bottom-0 left-0 p-8 z-20 text-white">
          <h2 className="text-4xl font-bold mb-2">Drive the Future Today</h2>
          <p className="text-lg max-w-md">
            Experience the perfect blend of luxury, performance, and
            cutting-edge technology.
          </p>
        </div> */}
      </div>
    </div>
  );
}
