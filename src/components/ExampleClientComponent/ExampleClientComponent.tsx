'use client';

import { useTranslation } from 'react-i18next';

export default function ExampleClientComponent() {
  const { t } = useTranslation();

  return (
    <>
      <h3>{t('greeting')}</h3>

      <h3>{t('greeting2')}</h3>
    </>
  );
}
