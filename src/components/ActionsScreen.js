import marked from 'marked';

import useCharacter from '../hooks/useCharacter';
import ABILITIES from '../game/abilities';
import ACTIONS from '../game/actions';
import { Screen, Icon, Badge } from './';

const ActionsScreen = () => {
  const { character, update } = useCharacter();
  const { abilities, playbook, actionRatings, attributesXP } = character;

  if (!ABILITIES[playbook]) return null;

  const [startingAbility, ...specialAbilities] = ABILITIES[playbook];

  const Ability = ({ name, description, filled }) => (
    <p>
      <Icon
        name={`caret-right${filled ? '-fill' : ''}`}
        onClick={() => {
          const newAbilities = { ...abilities };
          if (newAbilities[name]) {
            delete newAbilities[name];
          } else {
            newAbilities[name] = true;
          }
          update({ abilities: newAbilities });
        }}
      />
      <strong>{name}: </strong>
      <span
        dangerouslySetInnerHTML={{ __html: marked.parseInline(description) }}
      />
    </p>
  );

  return (
    <Screen title="Actions & Abilities">
      <div className="d-flex justify-content-between">
        {ACTIONS.map(({ attribute, actions }) => (
          <div key={attribute}>
            <strong>
              {attribute}{' '}
              {false && (
                <Badge rounded color="secondary">
                  xp: {attributesXP[attribute] || 0} / 6
                </Badge>
              )}
            </strong>
            {actions.map(action => (
              <div key={action}>
                {[0, 1, 2].map(num => (
                  <Icon
                    key={num}
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
      <hr />
      <Ability {...startingAbility} filled={true} />
      {specialAbilities
        .filter(ability => !!abilities[ability.name])
        .map(ability => (
          <Ability key={ability.name} {...ability} filled={true} />
        ))}
      <hr />
      {specialAbilities
        .filter(ability => !abilities[ability.name])
        .map(ability => (
          <Ability key={ability.name} {...ability} />
        ))}
    </Screen>
  );
};

export default ActionsScreen;
