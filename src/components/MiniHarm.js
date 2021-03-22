import classNames from 'classnames';
import './MiniHarm.scss';

const MiniHarm = ({ harm }) => {
  return (
    <div className="MiniHarm d-inline-block">
      <div
        className={classNames('level-three', {
          filled: harm.levelThree,
        })}
      />
      <div
        className={classNames('level-two', {
          'filled-left': harm.levelTwo && harm.levelTwo[0],
          'filled-right': harm.levelTwo && harm.levelTwo[1],
        })}
      />
      <div
        className={classNames('level-one', {
          'filled-left': harm.levelOne && harm.levelOne[0],
          'filled-right': harm.levelOne && harm.levelOne[1],
        })}
      />
    </div>
  );
};

export default MiniHarm;
