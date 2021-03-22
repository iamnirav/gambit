import useCharacter from '../hooks/useCharacter';
import { Screen, Checkbox, Progress } from './';
import { commonItems, playbookItems } from '../game/items';

const LoadScreen = () => {
  const { character, update } = useCharacter();
  const { playbook, load, items } = character;
  const itemLoad = Object.values(items).reduce((acc, amt) => acc + amt, 0);
  const availableItems = [...(playbookItems[playbook] || []), ...commonItems];
  return (
    <Screen title="Load">
      <div className="btn-group mb-3 w-100" role="group" aria-label="load size">
        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          id="btnradio1"
          autoComplete="off"
          checked={load === 3}
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
          checked={load === 5}
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
          checked={load === 6}
          onChange={() => update({ load: 6 })}
        />
        <label className="btn btn-outline-primary" htmlFor="btnradio3">
          6 heavy
        </label>
      </div>

      <Progress now={itemLoad} max={load}>
        {itemLoad}/{load}
      </Progress>

      {availableItems.map(({ name, load }) => (
        <Checkbox
          key={name}
          checked={items[name] !== undefined}
          onChange={() => {
            const newItems = { ...items };
            if (newItems[name]) {
              delete newItems[name];
            } else {
              newItems[name] = load;
            }
            update({ items: newItems });
          }}
          id={`item-${name}`}
        >
          <span className={load ? '' : 'fst-italic'}>
            {name} - {load}
          </span>
        </Checkbox>
      ))}
    </Screen>
  );
};

export default LoadScreen;
