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
    {...props}
    class={`${theme} ${hover} bwa-0 bra-1 pwa-4 fld-row flg-3 ai-ctr crsr-pointer z-1 ${className} ${props.class}`}
  >
    {children}
  </button>
);
