import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { AudioWaveform, Command, GalleryVerticalEnd } from "lucide-react";
import * as React from "react";
import NavMenu from "./nav-menu";
import { NavUser } from "./nav-user";
import { auth } from "@/auth";

export const company = {
  name: `${process.env.NEXT_PUBLIC_APP_NAME}`,
  logo: GalleryVerticalEnd,
  plan: "Transaction Rekap",
};

export default async function AppSidebar({ session }: any) {
  return (
    <>
      <Sidebar collapsible="icon" variant="floating">
        <SidebarHeader>
          <div className="flex gap-2 py-2 text-sidebar-accent-foreground ">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <company.logo className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{company.name}</span>
              <span className="truncate text-xs">{company.plan}</span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="overflow-x-hidden">
          <NavMenu />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={session.user as any} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </>
  );
}
