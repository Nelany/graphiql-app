'use client';

import { useState, useEffect } from 'react';
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
  const [headers, setHeaders] = useState<Header[]>(value);

  useEffect(() => {
    setHeaders(value);
  }, [value]);

  const addHeader = () => {
    const newHeaders = [...headers, { key: '', value: '' }];
    setHeaders(newHeaders);
    onChange(newHeaders);
  };

  const handleChange = (index: number, field: keyof Header, value: string) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
    onChange(newHeaders);
  };

  return (
    <div className={styles.headersContainer}>
      <button onClick={addHeader} className={styles.buttonAdd}>
        Add Header
      </button>
      {headers.map((header, index) => (
        <ClientHeader key={index} value={header} onChange={(field, value) => handleChange(index, field, value)} />
      ))}
    </div>
  );
}

export default ClientHeaders;
