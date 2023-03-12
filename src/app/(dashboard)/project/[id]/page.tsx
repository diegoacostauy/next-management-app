import {cookies} from "next/headers";

import TaskCard from "@/components/TaskCard";
import {getUserFromCookie} from "@/lib/auth";
import {db} from "@/lib/db";

const getData = async (id: string) => {
  const user = await getUserFromCookie(cookies());
  const project = await db.project.findFirst({
    where: {id, ownerId: user?.id},
    include: {
      tasks: true,
    },
  });

  return project;
};

type Params = {
  params: {
    id: string;
  };
};

export default async function ProjectPage({params}: Params) {
  const project = await getData(params.id);

  if (!project) return;

  return (
    <div className="h-full w-full overflow-y-auto pr-6">
      <TaskCard tasks={project.tasks} title={project.name} />
    </div>
  );
}
