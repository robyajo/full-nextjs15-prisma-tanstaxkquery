"use client";
import Link from "next/link";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-semibold">Halaman Tidak Ditemukan</h2>
        <p className="text-muted-foreground">
          Maaf, kami tidak dapat menemukan halaman yang Anda cari. Mungkin
          halaman telah dipindahkan atau dihapus.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => router.back()}>Kembali</Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Hubungi Kami</Link>
          </Button>
        </div>
        <div className="relative">
          <Input
            type="search"
            placeholder="Cari di situs..."
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}
