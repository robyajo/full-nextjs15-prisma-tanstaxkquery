import { Heading } from "@/components/layouts/admin/heading";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { BlogPostForm } from "../_components/form/form-post";
export default function Page() {
  return (
    <>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-start justify-between">
          <Heading title="Contacts" description="" />
          <Link
            href="/dashboard/post"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "text-xs md:text-sm"
            )}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Link>
        </div>
        <BlogPostForm />
      </div>
    </>
  );
}
