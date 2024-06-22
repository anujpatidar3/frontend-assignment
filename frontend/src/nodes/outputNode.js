// outputNode.js
import { BaseNode } from './components/baseNode/baseNode.js';
import { Position } from 'reactflow';
import { useState } from 'react';
import { NODEOPTIONS } from '../constants/nodes.js';
import { outputStyle as style } from './styles.js';

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
    { label: 'Name: ', field: 'outputName', type: NODEOPTIONS.TEXT },
    { label: 'Type: ', field: 'outputType', type: NODEOPTIONS.SELECT, options: ['Text', 'File'] },
  ];

  const [fields, setFields] = useState(data);

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