import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './indexPage.css';
import {NavLink} from 'react-router-dom';
import {BsFillPlayFill} from 'react-icons/bs'

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <>
      <div className="row m-0  landingSpace d-flex flex-column justify-content-center">
        <div className="container-fluid allKindsSlogan ">
          All Kinds of fashionable Products
        </div>
        <div className=" chooseSlogan ">
          Choose Your <br />Favorite Product 
        </div>
        <div className="col-6">
          <p className='welcomeMessage'>Welcome to Bazard.tn , where shopping meets convenience. Explore our handpicked selection of fashion, tech, and home essentials. Enjoy a seamless, secure shopping experience with expert support. Elevate your lifestyle with us. Start shopping today!</p>
        </div>
        <div className="col-6 d-flex gap-3">
          <NavLink className='btn shopButton btn-lg text-white' to='/login'>Sign In with Email</NavLink>
          <NavLink to='#' className='p-0 d-flex gap-3 callToActionButton'><span className='watchButton'><span className='playButton d-flex '><BsFillPlayFill className='icon'></BsFillPlayFill></span></span><span id="buttonText">Watch How To order</span></NavLink>
        </div>
      </div>
        </>
    }
}

export default HomePage;
