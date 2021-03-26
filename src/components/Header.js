import useCharacter from '../hooks/useCharacter';
import { MiniHarm, Container, Icon } from './';

const Header = () => {
  const { character } = useCharacter();
  if (!character.name) return null;
  const itemLoad = Object.values(character.items).reduce(
    (acc, amt) => acc + amt,
    0,
  );
  return (
    <header className="Header pt-1 border-bottom" style={{ height: 100 }}>
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="display-1">{character.alias || character.name}</h1>
          <div
            className="fs-1"
            onClick={() => {
              window.location.pathname = '/';
            }}
          >
            <Icon name="people" />
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <div className="p-1">{character.playbook}</div>
          <div className="p-1">
            <Icon name="slash-circle" /> {character.cred}/4
          </div>
          <div className="p-1">
            <Icon name="speedometer" /> {character.stress}/9
          </div>
          <div className="p-1 align-middle">
            <Icon name="box-seam" /> {itemLoad}/{character.load}
          </div>
          <div className="p-1">
            <MiniHarm harm={character.harm} />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
