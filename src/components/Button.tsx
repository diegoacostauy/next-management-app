import {cva, VariantProps} from "class-variance-authority";

const buttonClasses = cva(
  [
    "rounded-xl",
    "font-bold",
    "hover:scale-110",
    "active:scale-100",
    "transition",
    "duration-200",
    "ease-in-out",
  ],
  {
    variants: {
      intent: {
        primary: [
          "bg-violet-500",
          "text-white",
          "border-transparent",
          "hover:bg-violet-600",
        ],
        secondary: [
          "bg-white",
          "text-black",
          "border-gray-400",
          "hover:bg-gray-100",
          "border-solid",
          "border-2",
          "border-gray-800",
        ],
        text: ["bg-transparent", "text-black", "hover:bg-gray-100"],
      },
      size: {
        sm: ["text-md", "py-1", "px-2"],
        md: ["text-lg", "py-2", "px-6"],
        lg: ["text-xl", "py-4", "px-8"],
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "md",
    },
  },
);

type ClassProps = VariantProps<typeof buttonClasses>;

export type ButtonOwnProps<E extends React.ElementType> = {
  children: React.ReactNode;
  as?: E;
};

export type ButtonProps<E extends React.ElementType> = ButtonOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof ButtonOwnProps<E>> &
  ClassProps;

const Button = <E extends React.ElementType = "button" | "a">({
  children,
  className,
  intent,
  as,
  size,
  ...props
}: ButtonProps<E>) => {
  const Tag = as || "button";

  return (
    <Tag className={buttonClasses({intent, size, className})} {...props}>
      {children}
    </Tag>
  );
};

export default Button;
