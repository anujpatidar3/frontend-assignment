// src/nodes/inputNode.js
import { BaseNode } from './components/baseNode/baseNode';
import { Position } from 'reactflow';
import { useState } from 'react';
import { HANDLEOPTIONS, NODEOPTIONS } from '../constants/nodes';
import { inputStyle as style } from './styles.js';

export const InputNode = ({ id, data }) => {
  data = {
    ...data,
    inputName: data?.inputName || id.replace('customInput-', 'input_'),
    inputType: data?.inputType || 'Text'
  };

  const handles = [
    { type: HANDLEOPTIONS.SOURCE, position: Position.Right, id: `${id}-value` },
  ];

  const inputs = [
    { label: 'Name: ', field: 'inputName', type: NODEOPTIONS.TEXT },
    { label: 'Type: ', field: 'inputType', type: NODEOPTIONS.SELECT, options: ['Text', 'File'] },
  ];
  const [fields, setFields] = useState(data);

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
