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

type TASK_STATUS = "NOT_STARTED" | "STARTED" | "COMPLETED";

type ApiError = {
  code: string;
  message: string;
};

type ApiErrorResponse = {
  error: ApiError;
};

type Project = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  ownerId: string;
  owner: User;
  description?: string;
  due?: Date;
  deleted: boolean;
  tasks: Task[];
};

type Tasks = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: TASK_STATUS;
  name: string;
  description?: string;
  due?: Date;
  deleted: boolean;
  projectId: string;
  project: Project;
  ownerId: string;
  owner: User;
};

type User = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  projects: Project[];
  tasks: Task[];
};
