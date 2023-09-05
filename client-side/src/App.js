import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

const DefaultLayout = React.lazy(() => import('./components/DefaultLayout'))
const Register = React.lazy(() => import('./components/auth/Register'))
const Login = React.lazy(() => import('./components/auth/Login'))

const App = () => {
  return (
    <BrowserRouter>
      <Suspense>
        <Routes>
          <Route path='*' name="Home" element={<DefaultLayout />} />
          <Route path='/register' name="Register" element={<Register />} />
          <Route path='/login' name="Login" element={<Login />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App;
