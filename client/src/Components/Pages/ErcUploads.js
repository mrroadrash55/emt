import { format } from "date-fns";
import React, { useEffect, useMemo, useState } from "react";
import Uploadspopup from "./DataTable/Uploadspopup";

import exportFromJSON from "export-from-json";
import { authAxios } from "../../Components/views/runtime/utils/API";

import "bootstrap/dist/css/bootstrap.min.css";
import TableContainer from "./UploadsTableContainer";

const ErcUploads = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [dataList, setDataList] = useState([]);

  function nthg() {
    return <></>;
  }
  const columns = useMemo(
    () => [
      {
        Header: "LOB ⇅",
        accessor: "lob",
      },
      {
        Header: "State ⇅",
        accessor: "state",
      },
      {
        Header: "ERC Version ⇅",
        accessor: "ercversion",
      },
      {
        Header: "ALG Status ",
        accessor: "algstatus",
      },
      {
        Header: "DS Status ",
        accessor: "dsstatus",
      },
      {
        Header: "RC Status ",
        accessor: "rcstatus",
      },

      {
        Header: "FRC Status ",
        accessor: "frcstatus",
      },
      {
        Header: "AMF Status ",
        accessor: "amfstatus",
      },
      {
        Header: "",
        accessor: "icon",
        Filter: nthg,
      },
    ],
    []
  );

  const [tableData, setTableData] = useState([]);
  const [exportData, setExportData] = useState([]);

  useEffect(async () => {
    let getdatalist = require("../../Components/views/runtime/models/GetData.json");

    let dbdata = [];
    let exp = [];
    // var jsonDataFromXml = new XMLParser().parseFromString(xmlrequest);
    async function fetchData() {
      await authAxios.post("auth/getlist", getdatalist).then((response) => {
        // console.log(
        //   response.data.ERCVersionList,
        //   "response from uploaded api!!"
        // );
        if(response.status==200){
        var dataList = response.data.ERCVersionList;
        setDataList(dataList);
        var dateList = response.data.ERCVersionList.CREATED_DATE;
       // console.log(dateList, "datalisttt");
        let i = 0;
        while (i < dataList.length) {
          let exportall = {
            LOB: "",
            State: "",
            ERCVersion: "",
            ALGStatus: "",
            DSStatus: "",
            RCStatus: "",
            FRCStatus: "",
            AMFStatus: "",
            CreatedDate: "",
            CreatedBy: "",
            UpdatedDate: "",
            UpdatedBy: "",
            // circulardt:[]
          };
          let dbobj = {
            lob: "",
            state: "",
            ercversion: "",
            algstatus: "",
            dsstatus: "",
            rcstatus: "",
            frcstatus: "",
            amfstatus: "",

            icon: <></>,
          };
          if (dataList[i].LOB != null) {
            dbobj.lob = dataList[i].LOB;
            exportall.LOB = dataList[i].LOB;
          } else {
            dbobj.lob = "";
            exportall.LOB = "";
          }
          if (dataList[i].STATE != null) {
            dbobj.state = dataList[i].STATE;
            exportall.State = dataList[i].STATE;
          } else {
            dbobj.state = "";
            exportall.State = "";
          }
          if (dataList[i].STATE_VERSION != null) {
            dbobj.ercversion = dataList[i].STATE_VERSION;
            exportall.ERCVersion = dataList[i].STATE_VERSION;
          } else {
            dbobj.ercversion = "";
            exportall.ERCVersion = "";
          }
          if (dataList[i].ALG_STATUS != null) {
            dbobj.algstatus = dataList[i].ALG_STATUS;
            exportall.ALGStatus = dataList[i].ALG_STATUS;
          } else {
            dbobj.algstatus = "";
            exportall.ALGStatus = "";
          }
          if (dataList[i].DS_STATUS != null) {
            dbobj.dsstatus = dataList[i].DS_STATUS;
            exportall.DSStatus = dataList[i].DS_STATUS;
          } else {
            dbobj.dsstatus = "";
            exportall.DSStatus = "";
          }
          if (dataList[i].RC_STATUS != null) {
            dbobj.rcstatus = dataList[i].RC_STATUS;
            exportall.RCStatus = dataList[i].RC_STATUS;
          } else {
            dbobj.rcstatus = "";
            exportall.RCStatus = "";
          }
          if (dataList[i].FRC_STATUS != null) {
            dbobj.frcstatus = dataList[i].FRC_STATUS;
            exportall.FRCStatus = dataList[i].FRC_STATUS;
          } else {
            dbobj.frcstatus = "";
            exportall.FRCStatus = "";
          }
          if (dataList[i].AMF_STATUS != null) {
            dbobj.amfstatus = dataList[i].AMF_STATUS;
            exportall.AMFStatus = dataList[i].AMF_STATUS;
          } else {
            dbobj.amfstatus = "";
            exportall.AMFStatus = "";
          }

          //
          let createddate = "";
          let createdby = "";
          let updateddate = "";
          let updatedby = "";
          if (dataList[i].CREATED_DATE != null) {
            const date = new Date(dataList[i].CREATED_DATE);
            const dateft = format(date, "dd-MMM-yyyy");
            createddate = dateft;
            exportall.CreatedDate = dateft;
          }
          if (dataList[i].CREATED_BY != null) {
            createdby = dataList[i].CREATED_BY;
            exportall.CreatedBy = dataList[i].CREATED_BY;
          }
          if (dataList[i].UPDATED_DATE != null) {
            const date = new Date(dataList[i].UPDATED_DATE);
            const dateft = format(date, "dd-MMM-yyyy");
            updateddate = dateft;
            exportall.UpdatedDate = dateft;
          }
          if (dataList[i].UPDATED_BY != null) {
            updatedby = dataList[i].UPDATED_BY;
            exportall.UpdatedBy = dataList[i].UPDATED_BY;
          }

          dbobj.icon = (
            <Uploadspopup
              createddate={createddate}
              createdby={createdby}
              updateddate={updateddate}
              updatedby={updatedby}
            />
          );

          i++;
          dbdata.push(dbobj);
          exp.push(exportall);
        }
        setTableData(dbdata);
        setExportData(exp);
       // console.log(dbdata, "listtt!");
    }});
    }
    fetchData();
  }, []);

  const exportAllSelectedRows = (props) => {
   // console.log(props);
    let arr = [];
    arr = Object.keys(props);
    let k = 0;
    let data = [];
    let subdata = [];
    while (k < arr.length) {
      let ar = arr[k];
      subdata = exportData[ar];
      data.push(subdata);
      k++;
    }

    //const data = [{ foo: 'foo'}, { bar: 'bar' }]

    const fileName = "UploadFile";
    const exportType = exportFromJSON.types.csv;

    exportFromJSON({ data, fileName, exportType });
  };
  const exportAllSelectedRowsasXLS = (props) => {
    //console.log(props);
    let arr = [];
    arr = Object.keys(props);
    let k = 0;
    let data = [];
    let subdata = [];
    while (k < arr.length) {
      let ar = arr[k];
      subdata = exportData[ar];
      data.push(subdata);
      k++;
    }

    //const data = [{ foo: 'foo'}, { bar: 'bar' }]
    const fileName = "UploadFile";
    const exportType = exportFromJSON.types.xls;

    exportFromJSON({ data, fileName, exportType });
  };
  return (
    <>
      <div>
        <TableContainer
          style={{
            margin: "100px auto",
            maxWidth: "300px",
            overflowX: "auto",
            width: "85%",
          }}
          columns={columns}
          data={tableData}
          //renderRowSubComponent={renderRowSubComponent}
          exportAllSelectedRows={exportAllSelectedRows}
          exportAllSelectedRowsasXLS={exportAllSelectedRowsasXLS}
        />
      </div>
    </>
  );
};

export default ErcUploads;
