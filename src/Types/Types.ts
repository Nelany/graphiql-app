import { GraphQLType } from 'graphql';
import { Maybe } from 'graphql/jsutils/Maybe';

export interface KeyValue {
  key: string;
  value: string;
}

export interface Item {
  name: string;
  description?: string | Maybe<string>;
  type: GraphQLType;
  parent?: Item;
}
