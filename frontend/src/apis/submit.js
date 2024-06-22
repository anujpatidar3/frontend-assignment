async function submitData (pipelineData) {
    try {
        const response = await fetch('http://localhost:8000/pipelines/parse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pipelineData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        const { num_nodes, num_edges, is_dag } = result;

        // Display the result in an alert
        return `Pipeline Analysis Result:
        - Number of Nodes: ${num_nodes}
        - Number of Edges: ${num_edges}
        - Is DAG: ${is_dag ? 'Yes' : 'No'}`;

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return 'There was an error processing the pipeline. Please try again.';
    }
}

export default submitData;