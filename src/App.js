import Data from './Data';
import {
  Header,
  Screens,
  BioScreen,
  StressScreen,
  ActionsScreen,
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
        <LoadScreen />
      </Screens>
    </Data>
  );
};

export default App;
