import { Container } from './';

const Screen = props => (
  <Container fluid className="Screen flex-shrink-0">
    <h2>{props.title}</h2>
    {props.children}
  </Container>
);

export default Screen;
