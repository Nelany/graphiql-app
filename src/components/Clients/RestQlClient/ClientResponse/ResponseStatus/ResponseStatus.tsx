'use client';

interface Props {
  status: number;
}

const ResponseStatus: React.FC<Props> = (prop) => {
  return (
    <div>
      <p>Status: {prop.status}</p>
    </div>
  );
};

export default ResponseStatus;
