"use client";
import NextLink from "next/link";
import {Settings, User, Grid, Calendar} from "react-feather";
import {usePathname} from "next/navigation";
import clsx from "clsx";

const icons = {
  settings: Settings,
  user: User,
  grid: Grid,
  calendar: Calendar,
};

export default function SidebarLink({link}: {link: SidebarLinkType}) {
  const pathname = usePathname();
  let isActive = false;

  if (pathname == link.url) {
    isActive = true;
  }

  const Icon = icons[link.icon];

  return (
    <NextLink
      className="flex w-full items-center justify-center"
      href={link.url}
    >
      <Icon
        className={clsx(
          "stroke-gray-400 transition duration-200 ease-in-out hover:stroke-violet-600",
          isActive && "stroke-violet-600",
        )}
      />
    </NextLink>
  );
}
