'use client';

import { useTranslation } from 'react-i18next';

export default function ExampleClientComponent() {
  const { t } = useTranslation();

  return (
    <>
      <h3>{t('exampleClientComponent:greeting')}</h3>

      <h3>{t('exampleClientComponent:greeting2')}</h3>
    </>
  );
}
