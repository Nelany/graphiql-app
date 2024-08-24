'use client';

import { useState } from 'react';
import styles from './ClientMethods.module.css';

const ClientMethods: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('GET');

  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <select id="dropdown" value={selectedOption} onChange={handleDropdownChange} className={styles.select}>
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
      </select>
    </div>
  );
};

export default ClientMethods;
