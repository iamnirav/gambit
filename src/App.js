import Data from './Data';
import { Header, Screens, BioScreen, StressScreen } from './components';

const App = () => {
  return (
    <Data>
      <Header />
      <Screens>
        <BioScreen />
        <StressScreen />
      </Screens>
    </Data>
  );
};

export default App;
