'use client';

import React, { FC, useState } from 'react';
import {
  GraphQLSchema,
  GraphQLType,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLScalarType,
} from 'graphql';
import styles from './GraphQLDocs.module.css';
import { Item } from '@/Types/Types';

const GraphQlDocs: FC<{ schema: GraphQLSchema }> = ({ schema }) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
  };

  const handleBackClick = () => {
    setSelectedItem((prev) => (prev?.parent ? prev.parent : null));
  };

  const renderDetails = (type: GraphQLType, parent?: Item) => {
    if (type instanceof GraphQLObjectType || type instanceof GraphQLInputObjectType) {
      const fields = type.getFields();
      return (
        <div>
          {Object.keys(fields).map((fieldName, index) => {
            const field = fields[fieldName];
            return (
              <div key={index}>
                <span className={styles.fieldLink} onClick={() => handleItemClick(field)}>
                  {fieldName}
                </span>
                <div>
                  <span>{field.type.toString()}</span>
                  {field.description && <div className={styles.argumentDescription}>{field.description}</div>}
                </div>
                {'args' in field && field.args.length > 0 && (
                  <div className={styles.argumentDescription}>
                    <strong>Arguments:</strong>
                    <ul>
                      {field.args.map((arg) => (
                        <li key={arg.name}>
                          {arg.name}:{' '}
                          <span
                            className={styles.fieldLink}
                            onClick={() =>
                              handleItemClick({
                                name: arg.name,
                                type: arg.type,
                                parent: { name: fieldName, type: field.type, parent },
                              })
                            }
                          >
                            {arg.type.toString()}
                          </span>
                          {arg.description && <div className={styles.argumentDescription}>{arg.description}</div>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      );
    }
    if (type instanceof GraphQLList || type instanceof GraphQLNonNull) {
      return renderDetails(type.ofType, parent);
    }
    if (type instanceof GraphQLScalarType) {
      return (
        <div>
          <div>{type.toString()}</div>
          {type.description && <div className={styles.argumentDescription}>{type.description}</div>}
        </div>
      );
    }
    return <div>{type.toString()}</div>;
  };

  const queryType = schema?.getQueryType();

  return (
    <div className={styles.docs}>
      <h1>Docs</h1>
      {schema ? (
        selectedItem ? (
          <div className={styles.docsWrapper}>
            <button className={styles.backButton} onClick={handleBackClick}>
              Back
            </button>
            <h3>{selectedItem.name}</h3>
            {selectedItem.description && <p>{selectedItem.description}</p>}
            {renderDetails(selectedItem.type, selectedItem)}
          </div>
        ) : (
          queryType && renderDetails(queryType)
        )
      ) : (
        <p>Loading schema...</p>
      )}
    </div>
  );
};

export default GraphQlDocs;
