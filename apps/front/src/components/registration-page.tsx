import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download, Filter, Plus } from "lucide-react";
import { RegistrationsTable } from "./registration-table";

export default function RegistrationsPage() {
  return (
    <div className="p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Test Drive Registrations</h1>
          <p className="text-muted-foreground">
            Manage and review all test drive registrations.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Registration
          </Button>
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
