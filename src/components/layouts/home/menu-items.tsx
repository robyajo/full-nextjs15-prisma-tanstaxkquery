"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Membuat tipe props untuk TypeScript (opsional)
type CustomLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function CustomLink({
  href,
  children,
  className = "",
}: CustomLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`transition-colors hover:text-foreground/80 ${
        pathname === href
          ? "text-foreground font-bold underline"
          : "text-foreground/60"
      } ${className}`}
    >
      {children}
    </Link>
  );
}

export default CustomLink;
