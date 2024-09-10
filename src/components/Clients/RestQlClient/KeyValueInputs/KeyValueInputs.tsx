'use client';

import { KeyValue } from '@/Types/Types';
import { useTranslation } from 'react-i18next';
import KeyValueInput from './KeyValueInput/KeyValueInput';
import styles from './KeyValueInputs.module.css';

interface KeyValueInputsProps {
  value: KeyValue[];
  onChange: (value: KeyValue[]) => void;
  buttonTitle?: string;
  placeholder?: string;
  onRemove: (index: number) => void;
}

function KeyValueInputs({ value, onChange, buttonTitle, placeholder }: KeyValueInputsProps) {
  const { t } = useTranslation();

  const addItem = () => {
    const newItems = [...value, { key: '', value: '' }];
    onChange(newItems);
  };

  const handleChange = (index: number, field: keyof KeyValue, val: string) => {
    const newItems = [...value];
    newItems[index][field] = val;
    onChange(newItems);
  };

  const handleRemove = (index: number) => {
    const newItems = value.filter((_, i) => i !== index);
    onChange(newItems);
  };

  return (
    <div className={styles.headersContainer}>
      <button onClick={addItem} className={styles.buttonAdd}>
        {buttonTitle || t('RESTGraphQL:addHeader')}
      </button>
      {value.map((item, index) => (
        <KeyValueInput
          key={index}
          value={item}
          placeholder={placeholder || ''}
          onChange={(field, value) => handleChange(index, field, value)}
          onRemove={handleRemove}
          index={index}
        />
      ))}
    </div>
  );
}

export default KeyValueInputs;
