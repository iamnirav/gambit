import { useState, useEffect } from 'react';
import useCharacter from '../hooks/useCharacter';
import { Container, Icon } from './';
import PLAYBOOKS from '../game/playbooks';
import NEW_CHARACTER from '../game/character';
import { db, CHAR_ID_STORAGE_KEY } from '../Data';

const CharacterSelect = () => {
  const { character } = useCharacter();
  const [recents, setRecents] = useState([]);

  const recentIds = window.localStorage.getItem(CHAR_ID_STORAGE_KEY);

  useEffect(() => {
    if (recentIds) {
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
      <p>Select a recently opened character or create a new one.</p>
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
        <div
          className="list-group-item list-group-item-action d-flex justify-content-between"
          onClick={createNew}
        >
          <span>Create new</span>
          <Icon name="chevron-right" />
        </div>
      </div>
    </Container>
  );
};

function createNew() {
  const name = window.prompt('Enter new character name');
  const playbook = window.prompt(`Select playbook: ${PLAYBOOKS.join(', ')}`);
  if (name && PLAYBOOKS.includes(playbook)) {
    db.collection('characters')
      .add({ ...NEW_CHARACTER, name, playbook })
      .then(doc => {
        window.location = `/${doc.id}`;
      });
  }
}

export default CharacterSelect;
