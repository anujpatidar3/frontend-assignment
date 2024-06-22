import { PipelineToolbar } from './components/Toolbar/toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './components/SubmitButton/button';

function App() {
  return (
    <div>
      <PipelineToolbar />
      <PipelineUI />
      <SubmitButton />
    </div>
  );
}

export default App;
