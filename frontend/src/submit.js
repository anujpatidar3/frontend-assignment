import { useStore } from './store';
import submitData from './apis/submit';

export const SubmitButton = () => {
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);

    const handleSubmit = async () => {
        const pipelineData = {
            nodes: nodes.map(node => ({ id: node.id })),
            edges: edges.map(edge => ({ source: edge.source, target: edge.target }))
        };
        submitData(pipelineData)
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>
    );
};
