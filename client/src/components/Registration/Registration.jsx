import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'

function Registration(props) {
  

  const navigate = useNavigate()

  const loginValue = useRef()
  const emailValue = useRef()
  const passwordValue = useRef()

  const [errCheck, setErrCheck] = useState(false)
  const [message, setMessage] = useState()
  const [sucCheck, setSucCheck] = useState(false)

  const addUser = (event) => {
    event.preventDefault()

    const newUser = {
      user_name: loginValue.current.value,
      user_email: emailValue.current.value,
      user_password: passwordValue.current.value
    }
    fetch('/registration', {
      method: 'POST',
      headers: { 'Content-Type': 'Application/json' },
      body: JSON.stringify(newUser)
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
    <>
      <div className="container-fluid my-5">
        <div className="col-md-4 offset-md-4">
          <div className="form-container">
            <div className="form-icon"><i className="fa fa-user"></i></div>
            <h3 className="title">Registration</h3>
            <form className="form-horizontal" onSubmit={addUser}>
              <div className="form-group my-2">
                <input ref={loginValue} name="login" className="form-control" type="text" placeholder="login" />
              </div>
              <div className="form-group">
                <input ref={emailValue} name="email" className="form-control" type="email" placeholder="email address" />
              </div>
              <div className="form-group my-2">
                <input ref={passwordValue} name="password" className="form-control" type="password" placeholder="password" />
              </div>
              <div className="form-group">
              </div>
              <button type="submit" className="btn btn-primary my-2">Registration</button>
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
    </>
  );
}

export default Registration;
