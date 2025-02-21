import { ArrowLeft } from "lucide-react";
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

export default function Unauthorized() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle>Unauthorized Access</CardTitle>
          <CardDescription>
            You need to be logged in to access this page. Please sign in to
            continue.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
            If you believe this is a mistake, please contact support for
            assistance.
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" asChild>
            <Link href="/login">Sign In</Link>
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
