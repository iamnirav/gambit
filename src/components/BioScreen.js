import useCharacter from '../hooks/useCharacter';
import { Screen } from './';

const FIELDS = [
  'alias',
  'playbook',
  'name',
  'look',
  'heritage',
  'background',
  'vice',
];

const BioScreen = () => {
  const { character } = useCharacter();
  return (
    <Screen title="Bio">
      <dl className="row">
        {FIELDS.map(field => [
          <dt className="col-4 text-end" key={field}>
            {field}
          </dt>,
          <dd className="col-8" key={field + '-value'}>
            {character[field] || 'n/a'}
          </dd>,
        ])}
      </dl>
    </Screen>
  );
};

export default BioScreen;
