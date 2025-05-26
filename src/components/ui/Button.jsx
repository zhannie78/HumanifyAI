import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import PropTypes from 'prop-types';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-blue-500 text-white hover:bg-blue-600',
        outline: 'border border-gray-300 bg-white hover:bg-gray-100',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Button = ({ className, variant, size, asChild = false, ...props }) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
};

Button.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'outline']),
  size: PropTypes.oneOf(['default', 'sm']),
  asChild: PropTypes.bool,
};

export { Button, buttonVariants };