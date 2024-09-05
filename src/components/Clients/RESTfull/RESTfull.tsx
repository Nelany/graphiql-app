'use client';

import { Action, KeyValue } from '@/Types/Types';
import { encode64 } from '@/utils/base64';
import { LSGetItem, LSSetItem } from '@/utils/LSHelpers';
import { replaceVariables } from '@/utils/replaceVariables';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClientEndpoint from '../RestQlClient/ClientEndpoint/ClientEndpoint';
import JsonEditor from '../RestQlClient/ClientJsonEditor/JsonEditor';
import ClientMethods from '../RestQlClient/ClientMethods/ClientMethods';
import ResponseStatus from '../RestQlClient/ClientResponse/ResponseStatus/ResponseStatus';
import KeyValueInputs from '../RestQlClient/KeyValueInputs/KeyValueInputs';
import styles from './RestFull.module.css';

interface FetchDataResponse<T> {
  response: T;
  status: number;
  statusText: string;
}

interface RestFullProps<T> {
  fetchData: (action: Action) => Promise<FetchDataResponse<T> | undefined>;
  method: string;
  endpoint?: string;
  headers?: KeyValue[];
  body?: string;
  locale: string;
}

export default function RestFull<T>({ fetchData, method, endpoint, headers, body, locale }: RestFullProps<T>) {
  const { t } = useTranslation();
  const [selectedMethod, setSelectedMethod] = useState(method);
  const [endpointUrl, setEndpointUrl] = useState(endpoint);
  const [requestHeaders, setRequestHeaders] = useState<KeyValue[]>(headers || []);
  const [requestBody, setRequestBody] = useState(body);
  const [response, setResponse] = useState<FetchDataResponse<T> | undefined>(undefined);
  const [requestVariables, setRequestVariables] = useState<KeyValue[] | undefined>();

  const prepareHeadersParams = (headersArray: KeyValue[]) => {
    return headersArray.map((val) => Object.values(val)).filter((val) => val[0]);
  };

  useEffect(() => {
    if (!requestVariables) {
      setRequestVariables(LSGetItem('restVariables') || []);
      return;
    }
    const sanitizedVariables = requestVariables.filter((val) => val.key);
    LSSetItem('restVariables', sanitizedVariables);
  }, [requestVariables]);

  useEffect(() => {
    const encodedUrl = endpointUrl ? encode64(endpointUrl) : '';
    const encodedBody = requestBody ? encode64(JSON.stringify(JSON.parse(requestBody))) : '';
    const encodedHeaders = requestHeaders.length > 0 ? prepareHeadersParams(requestHeaders) : [];

    const query = new URLSearchParams(encodedHeaders).toString();
    const pathMethod = selectedMethod ? `/${selectedMethod}` : '';
    const pathEncodedUrl = encodedUrl ? `/${encodedUrl}` : '/ ';
    const pathEncodedBody = encodedBody ? `/${encodedBody}` : '/ ';
    const pathQuery = encodedHeaders.length ? `?${query}` : '';
    const localePath = locale ? `/${locale}` : '';
    const path = localePath + pathMethod + pathEncodedUrl + pathEncodedBody + pathQuery;

    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', path);
    }
  }, [selectedMethod, endpointUrl, requestHeaders, requestBody, locale]);

  const onSendClick = async () => {
    const newBody = replaceVariables(requestBody, requestVariables);
    const data = await fetchData({ method: selectedMethod, url: endpointUrl, body: newBody, headers: requestHeaders });
    if (data) {
      if (data.status === 0) {
        toast.error(data.statusText, {
          autoClose: 10000,
          closeOnClick: true,
        });
        return;
      }
      setResponse(data);
      const currentUrl = window.location.href;

      let history = LSGetItem('history') || [];

      const currentEntry = {
        url: currentUrl,
        variables: requestVariables,
      };

      history.unshift(currentEntry);

      LSSetItem('history', history);
    }
  };

  return (
    <div className={styles.resfullContainer}>
      <div className={styles.editFieldContainer}>
        <div className={styles.methodEndContainer}>
          <ClientMethods value={selectedMethod} onChange={setSelectedMethod} />
          <ClientEndpoint value={endpointUrl} onChange={setEndpointUrl} />
          <button onClick={onSendClick} className={styles.buttonSend}>
            {t('RESTGraphQL:send')}
          </button>
        </div>
        <h4>{t('RESTGraphQL:variableMessage')}</h4>
        <KeyValueInputs
          value={requestVariables || []}
          onChange={setRequestVariables}
          buttonTitle={t('RESTGraphQL:addVariable')}
          placeholder={t('RESTGraphQL:variable')}
        />
        <KeyValueInputs value={requestHeaders} onChange={setRequestHeaders} />
        <JsonEditor value={requestBody} onChange={setRequestBody} />
      </div>
      <h4>{t('RESTGraphQL:response')}</h4>
      <div className={styles.editFieldContainer}>
        <ResponseStatus status={response?.status} statusText={response?.statusText} />
        <JsonEditor value={response ? JSON.stringify(response.response, null, 2) : ''} isReadOnly={true} />
      </div>
    </div>
  );
}
