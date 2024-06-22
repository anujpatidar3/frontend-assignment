// textNode.js
import { BaseNode } from './components/baseNode/baseNode.js';
import { Position } from 'reactflow';
import { useState, useRef, useEffect } from 'react';
import { HANDLEOPTIONS, NODEOPTIONS } from '../constants/nodes.js';
import { textStyle as style } from './styles.js';

export const TextNode = ({ id, data }) => {

  data = {
    ...data,
    text: data?.text || '{{input}}',
  };

  const inputs = [
    { label: 'Text: ', field: 'text', type: NODEOPTIONS.TEXTAREA },
  ];

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
  }, [fields.text, fields.text.length]);


  const [handles, setHandles] = useState([{ type: HANDLEOPTIONS.SOURCE, position: Position.Right, id: `${id}-output` }]);

  const [variableCount, setVariableCount] = useState(0);

  const extractVariables = (input) => {
    const regex = /{{\s*([^}]+)\s*}}/g;
    const matches = [...input.matchAll(regex)];
    return matches.map(match => match[1].trim());
  };

  useEffect(() => {
    const variables = extractVariables(fields.text);
    setVariableCount(variables.length);
  }, [fields.text]);

  useEffect(() => {
    const variables = extractVariables(fields.text);
    const stepSize = variables.length > 1 ? 100 / (variables.length + 1) : 50;
    const newHandles = variables.map((variable, index) => ({
      type: HANDLEOPTIONS.TARGET,
      position: Position.Left,
      id: `${id}-output-${index}-${variable}`,
      style: { top: `${stepSize * (index + 1)}%` }
    }));
    setHandles([{ type: HANDLEOPTIONS.SOURCE, position: Position.Right, id: `${id}-output` }
      , ...newHandles])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variableCount]);

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