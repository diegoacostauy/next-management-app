import {Prisma, Task, TASK_STATUS} from "@prisma/client";
import {cookies} from "next/headers";

import {getUserFromCookie} from "@/lib/auth";
import {db} from "@/lib/db";

import Button from "./Button";
import Card from "./Card";

const tasksDb = Prisma.validator<Prisma.TaskArgs>()({});

type Tasks = Prisma.ProjectGetPayload<typeof tasksDb>;

type Props = {
  title: string;
  tasks: Partial<Tasks>[];
};

const getData = async () => {
  const user = await getUserFromCookie(cookies());
  const tasks = await db.task.findMany({
    where: {
      ownerId: user?.id,
      NOT: {
        status: TASK_STATUS.COMPLETED,
        deleted: false,
      },
    },
    take: 5,
    orderBy: {
      due: "asc",
    },
  });

  return tasks;
};
const TasksCard = async ({title, tasks}: Props) => {
  const data = tasks || (await getData());

  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <span className="text-3xl text-gray-600">{title}</span>
        </div>
        <div>
          <Button className="text-violet-600" intent="text">
            + Create New
          </Button>
        </div>
      </div>
      <div>
        {data && data.length ? (
          <div>
            {data.map((task) => (
              <div key={task.id} className="py-2">
                <div>
                  <span className="text-gray-800">{task.name}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-400">
                    {task.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>no tasks</div>
        )}
      </div>
    </Card>
  );
};

export default TasksCard;
