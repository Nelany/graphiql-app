'use client';

import { KeyValue } from '@/Types/Types';
import { encode64 } from '@/utils/base64';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import ClientEndpoint from '../RestQlClient/ClientEndpoint/ClientEndpoint';
import ClientEndpointSdl from '../RestQlClient/ClientEndpointSdl/ClientEndpointSdl';
import GraphEditor from '../RestQlClient/ClientJsonEditor/GraphQLEditor';
import ResponseStatus from '../RestQlClient/ClientResponse/ResponseStatus/ResponseStatus';
import GraphQLDocs from '../RestQlClient/GraphQLDocs/GraphQLDocs';
import KeyValueInputs from '../RestQlClient/KeyValueInputs/KeyValueInputs';
import { buildClientSchema, getIntrospectionQuery, GraphQLSchema } from 'graphql';
import { toast } from 'react-toastify';
import { fetchSDL } from '../../../../app/actions';
import JsonEditor from '../RestQlClient/ClientJsonEditor/JsonEditor';
import styles from './GraphQl.module.css';
  
interface RestFullProps<T> {
  method: string;
  endpoint?: string;
  headers?: KeyValue[];
  body?: string;
  locale: string;
  fetchData: (
    method: string,
    url: string | undefined,
    body: string | undefined,
    headers: KeyValue[] | undefined
  ) => Promise<FetchDataResponse<T> | undefined>;
}
interface FetchDataResponse<T> {
  response: T;
  status: number;
  statusText: string;
}

export default function GraphQL<T>({ method, endpoint, headers, body, locale, fetchData }: RestFullProps<T>) {
  const { t } = useTranslation();
  const [endpointUrl, setEndpointUrl] = useState(endpoint);
  const [requestHeaders, setRequestHeaders] = useState<KeyValue[]>(headers || []);
  const [requestBody, setRequestBody] = useState(body);
  const [endpointUrlSdl, setEndpointUrlSdl] = useState(endpoint ? `${endpoint}?sdl` : '');
  const [schema, setSchema] = useState<GraphQLSchema | null>(null);
  const [response, setResponse] = useState<FetchDataResponse<T> | undefined>(undefined);

  const prepareHeadersParams = (headersArray: KeyValue[]) => {
    return headersArray.map((val) => Object.values(val)).filter((val) => val[0]);
  };

  useEffect(() => {
    if (!endpointUrl) {
      setEndpointUrlSdl('');
    } else {
      setEndpointUrlSdl(`${endpointUrl}?sdl`);
    }
  }, [endpointUrl]);

  useEffect(() => {
    const encodedUrl = endpointUrl ? encode64(endpointUrl) : '';
    const encodedBody = requestBody ? encode64(requestBody) : '';
    const encodedHeaders = requestHeaders.length > 0 ? prepareHeadersParams(requestHeaders) : [];
    const query = new URLSearchParams(encodedHeaders).toString();
    const pathMethod = '/GRAPHQL';
    const pathEncodedUrl = encodedUrl ? `/${encodedUrl}` : '';
    const pathEncodedBody = encodedBody ? `/${encodedBody}` : '';
    const pathQuery = encodedHeaders ? `?${query}` : '';
    const localePath = locale ? `/${locale}` : '';
    const path = localePath + pathMethod + pathEncodedUrl + pathEncodedBody + pathQuery;

    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', path);
    }
  }, [endpointUrl, requestHeaders, requestBody, locale]);

  const handleFetchSdl = async () => {
    try {
      const data = await fetchSDL(endpointUrlSdl);
      const schema = buildClientSchema(data);
      setSchema(schema);
    } catch (error) {
      toast.error('Error fetching schema');
    }
  };

  const onSendClick = async () => {
    const data = await fetchData(method, endpointUrl, requestBody, requestHeaders);
    if (data) {
      if (data.status === 0) {
        toast.error(data.statusText, {
          autoClose: 10000,
          closeOnClick: true,
        });
        return;
      }
      setResponse(data);
    }
  };
  
  return (
    <div className={styles.resfullWrapper}>
      <div className={styles.resfullDocsWrapper}>
        <Image
          className={styles.resfullDocsIcon}
          src="/list_document_icon.png"
          alt="list-icon"
          width={60}
          height={60}
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
          <KeyValueInputs value={requestHeaders} onChange={setRequestHeaders} />
          <div className={styles.methodEndContainer}>
            <ClientEndpointSdl value={endpointUrlSdl} onChange={setEndpointUrlSdl} />
            <button className={styles.buttonSend} onClick={handleFetchSdl}>
              {t('RESTGraphQL:send')}
            </button>
          </div>
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
