import {NextApiRequest, NextApiResponse} from "next";
import {serialize} from "cookie";

import {createJWT, hashPassword} from "@/lib/auth";
import {db} from "@/lib/db";

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method == "POST") {
    try {
      const {firstName, lastName, email, password} = req.body;
      const user = await db.user.create({
        data: {
          firstName,
          lastName,
          email,
          password: await hashPassword(password),
        },
      });

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
      res.json({message: "User registered succesfully"});
    } catch (e) {
      res.status(409);
      res.json({
        error: {
          code: "409",
          message: "User already register!",
        },
      });
    }
  }
}
