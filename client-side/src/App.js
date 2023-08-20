import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import ShowListing from './components/ShowListing';
import CreateListing from './components/CreateListing';
import ShowSingleListing from './components/ShowSingleListing';
import EditListing from './components/EditListing';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path='/' element={<ShowListing />} />
          <Route path='/create-listing' element={<CreateListing />} />
          <Route path='/show-listing/:id' element={<ShowSingleListing />} />
          <Route path='/edit-listing/:id' element={<EditListing />} />
        </Routes>
        </div>
    </BrowserRouter>
  )
}

export default App;
