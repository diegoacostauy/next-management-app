"use client";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {SyntheticEvent, useCallback, useReducer, useState} from "react";

import {register, signin} from "@/lib/api";

import Button from "./Button";
import Card from "./Card";
import Input from "./Input";

const registerContent = {
  linkUrl: "/signin",
  linkText: "Already have an account?",
  header: "Create new account",
  subheader: "Just a few things to get started",
  buttonText: "Register",
};

const signinContent = {
  linkUrl: "/register",
  linkText: "Don't have an account?",
  header: "Welcome back",
  subheader: "Enter your credentials to access your account?",
  buttonText: "Sign In",
};

type FormState = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

type FormAction = {
  type: `update-${keyof FormState}`;
  payload: string;
};

const INITIAL_STATE: FormState = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
};

const formReducer = (state: FormState = INITIAL_STATE, action: FormAction) => {
  if (action.type == "update-email") {
    return {
      ...state,
      email: action.payload,
    };
  }

  if (action.type == "update-password") {
    return {
      ...state,
      password: action.payload,
    };
  }

  if (action.type == "update-firstName") {
    return {
      ...state,
      firstName: action.payload,
    };
  }

  if (action.type == "update-lastName") {
    return {
      ...state,
      lastName: action.payload,
    };
  }

  return state;
};

export default function AuthForm({mode}: {mode: "register" | "signin"}) {
  const [{firstName, lastName, email, password}, dispatch] = useReducer(
    formReducer,
    INITIAL_STATE,
  );
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = useCallback(
    async (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        if (mode == "register") {
          await register({firstName, lastName, email, password});
        } else {
          await signin({email, password});
        }
        router.replace("/home");
      } catch (e) {
        if (e instanceof Error) {
          setError(`${e.message}`);
        }
      }
    },
    [firstName, lastName, email, password, mode, router],
  );

  const content = mode === "register" ? registerContent : signinContent;

  return (
    <Card>
      <div className="w-full">
        <div className="text-center">
          <h2 className="mb-2 text-3xl">{content.header}</h2>
          <p className="text-lg text-black/25">{content.subheader}</p>
        </div>
        <form action="" className="w-full py-10" onSubmit={handleSubmit}>
          {error && error}
          {mode == "register" && (
            <div className="mb-8 flex justify-between">
              <div className="pr-2">
                <Input
                  required
                  className="w-full rounded-3xl border-2 border-solid border-gray-200 px-6 py-2 text-lg"
                  label="First Name"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) =>
                    dispatch({
                      type: "update-firstName",
                      payload: e.target.value,
                    })
                  }
                />
              </div>
              <div className="pl-2">
                <Input
                  required
                  className="w-full rounded-3xl border-2 border-solid border-gray-200 px-6 py-2 text-lg"
                  label="Last Name"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) =>
                    dispatch({
                      type: "update-lastName",
                      payload: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}
          <div className="mb-8">
            <Input
              required
              className="w-full rounded-3xl border-2 border-solid border-gray-200 px-6 py-2 text-lg"
              label="Email"
              placeholder="johndoe@gmail.com"
              type="email"
              value={email}
              onChange={(e) =>
                dispatch({
                  type: "update-email",
                  payload: e.target.value,
                })
              }
            />
          </div>
          <div className="mb-8">
            <Input
              required
              className="w-full rounded-3xl border-2 border-solid border-gray-200 px-6 py-2 text-lg"
              label="Password"
              placeholder="johndoe@gmail.com"
              type="password"
              value={password}
              onChange={(e) =>
                dispatch({
                  type: "update-password",
                  payload: e.target.value,
                })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Link className="font-bold text-blue-600" href={content.linkUrl}>
                {content.linkText}
              </Link>
            </div>
            <div>
              <Button intent="secondary" type="submit">
                {content.buttonText}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
}
