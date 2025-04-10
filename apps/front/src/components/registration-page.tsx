import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RegistrationsTable } from "./registration-table";

export default function RegistrationsPage() {
  return (
    <div className="p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">
            Test Drive Registrations
          </h1>
          <p className="text-muted-foreground">
            Manage and review all test drive registrations.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Registrations</CardTitle>
          <CardDescription>
            A list of all test drive registrations with their details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegistrationsTable />
        </CardContent>
      </Card>
    </div>
  );
}
