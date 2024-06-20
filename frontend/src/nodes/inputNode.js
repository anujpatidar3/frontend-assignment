// src/nodes/inputNode.js
import { BaseNode } from './baseNode';
import { Position } from 'reactflow';

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
    { label: 'Name: ', field: 'inputName', type: 'text' },
    { label: 'Type: ', field: 'inputType', type: 'select', options: ['Text', 'File'] },
  ];

  return <BaseNode id={id} data={data} label="Input" handles={handles} inputs={inputs} />;
};
