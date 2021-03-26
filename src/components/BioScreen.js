import useCharacter from '../hooks/useCharacter';
import PLAYBOOKS from '../game/playbooks';
import { COMMON_TRIGGERS, PLAYBOOK_TRIGGERS } from '../game/triggers';
import CONTACTS from '../game/contacts';
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
    <Screen title="Bio & Playbook">
      <dl className="row">
        {FIELDS.map(field => [
          <dt className="col-4 text-end text-capitalize" key={field}>
            {field}
          </dt>,
          <dd
            className="col-8"
            key={field + '-value'}
            onClick={() => {
              const input = window.prompt(`Edit ${field}`, character[field]);
              if (typeof input === 'string') {
                update({ [field]: input });
              }
            }}
          >
            {character[field] || '—'}
          </dd>,
        ])}

        <dt className="col-4 text-end text-capitalize">Cred</dt>
        <dd
          className="col-8"
          onClick={() => {
            const input = window.prompt(`Edit cred`, character.cred);
            if (typeof input === 'string') {
              update({ cred: parseInt(input) });
            }
          }}
        >
          {character.cred}/4
        </dd>

        <dt className="col-4 text-end text-capitalize">Stash</dt>
        <dd
          className="col-8"
          onClick={() => {
            const input = window.prompt(`Edit stash`, character.stash);
            if (typeof input === 'string') {
              update({ stash: parseInt(input) });
            }
          }}
        >
          {character.stash} ({Math.floor(character.stash / 10)} lifestyle)
        </dd>

        <dt className="col-4 text-end">Playbook</dt>
        <dd className="col-8">
          <select
            style={{ marginTop: -2 }}
            className="form-select form-select-sm text-capitalize"
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
        <dt className="col-4 text-end">{CONTACTS[character.playbook].name}</dt>
        <dd className="col-8">
          <ul className="list-group">
            {CONTACTS[character.playbook].contacts.map(contact => (
              <li key={contact.name} className="list-group-item">
                {contact.name}, {contact.description}
              </li>
            ))}
          </ul>
        </dd>
        <dt className="col-4 text-end">XP Triggers</dt>
        <dd className="col-8">
          <ul className="list-group">
            {[PLAYBOOK_TRIGGERS[character.playbook], ...COMMON_TRIGGERS].map(
              trigger => (
                <li key={trigger} className="list-group-item">
                  {trigger}
                </li>
              ),
            )}
          </ul>
        </dd>
      </dl>
    </Screen>
  );
};

export default BioScreen;
