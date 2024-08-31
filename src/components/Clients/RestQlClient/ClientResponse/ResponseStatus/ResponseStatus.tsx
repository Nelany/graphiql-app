'use client';

interface Props {
  status: number | undefined;
  statusText: string | undefined;
}

function ResponseStatus({ status, statusText }: Props) {
  return (
    <div>
      <span>Status: {status ? `${status}. ` : ''}</span>
      <span>{statusText ? `${statusText}.` : ''}</span>
    </div>
  );
}

export default ResponseStatus;
