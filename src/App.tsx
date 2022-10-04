import './App.css';

import { MultiStepForm } from './form/form';

export const onSubmit = (values: any) => {
  console.log('Form Submitted', values);
}

function App() {
  return (
    <div className="App">
      <MultiStepForm
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default App;
