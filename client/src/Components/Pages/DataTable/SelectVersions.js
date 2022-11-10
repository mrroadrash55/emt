import React, { useState } from "react";
import { Link } from "react-router-dom";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import MaterialTable from "material-table";
import SideNav from "../SideNav";
import { CsvBuilder } from "filefy";
import Excel from "./SupportModules/Excel";
import { format } from "date-fns";
import Dropdown from "./SupportModules/Dropdown";
import { height } from "@mui/system";
import { red } from "@mui/material/colors";

var fileFormat = ["ALL", "ALG", "DS", "FRC", "RC", "AMF"];

const SelectVersions = () => {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [tableData, setTableData] = useState([
    {
      lob: "AU",
      state: "OR",
      ercversion: "ERC-AU-OR-10012022-V01",
      effectivedate: "01-Oct-22",
      releaseddate: "23-Jun-22",
      uploadedstatus: "Uploaded",
      uploadedfile: "All",
      filetype: fileFormat,
    },
    {
      lob: "AU",
      state: "TX",
      ercversion: "ERC-AU-TX-09012022-V01",
      effectivedate: "01-Sep-22",
      releaseddate: "24-Jun-22",
      uploadedstatus: "Uploaded",
      uploadedfile: "All",
      filetype: fileFormat,
    },
    {
      lob: "AU",
      state: "WA",
      ercversion: "ERC-AU-WA-10012022-V01",
      effectivedate: "01-Oct-22",
      releaseddate: "24-Jun-22",
      uploadedstatus: "Uploaded",
      uploadedfile: "All;RC,DS",
      filetype: fileFormat,
    },
    {
      lob: "AU",
      state: "LA",
      ercversion: "ERC-AU-LA-11012022-V01",
      effectivedate: "01-Nov-22",
      releaseddate: "07-Jun-22",
      uploadedstatus: "Uploaded",
      uploadedfile: "RC,DS",
      filetype: fileFormat,
    },
    {
      lob: "AU",
      state: "PA",
      ercversion: "ERC-AU-PA-11012022-V01",
      effectivedate: "01-Nov-22",
      releaseddate: "08-Jun-22",
      uploadedstatus: "Uploaded",
      uploadedfile: "RC,DS",
      filetype: fileFormat,
    },
    {
      lob: "AU",
      state: "NY",
      ercversion: "ERC-AU-NY-07012022-V02",
      effectivedate: "01-Jul-22",
      releaseddate: "17-Jul-22",
      uploadedstatus: "Uploaded",
      uploadedfile: "DS",
      filetype: fileFormat,
    },
    {
      lob: "AU",
      state: "TX",
      ercversion: "ERC-AU-TX-10012022-V01",
      effectivedate: "01-Oct-22",
      releaseddate: "23-Jul-22",
      uploadedstatus: "Uploaded",
      uploadedfile: "FRC",
      filetype: fileFormat,
    },
    {
      lob: "AU",
      state: "IL",
      ercversion: "	ERC_AU_IL_10012022_V02",
      effectivedate: "	01-Oct-22",
      releaseddate: "02-Aug-22",
      uploadedstatus: "Uploaded",
      uploadedfile: "FRC",
      filetype: fileFormat,
    },
    {
      lob: "AU",
      state: "AL",
      ercversion: "ERC_AU_AL_02012023_V01",
      effectivedate: "02-Jan-23",
      releaseddate: "03-Aug-22",
      uploadedstatus: "Uploaded",
      uploadedfile: "FRC",
      filetype: fileFormat,
    },
    {
      lob: "AU",
      state: "AR",
      ercversion: "ERC_AU_AR_10012022_V01",
      effectivedate: "	01-Oct-22",
      releaseddate: "03-Aug-22",
      uploadedstatus: "Uploaded",
      uploadedfile: "FRC",
      filetype: fileFormat,
    },
  ]);

  const columns = [
    { title: "LOB", field: "lob", align: "left", filtering: true },
    { title: "State", field: "state", align: "left", filtering: true },
    {
      title: "ERC Version",
      field: "ercversion",
      align: "left",
      filtering: true, cellStyle: {whiteSpace: 'nowrap'} 
    },
    {
      title: "Effective Date",
      field: "effectivedate",
      align: "left",
      render: rowData => {

        var date = new Date(rowData.effectivedate);

        return format(date, 'dd-MMM-yy');

      },

      type: "date",
      filtering: true,
    },
    {
      title: "Released Date",
      field: "releaseddate",
      align: "left",
      render: rowData => {

        var date = new Date(rowData.effectivedate);

        return format(date, 'dd-MMM-yy');

      },

      type: "date",
      filtering: true,
    },
    {
      title: "Uploaded Status",
      field: "uploadedstatus",
      align: "left",
      filtering: true, cellStyle: {whiteSpace: 'nowrap'} 
    },
    {
      title: "Uploaded File",
      field: "uploadedfile",
      align: "left",
      filtering: true,
    },
    {
      title: "File Type",
      field: "filetype",

      render: (rowData) => {
        var date = rowData.filetype;

        return <Dropdown list={date} tag="Choose" />;
      },
      align: "center",
      filtering: false, cellStyle: {whiteSpace: 'nowrap'} ,
      export: false,
    },
  ];
  var newTitle = columns.map((col) => col.title);
  var newField =columns.map((col) => col.field);
  const exportAllSelectedRows = () => {
    var csvBuilder = new CsvBuilder("UploadedVersion.csv")
      .setColumns(columns.map((col) => col.title))
      .addRows(selectedRows.map(rowData=>columns.map(col=>rowData[col.field])))
      .exportFile();
     // var data = selectedRows.map(rowData => newField.map(col => rowData[col]));
  };


  const onClickkey = () => {
    const open = true;
    setOpen(open);
   // console.log(open, "inside on click key");
  };

  const onClickArrowDown = () => {
    const open = false;
    setOpen(open);
  };

  return (
    <div className="main">
      <div cla className="Banner-Main-Container">
        <div className="Logo-top"><Link to=""><img src="images/Solartis_Logo.png" alt="" className="solartis-logo"/></Link>
          <div className="side-nav-btn" onClick={() => setShow(!show)}>
          <img src="images/navbar.png" alt="" />
          </div>
        </div>
        <div className="Banner-Right-Home-FAQ">
        <div className="FAQ-Welcome"><Link to=""><img src="images/menu_down.png" alt="Home" /></Link>    |    <Link to=""><img src="images/Home_Icon.png" alt="Home" /></Link>    |    <Link to="" className="Toplink">Contact us</Link>    |    <Link to="" className="Toplink">FAQ</Link>    |    <b>Welcome uiuxunderwriter! </b>    |    <Link to="/" className="Toplink"><span className="Logout">LOGOUT</span></Link></div>     
        </div>
        <div className="ClearFloat"></div>
      </div>

      <div className={show ? "sidebar show1" : "sidebar"}>
        <SideNav />
      </div>
      <div className={show ? "content show1" : "content"}>
      <div classname="breadcrumps" > Home{"/"}ERC Uploads{"/"}Upload Version </div>
        <MaterialTable
          columns={columns}
          data={tableData}
          onSelectionChange={(rows) => setSelectedRows(rows)}
          style={{
            width: "95%",
            margin: "30px auto",
            fontSize: "11px",
            padding: "0px 25px 25px 25px",
          }}
          action={[
            {
              onClick: () => setOpen(!open),
              icon: () =>
                open ? <KeyboardArrowDown /> : <KeyboardArrowRight />,
            },
          ]}
        
          actions={[
            
            { icon: () => <button class="dropbtn">Export as CSV</button>, isFreeAction:true },


            // {
            //   icon: () => <button className="csv-download-btn" onClick= {exportAllSelectedRows} >Download as CSV</button> ,
            //   tooltip: "Export as CSV",
            // },
            {

              icon: () => <><div class="dropdown" style={{marginTop:"-8px", height:"38px"}}>

              <button onClick={exportAllSelectedRows} class="dropbtn">Export as CSV</button>

              <div class="dropdown-content">

              <Excel newTitle={newTitle}

              newField={newField}

              selectedRows={selectedRows}

              fileName= "UploadedVersion"

              />

                {/* <button >Export as XLS</button> */}

              </div>

            </div></> ,

              // tooltip: "Export as CSV",

            },
          ]}
          options={{
            filtering: true,
            selection: true,
            search: false,
            pageSizeOptions: [2, 3, 4, 5, 10, 15, 20, 50, 100],
              style : {color: "#25468C"},
            pageSize: 5,
            showTextRowsSelected: false,
            selectionProps:{
              style : {color: "#25468C"}
              
            },
            rowStyle: (data, index) =>
              index % 2 === 0
                ? { background: "#f5f5f5", fontSize: "12px" }
                : { fontSize: "12px" },

            headerStyle: {
              background: "#25468C",
              color: "#fff",
              fontSize: "13px",
              fontWeight:"bold",
              height: "3px",
            },
          }}
          detailPanel={(rowData) => {
            return (
              <div style={{ padding: 10 }}>
                <p>
                  material-table has inline filtering feature that lets users to
                  filter every column separately. Usage:- To make filtering
                  available you must open filtering in options.
                </p>
              </div>
            );
          }}
          z
          title={
            <div
              style={{
                color: "#25468C",
                fontWeight: "bold",
                fontSize: "20px",
                align: "left",
              }}
            >
              Select Versions to Upload
            </div>
          }
        />
             <Link
          class="blue-btn buttons sv-btn"
          style={{ textDecoration: "none" }}
          to=""
        >
          Upload
        </Link>
       
        <div className={show ? "Footer-Main" : "Footer-Main show1"}>
          {/*RC-Footer-Main Start*/}
          <div className="Copy-Rights-Left">
            © 2022 Solartis. All Rights Reserved.{" "}
          </div>
          <div className="Version-Right">RC - MT V 1.0</div>
        </div>
   
      </div>
    </div>
  );
};

export default SelectVersions;
