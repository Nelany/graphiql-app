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
import ButtonsShow from '../RestQlClient/ShowButtons/ShowButtons';

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
  initialVariables: string;
}

export default function RestFull<T>({
  fetchData,
  method,
  endpoint,
  headers,
  body,
  locale,
  initialVariables,
}: RestFullProps<T>) {
  const { t } = useTranslation();
  const [selectedMethod, setSelectedMethod] = useState(method);
  const [endpointUrl, setEndpointUrl] = useState(endpoint);
  const [requestHeaders, setRequestHeaders] = useState<KeyValue[]>(headers || []);
  const [requestBody, setRequestBody] = useState(body);
  const [response, setResponse] = useState<FetchDataResponse<T> | undefined>(undefined);
  const [variables, setVariables] = useState<KeyValue[]>(initialVariables ? JSON.parse(initialVariables) : []);
  const [showHeaders, setShowHeaders] = useState(false);
  const [showVariables, setShowVariables] = useState(false);

  const prepareHeadersParams = (headersArray: KeyValue[]) => {
    return headersArray.map((val) => Object.values(val)).filter((val) => val[0]);
  };

  useEffect(() => {
    const encodedUrl = endpointUrl ? encode64(endpointUrl) : '';
    const encodedBody = requestBody ? encode64(JSON.stringify(JSON.parse(requestBody))) : '';
    const sanitizedVariables = variables.filter((val) => val.key);
    const encodedVariables = sanitizedVariables.length ? encode64(JSON.stringify(sanitizedVariables)) : '';
    const encodedHeaders = requestHeaders.length > 0 ? prepareHeadersParams(requestHeaders) : [];

    const query = new URLSearchParams(encodedHeaders).toString();
    const pathMethod = selectedMethod ? `/${selectedMethod}` : '';
    const pathEncodedUrl = encodedUrl ? `/${encodedUrl}` : '/ ';
    const pathEncodedBody = encodedBody ? `/${encodedBody}` : '/ ';
    const pathEncodedVariables = encodedVariables ? `/${encodedVariables}` : '/ ';
    const pathQuery = encodedHeaders.length ? `?${query}` : '';
    const localePath = locale ? `/${locale}` : '';
    const path = localePath + pathMethod + pathEncodedUrl + pathEncodedBody + pathEncodedVariables + pathQuery;

    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', path);
    }
  }, [selectedMethod, endpointUrl, requestHeaders, requestBody, locale, variables]);

  const onSendClick = async () => {
    const requestVariables = variables.length ? variables : undefined;
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

      history.unshift(currentUrl);

      LSSetItem('history', history);
    }
  };

  const handleRemoveVariable = (index: number) => {
    const newVariables = variables.filter((_, i) => i !== index);
    setVariables(newVariables);
  };

  const handleRemoveHeader = (index: number) => {
    const newHeaders = requestHeaders.filter((_, i) => i !== index);
    setRequestHeaders(newHeaders);
  };

  const handleShowHeaders = () => {
    setShowHeaders(!showHeaders);
  };

  const handleShowVariables = () => {
    setShowVariables(!showVariables);
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
        <ButtonsShow onShowHeaders={handleShowHeaders} onShowVariables={handleShowVariables} />
        {showHeaders && (
          <KeyValueInputs value={requestHeaders} onChange={setRequestHeaders} onRemove={handleRemoveHeader} />
        )}
        {showVariables && (
          <KeyValueInputs
            value={variables}
            onChange={setVariables}
            buttonTitle={t('RESTGraphQL:addVariable')}
            placeholder={t('RESTGraphQL:variable')}
            onRemove={handleRemoveVariable}
          />
        )}
        <h4 className={styles.resfullContainer}>{t('RESTGraphQL:body')}</h4>
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
