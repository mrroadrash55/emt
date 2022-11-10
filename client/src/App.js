import React,{lazy , Suspense} from "react";
import { Route, Switch } from "react-router-dom";
import Erchistory from "./Components/Pages/DataTable/Erchistory";
import SelectVersions from "./Components/Pages/DataTable/SelectVersions";
import UploadVersions from "./Components/Pages/DataTable/UploadVersions";
import LandingPage from "./Components/Pages/LandingPage";
import Login from "./Components/Pages/Login";
import ERCHistorytable from './Components/Pages/ERCHistorytable';


function App() {
  return (
    <div>
      
      <Switch>
        <Route exact path="/" component={Login}></Route>
        <Route exact path="/LandingPage" component={LandingPage}></Route>
        <Route exact path="/uploadversions" component={UploadVersions}></Route>
        <Route exact path="/selectversions" component={SelectVersions}></Route>
        <Route exact path="/erchistory" component={Erchistory}></Route>
        <Route exact path="/erchistorytable" component={ERCHistorytable}></Route>
      </Switch>
    </div>
  );
}

export default App;
