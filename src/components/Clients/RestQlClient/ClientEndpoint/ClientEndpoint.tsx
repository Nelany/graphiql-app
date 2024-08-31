'use client';

import { useTranslation } from 'react-i18next';
import styles from './ClientEndpoint.module.css';

interface ClientEndpointProps {
  value?: string;
  onChange: (value: string) => void;
}

function ClientEndpoint({ value, onChange }: ClientEndpointProps) {
  const { t } = useTranslation();
  return (
    <div className={styles.endpointInput}>
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className={styles.inputWith}
        placeholder={t('RESTGraphQL:urlEndpoint')}
      />
    </div>
  );
}

export default ClientEndpoint;
