import bcrypt from "bcrypt";
import {SignJWT, jwtVerify} from "jose";

import {db} from "./db";

export const hashPassword = (password: string) => bcrypt.hash(password, 10);

export const comparePasswords = (plainPassword: string, hashPassword: string) =>
  bcrypt.compare(plainPassword, hashPassword);

export const createJWT = ({id, email}: Partial<User>) => {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7;

  return new SignJWT({payload: {id, email}})
    .setProtectedHeader({
      alg: "HS256",
      typ: "JWT",
    })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
};

export const validateJWT = async (jwt: string) => {
  const {payload} = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET),
  );

  return payload.payload as Partial<User>;
};

export const getUserFromCookie = async (cookies) => {
  const jwt = cookies.get(process.env.COOKIE_NAME);
  const {id} = await validateJWT(jwt.value);
  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  return user;
};
