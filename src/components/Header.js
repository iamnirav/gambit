import useCharacter from '../hooks/useCharacter';
import { MiniHarm } from './';

const Header = () => {
  const { character } = useCharacter();
  return (
    <header className="Header">
      <h1 className="display-1">{character.alias || character.name}</h1>

      <div className="d-flex justify-content-evenly">
        <div className="p-1">the {character.playbook}</div>
        <div className="p-1">stress: {character.stress} / 9</div>
        <div className="p-1 align-middle">
          load: {Object.values(character.items).length} / {character.load}
        </div>
        <div className="p-1">
          harm: <MiniHarm harm={character.harm} />
        </div>
      </div>
    </header>
  );
};

export default Header;
