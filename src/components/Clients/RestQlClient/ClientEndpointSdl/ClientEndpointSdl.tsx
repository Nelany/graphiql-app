'use client';

import styles from './ClientEndpointSdl.module.css';

interface ClientEndpointSdlProps {
  value?: string;
  onChange: (value: string) => void;
}

function ClientEndpointSdl({ value, onChange }: ClientEndpointSdlProps) {
  return (
    <div className={styles.endpointInput}>
      <input
        type="text"
        value={value || ''}
        className={styles.inputWith}
        placeholder="SDL Endpoint"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default ClientEndpointSdl;
