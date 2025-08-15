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
import { CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const phoneRegex = /^\+?[0-9]{10,15}$/;

const formSchema = z.object({
  name: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  address: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().regex(phoneRegex, {
    message:
      "Please enter a valid phone number (10-15 digits, may include + prefix).",
  }),
  model: z.string().min(1, "Model is Required"),
  remarks: z.string().optional(),
});

export default function EnquiryForm() {
  const createEnquiry = useMutation({
    mutationFn: async () => {
      Fetch({
        url: "/enquiry",
        method: "POST",
        data: {
          name: form.getValues("name"),
          email: form.getValues("email"),
          phone: form.getValues("phone"),
          model: form.getValues("model"),
          address: form.getValues("address"),
          remarks: form.getValues("remarks"),
        },
      });
    },

    onSuccess: () => {
      toast.success("Enquiry created successfully");
      resetForm();
      //   navigate({ to: "/sucess" });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      remarks: "",
      address: "",
      model: "",
    },
  });

  const resetForm = () => {
    form.reset();
    form.setValue("model", "");
  };

  function onTestSubmit() {
    createEnquiry.mutate();
  }

  const vehicles = {
    be11410: "BE11 410",
    be11520: "BE11 520",
    et5620: "ET5 620",
  };
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
              Register the Enquiry and feel the road like never before.
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onTestSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="name"
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
                    name="model"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vehicle Model</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
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

                <FormField
                  control={form.control}
                  name="remarks"
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
              {/* <div className="flex items-center text-sm text-slate-600">
                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                <span>Confirmation Message with details will be sent</span>
              </div> */}
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
      {/* <div className=" rounded-lg shadow-md p-6  mx-auto">
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
                          Like the official{" "}
                          <span className="font-medium">
                            Skywell Nepal-G. Motors
                          </span>{" "}
                          page
                        </li>
                        <li>Post a picture from your test drive</li>
                        <li>
                          Include the hashtags{" "}
                          <span className="font-medium">#TestDriveSkywell</span>{" "}
                          and{" "}
                          <span className="font-medium">
                            #DriveSkywellNepalToEurope
                          </span>
                        </li>
                        <li>Share your post with your network</li>
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
              <p className="text-[6px] italic text-slate-500 pt-2">
                *Data collected here will be used for different purpose.
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
      </div> */}
    </div>
  );
}
