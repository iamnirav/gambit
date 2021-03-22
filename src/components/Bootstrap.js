import classNames from 'classnames';

const d = (name, { className, children, ...props }) => (
  <div className={classNames(name, className)} {...props}>
    {children}
  </div>
);

export const Card = props => d('card', props);
export const CardBody = props => d('card-body', props);
export const Container = ({ fluid, ...props }) =>
  d(fluid ? 'container-fluid' : 'container', props);
