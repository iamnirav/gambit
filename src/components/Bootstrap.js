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

export const Checkbox = ({ checked, onChange, children, id }) => (
  <div className="form-check">
    <input
      className="form-check-input"
      type="checkbox"
      checked={checked}
      onChange={onChange}
      id={id}
    />
    <label className="form-check-label" htmlFor={id}>
      {children}
    </label>
  </div>
);

export const Progress = ({ now, max, children }) => (
  <div className="progress">
    <div
      className="progress-bar"
      role="progressbar"
      aria-valuenow={now}
      aria-valuemin="0"
      aria-valuemax={max}
      style={{ width: `${(now * 100) / max}%` }}
    >
      {children}
    </div>
  </div>
);
