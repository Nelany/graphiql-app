'use client';

import { Action, KeyValue } from '@/Types/Types';
import { encode64 } from '@/utils/base64';
import { LSGetItem, LSSetItem } from '@/utils/LSHelpers';
import { buildClientSchema, GraphQLSchema } from 'graphql';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { fetchSDL } from '../../../../app/actions';
import ClientEndpoint from '../RestQlClient/ClientEndpoint/ClientEndpoint';
import ClientEndpointSdl from '../RestQlClient/ClientEndpointSdl/ClientEndpointSdl';
import GraphEditor from '../RestQlClient/ClientJsonEditor/GraphQLEditor';
import JsonEditor from '../RestQlClient/ClientJsonEditor/JsonEditor';
import ResponseStatus from '../RestQlClient/ClientResponse/ResponseStatus/ResponseStatus';
import GraphQLDocs from '../RestQlClient/GraphQLDocs/GraphQLDocs';
import KeyValueInputs from '../RestQlClient/KeyValueInputs/KeyValueInputs';
import styles from './GraphQl.module.css';
interface RestFullProps<T> {
  initialVariables: string;
  method: string;
  endpoint?: string;
  headers?: KeyValue[];
  body?: string;
  locale: string;
  fetchData: (action: Action) => Promise<FetchDataResponse<T> | undefined>;
  endpointSdl?: string;
}
interface FetchDataResponse<T> {
  response: T;
  status: number;
  statusText: string;
}

export default function GraphQL<T>({
  initialVariables,
  method,
  endpoint,
  headers,
  body,
  locale,
  fetchData,
  endpointSdl,
}: RestFullProps<T>) {
  const { t } = useTranslation();
  const [endpointUrl, setEndpointUrl] = useState(endpoint);
  const [requestHeaders, setRequestHeaders] = useState<KeyValue[]>(headers || []);
  const [requestBody, setRequestBody] = useState(body);
  const [variables, setVariables] = useState(initialVariables);
  const [endpointUrlSdl, setEndpointUrlSdl] = useState(endpointSdl ? endpointSdl : endpoint ? `${endpoint}?sdl` : '');
  const [schema, setSchema] = useState<GraphQLSchema | null>(null);
  const [response, setResponse] = useState<FetchDataResponse<T> | undefined>(undefined);
  const [showHeaders, setShowHeaders] = useState(false);
  const [showVariables, setShowVariables] = useState(false);

  const prepareHeadersParams = (headersArray: KeyValue[]) => {
    return headersArray.map((val) => Object.values(val)).filter((val) => val[0]);
  };

  useEffect(() => {
    if (!endpointUrlSdl) {
      if (!endpointUrl) {
        setEndpointUrlSdl('');
      } else {
        setEndpointUrlSdl(`${endpointUrl}?sdl`);
      }
    }
  }, [endpointUrl, endpointUrlSdl]);

  useEffect(() => {
    const encodedUrl = endpointUrl ? encode64(endpointUrl) : '';
    const encodedBody = requestBody ? encode64(requestBody) : '';
    const encodedVariables = variables ? encode64(variables) : '';
    const encodedUrlSdl = endpointUrlSdl ? encode64(endpointUrlSdl) : '';
    const encodedHeaders = requestHeaders.length > 0 ? prepareHeadersParams(requestHeaders) : [];
    const query = new URLSearchParams(encodedHeaders).toString();
    const pathMethod = '/GRAPHQL';
    const pathEncodedUrl = encodedUrl ? `/${encodedUrl}` : '/ ';
    const pathEncodedBody = encodedBody ? `/${encodedBody}` : '/ ';
    const pathEncodedVariables = encodedVariables ? `/${encodedVariables}` : '/ ';
    const pathEncodedUrlSdl = encodedUrlSdl ? `/${encodedUrlSdl}` : '/ ';
    const pathQuery = encodedHeaders ? `?${query}` : '';
    const localePath = locale ? `/${locale}` : '';
    const path =
      localePath + pathMethod + pathEncodedUrl + pathEncodedBody + pathEncodedVariables + pathEncodedUrlSdl + pathQuery;

    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', path);
    }
  }, [endpointUrl, requestHeaders, requestBody, locale, variables, endpointUrlSdl]);

  const handleFetchSdl = async () => {
    try {
      const response = await fetchSDL(endpointUrlSdl);
      if (!response) {
        toast.error(`Error fetching schema: response is empty!`);
        return;
      }

      const schema = buildClientSchema(response);
      setSchema(schema);
    } catch (error) {
      toast.error(`Error fetching schema: ${(error as Error).message}`);
    }
  };

  const handleRemoveHeader = (index: number) => {
    const newHeaders = requestHeaders.filter((_, i) => i !== index);
    setRequestHeaders(newHeaders);
  };

  const handleRemoveDocs = () => {
    setSchema(null);
  };

  const onSendClick = async () => {
    const parsedVariables = variables ? JSON.parse(variables) : undefined;
    const data = await fetchData({
      method,
      url: endpointUrl,
      body: requestBody,
      headers: requestHeaders,
      variables: parsedVariables,
    });
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

  const handleShowHeaders = () => {
    setShowHeaders(!showHeaders);
  };

  const handleShowVariables = () => {
    setShowVariables(!showVariables);
  };

  return (
    <div className={styles.resfullWrapper}>
      <div className={styles.resfullDocsWrapper}>
        <Image
          className={`${styles.resfullDocsIcon} ${schema ? styles.pointerCursor : ''}`}
          src="/list_document_icon.png"
          alt="list-icon"
          width={60}
          height={60}
          onClick={handleRemoveDocs}
        />
        {schema && <GraphQLDocs schema={schema} />}
      </div>
      <div className={styles.resfullContainer}>
        <div className={styles.editFieldContainer}>
          <div className={styles.methodEndContainer}>
            <ClientEndpoint value={endpointUrl} onChange={setEndpointUrl} />
            <button className={styles.buttonSend} onClick={onSendClick}>
              {t('RESTGraphQL:send')}
            </button>
          </div>
          <h4 className={styles.tittleContainer}>{t('RESTGraphQL:urlSdl')}</h4>
          <div className={styles.methodEndContainer}>
            <ClientEndpointSdl value={endpointUrlSdl} onChange={setEndpointUrlSdl} />
            <button className={styles.buttonSend} onClick={handleFetchSdl}>
              {t('RESTGraphQL:send')}
            </button>
          </div>
          <div className={styles.resfullContainer}>
            <button className={styles.buttonsShow} onClick={handleShowHeaders}>
              {t('RESTGraphQL:showHeaders')}
            </button>
            {showHeaders && (
              <KeyValueInputs value={requestHeaders} onChange={setRequestHeaders} onRemove={handleRemoveHeader} />
            )}
          </div>
          <div className={styles.resfullContainer}>
            <button className={styles.buttonsShow} onClick={handleShowVariables}>
              {t('RESTGraphQL:showVariables')}
            </button>
            {showVariables && <JsonEditor value={variables} onChange={setVariables} />}
          </div>
          <h4 className={styles.tittleContainer}>{t('RESTGraphQL:body')}</h4>
          <GraphEditor value={requestBody} onChange={setRequestBody} />
        </div>
        <h4>{t('RESTGraphQL:response')}</h4>
        <div className={styles.editFieldContainer}>
          <ResponseStatus status={response?.status} statusText={response?.statusText} />
          <JsonEditor value={response ? JSON.stringify(response.response, null, 2) : ''} isReadOnly={true} />
        </div>
      </div>
    </div>
  );
}
