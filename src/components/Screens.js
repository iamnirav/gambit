import useCharacter from '../hooks/useCharacter';
import { BioScreen, StressScreen, ActionsScreen, LoadScreen } from './';

const Screens = () => {
  const { character } = useCharacter();
  if (!character.name) return null;

  return (
    <div className="Screens">
      <BioScreen />
      <StressScreen />
      <ActionsScreen />
      <LoadScreen />
    </div>
  );
};

export default Screens;
