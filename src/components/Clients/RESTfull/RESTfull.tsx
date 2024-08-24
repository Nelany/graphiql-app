'use client';

import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

const RestFull: React.FC = () => {
  const [json, setJson] = useState<string>('');

  const handleChange = (editor: any, data: any, value: string) => {
    setJson(value);
  };

  return (
    <div>
      <h2>Editable JSON Field</h2>
      <CodeMirror
        value={json}
        options={{
          mode: 'application/json',
          theme: 'material',
          lineNumbers: true,
        }}
        onBeforeChange={handleChange}
      />
      <pre>
        <code>{json}</code>
      </pre>
    </div>
  );
};

export default RestFull;
