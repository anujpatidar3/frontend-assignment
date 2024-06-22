// textNode.js
import { BaseNode } from './baseNode.js';
import { Position } from 'reactflow';
import { useState } from 'react';

export const TextNode = ({ id, data }) => {

  data = {
    ...data,
    text: data?.text || '{{input}}',
  };

  const handles = [
    { type: 'source', position: Position.Right, id: `${id}-output` },
  ];

  const inputs = [
    { label: 'Text: ', field: 'text', type: 'text' },
  ];

  const style = {
    backgroundColor: '#78ABA8',
    border: '4px solid #78ABA8'
  }

  const [fields, setFields] = useState(data);
  console.log('fields', fields)

  return (
    <BaseNode
      id={id}
      data={data}
      fields={fields}
      label="Text"
      setFields={setFields}
      handles={handles}
      inputs={inputs}
      style={style}
    />
  )
};