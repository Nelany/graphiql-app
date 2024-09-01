'use client';

import { KeyValue } from '@/Types/Types';
import classNames from 'classnames';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './page.module.css';
import { NavButton } from '@/components/NavButton/NavButton';

interface HistoryEntry {
  url: string;
  variables: KeyValue[];
}

export default function History() {
  const { t } = useTranslation();
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const historyData = localStorage.getItem('history');
      if (historyData) {
        setHistory(JSON.parse(historyData));
      }
    }
  }, []);

  const handleLinkClick = (variables: KeyValue[]) => {
    localStorage.setItem('restVariables', JSON.stringify(variables));
  };

  return (
    <main className={styles.main}>
      <h1 className={classNames(styles['light-blue-text'])}>{t('History:tittle')}</h1>
      {history.length > 0 ? (
        <ul className={styles.ul}>
          {history.map((entry, index) => (
            <li key={index}>
              <Link className={styles.li} href={entry.url} onClick={() => handleLinkClick(entry.variables)}>
                {entry.url}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <p>{t('History:historyEmpty')}</p>
          <NavButton className={['main-nav-button']} isUser={true} rout="/GET" text={'home:buttonRest'} />
          <NavButton className={['main-nav-button']} isUser={true} rout="/GRAPHQL" text={'home:buttonGraphQL'} />
        </>
      )}
    </main>
  );
}
