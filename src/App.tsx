import './App.css';

import { MultiStepForm } from './form/form';

function App() {
  return (
    <div className="App">
      <MultiStepForm
        onSubmit={(values) => {
          console.log('Form Submitted', values);
        }}
      />
    </div>
  );
}

export default App;
