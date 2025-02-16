"use client";
import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumbs } from "@/components/breadcrumbs";
import ThemeToggle from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  fixed?: boolean;
  ref?: React.Ref<HTMLElement>;
}

export default function Header({
  className,
  fixed,
  children,
  ...props
}: HeaderProps) {
  return (
    <div className="sticky top-0 z-40 w-full ">
      <div className="px-1 md:px-4 ">
        <header
          className={cn(
            "flex z-40 rounded-lg border bg-sidebar shadow-md mt-2 h-14 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="hidden md:flex">
              <Breadcrumbs />
            </div>
            <div className="flex md:hidden">S</div>
          </div>

          <div className="flex items-center gap-2 px-4">
            <div className="hidden md:flex">S</div>
            <ThemeToggle />
          </div>
        </header>
      </div>
    </div>
  );
}
