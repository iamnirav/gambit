import Data from './Data';
import { Header, CharacterSelect, Screens } from './components';

const App = () => {
  return (
    <Data>
      <CharacterSelect />
      <Header />
      <Screens />
    </Data>
  );
};

export default App;
