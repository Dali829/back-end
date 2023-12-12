import React, { useEffect,useState } from "react";
import axios from 'axios';
import { NavLink } from "react-router-dom";
import logo from '../../assets/logo.png'
import 'bootstrap/dist/css/bootstrap.css';
import './login.css'
function Login()
{
  //always check if there is an user logged ,if there is one terminate his session
  const [login,setLogin]=useState()
  const [password,setPassword]=useState()
  //here we will send a get request to check if there is an admin with the given login and password
  function loginFunction(){
    axios.post(' http://localhost:3030/customer/login/',{email:login,password})
    .then(response=>{
      if(response.data=='no account found with this email')
      {
        document.getElementsByClassName('emailFeedBack')[0].classList.remove('d-none')
        document.getElementsByClassName('emailFeedBack')[0].textContent=response.data;  
      }
      else if(response.data=='your password is incorrect')
      {
        document.getElementsByClassName('passwordFeedBack')[0].classList.remove('d-none')
        document.getElementsByClassName('passwordFeedBack')[0].textContent=response.data;  
      }
      else if(response.data._id)
      {
        localStorage.clear()
        localStorage.setItem('currentUser',response.data._id);
        window.location='/home'
      }
    })
    .catch(error=>{
      console.log(error)
    })
  }
  
    return <>
       <nav className="navbar navbar-expand-lg navbar-light bg-light p-2">
   <NavLink className="navbar-brand p-1" to="#">
     <img src={logo} width="50" height="50" alt="" />
   </NavLink>
   </nav>
  <div className="row m-auto loginDivContainer">
      <div className="col-6 loginContainer m-3 p-5  ">    
      <div className="avatarContainer"></div>
              <h4>Welcome Back !</h4>
              <h6 className="font-weight-light">Please Connect to Your Account</h6>
              <form className="pt-3 bg-white" id="loginForm"  name="loginForm" >
                <div className="form-group"  >
                  <input type="email" className="form-control form-control-lg" id="Email" placeholder="Identifiant" onChange={(event=>{setLogin(event.target.value)})} name="Email"/>
                  <div className="d-none emailFeedBack"></div>
                </div>
                <div className="form-group my-3">
                  <input type="password" className="form-control form-control-lg" id="Password" placeholder="Mot de passe" name="Password" onChange={(event=>{setPassword(event.target.value)})}/>
                  <div className="d-none passwordFeedBack"></div>
                </div>
                <div className="mt-3 text-center">
                    <button type="button" tabIndex="3" accessKey="a" className="btn btn-primary btn-block  loginAccount" onClick={loginFunction} ><i className="bi  bi-box-arrow-right"> </i> Se Connecter </button>
                </div>
               
                <div className="mb-2 mt-3 text-center">
                   <NavLink to='/register'> <button tabIndex="4" href="" className="btn createAccount" ><i className="bi  bi-person-plus-fill"> </i>Créer un compte </button></NavLink>
                </div>
               
              </form>
              </div>
              </div>
    </>
}
export default Login;