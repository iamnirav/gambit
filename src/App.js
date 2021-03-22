import Data from './Data';
import {
  Header,
  Screens,
  BioScreen,
  StressScreen,
  ActionsScreen,
} from './components';

const App = () => {
  return (
    <Data>
      <Header />
      <Screens>
        <BioScreen />
        <StressScreen />
        <ActionsScreen />
      </Screens>
    </Data>
  );
};

export default App;
