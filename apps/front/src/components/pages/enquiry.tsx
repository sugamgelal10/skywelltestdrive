import banner from "@/banner.gif";
import EnquiryForm from "./enquiry-form";

const Enquiry = () => {
  return (
    <div>
      <div className="flex justify-center w-full">
        <img src={banner} className="h-full w-full object-cover" />
      </div>
      <main className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-center text-primary ">
          Welcome to Skywell Nepal
        </h1>
        <div className="max-w-4xl container  mx-auto">
          <h1 className="text-xl  text-center font-bold mt-2">
            You Have any questions about Skyellwell Nepal?{" "}
            <span className="text-primary">No Worries! Drop us a message</span>
          </h1>
          <p className="text-sm text-gray-600 mb-6 text-center">
            Take a Skywell test drive in Nepal and enter our exclusive lucky
            draw - one male and one female winner will experience Skywell in
            Europe!
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <EnquiryForm />
        </div>
      </main>
    </div>
  );
};

export default Enquiry;
