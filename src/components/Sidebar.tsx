import Card from "./Card";
import SidebarLink from "./SidebarLink";

const links: SidebarLinkType[] = [
  {label: "Home", icon: "grid", url: "/home"},
  {label: "Calendar", icon: "calendar", url: "/calendar"},
  {label: "Profile", icon: "user", url: "/profile"},
  {label: "Settings", icon: "settings", url: "/settings"},
];

export default function Sidebar() {
  return (
    <Card className="flex h-full w-40 flex-wrap items-center justify-between">
      <>
        <div className="flex w-full items-center justify-center">
          {/* Logo */}
        </div>
        {links.map((l) => (
          <SidebarLink key={l.url} link={l} />
        ))}
      </>
    </Card>
  );
}
