import {
  createContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import initDb from './db';
import INITIAL_STATE from './game/character';
import PLAYBOOKS from './game/playbooks';

export const CharacterContext = createContext(INITIAL_STATE);
const db = initDb();

const Data = props => {
  const [character, setCharacter] = useState(INITIAL_STATE);
  const [charDocRef, setCharDocRef] = useState(undefined);

  useEffect(() => {
    let id = window.location.pathname.slice(1);

    if (!id) {
      const name = window.prompt('Enter new character name');
      const playbook = window.prompt(
        `Select playbook: ${PLAYBOOKS.join(', ')}`,
      );
      if (name && playbook) {
        db.collection('characters')
          .add({ ...INITIAL_STATE, name, playbook })
          .then(doc => {
            window.location = `/${doc.id}`;
          });
      }
      return;
    }

    const docRef = db.collection('characters').doc(id);

    docRef.get().then(doc => {
      if (doc.exists) {
        setCharDocRef(docRef);
      } else {
        window.alert('No character found.');
        window.location = '/';
      }
    });
  }, [window.location.pathname]);

  useEffect(() => {
    if (!charDocRef) return;

    return charDocRef.onSnapshot(
      doc => {
        if (doc.exists) {
          setCharacter(doc.data());
        }
      },
      error => console.log('listener error: ' + error),
    );
  }, [charDocRef]);

  const update = useCallback(
    stateChange => {
      if (!charDocRef) return;

      charDocRef.update(stateChange);
    },
    [charDocRef],
  );

  const state = useMemo(
    () => ({
      character,
      update,
    }),
    [character, update],
  );

  return (
    <CharacterContext.Provider value={state}>
      {props.children}
    </CharacterContext.Provider>
  );
};

export default Data;
