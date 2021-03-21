import useCharacter from '../hooks/useCharacter';
// import './Screen.scss';

const Screen = () => {
  const character = useCharacter();
  console.log(character);
  return <div className="Screen"></div>;
};

export default Screen;
