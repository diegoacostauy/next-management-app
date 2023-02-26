import clsx from "clsx";
import {PropsWithChildren} from "react";

type CardProps = PropsWithChildren & {
  className: string;
};

export default function Card({className, children}: CardProps) {
  return (
    <div
      className={clsx(
        "rounded-xl bg-white px-10 py-4 drop-shadow-xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
