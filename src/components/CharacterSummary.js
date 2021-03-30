import useCharacter from '../hooks/useCharacter';
import { Icon, MiniHarm } from './';
import ACTIONS from '../game/actions';

const CharacterSummary = () => {
  const { character } = useCharacter();
  if (!character.name) return null;
  const { actionRatings } = character;
  const itemLoad = Object.values(character.items).reduce(
    (acc, amt) => acc + amt,
    0,
  );
  return (
    <div className="CharacterSummary p-3">
      <h1>{character.alias || character.name}</h1>
      <div className="d-flex justify-content-around">
        <div className="p-1">{character.playbook}</div>
        <div className="p-1">
          <Icon name="slash-circle" /> {character.cred}/4
        </div>
        <div className="p-1">
          <Icon name="speedometer" /> {character.stress}/9
        </div>
        <div className="p-1 align-middle">
          <Icon name="box-seam" /> {itemLoad}/{character.load}
        </div>
        <div className="p-1">
          <MiniHarm harm={character.harm} />
        </div>
      </div>

      <div className="d-flex justify-content-around">
        {ACTIONS.map(({ attribute, actions }) => (
          <div key={attribute}>
            <div>
              <strong>{attribute}</strong>
            </div>
            {actions.map(action => (
              <div key={action}>
                {[0, 1, 2].map(num => (
                  <Icon
                    key={num}
                    style={{ marginLeft: -4 }}
                    name={`caret-right${
                      actionRatings[action] > num ? '-fill' : ''
                    }`}
                  />
                ))}
                <strong>{action}</strong>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterSummary;
