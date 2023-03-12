import {cookies} from "next/headers";
import Link from "next/link";
import {Suspense} from "react";
import {Project} from "@prisma/client";

import {db} from "@/lib/db";
import {getUserFromCookie} from "@/lib/auth";
import {delay} from "@/lib/async";
import Greetings from "@/components/Greetings";
import GreetingsSkeleton from "@/components/GreetinsSkeleton";
import ProjectCard from "@/components/ProjectCard";
import TasksCard from "@/components/TaskCard";
import NewProject from "@/components/NewProject";

const getData = async () => {
  await delay(2000);
  const user = await getUserFromCookie(cookies());
  const projects = await db.project.findMany({
    where: {
      ownerId: user?.id,
    },
    include: {
      tasks: true,
    },
  });

  return {projects};
};

export default async function Page() {
  const {projects} = await getData();

  return (
    <div className="h-full w-full overflow-y-auto pl-6">
      <div className=" h-full  min-h-[content] items-stretch justify-center">
        <div className="flex flex-1 grow">
          <Suspense fallback={<GreetingsSkeleton />}>
            {/* @ts-expect-error Server Component */}
            <Greetings />
          </Suspense>
        </div>
        <div className="-m-3 mt-3 flex grow flex-wrap items-center ">
          {projects.map((project: Project) => (
            <div key={project.id} className="w-1/3 p-3">
              <Link href={`/project/${project.id}`}>
                <ProjectCard project={project} />
              </Link>
            </div>
          ))}
          <div className="w-1/3 p-3">
            <NewProject />
          </div>
        </div>
        <div className="mt-6 flex w-full grow">
          <div className="w-full">
            <div className="mt-6 flex w-full grow">
              <div className="w-full">
                {/* @ts-expect-error Server Component */}
                <TasksCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
