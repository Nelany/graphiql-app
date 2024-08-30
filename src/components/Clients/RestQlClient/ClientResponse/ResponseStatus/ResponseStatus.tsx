'use client';

interface Props {
  status: number | undefined;
}

function ResponseStatus(prop: Props) {
  return (
    <div>
      <p>Status: {prop.status || ''}</p>
    </div>
  );
}

export default ResponseStatus;
