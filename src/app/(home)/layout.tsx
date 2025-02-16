import { Navigation } from "@/components/layouts/home/navigation";
import { Footer } from "@/components/layouts/home/footer";

export default function LayoutHome({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      {children}
      <Footer />
    </div>
  );
}
