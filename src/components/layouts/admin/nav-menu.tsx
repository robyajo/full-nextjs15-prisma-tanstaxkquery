"use client";
import React from "react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { navDashboard as originalNavDashboard } from "@/constants/data";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";
import { Icons } from "@/components/icons";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function NavMenu() {
  const pathname = usePathname();

  // Update isActive berdasarkan pathname
  const navDashboard = originalNavDashboard.map((item) => {
    const isActive =
      pathname === item.url ||
      item.items?.some((subItem) => pathname === subItem.url);
    return { ...item, isActive };
  });

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Overview</SidebarGroupLabel>
      <SidebarMenu>
        {navDashboard.map((item) => {
          const Icon = item.icon
            ? Icons[item.icon as keyof typeof Icons]
            : Icons.logo;

          return item?.items && item?.items.length > 0 ? (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={item.isActive}
                  >
                    {item.icon && <Icon />}
                    <span>{item.title}</span>
                    <ChevronRight
                      className={`ml-auto transition-transform duration-200 ${
                        item.isActive ? "rotate-90" : ""
                      }`}
                    />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={pathname === subItem.url}
                        >
                          <Link href={subItem.url}>
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                isActive={pathname === item.url}
              >
                <Link href={item.url}>
                  <Icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
