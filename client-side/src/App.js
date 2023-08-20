import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import ShowListing from './components/ShowListing';
import CreateListing from './components/CreateListing';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path='/' element={<ShowListing />} />
          <Route path='/create-listing' element={<CreateListing />} />
        </Routes>
        </div>
    </BrowserRouter>
  )
}

export default App;
