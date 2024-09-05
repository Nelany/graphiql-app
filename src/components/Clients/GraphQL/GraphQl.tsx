'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './GraphQl.module.css';
import ClientEndpoint from '../RestQlClient/ClientEndpoint/ClientEndpoint';
import JsonEditor from '../RestQlClient/ClientJsonEditor/JsonEditor';
import { encode64 } from '@/utils/base64';
import ResponseStatus from '../RestQlClient/ClientResponse/ResponseStatus/ResponseStatus';
import GraphQLDocs from '../RestQlClient/GraphQLDocs/GraphQLDocs';
import Image from 'next/image';
import ClientEndpointSdl from '../RestQlClient/ClientEndpointSdl/ClientEndpointSdl';
import KeyValueInputs from '../RestQlClient/KeyValueInputs/KeyValueInputs';
import { buildClientSchema, getIntrospectionQuery, GraphQLSchema } from 'graphql';
import { toast } from 'react-toastify';

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

export default function GraphQL({ endpoint, headers, body, locale }: RestFullProps) {
  const { t } = useTranslation();
  const [endpointUrl, setEndpointUrl] = useState(endpoint);
  const [requestHeaders, setRequestHeaders] = useState<Header[]>(headers || []);
  const [requestBody, setRequestBody] = useState(body);
  const [endpointUrlSdl, setEndpointUrlSdl] = useState(endpoint ? `${endpoint}?sdl` : '');
  const [schema, setSchema] = useState<GraphQLSchema | null>(null);

  const prepareHeadersParams = (headersArray: Header[]) => {
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
    const encodedBody = requestBody ? encode64(JSON.stringify(JSON.parse(requestBody))) : '';
    const encodedHeaders = requestHeaders.length > 0 ? prepareHeadersParams(requestHeaders) : '';
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

  const fetchSDL = async () => {
    const response = await fetch(endpointUrlSdl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: getIntrospectionQuery() }),
    });
    const result = await response.json();
    const schemaObject = result.data;
    const schema = buildClientSchema(schemaObject);
    setSchema(schema);
    if (schema instanceof Error) {
      toast.error(schema.message);
      return;
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
            <button className={styles.buttonSend}>{t('RESTGraphQL:send')}</button>
          </div>
          <KeyValueInputs value={requestHeaders} onChange={setRequestHeaders} />
          <div className={styles.methodEndContainer}>
            <ClientEndpointSdl value={endpointUrlSdl} onChange={setEndpointUrlSdl} />
            <button className={styles.buttonSend} onClick={fetchSDL}>
              {t('RESTGraphQL:send')}
            </button>
          </div>
          <JsonEditor value={requestBody} onChange={setRequestBody} />
        </div>
        <h4>{t('RESTGraphQL:response')}</h4>
        <div className={styles.editFieldContainer}>
          <ResponseStatus status={200} statusText={undefined} />
          <JsonEditor isReadOnly={true} />
        </div>
      </div>
    </div>
  );
}
