import { useState, useEffect } from 'react';
import useCharacter from '../hooks/useCharacter';
import { Container, Icon } from './';
import PLAYBOOKS from '../game/playbooks';
import NEW_CHARACTER from '../game/character';
import { STARTING_RATINGS } from '../game/actions';
import { db, CHAR_ID_STORAGE_KEY } from '../Data';

const CharacterSelect = () => {
  const { character } = useCharacter();
  const [recents, setRecents] = useState([]);
  const [playbookSelect, setPlaybookSelect] = useState('placeholder');
  const [idInput, setIdInput] = useState('');

  const recentIds = window.localStorage.getItem(CHAR_ID_STORAGE_KEY);

  useEffect(() => {
    if (recentIds) {
      setRecents([]);
      recentIds.split(' ').forEach(id => {
        const docRef = db.collection('characters').doc(id);

        docRef.get().then(doc => {
          if (doc.exists) {
            setRecents(prevRecents => [
              ...prevRecents,
              { id, data: doc.data() },
            ]);
          }
        });
      });
    }
  }, [recentIds]);

  if (character.name) return null;

  return (
    <Container fluid className="CharacterSelect p-5">
      <h1 className="display-1">Gambit</h1>
      <p>
        Select a recently opened character, create a new one, or load one if you
        know their id.
      </p>
      <div className="list-group">
        {recents.map(({ id, data }) => (
          <a
            key={id}
            className="list-group-item list-group-item-action d-flex justify-content-between"
            href={`/${id}`}
          >
            <span>
              {data.alias || data.name} ({data.playbook})
            </span>
            <Icon name="chevron-right" />
          </a>
        ))}
        <div className="list-group-item list-group-item-action">
          <span>Create new character…</span>
          <select
            className="form-select form-select-sm my-2"
            aria-label="playbook selector"
            value={playbookSelect}
            onChange={evt => setPlaybookSelect(evt.target.value)}
          >
            <option value="placeholder">choose playbook</option>
            {PLAYBOOKS.map(playbook => (
              <option key={playbook} value={playbook}>
                {playbook}
              </option>
            ))}
          </select>
          <button
            className="btn btn-secondary"
            onClick={() => createNew(playbookSelect)}
            disabled={playbookSelect === 'placeholder'}
          >
            Create
          </button>
        </div>
        <div className="list-group-item list-group-item-action">
          <label htmlFor="idInput" className="form-label">
            Load character by id…
          </label>
          <input
            type="email"
            className="form-control form-control-sm mb-2"
            id="idInput"
            placeholder="xxxxxxxxxxxxxxxxxxxx"
            value={idInput}
            onChange={evt => setIdInput(evt.target.value)}
          />
          <button
            className="btn btn-secondary"
            onClick={() => loadById(idInput)}
            disabled={!idInput}
          >
            Load
          </button>
        </div>
      </div>
    </Container>
  );
};

function loadById(id) {
  db.collection('characters')
    .doc(id)
    .get()
    .then(doc => {
      if (doc.exists) {
        window.location = `/${doc.id}`;
      }
    });
}

function createNew(playbook) {
  const name = window.prompt('Enter new character name');
  if (name && PLAYBOOKS.includes(playbook)) {
    db.collection('characters')
      .add({
        ...NEW_CHARACTER,
        name,
        playbook,
        actionRatings: STARTING_RATINGS[playbook],
      })
      .then(doc => {
        window.location = `/${doc.id}`;
      });
  }
}

export default CharacterSelect;
