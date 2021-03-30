import marked from 'marked';

import useCharacter from '../hooks/useCharacter';
import ABILITIES from '../game/abilities';
import ACTIONS from '../game/actions';
import { Screen, Icon } from './';

const ActionsScreen = () => {
  const { character, update, addToArray, removeFromArray } = useCharacter();
  const { playbook, actionRatings, attributesXP } = character;
  const abilities = character.abilities.reduce((acc, ability) => {
    acc[ability] = true;
    return acc;
  }, {});
  const [startingAbility, ...specialAbilities] = ABILITIES[playbook];

  const Ability = ({ name, description, filled }) => (
    <p>
      <Icon
        name={`caret-right${filled ? '-fill' : ''}`}
        onClick={() => {
          if (name === startingAbility.name) return;

          if (
            window.confirm(
              `${abilities[name] ? 'Remove' : 'Add'} ability "${name}"?`,
            )
          ) {
            update({
              abilities: abilities[name]
                ? removeFromArray(name)
                : addToArray(name),
            });
          }
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
      <div className="d-flex justify-content-between text-capitalize">
        {ACTIONS.map(({ attribute, actions }) => (
          <div key={attribute}>
            <div
              onClick={() => {
                const input = window.prompt(
                  `Edit ${attribute} XP`,
                  attributesXP[attribute] || 0,
                );
                if (input) {
                  const xp = parseInt(input);
                  if (xp >= 0 && xp <= 6) {
                    update({ [`attributesXP.${attribute}`]: xp });
                  }
                }
              }}
            >
              <strong>{attribute}</strong>
              <div>XP: {attributesXP[attribute] || 0}/6</div>
            </div>
            {actions.map(action => (
              <div
                key={action}
                onClick={() => {
                  const input = window.prompt(
                    `Edit ${action} rating`,
                    actionRatings[action],
                  );
                  if (input) {
                    const rating = parseInt(input);
                    if (rating >= 0 && rating <= 3) {
                      update({ [`actionRatings.${action}`]: rating });
                    }
                  }
                }}
              >
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
