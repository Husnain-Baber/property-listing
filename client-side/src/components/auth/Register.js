import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [emailFocus, setEmailFocus] = useState(false)
    const [pwd, setPwd] = useState('')
    const [validPwd, setValidPwd] = useState(false)
    const [pwdFocus, setPwdFocus] = useState(false)
    const [matchPwd, setMatchPwd] = useState('')
    const [validMatch, setValidMatch] = useState(false)
    const [matchFocus, setMatchFocus] = useState(false)

    const [user, setUser] = useState({
      firstname: '',
      lastname: '',
      email: '',
      password: ''
    });
  
    const onChange = (e) => {
      setUser({ ...user, [e.target.name]: e.target.value });
      if(e.target.name === 'email'){
        setEmail(e.target.value);
      }
      if(e.target.name === 'password'){
        setPwd(e.target.value);
      }
      console.log(e.target.value);
    };
  
    const onSubmit = (e) => {
      e.preventDefault();
      if(!validEmail || !validPwd || !validMatch){
        alert('Invalid credentials')
        return
      }
      axios
        .post('http://localhost:8082/api/users', user)
        .then((res) => {
          setUser({
            firstname: '',
            lastname: '',
            email: '',
            password: ''
          });
  
          // Push to /
          // navigate('/');
          console.log('Success');
        })
        .catch((err) => {
          console.log('Create Error: ', err);
        });
    };
    useEffect(() => {
      const result = EMAIL_REGEX.test(email)
      // console.log('Result: ' + result)
      // console.log('Email: ' + email)
      setValidEmail(result)
  }, [email])
    useEffect(() => {
      const result = PWD_REGEX.test(pwd)
      // console.log('Result: ' + result)
      // console.log('Email: ' + email)
      
      setValidPwd(result)
      const match = pwd === matchPwd
      setValidMatch(match)
  }, [pwd, matchPwd])

  const handleSubmit = (event) => {
    event.preventDefault();
    if(!validEmail || !validPwd || !validMatch){
      alert('Invalid credentials')
      console.log('Email error')
      return
    }
    const data = new FormData(event.currentTarget);
    console.log({
      firstname: data.get('firstname'),
      lastname: data.get('lastname'),
      email: data.get('email'),
      password: data.get('password'),
    });
    // localStorage.setItem('email', JSON.stringify(email));
    // localStorage.setItem('password', JSON.stringify(pwd));

  };
  return (
    <div className='container'>
      <div className='form_wrapper'>
        <h2 className='display-5 text-center'>Register Now</h2>
        <hr />
        <form className="row g-3 my-3" onSubmit={onSubmit}>
          <div className="col-md-6">
            <label htmlFor="firstname" className="form-label">First Name</label>
            <input type="text" className="form-control" id="firstname" name='firstname' onChange={onChange} />
          </div>
          <div className="col-md-6">
            <label htmlFor="lastname" className="form-label">Last Name</label>
            <input type="text" className="form-control" id="lastname" name='lastname' onChange={onChange}/>
          </div>
          <div className="col-12">
            <label htmlFor="inputEmail4" className="form-label">Email</label>
            <input type="email" className="form-control" id="inputEmail4" name='email'
            onChange={onChange}
            aria-invalid={validEmail ? 'false' : 'true'}
            aria-describedby="emailerror"
            onKeyUp={() => setEmailFocus(true)}
            required />
            <p
                id="emailerror"
                className={ emailFocus && !validEmail ? 'instruction' : 'offscreen'}
                >Must be a valid Email.
            </p>
          </div>
          <div className="col-md-6">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name='password' label="Password"
            onChange={onChange}
            aria-invalid={validPwd ? 'false' : 'true'}
              aria-describedby="pwderror"
              onKeyUp={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <ul id="pwderror"
                className={pwdFocus && !validPwd ? 'instruction' : 'offscreen'}>
                  <li>8 to 24 characters.</li>
                  <li>Must include uppercase and lowercase letters, a number and a special character.</li>
                  <li>Allowed special characters:
                    <span> ! </span>
                    <span> @ </span>
                    <span> # </span>
                    <span> $ </span>
                  </li>
                </ul>
          </div>
          <div className="col-md-6">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="cpassword"  
            onChange={(e) => setMatchPwd(e.target.value)}
              aria-invalid={validMatch ? 'false' : 'true'}
                aria-describedby="matcherror"
                onKeyUp={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)} />
                <p
                id="matcherror"
                className={matchFocus && !validMatch ? 'instruction' : 'offscreen'}
                >Must match the first password input field.
            </p>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary float-end">Register</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register