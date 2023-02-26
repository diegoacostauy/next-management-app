import clsx from "clsx";

type GlassPane = {
  children: React.ReactNode;
  className?: string;
};

export default function GlassPane({children, className}: GlassPane) {
  return (
    <div className={clsx("rounded-2xl border-2 border-solid border-gray-200 glass", className)}>
      {children}
    </div>
  );
}
