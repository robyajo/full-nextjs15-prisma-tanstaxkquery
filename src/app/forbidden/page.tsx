import { ArrowLeft, ShieldAlert } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function page() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card className="mx-auto max-w-md">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <ShieldAlert className="h-12 w-12 text-destructive" />
          </div>
          <CardTitle>Access Denied</CardTitle>
          <CardDescription>
            You don't have permission to access this resource.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
            <p>This might happen because:</p>
            <ul className="ml-4 mt-2 list-disc">
              <li>You don't have the required role or permissions</li>
              <li>Your account access level is insufficient</li>
              <li>The resource is restricted to specific users</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button variant="destructive" className="w-full" asChild>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
