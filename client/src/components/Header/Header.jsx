import React from 'react';
import { Link } from 'react-router-dom'
import {  useSelector } from 'react-redux'

function Header(props) {
  const { users } = useSelector(state => state.usersReducer)
 
  console.log(users.id);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to='/main' className="navbar-brand" >ELGAME</Link>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            {users.id ?
              <Link to='/logout' className="nav-link" >Logout</Link>
              :
              <>
                <Link to='/login' className="nav-link" aria-current="page">Login</Link>
                <Link to='/registration' className="nav-link" aria-current="page">Registration</Link>
              </>
            }
          </div>
        </div>
        <div className='mx-5 navbar-brand'><h4>{users.user_name}</h4> Score: {users.user_score}</div>
      </div>
    </nav>
  );
}

export default Header;
