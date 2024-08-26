'use client';

import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { material } from '@uiw/codemirror-theme-material';

interface JsonEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  isReadOnly?: boolean;
}

function JsonEditor({ value, onChange, isReadOnly = false }: JsonEditorProps) {
  const [errorMessage, setErrorMessage] = useState('');

  const formatJson = (jsonString: string) => {
    try {
      const jsonObject = JSON.parse(jsonString);
      setErrorMessage('');
      if (onChange) onChange(JSON.stringify(jsonObject, null, 2));
    } catch (error) {
      const errorString = (error as Error).message || 'Cannot parse JSON';
      setErrorMessage(errorString);
      return jsonString;
    }
  };

  return (
    <div>
      <p>{errorMessage}</p>
      <CodeMirror
        readOnly={isReadOnly}
        value={value || ''}
        height="400px"
        theme={material}
        extensions={[langs.json()]}
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

export default JsonEditor;
