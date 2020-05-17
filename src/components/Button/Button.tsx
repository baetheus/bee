import { h, FunctionalComponent, JSX } from "preact";

interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  theme?: string;
  hover?: string;
}

export const Button: FunctionalComponent<ButtonProps> = ({
  theme = "ct-primary",
  hover = "ct-secondary-on-hover",
  className,
  children,
  ...props
}) => (
  <button
    class={`${theme} ${hover} bwa-0 bra-1 pwx-4 pwy-3 fld-row flg-3 ai-ctr ${className}`}
    {...props}
  >
    {children}
  </button>
);
