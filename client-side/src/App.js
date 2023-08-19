import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import ShowListing from './components/ShowListing';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<ShowListing />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
