// toolbar.js

import { NODETYPES } from '../../constants/nodes';
import { DraggableNode } from '../../draggableNode';
import { sidebarStyle, buttonRowStyle, HeadingStyle } from './styles'

export const PipelineToolbar = () => {
    return (
        <div style={sidebarStyle}>
            <div style={HeadingStyle}> VectorShift </div>
            <div style={buttonRowStyle}>
                <DraggableNode type={NODETYPES.CUSTOMINPUT} label="Input" />
            </div>
            <div style={buttonRowStyle}>
                <DraggableNode type={NODETYPES.LLM} label="LLM" />
            </div>
            <div style={buttonRowStyle}>
                <DraggableNode type={NODETYPES.CUSTOMOUTPUT} label="Output" />
            </div>
            <div style={buttonRowStyle}>
                <DraggableNode type={NODETYPES.TEXT} label="Text" />
            </div>
        </div>
    );
};
