'use client';

import styles from './ClientEndpoint.module.css';

interface ClientEndpointProps {
  value?: string;
  onChange: (value: string) => void;
}

function ClientEndpoint({ value, onChange }: ClientEndpointProps) {
  return (
    <div className={styles.endpointInput}>
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className={styles.inputWith}
        placeholder="URL Endpoint"
      />
    </div>
  );
}

export default ClientEndpoint;
