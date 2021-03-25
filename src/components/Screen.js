import { Container } from './';

const Screen = props => (
  <Container fluid className="Screen flex-shrink-0 pt-2 pb-2">
    <h2 className="display-3">{props.title}</h2>
    {props.children}
  </Container>
);

export default Screen;
