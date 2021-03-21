import useCharacter from '../hooks/useCharacter';

const Header = () => {
  const { character } = useCharacter();
  return (
    <header className="Header">
      <h1 className="display-1">{character.alias}</h1>
      <div className="d-flex">
        <div className="p-2">the {character.playbook}</div>
        <div className="p-2">stress: {character.stress} / 9</div>
        <div className="p-2">
          load: {Object.values(character.items).length} / {character.load}
        </div>
      </div>
    </header>
  );
};

export default Header;
