import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "@tanstack/react-router";

const SucessPage = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Registration Successful!
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-10">
        <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
        <p className="text-center text-lg mb-2">
          Thank you for registering for a test drive to Europe.
        </p>
        <p className="text-center text-muted-foreground">
          We will contact you shortly to confirm your appointment details.
        </p>
      </CardContent>
      <CardFooter>
        <Link to="/" className="w-full justify-center">
          <Button className="w-full">Register Another Test Drive</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SucessPage;
