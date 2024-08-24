'use client';

import React, { useEffect, useRef, useState } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';

const JsonEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstance = useRef<CodeMirror.Editor | null>(null);
  const [json, setJson] = useState<string>('{\n\n}');

  useEffect(() => {
    if (editorRef.current) {
      editorInstance.current = CodeMirror(editorRef.current, {
        value: json,
        mode: { name: 'javascript', json: true },
        theme: 'material',
        lineNumbers: true,
      });

      editorInstance.current.on('change', (instance) => {
        setJson(instance.getValue());
      });
    }

    return () => {
      if (editorInstance.current) {
        editorInstance.current = null;
      }
    };
  }, []);

  return (
    <div>
      <h2>Editable JSON Field</h2>
      <div ref={editorRef} />
    </div>
  );
};

export default JsonEditor;
