import "@/assets/global.css";

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head />
      <body className="">{children}</body>
    </html>
  );
}
