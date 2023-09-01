import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import ShowListing from './components/ShowListing';
import CreateListing from './components/CreateListing';
import ShowSingleListing from './components/ShowSingleListing';
import EditListing from './components/EditListing';
import FilterListing from './components/FilterListing';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import Register from './components/auth/Register';


// const DefaultLayout = React.lazy(() => import('./components/DefaultLayout'))
// const Login = React.lazy(() => import('./views/Login'))
// const Register = React.lazy(() => import('./views/Register'))
// const Color = React.lazy(() => import('./views/Color'))

const App = () => {
  return (
    <BrowserRouter>
      
      <div>
        <Header />
        <FilterListing />
        <Routes>
        
          <Route exact path='/' element={<ShowListing />} />
          <Route path='/create-listing' element={<CreateListing />} />
          <Route path='/show-listing/:id' element={<ShowSingleListing />} />
          <Route path='/edit-listing/:id' element={<EditListing />} />
          <Route path='/filter-listing' element={<FilterListing />} />
        </Routes>
        <Footer />
        </div>
        <Routes>
          <Route path='/register' element={<Register />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App;
