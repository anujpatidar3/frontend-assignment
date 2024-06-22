// toolbar.js

import { DraggableNode } from '../../draggableNode';
import { sidebarStyle, buttonRowStyle, HeadingStyle } from './styles'

export const PipelineToolbar = () => {
    return (
        <div style={sidebarStyle}>
            <div style={HeadingStyle}> VectorShift </div>
            <div style={buttonRowStyle}>
                <DraggableNode type="customInput" label="Input" />
            </div>
            <div style={buttonRowStyle}>
                <DraggableNode type="llm" label="LLM" />
            </div>
            <div style={buttonRowStyle}>
                <DraggableNode type="customOutput" label="Output" />
            </div>
            <div style={buttonRowStyle}>
                <DraggableNode type="text" label="Text" />
            </div>
        </div>
    );
};
