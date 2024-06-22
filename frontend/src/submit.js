import { useStore } from './store';
import submitData from './apis/submit';
import { SnackbarComponent } from './components/snackbar';
import { useState } from 'react';

export const SubmitButton = () => {
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button type="submit" onClick={handleSubmit}>Submit</button>
            <SnackbarComponent
                open={snackbarOpen}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
            />
        </div>
    );
};
