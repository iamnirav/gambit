import useCharacter from '../hooks/useCharacter';

const FIELDS = [
  'alias',
  'playbook',
  'name',
  'look',
  'heritage',
  'background',
  'vice',
];

const Screen = () => {
  const { character } = useCharacter();
  return (
    <div className="Screen">
      <h2 className="card-title">Bio</h2>
      <dl className="row">
        {FIELDS.map(field => (
          <>
            <dt className="col-4">{field}: </dt>
            <dd className="col-8">{character[field] || 'n/a'}</dd>
          </>
        ))}
      </dl>
    </div>
  );
};

export default Screen;
