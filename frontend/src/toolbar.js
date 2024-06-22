// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    const sidebarStyle = {
        width: "250px", // Adjust the width as needed
        padding: "10px",
        backgroundColor: "#E7F0DC", // Black background with 90% opacity
        height: "100vh", // Full height of the viewport
        position: "fixed", // Fixed position on the side
        overflowY: "auto", // Scrollable if content overflows
        display: "flex",
        flexDirection: "column",
        // justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1000, // Ensuring the sidebar is on top
    };

    const buttonRowStyle = {
        // display: "flex",
        // justifyContent: "space-between",
        width: "100%", // Take full width of the sidebar
        marginBottom: "10px", // Space between rows
    };

    const HeadingStyle = {
        fontSize: "25px",
        color: "#658147",
        fontWeight: "800",
        margin: "20px",
    };

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
