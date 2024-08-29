'use client';

import styles from './ClientHeader.module.css';

interface Header {
  key: string;
  value: string;
}

interface ClientHeaderProps {
  value: Header;
  onChange: (field: keyof Header, value: string) => void;
}

function ClientHeader({ value, onChange }: ClientHeaderProps) {
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
        placeholder="HEADER"
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

export default ClientHeader;
