'use client';

import { useState } from 'react';
import styles from './ClientEndpoint.module.css';

const ClientEndpoint: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className={styles.endpointInput}>
      <input
        type="text"
        value={inputValue}
        onChange={inputHandler}
        className={styles.inputWith}
        placeholder="URL Endpoint"
      />
    </div>
  );
};

export default ClientEndpoint;
