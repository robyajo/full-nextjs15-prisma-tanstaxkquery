import Header from "@/components/layouts/admin/app-header";
import AppSidebar from "@/components/layouts/admin/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TanstackProvider } from "@/providers/tanstack-provider";
import { cookies } from "next/headers";
export default async function LayoutAdmin({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "false";
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
