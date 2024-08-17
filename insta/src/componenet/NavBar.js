import React from 'react'
import './NavBar.css'
import logo from '../assets/logo.PNG'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector,  useDispatch } from 'react-redux';

function NavBar() {

    const dispatch = useDispatch();

    const navigate = useNavigate ();

    const user = useSelector(state => state.userReducer);
    console.log(user);

    const logout = ()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        dispatch({type : "LOGIN_ERROR"});
        navigate('/login');
    }
    return (
        <div>
            <nav className="navbar bg-body-tertiary shadow-sm">
                <div className="container-fluid">
                    <NavLink to="/" className="navbar-brand ms-4">
                        <img src={logo} alt="logo" height="42px" />
                    </NavLink >
                    <form className="d-flex me-md-5" role="search">
                        <input className=" searchbox form-control me-2 text-muted" type="search" placeholder="Search" aria-label="Search" />
                        <NavLink className="nav-link px-2 fs-5" to="/post"><i className="fa-solid fa-house"></i></NavLink>
                        <NavLink className="nav-link px-2 fs-5 searchicon" href="#"><i className="fa-solid fa-magnifying-glass"></i></NavLink>
                     { localStorage.getItem("token") != null ?
                        <NavLink className="nav-link px-2 fs-5" href="#"><i className="fa-regular fa-heart"></i></NavLink> : ''  }
                      { localStorage.getItem("token") != null ? <a className="nav-link px-2 fs-5" >
                            <div className="dropdown">
                            <i className="fa-solid fa-circle " role='button' data-bs-toggle="dropdown" aria-expanded="false" ></i>
                                <ul className="dropdown-menu">
                                    <li><NavLink to="/profile" className="dropdown-item" href="#">Profile</NavLink></li>
                                    <li><a className="dropdown-item" href="#" onClick={()=> logout()} >logout</a></li>
                              
                                </ul>
                            </div>


                           </a> : ''}

                    </form>
                </div>
            </nav>


        </div>
    )
}

export default NavBar
