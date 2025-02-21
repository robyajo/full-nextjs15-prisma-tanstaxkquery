import { auth } from "@/auth";
import Header from "@/components/layouts/admin/app-header";
import AppSidebar from "@/components/layouts/admin/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TanstackProvider } from "@/providers/tanstack-provider";
import { Metadata } from "next";
import { redirect } from "next/dist/server/api-utils";
import { cookies } from "next/headers";
import { redirect as nextRedirect } from "next/navigation";
export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_APP_NAME}`,
  description: `${process.env.NEXT_PUBLIC_APP_NAME} is a platform for developers to share and find resources, tools, and projects.`,
};
export default async function LayoutAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "false";
  const session = await auth();
  if (!session) {
    return nextRedirect("/auth");
  }
  return (
    <>
      <SidebarProvider>
        <AppSidebar />

        <SidebarInset>
          <Header />
          {/* page main content */}
          <TanstackProvider>
            <div className="flex flex-1 p-4 md:px-4 bg-background">
              {children}
            </div>
          </TanstackProvider>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
