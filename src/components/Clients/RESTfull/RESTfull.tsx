'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './RestFull.module.css';
import ClientMethods from '../RestQlClient/ClientMethods/ClientMethods';
import ClientEndpoint from '../RestQlClient/ClientEndpoint/ClientEndpoint';
import ClientHeaders from '../RestQlClient/ClientHeaders/ClientHeaders';
import JsonEditor from '../RestQlClient/ClientJsonEditor/JsonEditor';
import { encode64 } from '@/utils/base64';
import ResponseStatus from '../RestQlClient/ClientResponse/ResponseStatus/ResponseStatus';

interface Header {
  key: string;
  value: string;
}

interface RestFullProps {
  method: string;
  endpoint?: string;
  headers?: Header[];
  body?: string;
  locale: string;
}

export default function RestFull({ method, endpoint, headers, body, locale }: RestFullProps) {
  const { t } = useTranslation();
  const [selectedMethod, setSelectedMethod] = useState(method);
  const [endpointUrl, setEndpointUrl] = useState(endpoint);
  const [requestHeaders, setRequestHeaders] = useState<Header[]>(headers || []);
  const [requestBody, setRequestBody] = useState(body);

  const prepareHeadersParams = (headersArray: Header[]) => {
    return headersArray.map((val) => Object.values(val)).filter((val) => val[0]);
  };

  useEffect(() => {
    const encodedUrl = endpointUrl ? encode64(endpointUrl) : '';
    const encodedBody = requestBody ? encode64(JSON.stringify(JSON.parse(requestBody))) : '';
    const encodedHeaders = requestHeaders.length > 0 ? prepareHeadersParams(requestHeaders) : '';
    const query = new URLSearchParams(encodedHeaders).toString();
    const pathMethod = selectedMethod ? `/${selectedMethod}` : '';
    const pathEncodedUrl = encodedUrl ? `/${encodedUrl}` : '';
    const pathEncodedBody = encodedBody ? `/${encodedBody}` : '';
    const pathQuery = encodedHeaders ? `?${query}` : '';
    const localePath = locale ? `/${locale}` : '';
    const path = localePath + pathMethod + pathEncodedUrl + pathEncodedBody + pathQuery;

    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', path);
    }
  }, [selectedMethod, endpointUrl, requestHeaders, requestBody, locale]);

  return (
    <div className={styles.resfullContainer}>
      <div className={styles.editFieldContainer}>
        <div className={styles.methodEndContainer}>
          <ClientMethods value={selectedMethod} onChange={setSelectedMethod} />
          <ClientEndpoint value={endpointUrl} onChange={setEndpointUrl} />
          <button className={styles.buttonSend}>Send</button>
        </div>
        <ClientHeaders value={requestHeaders} onChange={setRequestHeaders} />
        <JsonEditor value={requestBody} onChange={setRequestBody} />
      </div>
      <h4>{t('restfull:response')}</h4>
      <div className={styles.editFieldContainer}>
        <ResponseStatus status={200} />
        <JsonEditor isReadOnly={true} />
      </div>
    </div>
  );
}
