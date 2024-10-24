import { cn } from "@/utils/tailwind-merge";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-mauve-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mauve-7 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-accent-9 text-accent-contrast hover:bg-accent-10 active:brightness-110",
        destructive:
          "bg-red-500 text-stone-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-stone-50 dark:hover:bg-red-900/90",
        outline: "border border-mauve-7 hover:border-mauve-8 active:bg-mauve-4 text-mauve-12 bg-mauve-3",
        secondary: "bg-accent-3 text-accent-11 hover:bg-accent-4 active:bg-accent-5",
        ghost: "text-accent-9 hover:bg-accent-8 hover:text-accent-contrast",
        link: "text-mauve-12 underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
