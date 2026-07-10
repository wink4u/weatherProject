import type { HTMLAttributes, ReactNode } from "react";

type BoxVariant = "default" | "selected" | "dark";

type BoxProps = {
  children: ReactNode;
  variant?: BoxVariant;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

const variantStyles: Record<BoxVariant, string> = {
  default:
    "border-white/15 bg-white/10 text-white shadow-[0_8px_30px_rgba(0,0,0,0.18)]",
  selected:
    "border-cyan-300/70 bg-cyan-400/20 text-white shadow-[0_0_24px_rgba(103,232,249,0.2)]",
  dark:
    "border-white/10 bg-slate-950/30 text-white shadow-[0_8px_30px_rgba(0,0,0,0.25)]",
};

export function Box({
  children,
  variant = "default",
  className = "",
  ...props
}: BoxProps) {
  return (
    <div
      className={[
        "rounded-2xl border p-5 backdrop-blur-md transition",
        variantStyles[variant],
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}