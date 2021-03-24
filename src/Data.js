import {
  createContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import initDb from './db';

const CHARACTER_ID = 'qzCn6i1Y3fdKTE45iUZp';
const db = initDb();
const characterDoc = db.collection('characters').doc(CHARACTER_ID);
const INITIAL_STATE = {
  playbook: '',
  alias: '',
  name: '',
  pronouns: '',
  look: '',
  heritage: '',
  background: '',
  vice: '',
  cred: 0,
  stash: 0,
  stress: 0,
  healing: 0,
  load: 0,
  playbookXP: 0,
  trauma: [],
  harm: {},
  contacts: {},
  abilities: {},
  armor: {},
  items: {},
  actionRatings: {},
  attributesXP: {},
};

export const CharacterContext = createContext({});

const Data = props => {
  const [character, setCharacter] = useState(INITIAL_STATE);

  useEffect(() => {
    return characterDoc.onSnapshot(
      doc => setCharacter(doc.data()),
      error => console.log('listener error: ' + error),
    );
  }, [characterDoc]);

  const update = useCallback(stateChange => {
    characterDoc.update(stateChange);
  }, []);

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

// The following is slightly outdated!

// playbook: string
// name: string
// alias: string
// look: string
// heritage: string
// background: string
// vice: string
// cred: number
// stash: number
// stress: number
// trauma: string[]
// harm: string[]
// healing: number
// armor: { string: boolean }
// attributes: object[]
//     insight: { name: string, actions: object[], xp: number }
//         doctor: { name: string, rating: number }
//         hack
//         rig
//         study
//     prowess
//         helm
//         scramble
//         scrap
//         skulk
//     insight
//         attune
//         command
//         consort
//         sway
// abilities: object[]
//     { name: string, description: string, selected: boolean }
// load: number
// items: object[]
//     { name: string, load: number, used: boolean }
// contacts: object[]
//     { name: string, description: string, isFriend: boolean, isRival: boolean }
// xp: number
// triggers: string[]
