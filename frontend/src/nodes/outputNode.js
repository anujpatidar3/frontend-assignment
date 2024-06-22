// outputNode.js
import { BaseNode } from './baseNode.js';
import { Position } from 'reactflow';
import { useState } from 'react';

export const OutputNode = ({ id, data }) => {
  data = {
    ...data,
    outputName: data?.outputName || id.replace('customInput-', 'input_'),
    outputType: data?.outputType || 'Text'
  };

  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-value` },
  ];

  const inputs = [
    { label: 'Name: ', field: 'outputName', type: 'text' },
    { label: 'Type: ', field: 'outputType', type: 'select', options: ['Text', 'File'] },
  ];
  const [fields, setFields] = useState(data);

  const style = {
    backgroundColor: '#C8CFA0',
    border: '4px solid #C8CFA0'
  }

  return (
    <BaseNode
      id={id}
      fields={fields}
      setFields={setFields}
      data={data}
      label="Output"
      handles={handles}
      inputs={inputs}
      style={style}
    />
  );
};