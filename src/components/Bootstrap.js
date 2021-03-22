import classNames from 'classnames';

const d = (name, { className, children, ...props }) => (
  <div className={classNames(name, className)} {...props}>
    {children}
  </div>
);

const s = (name, { className, children, ...props }) => (
  <div className={classNames(name, className)} {...props}>
    {children}
  </div>
);

export const Card = props => d('card', props);
export const CardBody = props => d('card-body', props);
export const Container = ({ fluid, ...props }) =>
  d(fluid ? 'container-fluid' : 'container', props);

export const Icon = ({ name }) => <i className={`bi bi-${name}`} />;

export const Badge = ({ rounded, color, ...props }) =>
  s(`badge bg-${color} ${rounded ? 'rounded-pill' : ''}`, props);
