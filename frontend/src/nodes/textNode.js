// textNode.js
import { BaseNode } from './baseNode.js';
import { Position } from 'reactflow';

export const TextNode = ({ id, data }) => {

  data = {
    ...data,
    id: data?.text || '{{input}}',
  };

  const handles = [
    { type: 'source', position: Position.Right, id: `${id}-output` },
  ];

  const inputs = [
    { label: 'Text: ', field: 'text', type: 'text' },
  ];
  return <BaseNode id={id} data={data} label="Text" handles={handles} inputs={inputs} />;
};