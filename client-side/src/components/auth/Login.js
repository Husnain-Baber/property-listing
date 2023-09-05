import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Login = () => {
const navigate = useNavigate();
const [user, setUser] = useState({
    email: '',
    password: ''
  });

const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

const onSubmit = (e) => {
    e.preventDefault();
    
    axios
      .get(`http://localhost:8082/api/users/email/${user.email}`)
      .then((res) => {
        console.log(res.data.email)
        setUser({
          email: res.data.email,
          password: res.data.password
        });
        // navigate('/');
      })
      .catch((err) => {
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
    </div>
  )
}

export default Login