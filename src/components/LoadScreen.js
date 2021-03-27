import useCharacter from '../hooks/useCharacter';
import { Screen, Checkbox, Progress } from './';
import { COMMON_ITEMS, PLAYBOOK_ITEMS } from '../game/items';

const LoadScreen = () => {
  const { character, update, deleteField } = useCharacter();
  const { playbook, load: characterLoad, items } = character;

  if (!PLAYBOOK_ITEMS[playbook]) return null;

  const itemLoad = Object.values(items).reduce((acc, amt) => acc + amt, 0);

  const Item = ({ name, load }) => (
    <Checkbox
      key={name}
      checked={items[name] !== undefined}
      disabled={items[name] === undefined && itemLoad + load > characterLoad}
      onChange={() => {
        update({
          [`items.${name}`]: items[name] !== undefined ? deleteField() : load,
        });
      }}
      id={`item-${name}`}
    >
      <span className={load ? '' : 'fst-italic'}>
        {name} - {load}
      </span>
    </Checkbox>
  );

  return (
    <Screen title="Items & Load">
      <div className="btn-group mb-3 w-100" role="group" aria-label="load size">
        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          id="btnradio1"
          autoComplete="off"
          checked={characterLoad === 3}
          onChange={() => update({ load: 3 })}
        />
        <label className="btn btn-outline-primary" htmlFor="btnradio1">
          3 light
        </label>

        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          id="btnradio2"
          autoComplete="off"
          checked={characterLoad === 5}
          onChange={() => update({ load: 5 })}
        />
        <label className="btn btn-outline-primary" htmlFor="btnradio2">
          5 normal
        </label>

        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          id="btnradio3"
          autoComplete="off"
          checked={characterLoad === 6}
          onChange={() => update({ load: 6 })}
        />
        <label className="btn btn-outline-primary" htmlFor="btnradio3">
          6 heavy
        </label>
      </div>
      <Progress now={itemLoad} max={characterLoad} />
      <hr />
      {PLAYBOOK_ITEMS[playbook].map(item => (
        <Item key={item.name} {...item} />
      ))}
      <hr />
      {COMMON_ITEMS.map(item => (
        <Item key={item.name} {...item} />
      ))}
    </Screen>
  );
};

export default LoadScreen;
