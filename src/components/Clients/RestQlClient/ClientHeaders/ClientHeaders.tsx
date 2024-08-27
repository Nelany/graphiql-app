'use client';

import { useState } from 'react';
import ClientHeader from './ClientHeader/ClientHeader';
import styles from './ClientHeaders.module.css';

interface Header {
  key: string;
  value: string;
}

interface ClientHeadersProps {
  value: Header[];
  onChange: (value: Header[]) => void;
}

function ClientHeaders({ value, onChange }: ClientHeadersProps) {
  const addHeader = () => {
    const newHeaders = [...value, { key: '', value: '' }];
    onChange(newHeaders);
  };

  const handleChange = (index: number, field: keyof Header, val: string) => {
    const newHeaders = [...value];
    newHeaders[index][field] = val;
    onChange(newHeaders);
  };

  return (
    <div className={styles.headersContainer}>
      <button onClick={addHeader} className={styles.buttonAdd}>
        Add Header
      </button>
      {value.map((header, index) => (
        <ClientHeader key={index} value={header} onChange={(field, value) => handleChange(index, field, value)} />
      ))}
    </div>
  );
}

export default ClientHeaders;
