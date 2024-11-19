'use client';

import { javascript } from '@codemirror/lang-javascript';
import { material } from '@uiw/codemirror-theme-material';
import CodeMirror from '@uiw/react-codemirror';
import graph from 'prettier/plugins/graphql';
import prettier from 'prettier/standalone';
import { useState } from 'react';

interface JsonEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  isReadOnly?: boolean;
}

function GraphEditor({ value, onChange, isReadOnly = false }: JsonEditorProps) {
  const [errorMessage, setErrorMessage] = useState('');
  const [currentValue, setCurrentValue] = useState(value || '');

  const onCurrentChange = async (val: string) => {
    try {
      const formatted = await prettier.format(val, {
        parser: 'graphql',
        plugins: [graph],
      });

      setCurrentValue(formatted);
    } catch (error) {
      setErrorMessage((error as Error).message || 'Cannot parse GraphQL');
    }
  };
  const onBlur = () => {
    onChange?.(currentValue);
  };

  return (
    <div>
      <pre>{errorMessage}</pre>
      <CodeMirror
        readOnly={isReadOnly}
        height="350px"
        value={currentValue || ''}
        theme={material}
        extensions={[javascript()]}
        onChange={onCurrentChange}
        onBlur={onBlur}
      />
    </div>
  );
}

export default GraphEditor;
