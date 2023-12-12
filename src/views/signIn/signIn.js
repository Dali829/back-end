import React, { useState } from "react";
import axios from 'axios';
import './signin.css';
import { NavLink } from "react-router-dom";
import logo from '../../assets/logo.png';

function Register() {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhoto, setCustomerPhoto] = useState('');
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
  const [customerAddressRegion, setCustomerAddressRegion] = useState('');
  const [customerAddressCity, setCustomerAddressCity] = useState('');
  const [customerAddressPostalCode, setCustomerAddressPostalCode] = useState('');
  const [customerPassword, setCustomerPassword] = useState('');

  function loginFunction() {
    axios.post('http://localhost:3030/customer/register/',{customerName, customerEmail, customerPhoto, customerPhoneNumber, customerAddressRegion, customerAddressCity, customerAddressPostalCode, customerPassword} )
      .then(response => {
        console.log(response);
        window.location='/login'
      })
      .catch(error => {
        document.getElementsByClassName('error')[0].classList.remove('d-none');
      });
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light p-2">
        <NavLink className="navbar-brand p-1" to="#">
          <img src={logo} width="50" height="50" alt="" />
        </NavLink>
      </nav>
      <div className="row m-auto loginDivContainer">
        <div className="col-6 loginContainer m-3 p-5  ">
          <div className="avatarContainer"></div>
          <h4>Welcome Back !</h4>
          <div className='d-none error'>An error has occured while tryning to  create a new account .Please try again ! </div>
          <h6 className="font-weight-light">Please fill out this form to create a free account</h6>
          <form className="pt-3 bg-white" id="loginForm" name="loginForm">
            <div className="form-group my-2">
              <input type="text" className="form-control form-control-lg" id="customerName" placeholder="Your Name" onChange={(event => { setCustomerName(event.target.value) })} name="customerName" />
            </div>
            <div className="form-group my-2">
              <input type="email" className="form-control form-control-lg" id="customerEmail" placeholder="Your Email" onChange={(event => { setCustomerEmail(event.target.value) })} name="customerEmail" />
            </div>
            <div className="form-group my-2">
              <input type="text" className="form-control form-control-lg" placeholder="Please attach a link to a profile Photo" id="customerPhoto" onChange={(event => { setCustomerPhoto(event.target.value) })} name="customerPhoto" />
            </div>
            <div className="form-group my-2">
              <input type="text" className="form-control form-control-lg" id="customerPhoneNumber" placeholder="Phone Number" onChange={(event => { setCustomerPhoneNumber(event.target.value) })} name="customerPhoneNumber" />
            </div>
            <div className="form-group my-2">
              <input type="text" className="form-control form-control-lg" id="customerAddressRegion" placeholder="Address Region" onChange={(event => { setCustomerAddressRegion(event.target.value) })} name="customerAddressRegion" />
            </div>
            <div className="form-group my-2">
              <input type="text" className="form-control form-control-lg" id="customerAddressCity" placeholder="Address City" onChange={(event => { setCustomerAddressCity(event.target.value) })} name="customerAddressCity" />
            </div>
            <div className="form-group my-2">
              <input type="text" className="form-control form-control-lg" id="customerAddressPostalCode" placeholder="Postal Code" onChange={(event => { setCustomerAddressPostalCode(event.target.value) })} name="customerAddressPostalCode" />
            </div>
            <div className="form-group my-2">
              <input type="password" className="form-control form-control-lg" id="customerPassword" placeholder="Password" onChange={(event => { setCustomerPassword(event.target.value) })} name="customerPassword" />
            </div>
            <div className="mt-3 text-center">
              <button type="button" tabIndex="1" className="btn btn-primary btn-block loginAccount" onClick={loginFunction}><i className="bi  bi-box-arrow-right"> </i> Create New Account </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
