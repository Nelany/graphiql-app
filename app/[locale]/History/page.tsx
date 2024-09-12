'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavButton } from '../../../src/components/NavButton/NavButton';
import { LSGetItem } from '../../../src/utils/LSHelpers';
import styles from './page.module.css';

export default function History() {
  const { t } = useTranslation();
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    setHistory(LSGetItem('history') || []);
  }, []);

  return (
    <main className={styles.main}>
      <h1 className={classNames(styles['light-blue-text'])}>{t('History:tittle')}</h1>
      {history.length > 0 ? (
        <ul className={styles.ul}>
          {history.map((url, index) => (
            <li key={index}>
              <Link className={styles.li} href={url}>
                {url}
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
