import clsx from "clsx";

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "xl" | "lg" | "md" | "sm" | "xs";
  children: React.ReactNode;
  className?: string;
};

export function Heading({
  as: Comp = "h1",
  className,
  children,
  size = "lg",
}: HeadingProps) {
  return (
    <Comp
      className={clsx(
        "font-sans uppercase",
        size === "xl" && "fl-text-4xl/8xl leading-none",
        size === "lg" && "fl-text-4xl/7xl leading-none",
        size === "md" && "fl-text-3xl/5xl leading-none",
        size === "sm" && "fl-text-2xl/4xl leading-none",
        size === "xs" && "fl-text-lg/xl leading-none",
        className
      )}
    >
      {children}
    </Comp>
  );
}
