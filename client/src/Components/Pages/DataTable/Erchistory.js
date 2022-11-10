import React, { useState } from "react";
import { Link } from "react-router-dom";
import ERCHistorytable from "../ERCHistorytable";
import SideNav from "../SideNav";
import { authAxios } from "../../views/runtime/utils/API";

const Erchistory = (props) => {
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
    
    props.history.push('/');
    
    
    }
}
  if (localStorage.getItem("Token") != null) {
    //console.log(localStorage.getItem("Token"));
  } else {
    props.history.push("/");
  }

  const [show, setShow] = useState(false);
  return (
    <>
      <div className="main">
        <div cla className="Banner-Main-Container">
          <div className="Logo-top">
            <Link to="">
              <img
                src="images/Solartis_Logo.png"
                className="solartis-logo"
                alt=""
              />
            </Link>
            <div className="side-nav-btn" onClick={() => setShow(!show)}>
              <img src="images/navbar.png" alt="" />
            </div>
          </div>
          <div className="Banner-Right-Home-FAQ">
            <div className="FAQ-Welcome">
              <Link to="" className="menu_icon">
                <img src="images/menu_down.png" alt="Home" />
              </Link>
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

          <div className="ClearFloat"></div>
        </div>

        <div className={show ? "sidebar show1" : "sidebar"}>
          <SideNav />
        </div>

        <div className={show ? "content show1" : "content"}>
          <div className="breadcrumps">
            <Link to="LandingPage" className="no-decoration">
              Home
            </Link>
            {"  /  "} ERC History
          </div>
          <div className="PageTitle">ERC History</div>
          <ERCHistorytable />
        </div>
      </div>
      <div className={"Footer-Main"}>
        <div className="Copy-Rights-Left">
          © 2022 Solartis. All Rights Reserved.{" "}
        </div>
        <div className="Version-Right">RC - MT V 1.0</div>
      </div>
    </>
  );
};

export default Erchistory;
