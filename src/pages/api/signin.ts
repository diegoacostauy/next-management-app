import {NextApiRequest, NextApiResponse} from "next";
import {serialize} from "cookie";

import {db} from "@/lib/db";
import {comparePasswords, createJWT} from "@/lib/auth";

export default async function signin(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method == "POST") {
    const {email, password} = req.body;
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      res.status(401);
      res.json({
        error: {
          code: "401",
          message: "Invalid Login",
        },
      });

      return;
    }

    const isUser = await comparePasswords(password, user.password);

    if (isUser) {
      const jwt = await createJWT({id: user.id, email: user.email});

      res.setHeader(
        "Set-Cookie",
        serialize(process.env.COOKIE_NAME as string, jwt, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        }),
      );
      res.status(201);
      res.json({message: "User logged in succesfully"});
    } else {
      res.status(401);
      res.json({
        error: {
          code: "401",
          message: "Invalid Login",
        },
      });
    }
  } else {
    res.status(401);
    res.json({
      error: {
        code: "401",
        message: "Unauthorized",
      },
    });
  }
}
