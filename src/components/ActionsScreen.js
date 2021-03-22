import useCharacter from '../hooks/useCharacter';
import { Screen, Icon, Badge } from './';

const ATTRIBUTES = [
  { attribute: 'insight', actions: ['doctor', 'hack', 'study', 'rig'] },
  { attribute: 'prowess', actions: ['helm', 'scrap', 'scramble', 'skulk'] },
  { attribute: 'resolve', actions: ['attune', 'command', 'consort', 'sway'] },
];

const ActionsScreen = () => {
  const { character } = useCharacter();
  const { actionRatings, attributesXP } = character;
  return (
    <Screen title="Action Ratings">
      {ATTRIBUTES.map(({ attribute, actions }) => (
        <div key={attribute}>
          <h3>
            {attribute}{' '}
            <Badge rounded color="secondary">
              xp: {attributesXP[attribute] || 0} / 6
            </Badge>
          </h3>
          {actions.map(action => (
            <div className="row" key={action}>
              <div className="col-3 text-end">
                {[0, 1, 2].map(num => (
                  <Icon
                    key={num}
                    name={`caret-right${
                      actionRatings[action] > num ? '-fill' : ''
                    }`}
                  />
                ))}
              </div>
              <div className="col">
                <h5 key={action}>{action}</h5>
              </div>
            </div>
          ))}
        </div>
      ))}
    </Screen>
  );
};

export default ActionsScreen;
