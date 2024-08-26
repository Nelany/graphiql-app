'use client';

import React, { useRef, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import { langs } from '@uiw/codemirror-extensions-langs';
import { material } from '@uiw/codemirror-theme-material';

interface JsonEditorProps {
  value?: string;
  onChange: (value: string) => void;
  isReadOnly?: boolean;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ value, onChange, isReadOnly = false }) => {
  const editorRef = useRef<any>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const formatJson = (jsonString: string) => {
    try {
      const jsonObject = JSON.parse(jsonString);
      setErrorMessage('');

      onChange(JSON.stringify(jsonObject, null, 2));
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
            onChange('');
          }
        }}
        ref={editorRef}
      />
    </div>
  );
};

export default JsonEditor;
