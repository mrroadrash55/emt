import TextField from "@mui/material/TextField";
import CryptoJS from "crypto-js";
import React, { useState } from "react";
import { authAxios } from "../views/runtime/utils/API";

const Login = (props) => {
  localStorage.clear();
  let [inputField, setInputField] = useState({
    username: "",
  });
  let [password, setPassword] = useState({});
  let [action, setAction] = useState({
    loginErrors: "",
    loading: false,
  });

  const handleChange = (event) => {
    setPassword(event.target.value);
  };

  const inputsHandler = (e) => {
    setInputField((prevalue) => {
      return {
        ...prevalue,
        [e.target.name]: e.target.value,
      };
    });
  };

  const encryptPassword = (password) => {
    let encyptedPassword = CryptoJS.AES.encrypt(
      password,
      CryptoJS.enc.Utf8.parse("3FCCB01F507E8EB0"),
      {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
    return encyptedPassword;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem("OwnerID", 1);
    let authRequest = require("../views/runtime/models/AuthRequest.json");

    var encryptedPassword = encryptPassword(password);

    authRequest.UserCredential.UserName = inputField.username;
    authRequest.UserCredential.Password = encryptedPassword.toString();

    authRequest.ServiceRequestDetail.OwnerId = sessionStorage
      .getItem("OwnerID")
      .toString();

    var authData = {};
    if (inputField.username == "" && password == "") {
      //console.log("invalid!!");
      setAction((prevalue) => {
        return {
          ...prevalue,
          loginErrors: "Please enter the Username and Password",
          loading: false,
        };
      });
    } else if (inputField.username == "") {
     // console.log("invalid!!");
      setAction((prevalue) => {
        return {
          ...prevalue,
          loginErrors: "Please enter the Username",
          loading: false,
        };
      });
    } else if (password == "") {
     // console.log("invalid!!");
      setAction((prevalue) => {
        return {
          ...prevalue,
          loginErrors: "Please enter the Password",
          loading: false,
        };
      });
    } else {
      authAxios.post("auth/login", authRequest).then((response) => {
        if (Object.keys(response.data).length > 0) {
          // console.log("resonse data", response.data);
          // console.log(response.data.Token, "token");
          
          if (response.data.RequestStatus === "PROCESSED") {
            let token1 = response.data.Token;
          localStorage.setItem("Token", token1);
          sessionStorage.setItem("Token",token1)
            authData = response.data;
           // console.log(authData.UserRole, "authhhh");
            //authData.userName = this.state.email;
            // this.props.authenticate(authData);
            localStorage.setItem("userName",inputField.username);
            sessionStorage.setItem("userName",inputField.username);

            props.history.push("/LandingPage");
          } else if (response.data.RequestStatus === "FAILED") {
           // console.log("error!!");
            var errormessage = response.data.MessageDetail.UserMessage;

            setAction((prevalue) => {
              return {
                ...prevalue,
                loginErrors: errormessage,
                loading: false,
              };
            });
            props.history.push("/");
          }
        }
      });
    }
  };

  return (
    <>
      <div className="welcome-text">
        Welcome to Solartis ERC Management Tool
      </div>
      <div className="login">
        <div className="login-triangle"></div>
        <h2 className="login-header">SIGN IN</h2>

        <form className="login-container">
          <p>
            <TextField
              id="outlined-user-name-input"
              label="Username"
              type="email"
              name="username"
              autoComplete="current-user"
              onChange={inputsHandler}
              className="textfield1"
            />
          </p>
          <p>
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              name="password"
              autoComplete="current-password"
              onChange={handleChange}
              className="textfield2"
            />
          </p>
          {/* <p className="passworderr">{action.loginErrors}</p> */}

          <button
            type="submit"
            className="buttons sign-in"
            value="Login"
            onClick={handleSubmit}
          >
            SIGN IN
          </button>

          {/*<Link to="/landing" className="buttons sign-in">SIGN IN</Link>**/}
          {/* <p className="forgot-pass">
                        <Link to="/" style={{ color: '#1917c1' }}>Forgot Password?</Link>
                    </p> */}

          <p id="passworderr">{action.loginErrors}</p>
        </form>

        <div className="ClearFloat"></div>
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

export default Login;
