import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props) {
  return (
    <>
        <nav className="navbar contianer-fluid navbar-expand-lg navbar-light bg-light w-100">
            <div className="container">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <Link className="navbar-brand" to='/home'><i class="fa-regular fa-note-sticky"></i> Notes</Link>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {props.userData? <>
                        <li className="nav-item">
                            <Link id='link-home' className="nav-link active" aria-current="page" to="/home">Home</Link>
                        </li>
                    </>:""}
                        
                        
                    </ul>
                    <form className="d-flex registeration">
                        {props.userData? <>
                            <button onClick={props.logOut} className="btn btn-outline-success" type="submit">Log Out</button>
                            </>:<>
                            <button className="btn btn-outline-success mx-2" type="submit"> <Link to='/login'>Login</Link> </button>
                            <button className="btn btn-outline-success" type="submit"> <Link to='/Register'>Sign Up</Link></button>    
                            </>}
                        
                        
                    </form>
                </div>
            </div>
        </nav>
        
    </>
  )                     
}
