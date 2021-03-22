import useCharacter from '../hooks/useCharacter';
import { Screen, Badge } from './';

const StressScreen = () => {
  const { character } = useCharacter();
  const { stress, trauma, harm, healing, armor } = character;
  return (
    <Screen title="Stress & Harm">
      <h3 className="mt-4">Stress</h3>
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          aria-valuenow={stress}
          aria-valuemin="0"
          aria-valuemax="9"
          style={{ width: `${stress / 0.09}%` }}
        >
          {stress}/9
        </div>
      </div>
      <h3 className="mt-4">Trauma</h3>
      {trauma.map(traumaItem => (
        <Badge rounded color="secondary" key={traumaItem}>
          {traumaItem}
        </Badge>
      ))}
      <h3 className="mt-4">Harm</h3>
      <ul className="list-group">
        <li className="list-group-item">
          <div className="row">
            <div className="col-2 border-end">3</div>
            <div className="col-8 border-end">{harm.levelThree}</div>
            <div className="col-2">need help</div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-2 border-end">2</div>
            <div className="col-4 border-end">
              {harm.levelTwo && harm.levelTwo[0]}
            </div>
            <div className="col-4 border-end">
              {harm.levelTwo && harm.levelTwo[1]}
            </div>
            <div className="col-2">
              -1d
              <br />
              <br />
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-2 border-end">1</div>
            <div className="col-4 border-end">
              {harm.levelOne && harm.levelOne[0]}
            </div>
            <div className="col-4 border-end">
              {harm.levelOne && harm.levelOne[1]}
            </div>
            <div className="col-2">less effect</div>
          </div>
        </li>
      </ul>
      <h4 className="mt-3">Recovery</h4>
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          aria-valuenow={healing}
          aria-valuemin="0"
          aria-valuemax="9"
          style={{ width: `${healing / 0.06}%` }}
        >
          {healing}/6
        </div>
      </div>
      <h3 className="mt-4">Armor</h3>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value={!!armor.standard}
          id="armor.standard"
        />
        <label className="form-check-label" htmlFor="armor.standard">
          Standard Armor
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value={!!armor.heavy}
          id="armor.heavy"
        />
        <label className="form-check-label" htmlFor="armor.heavy">
          Heavy Armor
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value={!!armor.special}
          id="armor.special"
        />
        <label className="form-check-label" htmlFor="armor.special">
          Special Armor
        </label>
      </div>
    </Screen>
  );
};

export default StressScreen;
