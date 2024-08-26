'use client';

import { useTranslation } from 'react-i18next';
import styles from './RestFull.module.css';
import ClientMethods from '../RestQlClient/ClientMethods/ClientMethods';
import ClientEndpoint from '../RestQlClient/ClientEndpoint/ClientEndpoint';
import ClientHeaders from '../RestQlClient/ClientHeaders/ClientHeaders';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import JsonEditor from '../RestQlClient/ClientJsonEditor/JsonEditor';
import { encode64 } from '@/utils/base64';

interface Header {
  key: string;
  value: string;
}

interface RestFullProps {
  method: string;
  endpoint?: string;
  headers?: Header[];
  body?: string;
}

export default function RestFull({ method, endpoint, headers, body }: RestFullProps) {
  const router = useRouter();
  const { t } = useTranslation();

  const [selectedMethod, setSelectedMethod] = useState(method);
  const [endpointUrl, setEndpointUrl] = useState(endpoint);
  const [requestHeaders, setRequestHeaders] = useState<Header[]>(headers || []);
  const [requestBody, setRequestBody] = useState(body);

  useEffect(() => {
    const encodedUrl = endpointUrl ? encode64(endpointUrl) : '';
    const encodedBody = requestBody ? encode64(requestBody) : '';
    const encodedHeaders = requestHeaders.length > 0 ? encode64(JSON.stringify(requestHeaders)) : '';
    const query = new URLSearchParams({
      headers: encodedHeaders,
    }).toString();
    const pathMethod = selectedMethod ? `/${selectedMethod}` : '';
    const pathEncodedUrl = encodedUrl ? `/${encodedUrl}` : '';
    const pathEncodedBody = encodedBody ? `/${encodedBody}` : '';
    const pathQuery = encodedHeaders ? `?${query}` : '';
    const path = pathMethod + pathEncodedUrl + pathEncodedBody + pathQuery;
    console.log(path);

    router.push(path);
  }, [selectedMethod, endpointUrl, requestHeaders, requestBody, router]);

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
      <div className={styles.editFieldContainer}></div>
    </div>
  );
}
