import { useStore } from './store';
import submitData from './apis/submit';
import { SnackbarComponent } from './components/snackbar';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

export const SubmitButton = () => {
    const buttonStyle = {
        padding: "10px 20px",
        borderRadius: "4px",
        border: "none",
        backgroundColor: "#658147",
        color: "#fff",
        fontSize: "16px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    const containerStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "20px", // Adjust margin as needed
    };

    const handleHover = (event) => {
        event.target.style.backgroundColor = "#496235"; // Darker shade on hover
    };

    const handleHoverOut = (event) => {
        event.target.style.backgroundColor = "#658147"; // Original color on hover out
    };

    const iconStyle = {
        marginLeft: "8px", // Adjust spacing between text and icon
    };

    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleSubmit = async () => {
        const pipelineData = {
            nodes: nodes.map(node => ({ id: node.id })),
            edges: edges.map(edge => ({ source: edge.source, target: edge.target }))
        };
        try {
            const resultMessage = await submitData(pipelineData);
            setSnackbarMessage(resultMessage);
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error submitting data:', error);
            setSnackbarMessage('There was an error processing the pipeline. Please try again.');
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div style={containerStyle}>
            <button
                type="submit"
                style={buttonStyle}
                onMouseEnter={handleHover}
                onMouseLeave={handleHoverOut}
                onClick={handleSubmit}
            >
                Submit
                <FontAwesomeIcon icon={faRightToBracket} style={iconStyle} />
            </button>
            <SnackbarComponent
                open={snackbarOpen}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
            />
        </div>
    );
};
