import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import { describe, expect, it, vi } from 'vitest';
import GraphQlDocs from './GraphQLDocs';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const createSchema = () => {
  const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
      hello: {
        type: GraphQLString,
        description: 'A simple hello world query',
      },
    },
  });

  return new GraphQLSchema({
    query: queryType,
  });
};

describe('GraphQlDocs component', () => {
  it('renders the main container with initial state', () => {
    const schema = createSchema();

    render(<GraphQlDocs schema={schema} />);

    expect(screen.getByText('RESTGraphQL:docs')).toBeInTheDocument();
    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  it('displays details of a type when an item is clicked', () => {
    const schema = createSchema();

    render(<GraphQlDocs schema={schema} />);

    const helloField = screen.getByText('hello');
    fireEvent.click(helloField);

    expect(screen.getByText('A simple hello world query')).toBeInTheDocument();
    expect(screen.getByText('String')).toBeInTheDocument();
  });

  it('returns to the previous item when the back button is clicked', () => {
    const schema = createSchema();

    render(<GraphQlDocs schema={schema} />);

    const helloField = screen.getByText('hello');
    fireEvent.click(helloField);

    expect(screen.getByText('A simple hello world query')).toBeInTheDocument();

    const backButton = screen.getByText('Back');
    fireEvent.click(backButton);

    expect(screen.getByText('hello')).toBeInTheDocument();
  });
});
