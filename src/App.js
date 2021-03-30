import Data from './Data';
import {
  Header,
  Container,
  CharacterSelect,
  Screens,
  CharacterSummary,
} from './components';

const App = () => {
  const parts = window.location.pathname.split('/');

  if (!parts[1]) {
    return <CharacterSelect />;
  }

  if (parts[1] === 'characters') {
    return (
      <Data id={parts[2]}>
        <Header />
        <Screens />
      </Data>
    );
  }

  if (parts[1] === 'crews') {
    const ids = parts[2].split(',');

    return (
      <Container className="Crew">
        {ids.map(id => (
          <Data key={id} id={id}>
            <CharacterSummary />
          </Data>
        ))}
      </Container>
    );
  }
};

export default App;
