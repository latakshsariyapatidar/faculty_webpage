import React from 'react';

const ScrollSection = React.forwardRef(({ id, children }, ref) => {
  return (
    <section
      id={id}
      ref={ref}
      className="min-h-screen scroll-mt-20"
    >
      {children}
    </section>
  );
});

export default ScrollSection;