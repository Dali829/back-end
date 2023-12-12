import { useEffect, useState } from 'react';
import logo from '../../../assets/logo.png';
import { BsPerson, BsCart2, BsSearch } from 'react-icons/bs';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import './navbar.css'
function Navbar()
{ 
  const [items,setItems]=useState()
  useEffect(()=>{
      axios.get('http://localhost:3030/cart/getCartItems/'+localStorage.getItem('currentUser'))
      .then(response=>{
        setItems(response.data.length)
      })
      .catch(error=>{console.log(error)})
    })
  const styleNavLink=({isActive})=>{
    return {
      color:isActive?"#FE441C":"gray",
      borderBottom: isActive?"#FE441C 2px solid":"none",
    }
   
  }
   return (    
   <nav className="navbar navbar-expand-lg navbar-light bg-light p-2">
   <NavLink className="navbar-brand p-1" to="#">
     <img src={logo} width="50" height="50" alt="" />
   </NavLink>
         <button
             className="navbar-toggler"
             type="button"
             data-bs-toggle="collapse"
             data-bs-target="#navbarNav"
             aria-controls="navbarNav"
             aria-expanded="false"
             aria-label="Toggle navigation"
         >
             <span className="navbar-toggler-icon"></span>
         </button>
   <div className="collapse navbar-collapse" id="navbarNav">
     <ul className="navbar-nav d-flex flex-row col mx-5 justify-content-center gap-4 ">
       <li className="nav-item mx-2 active">
         <NavLink className="nav-link" style={styleNavLink} to="/home">
           Home
         </NavLink>
       </li>
       <li className="nav-item mx-2">
         <NavLink className="nav-link" style={styleNavLink} to="/products">
           Products
         </NavLink>
       </li>
       <li className="nav-item mx-2">
         <NavLink className="nav-link" style={styleNavLink} to="/orders">
           My Orders
         </NavLink>
       </li>
       <li className="nav-item mx-2">
         <NavLink className="nav-link" style={styleNavLink} to="/contact">
           Contact Us
         </NavLink>
       </li>
     </ul>
     <div className="avatar-container d-flex gap-3">
       <NavLink style={styleNavLink} className="shopCartIcon" to='/shopCart'> <div className="col h3"><span className='cartCount '>{items}</span><BsCart2></BsCart2> </div></NavLink>
       <NavLink style={styleNavLink} className="profilIcon" to="/editProfil"><div className="col h3"><BsPerson></BsPerson></div></NavLink>
     </div>
   </div>
 </nav>)
}
export default Navbar;