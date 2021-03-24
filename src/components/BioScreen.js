import useCharacter from '../hooks/useCharacter';
import PLAYBOOKS from '../game/playbooks';
import { Screen } from './';

const FIELDS = [
  'alias',
  'name',
  'pronouns',
  'look',
  'heritage',
  'background',
  'vice',
];

const BioScreen = () => {
  const { character, update } = useCharacter();
  return (
    <Screen title="Bio">
      <dl className="row">
        {FIELDS.map(field => [
          <dt className="col-4 text-end" key={field}>
            {field}
          </dt>,
          <dd
            className="col-8"
            key={field + '-value'}
            onClick={() => {
              const input = window.prompt(field, character[field]);
              if (input) {
                update({ [field]: input });
              }
            }}
          >
            {character[field] || '—'}
          </dd>,
        ])}
        <dt className="col-4 text-end">playbook</dt>
        <dd className="col-8">
          <select
            style={{ marginTop: -2 }}
            className="form-select form-select-sm"
            aria-label="playbook selector"
            value={character.playbook}
            onChange={evt => {
              if (
                window.confirm(
                  `Change playbook from ${character.playbook} to ${evt.target.value}?`,
                )
              ) {
                update({ playbook: evt.target.value });
              }
            }}
          >
            {PLAYBOOKS.map(playbook => (
              <option key={playbook} value={playbook}>
                {playbook}
              </option>
            ))}
          </select>
        </dd>
      </dl>
    </Screen>
  );
};

export default BioScreen;
