'use client';

interface Props {
  status: number;
}

function ResponseStatus(prop: Props) {
  return (
    <div>
      <p>Status: {prop.status}</p>
    </div>
  );
}

export default ResponseStatus;
