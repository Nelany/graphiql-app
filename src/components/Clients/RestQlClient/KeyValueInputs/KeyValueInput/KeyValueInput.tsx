'use client';

import { KeyValue } from '@/Types/Types';
import styles from './KeyValueInput.module.css';

interface KeyValueInputProps {
  value: KeyValue;
  onChange: (field: keyof KeyValue, value: string) => void;
  placeholder?: string;
}

function KeyValueInput({ value, onChange, placeholder }: KeyValueInputProps) {
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
        placeholder={placeholder || 'HEADER'}
        onChange={handleKeyChange}
      />
      <input
        value={value.value}
        className={styles.inputField}
        type="text"
        placeholder="VALUE"
        onChange={handleValueChange}
      />
    </div>
  );
}

export default KeyValueInput;
