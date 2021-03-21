import { useContext } from 'react';
import { CharacterContext } from '../Data';

const useCharacter = () => {
  return useContext(CharacterContext);
};

export default useCharacter;
