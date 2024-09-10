'use client';

import { useTranslation } from 'react-i18next';
import styles from './ClientEndpointSdl.module.css';

interface ClientEndpointSdlProps {
  value?: string;
  onChange: (value: string) => void;
}

function ClientEndpointSdl({ value, onChange }: ClientEndpointSdlProps) {
  const { t } = useTranslation();

  return (
    <div className={styles.endpointInput}>
      <input
        type="text"
        value={value || ''}
        className={styles.inputWith}
        placeholder={t('RESTGraphQL:sdlEndpoint')}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default ClientEndpointSdl;
