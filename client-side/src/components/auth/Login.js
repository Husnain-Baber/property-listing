import React, { useState, useLayoutEffect } from 'react'
// import AuthContext from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { setAuthToken } from '../../setAuthToken';

const Login = () => {
  // const { setAuth } = useContext(AuthContext)
const navigate = useNavigate();

const [user, setUser] = useState({
    email: '',
    password: ''
  });
  useLayoutEffect(() => {
    var token = localStorage.getItem('token')
    if(token){
      navigate('/');
    }
    
  },[])
const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

const onSubmit = (e) => {
    e.preventDefault();
    
    axios
      // .post(`http://localhost:8082/api/users/email/${user.email}`)
      .post('http://localhost:8082/api/users/login', user)
      .then((res) => {
        console.log(res)

        toast.success("Login Successfully")
        const token  =  res.data.token;
        const status = res.data.status;
        localStorage.setItem("token", token);
        localStorage.setItem("status", status);
        setAuthToken(token);
        setTimeout(() => {
          navigate('/');
        }, 2000);  
      })
      .catch((err) => {
        toast.error(err.response.data.error)
        console.log('Fetch Error: ', err);
      });
  };


  return (
    <div className='container'>
      <div className='form_wrapper'>
        <h2 className='display-5 text-center'>Login Now</h2>
        <hr />
        <form className="row g-3 my-3" onSubmit={onSubmit}>
          <div className="col-12">
            <label htmlFor="inputEmail4" className="form-label">Email</label>
            <input type="email" className="form-control" id="inputEmail4" name='email'
            onChange={onChange}
            required />
          </div>
          <div className="col-12">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name='password' label="Password"
            onChange={onChange}
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary float-end">Login</button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  )
}

export default Login