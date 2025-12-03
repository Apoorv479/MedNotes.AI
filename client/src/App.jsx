import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';

function App() {
  return (
    <>
      <HomePage />
      <Toaster position="bottom-center" />
    </>
  );
}

export default App;