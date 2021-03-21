import Data from './Data';
import { Screen, Header, Container } from './components';

const App = () => {
  return (
    <Data>
      <Header />
      <Container fluid>
        <Screen />
      </Container>
    </Data>
  );
};

export default App;
