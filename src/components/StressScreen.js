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
        <Badge
          rounded
          color="secondary"
          key={traumaItem}
          style={{ marginLeft: 5 }}
          onClick={() => {
            if (window.confirm(`Remove trauma "${traumaItem}"?`)) {
              update({ trauma: trauma.filter(t => t !== traumaItem) });
            }
          }}
        >
          {traumaItem} <Icon name="x" />
        </Badge>
      ))}
      <Badge
        rounded
        color="secondary"
        style={{ marginLeft: 5 }}
        onClick={() => {
          const input = window.prompt('Add new trauma');
          if (input) {
            update({ trauma: [...trauma, input] });
          }
        }}
      >
        <Icon name="plus" />
      </Badge>

      <h3 className="mt-4">
        &nbsp;
        <MiniHarm harm={harm} /> Harm
      </h3>
      <ul className="list-group">
        <li className="list-group-item">
          <div className="row">
            <div className="col-2 border-end d-flex justify-content-center align-items-center">
              <strong>3</strong>
            </div>
            <div
              className="col-8 border-end d-flex justify-content-center align-items-center"
              onClick={() => {
                const input = window.prompt('Edit harm', harm.levelThree);
                if (typeof input === 'string') {
                  update({ harm: { ...harm, levelThree: input } });
                }
              }}
            >
              {harm.levelThree}
            </div>
            <div className="col-2">
              <strong>need help</strong>
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-2 border-end d-flex justify-content-center align-items-center">
              <strong>2</strong>
            </div>
            <div
              className="col-4 border-end d-flex justify-content-center align-items-center"
              onClick={() => {
                const input = window.prompt('Edit harm', harm.levelTwoA);
                if (typeof input === 'string') {
                  update({ harm: { ...harm, levelTwoA: input } });
                }
              }}
            >
              {harm.levelTwoA}
            </div>
            <div
              className="col-4 border-end d-flex justify-content-center align-items-center"
              onClick={() => {
                const input = window.prompt('Edit harm', harm.levelTwoB);
                if (typeof input === 'string') {
                  update({ harm: { ...harm, levelTwoB: input } });
                }
              }}
            >
              {harm.levelTwoB}
            </div>
            <div className="col-2">
              <strong>-1d</strong>
              <br />
              <br />
            </div>
          </div>
        </li>
        <li className="list-group-item">
          <div className="row">
            <div className="col-2 border-end d-flex justify-content-center align-items-center">
              <strong>1</strong>
            </div>
            <div
              className="col-4 border-end d-flex justify-content-center align-items-center"
              onClick={() => {
                const input = window.prompt('Edit harm', harm.levelOneA);
                if (typeof input === 'string') {
                  update({ harm: { ...harm, levelOneA: input } });
                }
              }}
            >
              {harm.levelOneA}
            </div>
            <div
              className="col-4 border-end d-flex justify-content-center align-items-center"
              onClick={() => {
                const input = window.prompt('Edit harm', harm.levelOneB);
                if (typeof input === 'string') {
                  update({ harm: { ...harm, levelOneB: input } });
                }
              }}
            >
              {harm.levelOneB}
            </div>
            <div className="col-2">
              <strong>less effect</strong>
            </div>
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
