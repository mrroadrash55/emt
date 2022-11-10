const express = require("express"); 
const router = express.Router();
const Axios = require("axios");
const { sessionInfo, AuthenticationService,getUploadedFiles,Environment,Mode,Token,OwnerId} = require("../../utils/config");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
 
//body parser
router.use(bodyParser.urlencoded({ extended: true }));
router.use(cookieParser());
router.use(bodyParser.json())

router.post("/login",  async (request, response) => {
  
 // console.log("Session ID in Login Route", request.body);
 // const domainName = new URL(request.header('Referer')).host;
   let domainName = "uciemtdevkb.solartis.net";
  // console.log("testing purpose",process.ownerResources[domainName]['RuntimeEnvDetails']);
  request.body.ServiceRequestDetail.OwnerId = 1;
  //request.session.UserName = "uiuxunderwriter";
  //let ReturnedRequestSequenceId = request.body.AMTDetails.RequestSequenceId;
  //request.session.createdAt = Date.now();

  //let AMTDetails = request.body.AMTDetails;
  let requestBody = JSON.parse(JSON.stringify(request.body));
  //delete requestBody['AMTDetails'];


  let EventName = "Authentication";
  let authReqEventInfo = {
    "typeOfData" : "request",
	  "extension" : ".json",
  	"EventName" : EventName,
	  "url" : AuthenticationService,
    "domainName" : domainName
  }


  const headers = {
    "Content-Type": "application/json",
    Environment: Environment,
    Mode: Mode,
    // SESSION_ID : request.sessionID,
  };

  try {
    let authResponse = await Axios.post(AuthenticationService, JSON.stringify(requestBody), { headers: headers });
     let authData = await authResponse.data;
    //  console.log("Response :")
    //  console.log(authData,"auth");
     let data;
     if (authData.LoginStatus === "SUCCESS") {
      data = JSON.parse(JSON.stringify(authData));
     }   else {
      data = JSON.parse(JSON.stringify(authData));
     }
    //   let authResEventInfo = {
    //     ...authReqEventInfo,
    //     "typeOfData" : "response",
    //   }


    //   request.session.Token = authData.Token;
    //   data = JSON.parse(JSON.stringify(authData));
      /*
       * Block for to Invoke GetPrivilegeList - API for the signed User
       * @params UserName
       * @return List of privileges for the respective user
       */
     
    //}

    response.send(data);
  }
  catch (error) {

   //console.log(error.body,"error message");
  }
});

router.post("/getlist",  async (request, response) => {
  
  //  console.log("Session ID in Login Route", request.body);
   // const domainName = new URL(request.header('Referer')).host;
   //console.log(request.body,'requestt')
     let domainName = "uciemtdevkb.solartis.net";
    // console.log("testing purpose",process.ownerResources[domainName]['RuntimeEnvDetails']);
   
    //request.session.UserName = "uiuxunderwriter";
    //let ReturnedRequestSequenceId = request.body.AMTDetails.RequestSequenceId;
    //request.session.createdAt = Date.now();
  
    //let AMTDetails = request.body.AMTDetails;
    let requestBody = JSON.parse(JSON.stringify(request.body));
   // console.log(requestBody,'requestbodyyy')
    //delete requestBody['AMTDetails'];
  
  
    let EventName = "UploadedERCFile";
    let authReqEventInfo = {
      "typeOfData" : "request",
      "extension" : ".json",
      "EventName" : EventName,
      "url" : getUploadedFiles,
      "domainName" : domainName
    }
  
  
    const headers = {
      OwnerId:OwnerId,
          Token:Token,
      "Content-Type": "application/json",
      Environment: Environment,
      Mode: Mode,
      // SESSION_ID : request.sessionID,
    };
  
    try {
      let getlistResponse = await Axios.post(getUploadedFiles, JSON.stringify(requestBody), { headers: headers });
       let getlistData = await getlistResponse.data;
      //  console.log("Response :")
      //  console.log(getlistData.ERCVersionList,"datalistttttt");
       let data;
       if (getlistData.ResponseStatus === "SUCCESS") {
        data = JSON.parse(JSON.stringify(getlistData));
       }  else {
        data = JSON.parse(JSON.stringify(getlistData));
       }
      //   let authResEventInfo = {
      //     ...authReqEventInfo,
      //     "typeOfData" : "response",
      //   }
  
  
      //   request.session.Token = authData.Token;
      //   data = JSON.parse(JSON.stringify(authData));
        /*
         * Block for to Invoke GetPrivilegeList - API for the signed User
         * @params UserName
         * @return List of privileges for the respective user
         */
       
      //}
  
      response.send(data);
    }
    catch (error) {
  
    // console.log(error.body,"error message");
    }
  });
  
  
  router.post("/gethistory",  async (request, response) => {
    
    //  console.log("Session ID in Login Route", request.body);
     // const domainName = new URL(request.header('Referer')).host;
    // console.log(request.body,'requestt')
       let domainName = "uciemtdevkb.solartis.net";
      // console.log("testing purpose",process.ownerResources[domainName]['RuntimeEnvDetails']);
     
      //request.session.UserName = "uiuxunderwriter";
      //let ReturnedRequestSequenceId = request.body.AMTDetails.RequestSequenceId;
      //request.session.createdAt = Date.now();
    
      //let AMTDetails = request.body.AMTDetails;
      let requestBody = JSON.parse(JSON.stringify(request.body));
      //console.log(requestBody,'requestbodyyy')
      //delete requestBody['AMTDetails'];
    
    
      let EventName = "ERCHistoryAndCircularInfo";
      let authReqEventInfo = {
        "typeOfData" : "request",
        "extension" : ".json",
        "EventName" : EventName,
        "url" : getUploadedFiles,
        "domainName" : domainName
      }
    
    
      const headers = {
        OwnerId:OwnerId,
            Token:Token,
        "Content-Type": "application/json",
        Environment: Environment,
        Mode: Mode,
        // SESSION_ID : request.sessionID,
      };
    
      try {
        let gethistorydata = await Axios.post(getUploadedFiles, JSON.stringify(requestBody), { headers: headers });
         let getlistData = await gethistorydata.data;
        //  console.log("Responsewww :")
        //  console.log(getlistData.ERCHistory,"datalistttttt");
         let data;
         if (getlistData.ResponseStatus === "SUCCESS") {
          data = JSON.parse(JSON.stringify(getlistData));
         }  else {
          data = JSON.parse(JSON.stringify(getlistData));
         }
       
    
        response.send(data);
      }
      catch (error) {
    
      // console.log(error.body,"error message");
      }
    });
  
    
    
  


router.post("/logout", (request, response) => {
  let res = {};
  res["Status"] = "SUCCESS";
  res["Message"] = "Logged Out Successfully";

  //delete request.session[request.sessionID];
  //request.session.cookie.expires = new Date(Date.now());
  // console.log("expires",request.session.cookie.expires,request.session.cookie.maxAge);
  // request.session.cookie.maxAge = 1;
  // console.log("expores",request.session.cookie.expires,request.session.cookie.maxAge);


  // request.session.destroy((error) => {
  //   if (error) {
  //     console.error(error);
  //     let errordata = {};
  //     errordata["Status"] = "FAILED";
  //     errordata["Message"] = "Problem in Logging Out";
  //     return response.status(500).json(errordata);
  //   }
  // });
  response.clearCookie(sessionInfo.SESSION_NAME);
  response.clearCookie("data");
  response.json(res);
});

module.exports = router;



//logout