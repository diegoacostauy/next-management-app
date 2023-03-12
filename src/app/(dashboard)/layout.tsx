import "@/assets/global.css";
import GlassPane from "@/components/GlassPane";
import Sidebar from "@/components/Sidebar";

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head />
      <body className="h-screen w-screen p-6 candy-mesh">
        <GlassPane className="flex h-full w-full items-center justify-center">
          <Sidebar />
          {children}
        </GlassPane>
        <div id="modal" />
      </body>
    </html>
  );
}
