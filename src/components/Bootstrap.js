export const Container = ({ children, ...props }) => (
  <div className="container" {...props}>
    {children}
  </div>
);
