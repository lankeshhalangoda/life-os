import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-[var(--radius-ui)] border text-sm font-medium tracking-tight transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-[#5a3d2b] bg-[#5a3d2b] text-[#f9f4ea] hover:bg-[#4d3324] hover:border-[#4d3324]",
        outline: "border-[#cdbca4] bg-[#f9f4ea] text-[#3b2a1e] hover:bg-[#efe3d2]",
        subtle: "border-[#d9cab4] bg-[#ece0d1] text-[#5a3d2b] hover:bg-[#e3d4c0]",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-10 px-3",
        lg: "h-10 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
