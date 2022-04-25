import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'

function Login(props) {

  const navigate = useNavigate()

  const emailInput = useRef()
  const passwordInput = useRef()

  const [errCheck, setErrCheck] = useState(false)
  const [message, setMessage] = useState()
  const [sucCheck, setSucCheck] = useState(false)

  const loginUser = (event) => {
    event.preventDefault()

    const loginValues = {
      user_email: emailInput.current.value,
      user_password: passwordInput.current.value
    }

    fetch('/login', {
      method: 'POST',
      headers: { 'Content-type': 'Application/json' },
      body: JSON.stringify(loginValues)
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 400) {
          setMessage(data.message)
          setErrCheck(true)
        }
        if (data.status === 200) {
          setMessage(data.message)
          setErrCheck(false)
          setSucCheck(true)
          setTimeout(() => {
            navigate('/main')
          }, 2000);
        }
      })
  }



  return (
    <div className="container-fluid my-5">
      <div className="col-md-4 offset-md-4">
        <div className="form-container">
          <div className="form-icon"><i className="fa fa-user"></i></div>
          <h3 className="title">Login</h3>
          <form onSubmit={loginUser} className="form-horizontal" action="/registration" method="POST">
            <div className="form-group">
              <input ref={emailInput} name="email" className="form-control" type="email" placeholder="email address" />
            </div>
            <div className="form-group my-2">
              <input ref={passwordInput} name="password" className="form-control" type="password" placeholder="password" />
            </div>
            <div className="form-group">
            </div>
            <button type="submit" className="btn btn-primary my-2">Submit</button>
          </form>
          {errCheck &&
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          }
          {sucCheck &&
            <div className="alert alert-success" role="alert">
              {message}
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default Login;