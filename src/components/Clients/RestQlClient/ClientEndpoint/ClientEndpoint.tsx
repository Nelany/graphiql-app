'use client';

import { useState } from 'react';
import styles from './ClientEndpoint.module.css';

interface ClientEndpointProps {
  value: string;
  onChange: (value: string) => void;
}

const ClientEndpoint: React.FC<ClientEndpointProps> = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className={styles.endpointInput}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.inputWith}
        placeholder="URL Endpoint"
      />
    </div>
  );
};

export default ClientEndpoint;
