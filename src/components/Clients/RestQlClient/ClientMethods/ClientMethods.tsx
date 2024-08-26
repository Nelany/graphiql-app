'use client';

import { useState } from 'react';
import styles from './ClientMethods.module.css';
interface ClientMethodsProps {
  value: string;
  onChange: (value: string) => void;
}
const ClientMethods: React.FC<ClientMethodsProps> = ({ value, onChange }) => {
  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <div>
      <select id="dropdown" value={value} onChange={handleDropdownChange} className={styles.select}>
        <option value="" disabled>
          Select Method
        </option>
        <option value="GET" className={styles.select}>
          GET
        </option>
        <option value="POST" className={styles.select}>
          POST
        </option>
        <option value="PUT" className={styles.select}>
          PUT
        </option>
        <option value="DELETE" className={styles.select}>
          DELETE
        </option>
        <option value="PATCH" className={styles.select}>
          PATCH
        </option>
      </select>
    </div>
  );
};

export default ClientMethods;
