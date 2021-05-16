import * as React from 'react';

type Props = {
  children: React.ReactNode;
};

const RefWrapper = React.forwardRef<HTMLDivElement, Props>(
  ({ ...props }, ref) => {
    return <div ref={ref} {...props} />;
  }
);

export default RefWrapper;
