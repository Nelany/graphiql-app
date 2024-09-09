'use client';

import { KeyValue } from '@/Types/Types';
import styles from './KeyValueInput.module.css';
import { useTranslation } from 'react-i18next';

interface KeyValueInputProps {
  value: KeyValue;
  onChange: (field: keyof KeyValue, value: string) => void;
  placeholder?: string;
  index: number;
  onRemove: (index: number) => void;
}

function KeyValueInput({ value, onChange, placeholder, index, onRemove }: KeyValueInputProps) {
  const { t } = useTranslation();
  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange('key', e.target.value);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange('value', e.target.value);
  };

  return (
    <div className={styles.inputContainer}>
      <input
        value={value.key}
        className={styles.inputField}
        type="text"
        placeholder={placeholder || t('RESTGraphQL:header')}
        onChange={handleKeyChange}
      />
      <input
        value={value.value}
        className={styles.inputField}
        type="text"
        placeholder={t('RESTGraphQL:value')}
        onChange={handleValueChange}
      />
      <button onClick={() => onRemove(index)} className={styles.removeButton}>
        🗑️
      </button>
    </div>
  );
}

export default KeyValueInput;
