import classNames from 'classnames';
import './MiniHarm.scss';

const MiniHarm = ({ harm }) => {
  return (
    <div className="MiniHarm">
      <div
        className={classNames('level-three', {
          filled: harm.levelThree,
        })}
      />
      <div
        className={classNames('level-two', {
          'filled-left': harm.levelTwoA,
          'filled-right': harm.levelTwoB,
        })}
      />
      <div
        className={classNames('level-one', {
          'filled-left': harm.levelOneA,
          'filled-right': harm.levelOneB,
        })}
      />
    </div>
  );
};

export default MiniHarm;
