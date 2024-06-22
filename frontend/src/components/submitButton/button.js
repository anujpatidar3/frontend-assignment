import { useStore } from '../../store';
import submitData from '../../apis/submit';
import { SnackbarComponent } from '../Snackbar/snackbar';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { buttonStyle, containerStyle, iconStyle } from './styles'

export const SubmitButton = () => {

    const handleHover = (event) => {
        event.target.style.backgroundColor = "#496235";
    };

    const handleHoverOut = (event) => {
        event.target.style.backgroundColor = "#658147";
    };

    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(true)

    const handleSubmit = async () => {
        const pipelineData = {
            nodes: nodes.map(node => ({ id: node.id })),
            edges: edges.map(edge => ({ source: edge.source, target: edge.target }))
        };
        if (!nodes.length) {
            setSnackbarMessage("Please create a Node");
            setSnackbarOpen(true);
            setIsSuccess(false)
            return
        }

        try {
            const resultMessage = await submitData(pipelineData);
            setSnackbarMessage(resultMessage);
            setSnackbarOpen(true);
            setIsSuccess(true)
        } catch (error) {
            console.error('Error submitting data:', error);
            setSnackbarMessage('There was an error processing the pipeline. Please try again.');
            setSnackbarOpen(true);
            setIsSuccess(false)
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
                success={isSuccess}
            />
        </div>
    );
};
