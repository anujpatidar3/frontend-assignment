// llmNode.js
import { BaseNode } from './components/baseNode/baseNode.js';
import { Position } from 'reactflow';
import { useState } from 'react';
import { llmStyle as style } from './styles.js';
import { LLMDescription } from '../constants/nodes.js';

export const LLMNode = ({ id, data }) => {
  const handles = [
    { type: 'target', position: Position.Left, id: `${id}-system`, style: { top: `${100 / 3}%` } },
    { type: 'target', position: Position.Left, id: `${id}-prompt`, style: { top: `${200 / 3}%` } },
    { type: 'source', position: Position.Right, id: `${id}-response` },
  ];
  const [fields, setFields] = useState(data);

  return (
    <BaseNode
      id={id}
      data={data}
      label="LLM"
      handles={handles}
      fields={fields}
      setFields={setFields}
      description={LLMDescription}
      style={style}
    />
  );
};
