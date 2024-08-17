import React, { useState } from 'react'
import instsimgae from '../assets/social-desktop.PNG'
import instsmobile from '../assets/social-mobile.PNG'
import './Login.css'
import { Link } from 'react-router-dom'
import {API_BASE_URL} from '../config'
import axios from 'axios'
import Swal from 'sweetalert2'

const SignupPage = () => {


    const [fullname, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const signup = (event) => {
        event.preventDefault();

        setLoading(true);
        const requestData = { fullname: fullname, email:email, password :password }
        axios.post(`${API_BASE_URL}/singup`, requestData)
            .then((result) => {
                if (result.status === 201) {
                    setLoading(false);
                    Swal.fire({     
                        icon: 'success',
                        title: 'User successfully registered'
                    })
                }
                setFullName('');
                setEmail('');
                setPassword('');
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Some error occurred please try again later!'
                })
            })


    }
    return (
        <>
            <div className="container login-container">
                <div className="row ">
                    <div className="col-lg-7 col-sm-12 d-flex justify-content-center align-items-cneter">
                        <img className="socialdesktop" style={{ height: '85%' }} src={instsimgae} alt="" />
                        <img className="socialmoblie" src={instsmobile} alt="" />
                    </div>
                    <div className="col-lg-5 col-sm-12">
                        <div className="card shadow p-3 mb-5 bg-body-tertiary rounded" >

                             { loading  ?  <div className="col-md-12 mt-3 text-center">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                                 : ''} 


                            <div className="card-body px-5">
                                <h4 className="card-title text-center fw-blod mt-3">Sign up </h4>
                                <form onSubmit={(e) => signup(e)}>
                                    <input type="number" className="p-2 mt-4 mb-2 form-control input-bg" placeholder='Phone ' />
                                    <input type="email" onChange={(ev) => setEmail(ev.target.value)} className="p-2  mb-2 form-control input-bg" placeholder=' email' />
                                    <input type="text" onChange={(ev) => setFullName(ev.target.value)} className="p-2  mb-2 form-control input-bg" placeholder='fullname ' />

                                    <input type="Password" onChange={(ev) => setPassword(ev.target.value)} className="p-2 mb-2 form-control input-bg " placeholder='Password' />
                                    <div className=" mt-3 d-grid">
                                        <button type="submit" className="custum-btn custum-btn-blue">Submit</button>
                                    </div>
                                    <div className="my-4">
                                        <hr className='text-muted' />
                                        <h5 className='text-muted text-center'>Or</h5>
                                        <hr className='text-muted' />
                                    </div>

                                    <div className=" mt-3 d-grid shadow">
                                        <button type="submit" className="custum-btn custum-btn-white">
                                            <span className='text-muted'>Already have an account ?</span>
                                            <Link to="/login" className='ms-1 text-info fw-blod'>Log in</Link>


                                        </button>
                                    </div>

                                </form>

                            </div>
                        </div></div>
                </div>

            </div>

        </>
    )
}

export default SignupPage
