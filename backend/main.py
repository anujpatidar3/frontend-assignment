from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from pydantic import BaseModel

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:3000",  # Frontend running on port 3000
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

class Node(BaseModel):
    id: str

class Edge(BaseModel):
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    nodes = pipeline.nodes
    edges = pipeline.edges

    node_ids = [node.id for node in nodes]

    # Calculate number of nodes and edges
    num_nodes = len(node_ids)
    num_edges = len(edges)
    
    # Create adjacency list
    adjacency_list = {node_id: [] for node_id in node_ids}
    for edge in edges:
        if not edge.source or not edge.target:
            raise HTTPException(status_code=400, detail="Each edge must have a source and a target.")
        if edge.source not in node_ids or edge.target not in node_ids:
            raise HTTPException(status_code=400, detail="Edges must connect valid nodes.")
        adjacency_list[edge.source].append(edge.target)
    
    # Check if the graph is a DAG using DFS
    def is_dag_dfs(node, visited, rec_stack):
        visited[node] = True
        rec_stack[node] = True
        
        for neighbor in adjacency_list[node]:
            if not visited[neighbor]:
                if is_dag_dfs(neighbor, visited, rec_stack):
                    return True
            elif rec_stack[neighbor]:
                return True
        
        rec_stack[node] = False
        return False

    visited = {node_id: False for node_id in node_ids}
    rec_stack = {node_id: False for node_id in node_ids}
    
    is_dag = True
    for node_id in node_ids:
        if not visited[node_id]:
            if is_dag_dfs(node_id, visited, rec_stack):
                is_dag = False
                break
    
    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': is_dag
    }
