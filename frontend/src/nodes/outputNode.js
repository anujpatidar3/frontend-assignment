// outputNode.js
import { BaseNode } from './baseNode.js';
import { Position } from 'reactflow';

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

  return <BaseNode id={id} data={data} label="Output" handles={handles} inputs={inputs} />;
};