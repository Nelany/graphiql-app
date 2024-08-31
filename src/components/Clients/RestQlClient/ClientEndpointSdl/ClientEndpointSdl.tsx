'use client';

import styles from './ClientEndpointSdl.module.css';

interface ClientEndpointSdlProps {
  value?: string;
}

function ClientEndpointSdl({ value }: ClientEndpointSdlProps) {
  return (
    <div className={styles.endpointInput}>
      <input type="text" value={value || ''} className={styles.inputWith} placeholder="SDL Endpoint" readOnly />
    </div>
  );
}

export default ClientEndpointSdl;
