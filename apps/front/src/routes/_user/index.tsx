import { createFileRoute } from "@tanstack/react-router";
import TestDriveForm from "@/components/test-drive-form";
import banner from "@/banner.gif";

export const Route = createFileRoute("/_user/")({
  component: App,
});

function App() {
  return (
    <div>
      <div className="flex justify-center w-full">
        <img src={banner} className="h-full w-full object-cover" />
      </div>
      <main className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-center text-primary ">
          Welcome to Drive Skywell 2025 Nepal To Europe Tour!
        </h1>
        <div className="max-w-4xl container  mx-auto">
          <h1 className="text-xl  text-center font-bold mt-2">
            Test Drive in Nepal,{" "}
            <span className="text-primary">Win a Trip to Europe!</span>
          </h1>
          <p className="text-sm text-gray-600 mb-6 text-center">
            Take a Skywell test drive in Nepal and enter our exclusive lucky
            draw - one male and one female winner will experience Skywell in
            Europe!
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <TestDriveForm />
        </div>
      </main>
    </div>
  );
}
