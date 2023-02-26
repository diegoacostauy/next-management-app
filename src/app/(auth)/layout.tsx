import GlassPane from "@/components/GlassPane";
import "@/assets/global.css";
import Sidebar from "@/components/Sidebar";

export default function AuthRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="h-screen w-screen p-6 rainbow-mesh">
        <GlassPane className="flex h-full w-full items-center justify-center">
          <Sidebar />
          {children}
        </GlassPane>
      </body>
    </html>
  );
}
