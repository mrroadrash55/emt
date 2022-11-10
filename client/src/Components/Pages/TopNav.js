import React from "react";
import { Link } from "react-router-dom";
import { authAxios } from "../views/runtime/utils/API";

const TopNav = (props) => {

  const Logout = async (event) => {
    
    // localStorage.clear();
    // this.props.history.push('/sessionTimedout');
   // await logUserDetailRequest(this.props, 'Logout')
    let request = {};
    request.UserName = sessionStorage.getItem('userName');

    let response = await authAxios.post('/auth/logout', request);
 
    if(response.data.Status === 'SUCCESS')
    {
      sessionStorage.clear();
      localStorage.clear();
    
    props.props.history.push('/');
    
    
    }
}
  return (
    <>
      <div cla className="Banner-Main-Container">
        <div className="Logo-top">
          <Link to="">
            <img
              src="images/Solartis_Logo.png"
              className="solartis-logo"
              alt=""
            />
          </Link>
        </div>
        <div className="Banner-Right-Home-FAQ">
          <div className="FAQ-Welcome">
            <Link to="" className="menu_icon">
              <img src="images/menu_down.png" alt="Home" />
            </Link>{" "}
            |
            <Link to="/LandingPage">
              <img src="images/Home_Icon.png" alt="Home" />
            </Link>
            | <b>Welcome uiuxunderwriter! </b> |
            <button
            type="submit"
            onClick={Logout}
             className="Logout">
              <span >LOGOUT</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopNav;
