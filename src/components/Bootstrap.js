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

export const Icon = ({ name, ...props }) => (
  <i className={`bi bi-${name}`} {...props} />
);

export const Badge = ({ rounded, color, ...props }) =>
  s(`badge bg-${color} ${rounded ? 'rounded-pill' : ''}`, props);

export const Checkbox = ({ checked, onChange, children, id, disabled }) => (
  <div className="form-check">
    <input
      className="form-check-input"
      type="checkbox"
      checked={checked}
      onChange={onChange}
      id={id}
      disabled={disabled}
    />
    <label className="form-check-label" htmlFor={id}>
      {children}
    </label>
  </div>
);

export const Progress = ({ now, max, add }) => (
  <div className="d-flex">
    {add && (
      <button
        type="button"
        className="btn btn-secondary btn-sm me-2"
        disabled={now <= 0}
        onClick={() => add(-1)}
      >
        <Icon name="chevron-left" />
      </button>
    )}

    <div className="progress flex-fill" style={{ height: 32 }}>
      <div
        className={classNames('progress-bar', {
          'bg-warning': now >= max - 2 && now < max,
          'bg-danger': now === max,
        })}
        role="progressbar"
        aria-valuenow={now}
        aria-valuemin="0"
        aria-valuemax={max}
        style={{ width: `${(now * 100) / max}%` }}
      >
        {now}/{max}
      </div>
    </div>

    {add && (
      <button
        type="button"
        className="btn btn-secondary btn-sm ms-2"
        disabled={now >= max}
        onClick={() => add(1)}
      >
        <Icon name="chevron-right" />
      </button>
    )}
  </div>
);
