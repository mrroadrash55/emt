import React, { useState } from "react";
import { Link } from "react-router-dom";
import ErcUploads from "../ErcUploads";
import SideNav from "../SideNav";
import { authAxios } from "../../views/runtime/utils/API";
const UploadVersions = (props) => {
  const [show, setShow] = useState(false);
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
            <Link
              to="LandingPage"
              className="no-decoration"
            >
              Home
            </Link>{" "}
            {"   /   "} ERC Uploads
          </div>
          <div className="PageTitle">Uploaded Versions</div>
          <ErcUploads />
        </div>
      </div>
      <div className={show ? "Footer-Main" : "Footer-Main show1"}>
        {/*RC-Footer-Main Start*/}
        <div className="Copy-Rights-Left">
          © 2022 Solartis. All Rights Reserved.{" "}
        </div>
        <div className="Version-Right">RC - MT V 1.0</div>
      </div>
    </>
  );
};

export default UploadVersions;
