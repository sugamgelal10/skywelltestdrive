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
import { useNavigate } from "@tanstack/react-router";
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
    .length(4, {
      message: "Verification code must be exactly 4 digits",
    })
    .regex(/^\d+$/, {
      message: "Verification code must contain only numbers",
    }),
});

export default function TestDriveForm() {
  const [_isSubmitted, setIsSubmitted] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [_isSuccess, setIsSuccess] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const navigate = useNavigate();

  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      code: "",
    },
  });

  const sendOTP = useMutation({
    mutationFn: ({ phone }: { phone: string }) => {
      return Fetch({
        url: "/visit-otp/send",
        method: "POST",
        data: {
          phoneNumber: phone,
        },
      });
    },
  });

  const createTestDrive = useMutation({
    mutationFn: async () => {
      Fetch({
        url: "/test-drive-registration",
        method: "POST",
        data: {
          firstName: form.getValues("firstName"),
          lastName: form.getValues("lastName"),
          email: form.getValues("email"),
          phone: form.getValues("phone"),
          vehicle: form.getValues("vehicle"),
          location: form.getValues("location"),
          address: form.getValues("address"),
          date: form.getValues("date"),
          additionalInfo: form.getValues("additionalInfo"),
        },
      });
    },

    onSuccess: () => {
      setIsSubmitted(true);
    },
  });

  const verifyOTP = useMutation({
    mutationFn: ({ code }: { code: string }) => {
      return Fetch({
        url: "/visit-otp/verify",
        method: "POST",
        data: {
          phoneNumber: form.getValues("phone"),
          otp: code,
        },
      });
    },
    onSuccess: () => {
      createTestDrive.mutate();
      return navigate({ to: "/sucess" });
    },
  });

  // Handle otpForm submission
  const onSubmit = async (data: z.infer<typeof otpSchema>) => {
    setIsVerifying(true);
    console.log(data);
    verifyOTP.mutate({
      code: otpForm.getValues("code"),
    });
    setIsSuccess(true);
  };

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
    sendOTP.mutate({ phone: form.getValues("phone") });
    setIsSubmitted(true);
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
                        placeholder="Enter 4-digit code"
                        {...field}
                        maxLength={4}
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
    <div className="w-full min-h-screen bg-slate-50">
      <div className="flex flex-col lg:flex-row">
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
        <div className="w-full lg:w-1/2 bg-slate-50 relative overflow-hidden">
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
      <div className=" rounded-lg shadow-md p-6  mx-auto">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          Test Drive Experience: Terms & Conditions
        </h2>

        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-semibold text-slate-700 mb-3">
              Registration & Contact Process
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-slate-600">
                  <span className="font-medium">Complete and submit</span> the
                  test drive registration form with accurate details.
                </p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-slate-600">
                  You will{" "}
                  <span className="font-medium">immediately receive</span> a
                  confirmation SMS thanking you for your registration.
                </p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-slate-600">
                  Our dedicated Sales Team will{" "}
                  <span className="font-medium">
                    contact you within 24 hours
                  </span>{" "}
                  (same day or next working day).
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-slate-700 mb-3">
              Your Test Drive Experience
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-slate-600">
                  Our Sales Team will coordinate with you according to your{" "}
                  <span className="font-medium">scheduled date</span> to arrange
                  your test drive of your desired model.
                </p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-slate-600">
                  Upon completion of your test drive experience, you will
                  receive an{" "}
                  <span className="font-medium">
                    exclusive Test Drive Coupon
                  </span>
                  .
                </p>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-slate-600">
                  Please{" "}
                  <span className="font-medium">keep this coupon safely</span>{" "}
                  as it's required for the lucky draw.
                </p>
              </div>
            </div>
          </section>

          {expanded ? (
            <>
              <section>
                <h3 className="text-lg font-semibold text-slate-700 mb-3">
                  Social Media Participation
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div className="text-slate-600">
                      <p>Share your experience by:</p>
                      <ul className="list-disc ml-8 mt-2 space-y-1">
                        <li>
                          Liking the official{" "}
                          <span className="font-medium">
                            Skywell Nepal-G. Motors
                          </span>{" "}
                          page
                        </li>
                        <li>Posting a picture from your test drive</li>
                        <li>
                          Including the hashtags{" "}
                          <span className="font-medium">#TestDriveSkywell</span>{" "}
                          and{" "}
                          <span className="font-medium">
                            #DriveSkywellNepalToEurope
                          </span>
                        </li>
                        <li>Sharing your post with your network</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-slate-700 mb-3">
                  Lucky Draw
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-slate-600">
                      A <span className="font-medium">live lucky draw</span>{" "}
                      will be conducted to select{" "}
                      <span className="font-medium">two winners</span> (one
                      woman and one man) from all qualified participants.
                    </p>
                  </div>
                </div>
              </section>

              <p className="text-sm italic text-slate-500 pt-2">
                By participating in our test drive program, you agree to these
                terms and conditions. We look forward to providing you with an
                exceptional driving experience!
              </p>

              <button
                onClick={() => setExpanded(false)}
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center w-full mt-2"
              >
                Show Less
              </button>
            </>
          ) : (
            <button
              onClick={() => setExpanded(true)}
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center w-full mt-2"
            >
              Show More Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
