import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const spinnerVariants = cva('animate-spin rounded-full border-4 border-solid border-current border-r-transparent', {
  variants: {
    size: {
      sm: 'h-4 w-4',
      md: 'h-8 w-8',
      lg: 'h-12 w-12',
      xl: 'h-24 w-24',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string;
}

export const Spinner = ({ size, className }: SpinnerProps) => {
  return <div role="status" className={cn(spinnerVariants({ size }), className)} />;
};
