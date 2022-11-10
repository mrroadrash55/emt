import React, { useState } from "react";
import { Link } from "react-router-dom";
import TopNav from "./TopNav";

const LandingPage = (props) => {
  const [show, setShow] = useState(false);

  if (localStorage.getItem("Token") != null) {
    //console.log(localStorage.getItem("Token"));
  } else {
    props.history.push("/");
  }

  return (
    <>
      <TopNav props={props}/>

      <div>
        <div class="home-content">
          <div class="home-header">Welcome to Solartis ERC Management Tool</div>
          <div class="home-3icon-main">
            <div class="home-create">
              <img src="images/create_new_img.png" alt="" />
              <Link to="">Create new product</Link>
              <div class="create-content">
                <p>
                  Create a new product from scratch using your own rate
                  versions.
                </p>
              </div>
            </div>
            <div class="home-maintain">
              <img src="images/maintain_pro_img.png" alt="" />
              <Link to="">Maintain Product </Link>
              <div class="maintain-content">
                <p>
                  Test, deploy, analyze and upgrade the Micorservices using
                  latest Rates and algorithms.
                </p>
              </div>
            </div>
            <div class="home-erc">
              <img src="images/erc_upload_img.png" alt="" />
              <Link to="/erchistory">ERC Versions </Link>
              <div class="erc-content">
                <p>ERC history, Upload.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*Footer-Main Start*/}
      <div className="Footer-Fixed">
        <div className="Copy-Rights-Left">
          © 2022 Solartis. All Rights Reserved.{" "}
        </div>
        <div className="Version-Right">RC - MT V 1.0</div>
      </div>
    </>
  );
};

export default LandingPage;
