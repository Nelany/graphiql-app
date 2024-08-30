'use client';

import { KeyValue } from '@/Types/Types';
import KeyValueInput from './KeyValueInput/KeyValueInput';
import styles from './KeyValueInputs.module.css';

interface KeyValueInputsProps {
  value: KeyValue[];
  onChange: (value: KeyValue[]) => void;
  buttonTitle?: string;
  placeholder?: string;
}

function KeyValueInputs({ value, onChange, buttonTitle, placeholder }: KeyValueInputsProps) {
  const addItem = () => {
    const newItems = [...value, { key: '', value: '' }];
    onChange(newItems);
  };

  const handleChange = (index: number, field: keyof KeyValue, val: string) => {
    const newItems = [...value];
    newItems[index][field] = val;
    onChange(newItems);
  };

  return (
    <div className={styles.headersContainer}>
      <button onClick={addItem} className={styles.buttonAdd}>
        {buttonTitle || 'Add Header'}
      </button>
      {value.map((item, index) => (
        <KeyValueInput
          key={index}
          value={item}
          placeholder={placeholder || ''}
          onChange={(field, value) => handleChange(index, field, value)}
        />
      ))}
    </div>
  );
}

export default KeyValueInputs;
