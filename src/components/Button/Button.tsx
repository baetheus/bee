import { h, FunctionalComponent, JSX } from "preact";

interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  theme?: string;
  hover?: string;
  radius?: string;
}

export const Button: FunctionalComponent<ButtonProps> = ({
  theme = "ct-primary",
  hover = "ct-secondary-on-hover",
  radius = "bra-1",
  className,
  children,
  ...props
}) => (
  <button
    {...props}
    class={`${theme} ${hover} bwa-0 ${radius} pwa-4 fld-row flg-3 ai-ctr crsr-pointer z-1 ${className} ${props.class}`}
  >
    {children}
  </button>
);
