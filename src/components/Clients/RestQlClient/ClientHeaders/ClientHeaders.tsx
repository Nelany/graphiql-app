'use client';

import { useState } from 'react';
import ClientHeader from './ClientHeader/ClientHeader';

const ClientHeaders: React.FC = () => {
  const [headersCount, setHeadersCount] = useState(0);
  const addHeaderHandler = () => {
    setHeadersCount(headersCount + 1);
  };
  const items = Array.from({ length: headersCount }, (_, index) => index + 1);

  return (
    <div>
      <button onClick={addHeaderHandler}>Add Header</button>
      {items.map((index) => {
        return <ClientHeader key={index} />;
      })}
    </div>
  );
};

export default ClientHeaders;
