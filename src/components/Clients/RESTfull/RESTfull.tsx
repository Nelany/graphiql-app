'use client';

import { useTranslation } from 'react-i18next';
import styles from './RestFull.module.css';
import ClientMethods from '../RestQlClient/ClientMethods/ClientMethods';
import ClientEndpoint from '../RestQlClient/ClientEndpoint/ClientEndpoint';
import ClientHeaders from '../RestQlClient/ClientHeaders/ClientHeaders';
import ResponseStatus from '../RestQlClient/ClientResponse/ResponseStatus/ResponseStatus';
import ResponseBody from '../RestQlClient/ClientResponse/ResponseBody/ResponseBody';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { encode } from 'punycode';
import JsonEditor from '../RestQlClient/ClientJsonEditor/JsonEditor';

interface Header {
  key: string;
  value: string;
}

interface RestFullProps {
  method: string;
  endpoint: string;
  headers?: Header[];
  body: string;
}

export default function RestFull({ method, endpoint, headers, body }: RestFullProps) {
  const router = useRouter();
  const { t } = useTranslation();

  const [selectedMethod, setSelectedMethod] = useState(method);
  const [endpointUrl, setEndpointUrl] = useState(endpoint);
  const [requestHeaders, setRequestHeaders] = useState<Header[]>(headers || []);
  const [requestBody, setRequestBody] = useState(body);
  const [response, setResponse] = useState<{ status: number; body: any }>({
    status: 0,
    body: {},
  });

  useEffect(() => {
    const encodedUrl = encode(endpointUrl);
    const encodedBody = requestBody ? encode(requestBody) : '';
    const encodedHeaders = encode(JSON.stringify(requestHeaders));
    const query = new URLSearchParams({
      url: encodedUrl,
      body: encodedBody,
      headers: encodedHeaders,
    }).toString();

    router.push(`/restfull/${selectedMethod}?${query}`);
  }, [selectedMethod, endpointUrl, requestHeaders, requestBody, router]);

  const sendRequest = async () => {
    const encodedUrl = encode(endpointUrl);
    const encodedBody = requestBody ? encode(requestBody) : '';
    const encodedHeaders = encode(JSON.stringify(requestHeaders));

    const url = `/restfull/${selectedMethod}?url=${encodedUrl}&body=${encodedBody}&headers=${encodedHeaders}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setResponse({ status: res.status, body: data });
    } catch (error) {
      console.error('Request failed:', error);
    }
  };

  return (
    <div className={styles.resfullContainer}>
      <div className={styles.editFieldContainer}>
        <div className={styles.methodEndContainer}>
          <ClientMethods value={selectedMethod} onChange={setSelectedMethod} />
          <ClientEndpoint value={endpointUrl} onChange={setEndpointUrl} />
          <button className={styles.buttonSend} onClick={sendRequest}>
            Send
          </button>
        </div>
        <ClientHeaders value={requestHeaders} onChange={setRequestHeaders} />
        <JsonEditor value={requestBody} onChange={setRequestBody} />
      </div>
      <h4>{t('restfull:response')}</h4>
      <div className={styles.editFieldContainer}>
        {/* <ResponseStatus status={response.status}/>
        <ResponseBody  body={response.body} /> */}
      </div>
    </div>
  );
}
