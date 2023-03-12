import {NextApiRequest, NextApiResponse} from "next";
import {cookies} from "next/headers";

import {db} from "@/lib/db";
import {getUserFromCookie, validateJWT} from "@/lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method == "POST") {
    try {
      const {name} = req.body;
      const user = await validateJWT(
        req.cookies[process.env.COOKIE_NAME!] as string,
      );
      const project = await db.project.create({
        data: {
          name,
          ownerId: user.id!,
        },
      });

      res.status(200);
      res.json({message: "Project registered succesfully"});
    } catch (e) {
      res.status(400);
      res.json({
        error: {
          code: "400",
          message:
            e instanceof Error
              ? e.message
              : "There was an error creating a project, try again!",
        },
      });
    }
  }
}
