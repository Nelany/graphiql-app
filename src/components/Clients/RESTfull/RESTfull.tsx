'use client';

import { useTranslation } from 'react-i18next';
import styles from './RestFull.module.css';
import ClientMethods from '../RestQlClient/ClientMethods/ClientMethods';
import ClientEndpoint from '../RestQlClient/ClientEndpoint/ClientEndpoint';
import ClientHeaders from '../RestQlClient/ClientHeaders/ClientHeaders';
import ResponseStatus from '../RestQlClient/ClientResponse/ResponseStatus/ResponseStatus';
import ResponseBody from '../RestQlClient/ClientResponse/ResponseBody/ResponseBody';
import JsonViewer from '../RestQlClient/ClientJsonEditor/JsonEditor';

export default function RestFull() {
  const { t } = useTranslation();

  return (
    <div className={styles.resfullContainer}>
      <h3>{t('restfull:header')}</h3>
      <div className={styles.editFieldContainer}>
        <div className={styles.methodEndContainer}>
          <ClientMethods />
          <ClientEndpoint />
          <button className={styles.buttonSend}>Send</button>
        </div>
        <ClientHeaders />
        <JsonViewer />
      </div>
      <h4>{t('restfull:response')}</h4>
      <div className={styles.editFieldContainer}>
        <ResponseStatus status={200} />
        <ResponseBody body="test" />
      </div>
    </div>
  );
}
