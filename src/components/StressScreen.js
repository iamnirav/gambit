import useCharacter from '../hooks/useCharacter';
import { Screen, Badge, Checkbox, Progress, Icon, MiniHarm } from './';

const StressScreen = () => {
  const { character, update } = useCharacter();
  const { stress, trauma, harm, healing, armor } = character;
  return (
    <Screen title="Stress & Harm">
      <h3 className="mt-4">
        <Icon name="speedometer" /> Stress
      </h3>
      <Progress
        now={stress}
        max={9}
        add={diff => update({ stress: stress + diff })}
      />

      <h3 className="mt-4">
        <Icon name="lightning" /> Trauma
      </h3>
      {trauma.map(traumaItem => (
        <Badge rounded color="secondary" key={traumaItem}>
          {traumaItem}
        </Badge>
      ))}

      <h3 className="mt-4">
        &nbsp;
        <MiniHarm harm={harm} /> Harm
      </h3>
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
      <h4 className="mt-3">
        <Icon name="plus-square" /> Recovery
      </h4>
      <Progress
        now={healing}
        max={6}
        add={diff => update({ healing: healing + diff })}
      />

      <h3 className="mt-4">
        <Icon name="shield" /> Armor
      </h3>
      {['standard', 'heavy', 'special'].map(type => (
        <Checkbox
          key={type}
          checked={!!armor[type]}
          onChange={() => update({ armor: { ...armor, [type]: !armor[type] } })}
          id={`armor-${type}`}
        >
          {type} armor
        </Checkbox>
      ))}
    </Screen>
  );
};

export default StressScreen;
