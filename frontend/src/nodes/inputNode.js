// src/nodes/inputNode.js
import { BaseNode } from './components/baseNode';
import { Position } from 'reactflow';
import { useState } from 'react';
import { NODEOPTIONS } from '../constants/nodes';

export const InputNode = ({ id, data }) => {
  data = {
    ...data,
    inputName: data?.inputName || id.replace('customInput-', 'input_'),
    inputType: data?.inputType || 'Text'
  };

  const handles = [
    { type: 'source', position: Position.Right, id: `${id}-value` },
  ];

  const inputs = [
    { label: 'Name: ', field: 'inputName', type: NODEOPTIONS.TEXT },
    { label: 'Type: ', field: 'inputType', type: NODEOPTIONS.SELECT, options: ['Text', 'File'] },
  ];
  const [fields, setFields] = useState(data);

  const style = {
    backgroundColor: '#EF9C66',
    border: '4px solid #EF9C66'
  }

  return (
    <BaseNode
      id={id}
      fields={fields}
      setFields={setFields}
      data={data}
      label="Input"
      handles={handles}
      inputs={inputs}
      style={style}
    />
  );
};
