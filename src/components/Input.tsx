"use client";
import clsx from "clsx";
import {InputHTMLAttributes, useId} from "react";

type InputProps = {
  label?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "id">;

export default function Input({className, label, ...props}: InputProps) {
  const id = useId();

  return (
    <div>
      {label ? <label htmlFor={id}>{label}</label> : null}
      <input
        className={clsx(
          "w-full rounded-3xl border-2 border-solid border-gray-200 px-6 py-2 text-lg",
          className,
        )}
        id={id}
        {...props}
      />
    </div>
  );
}
