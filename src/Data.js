import {
  createContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import firebase from 'firebase/app';
import initDb from './db';

export const CHAR_ID_STORAGE_KEY = 'recent-character-ids';
export const CharacterContext = createContext({});
export const db = initDb();

const Data = props => {
  const [character, setCharacter] = useState({});
  const [charDocRef, setCharDocRef] = useState(undefined);

  useEffect(() => {
    const id = window.location.pathname.slice(1);

    if (!id) return;

    const docRef = db.collection('characters').doc(id);

    docRef.get().then(doc => {
      if (doc.exists) {
        const recentIds =
          window.localStorage.getItem(CHAR_ID_STORAGE_KEY) || '';
        const idsArray = recentIds.split(' ').filter(id => id && id !== doc.id);
        idsArray.unshift(doc.id);
        window.localStorage.setItem(
          CHAR_ID_STORAGE_KEY,
          idsArray.slice(0, 5).join(' '),
        );

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
      deleteField: firebase.firestore.FieldValue.delete,
      removeFromArray: firebase.firestore.FieldValue.arrayRemove,
      addToArray: firebase.firestore.FieldValue.arrayUnion,
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
