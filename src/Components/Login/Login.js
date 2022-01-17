import React from 'react';
import './login.css';

const Login = (props) => {
    const formSubmit = () => {
        var userName = document.getElementById("user-name").value;
        var password = document.getElementById("password").value;
        document.getElementById("admin-error").style.display = "none";
        if(userName == "admin@gmail.com" && password == "admin123"){
            document.getElementById("admin-error").style.display = "none";
            localStorage.setItem("admin","true");
            props.history.push('/admin-panel')
        }
        else{
            document.getElementById("admin-error").style.display = "block";
        }
    }
    return (
        <section className="login-page">
            <div className="container">
                <div className="container-fluid">
                    <div className="admin-auth">
                        <div className="form-box">
                            <div className="logo text-center">
                                <img src="https://i.ibb.co/jVR0Kyc/logo-3.png" className="img-fluid" width="60" alt="logo"/> 
                            </div>
                            <div className="text-center admin-txt">
                                Admin Panel
                            </div>
                            <div className="txt">
                                Control panel login
                            </div>
                            <div className="error-box">
                                <p className="admin-error" id="admin-error">Invalid UserName or Password</p>
                            </div>
                            <div>
                                <form className="row" id="admin-login">
                                    <div className="col-lg-12 position-relative">
                                        <label className="form-label user-logo" for="user-name">
                                            <i className="fas fa-user"></i>
                                        </label>
                                        <input type="text" placeholder="Enter UserName" id="user-name" className="form-control user-name" 
                                            required/>
                                    </div>
                                    <div className="col-lg-12 position-relative">
                                        <label className="form-label password-logo" for="password">
                                            <i className="fas fa-key"></i>
                                        </label>
                                        <input type="password" className="form-control password" placeholder="Enter Password" id="password"
                                            required/>
                                    </div>
                                    <div className="col-lg-12">
                                        <button className="btn btn-success" type="button" onClick={() => formSubmit()}>Login</button>
                                    </div>
                                </form>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login;