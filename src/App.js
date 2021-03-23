import Data from './Data';
import {
  Header,
  Screens,
  BioScreen,
  StressScreen,
  ActionsScreen,
  AbilitiesScreen,
  LoadScreen,
} from './components';

const App = () => {
  return (
    <Data>
      <Header />
      <Screens>
        <BioScreen />
        <StressScreen />
        <ActionsScreen />
        <AbilitiesScreen />
        <LoadScreen />
      </Screens>
    </Data>
  );
};

export default App;
