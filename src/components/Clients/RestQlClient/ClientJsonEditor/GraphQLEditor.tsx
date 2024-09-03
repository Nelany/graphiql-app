'use client';

import { autocompletion, closeBrackets } from '@codemirror/autocomplete';
import { bracketMatching } from '@codemirror/language';
import { material } from '@uiw/codemirror-theme-material';
import CodeMirror from '@uiw/react-codemirror';
import { useEffect, useRef, useState } from 'react';

function formatGraphQLString(graphqlString: string): string {
  const addIndentation = (level: number) => '  '.repeat(level);

  let cleanedString = graphqlString
    .replace(/\s*([{}()@])/g, '$1')
    .replace(/\s*([,:])\s*/g, '$1 ')
    .replace(/\s+/g, ' ')
    .trim();

  let indentLevel = 0;
  const formattedLines: string[] = [];

  const splitByBlocks = cleanedString.split(/(\{|\}|\.\.\.|@include|\@skip|@)/).filter(Boolean);

  splitByBlocks.forEach((chunk, index) => {
    const trimmedChunk = chunk.trim();

    if (trimmedChunk === '{') {
      formattedLines.push(`${addIndentation(indentLevel)}{`);
      indentLevel++;
    } else if (trimmedChunk === '}') {
      indentLevel = Math.max(indentLevel - 1, 0);
      formattedLines.push(`${addIndentation(indentLevel)}}`);
    } else if (trimmedChunk.startsWith('...')) {
      if (index > 0 && formattedLines[formattedLines.length - 1] !== '') {
        formattedLines.push('');
      }
      formattedLines.push(`${addIndentation(indentLevel)}${trimmedChunk}`);
    } else if (trimmedChunk.startsWith('@')) {
      formattedLines.push(`${addIndentation(indentLevel)}${trimmedChunk}`);
    } else {
      formattedLines.push(`${addIndentation(indentLevel)}${trimmedChunk}`);
    }
  });

  return formattedLines.join('\n').trim();
}

interface JsonEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  isReadOnly?: boolean;
}

function GraphEditor({ value, onChange, isReadOnly = false }: JsonEditorProps) {
  const [errorMessage, setErrorMessage] = useState('');
  const hasFormatted = useRef(false);

  const formatJson = (graphQLString: string) => {
    try {
      const formatted = formatGraphQLString(graphQLString);
      setErrorMessage('');
      if (onChange) onChange(formatted);
    } catch (error) {
      const errorString = (error as Error).message || 'Cannot parse GraphQL';
      setErrorMessage(errorString);
      if (onChange) onChange(graphQLString);
    }
  };
  useEffect(() => {
    if (!hasFormatted.current && value) {
      formatJson(value);
      hasFormatted.current = true;
    }
  }, [value]);

  return (
    <div>
      <p>{errorMessage}</p>
      <CodeMirror
        readOnly={isReadOnly}
        value={value || ''}
        height="350px"
        theme={material}
        extensions={[bracketMatching(), closeBrackets(), autocompletion()]}
        autoCorrect="true"
        onBlur={(val) => {
          if (val.target.textContent) {
            formatJson(val.target.textContent);
          } else {
            if (onChange) onChange('');
          }
        }}
      />
    </div>
  );
}

export default GraphEditor;
