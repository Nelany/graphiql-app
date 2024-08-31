'use client';

import { useTranslation } from 'react-i18next';

interface Props {
  status: number | undefined;
  statusText: string | undefined;
}

function ResponseStatus({ status, statusText }: Props) {
  const { t } = useTranslation();
  return (
    <div>
      <span>
        {t('RESTGraphQL:status')}
        {status ? `${status}. ` : ''}
      </span>
      <span>{statusText ? `${statusText}.` : ''}</span>
    </div>
  );
}

export default ResponseStatus;
