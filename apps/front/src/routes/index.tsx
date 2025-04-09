import { createFileRoute } from "@tanstack/react-router";
import TestDriveForm from "@/components/test-drive-form";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Welcome to Drive Skywell 2025 Nepal To Europe Tour!
      </h1>
      <div className="max-w-2xl mx-auto">
        <TestDriveForm />
      </div>
    </main>
  );
}
