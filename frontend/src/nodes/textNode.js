// textNode.js
import { BaseNode } from './components/baseNode.js';
import { Position } from 'reactflow';
import { useState, useRef, useEffect } from 'react';

export const TextNode = ({ id, data }) => {

  data = {
    ...data,
    text: data?.text || '{{input}}',
  };

  const handles = [
    { type: 'source', position: Position.Right, id: `${id}-output` },
  ];

  const inputs = [
    { label: 'Text: ', field: 'text', type: 'textarea' },
  ];

  const style = {
    backgroundColor: '#78ABA8',
    border: '4px solid #78ABA8'
  }

  const [fields, setFields] = useState(data);

  const inputRef = useRef(null);
  const maxWidth = 300;
  const [nodeSize, setNodeSize] = useState({ width: 150, height: "auto" });

  const updateNodeSize = () => {
    const input = inputRef.current;
    if (input) {
      const textWidth = input.scrollWidth + 20;
      const textHeight = input.scrollHeight + 40;
      let newWidth = textWidth > maxWidth ? maxWidth : textWidth;
      let newHeight = textWidth > maxWidth ? textHeight + 20 : textHeight;
      setNodeSize({ width: newWidth, height: newHeight });
    }
  };

  useEffect(() => {
    updateNodeSize();
  }, [fields.text]);

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
      nodeSize={nodeSize}
      inputRef={inputRef}
    />
  )
};