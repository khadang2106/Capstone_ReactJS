import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Router from './routes/Router';
import { LoadingProvider } from './contexts/LoadingContext/LoadingContext';

function App() {
  return (
    <LoadingProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </LoadingProvider>
  );
}

export default App;
