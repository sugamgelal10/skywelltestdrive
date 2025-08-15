import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EnquiryTable } from "./enquiry-table";

export default function EnquiryAdmin() {
  return (
    <div className="p-6 ">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Enquiry</h1>
          <p className="text-muted-foreground">Review all Enquiry.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Enquiry</CardTitle>
          <CardDescription>
            A list of all Enquiry with their details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full ">
            <EnquiryTable />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
