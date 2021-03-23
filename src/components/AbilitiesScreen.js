import marked from 'marked';

import useCharacter from '../hooks/useCharacter';
import { Screen, Icon } from './';
import ABILITIES from '../game/abilities.js';

const AbilitiesScreen = () => {
  const { character, update } = useCharacter();
  const { abilities, playbook } = character;

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
    <Screen title="Abilities">
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

export default AbilitiesScreen;
