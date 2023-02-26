type SidebarIcons = {
  settings: string;
  user: string;
  grid: string;
  calendar: string;
};

type SidebarLinkType = {
  label: string;
  icon: keyof SidebarIcons & string;
  url: string;
};
