import useCharacter from '../hooks/useCharacter';
import { MiniHarm, Container } from './';

const Header = () => {
  const { character } = useCharacter();
  const itemLoad = Object.values(character.items).reduce(
    (acc, amt) => acc + amt,
    0,
  );
  return (
    <header className="Header shadow-sm pt-1" style={{ height: 100 }}>
      <Container>
        <h1 className="display-1">{character.alias || character.name}</h1>

        <div className="d-flex justify-content-between">
          <div className="p-1">the {character.playbook}</div>
          <div className="p-1">stress: {character.stress}/9</div>
          <div className="p-1 align-middle">
            load: {itemLoad}/{character.load}
          </div>
          <div className="p-1">
            harm: <MiniHarm harm={character.harm} />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
