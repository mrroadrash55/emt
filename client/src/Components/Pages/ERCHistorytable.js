import { format } from "date-fns";
import exportFromJSON from "export-from-json";
import React, { useEffect, useMemo, useState } from "react";
import ColumnResizer from "react-table-column-resizer";
import { authAxios } from "../views/runtime/utils/API";
import Popnew from "./DataTable/Popnew";

import "bootstrap/dist/css/bootstrap.min.css";
import TableContainer from "./TableContainer";

let referlink = {
  BP: "Businessowners%20BP%2F",
  CA: "Commercial%20Auto%20CA%2F",
  AU: "Commercial%20Automobile%20AU%2F",
  CM: "Commercial%20Inland%20Marine%20CM%2F",
  CP: "Commercial%20Package%20Policy%20CP%2F",
  CF: "Commercial%20Property%20CF%2F",
  CU: "Commercial%20Umbrella%20CU%2F",
  CR: "Crime%20CR%2F",
  CY: "Cyber%20CY%2F",
  GL: "General%20Liability%20GL%2F",
  WC: "Workers%20Compensation%20WC%2F",
};
const ERCHistorytable = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [circularDetails, setCircularDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  function renderRowSubComponent({ row }) {
     //console.log("props.row", row);
    // console.log("circulrdetils", circularDetails);
    let lis = circularDetails[row.index];
    // console.log(lis);
    return (
      <>
        <div>
          <table
            className="cirTable"
            style={{
              backgroundColor: "#fff",
              fontSize: "13px",
              margin: "10px auto",
              width: "95%",
              borderRadius: "8px",
            }}
          >
            <thead
              style={{ color: "black", background: "#25468c", height: "30px" }}
            >
              <tr style={{ color: "#fff", background: "#25468c" }}>
                <td style={{ textAlign: "left", paddingLeft: "20px" }}>
                  Circular Id
                </td>
                <ColumnResizer minWidth={130} className="columnResizer" />
                <td style={{ textAlign: "left", paddingLeft: "20px" }}>
                  {" "}
                  Description
                </td>
                <ColumnResizer minWidth={200} className="columnResizer" />
                <td style={{ textAlign: "left", paddingLeft: "20px" }}>
                  Release Date
                </td>
                <ColumnResizer minWidth={100} className="columnResizer" />
                <td style={{ textAlign: "left", paddingLeft: "20px" }}>Type</td>
                <ColumnResizer minWidth={100} className="columnResizer" />
                <td style={{ textAlign: "left", paddingLeft: "20px" }}>
                  {" "}
                  Filing Reference
                </td>
                <ColumnResizer minWidth={100} className="columnResizer" />
              </tr>
            </thead>

            <tbody>
              {lis.map((listValue, index) => {
                return (
                  <tr style={{ color: "black", height: "20px" }} key={index}>
                    <td
                      style={{
                        color: "#25468C",
                        paddingLeft: "30px",
                        textAlign: "left",
                        height: "30px",
                      }}
                    >
                      <a
                        href={listValue.CIRCULAR_NAME_LINK}
                        target={"_blank"}
                        style={{ textDecoration: "none" }}
                      >
                        {listValue.CIRCULAR_NUMBER}
                      </a>{" "}
                    </td>
                    <td className="columnResizer" />
                    <td style={{ textAlign: "left", paddingLeft: "20px" }}>
                      {listValue.CIRCULAR_NAME}
                    </td>
                    <td className="columnResizer" />
                    <td style={{ textAlign: "left", paddingLeft: "20px" }}>
                      {listValue.CIRCULAR_RELEASE_DATE}
                    </td>
                    <td className="columnResizer" />
                    <td style={{ textAlign: "left", paddingLeft: "20px" }}>
                      {listValue.CIRCULAR_TYPE}
                    </td>
                    <td className="columnResizer" />
                    <td style={{ textAlign: "left", paddingLeft: "20px" }}>
                      {listValue.FILING_NAME}
                    </td>
                    <td className="columnResizer" />
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }

  function nthg() {
    return <></>;
  }
  const columns = useMemo(
    () => [
      {
        Header: () => null,
        id: "expander", // 'id' is required
        Cell: ({ row }) => (
          <span {...row.getToggleRowExpandedProps()} title="Circular Notes">
            {row.isExpanded ? (
              <img src="images/hangdown.png" width="10px" height="17px"></img>
            ) : (
              <img src="images/hangright.png" width="15px"></img>
            )}
          </span>
        ),
      },
      {
        Header: "LOB ⇅",
        accessor: "lob",

        // Filter: SelectColumnFilter,
        // filter: 'equals',
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
        Header: "ISO Released Date ⇅",
        accessor: "ISOreleasedate",
        Cell: ({ value }) => {
          const date = new Date(value);
          const dateft = format(date, "dd-MMM-yyyy");
          return dateft;
        },
      },
      {
        Header: "ERC Effective Date ⇅",
        accessor: "ERCeffectivedate",
        Cell: ({ value }) => {
          const date = new Date(value);
          const dateft = format(date, "dd-MMM-yyyy");
          return dateft;
        },
      },
      {
        Header: "Duration (Effective vs Released) ⇅",
        accessor: "Duration",
      },

      {
        Header: "Country Wide ⇅",
        accessor: "Countrywide",
      },
      {
        Header: "Status ⇅",
        accessor: "Status",
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

  useEffect(async () => {
    setLoading(true);
    let getdatalist = require("../views/runtime/models/GetData.json");
    getdatalist.ServiceRequestDetail.Token= sessionStorage.getItem("Token");
    getdatalist.ServiceRequestDetail.UserName=sessionStorage.getItem("userName")
    let dbdata = [];
    let expdt = [];
    var arr = [];
    // var i;
    // console.log(dbdata[i].ISOreleasedate,'iso')
    const fetchData= async ()=> {
      await authAxios.post("auth/getlist", getdatalist).then(async (response) => {
        // console.log(
        //   response.data.ERCVersionList,
        //   "response from uploaded api!!"
        // );
        if(response.status==200){
        var dataList = response.data.ERCVersionList;
        //setDataList(dataList);

        let i = 0;
        var db = [];
        //console.log(dataList);
        while (i < dataList.length) {
          
          let exportall = {
            LOB: "",
            State: "",
            ERCVersion: "",
            ISOReleasedDate: "",
            ERCEffectivedDate: "",
            Duration: "",
            Countrywide: "",
            Status: "",
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
            ISOreleasedate: "",
            ERCeffectivedate: "",
            Duration: "",
            Countrywide: "",
            Status: "",
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
            let ercversion = dataList[i].STATE_VERSION;
            let lob = ercversion.substring(4, 6);
            var string = JSON.stringify(referlink);
            var objectValue = JSON.parse(string);
            let link = objectValue[lob];
            // console.log(link);
            let state = ercversion.substring(7, 9);
            let nodelink = `http://portal.solartis.net:8080/share/page/site/iso/documentlibrary?file=${ercversion}.zip#filter=path%7C%2FERC%20Uploads%20Jul%202022%2F${link}${state}`;
            //console.log(state);
            dbobj.ercversion = (
              <a
                style={{ textDecoration: "none" }}
                target={"_blank"}
                href={nodelink}
              >
                {dataList[i].STATE_VERSION}
              </a>
            );
            exportall.ERCVersion = dataList[i].STATE_VERSION;

            let circularInfo = require("../views/runtime/models/CircularInfo.json");
            circularInfo.ServiceRequestDetail.Token=sessionStorage.getItem("Token");
            circularInfo.ServiceRequestDetail.UserName=sessionStorage.getItem("userName")
            circularInfo.ERCVersion = dataList[i].STATE_VERSION;
            
            await authAxios.post("auth/gethistory", circularInfo).then((response) => {
                if(response.status==200){
                  var circularRes = response.data.ERCHistory;
                  //exportall.circulardt=circularRes
                  db.push(circularRes);
                  // console.log(db,'circularsss response');
    
                  //    console.log(db.CIRCULAR_NUMBER[i],"circularDetails")
                }
                
              });
            
          } else {
            dbobj.ercversion = "";
            exportall.ERCVersion = "";
            // exportall.circulardt=[]
          }
          if (dataList[i].RELEASED_DATE != null) {
            dbobj.ISOreleasedate = dataList[i].RELEASED_DATE;
            exportall.ISOReleasedDate = dataList[i].RELEASED_DATE;
          } else {
            dbobj.ISOreleasedate = "";
            exportall.ISOReleasedDate = "";
          }

          if (dataList[i].EFFECTIVE_DATE != null) {
            dbobj.ERCeffectivedate = dataList[i].EFFECTIVE_DATE;
            exportall.ERCEffectivedDate = dataList[i].EFFECTIVE_DATE;
          } else {
            dbobj.ERCeffectivedate = "";
            exportall.ERCEffectivedDate = "";
          }

          if (
            (dataList[i].EFFECTIVE_DATE != null) &
            (dataList[i].RELEASED_DATE != null)
          ) {
            var startingDate = dataList[i].EFFECTIVE_DATE;
            var endingDate = dataList[i].RELEASED_DATE;
            // console.log(startingdate,"startdate!!  ")
            // console.log(endingdate,"enddate!!  ")
            let duration = dateDiff(startingDate, endingDate);
            function dateDiff(startingDate, endingDate) {
              let startDate = new Date(
                new Date(startingDate).toISOString().substring(0, 10)
              );
              //console.log(startDate ,"end datee")

              endingDate = new Date().toISOString().substring(0, 10);

              // console.log(endingDate ,"end datee")
              let endDate = new Date(endingDate);
              if (startDate > endDate) {
                const swap = startDate;
                startDate = endDate;
                endDate = swap;
              }
              const startYear = startDate.getFullYear();
              const february =
                (startYear % 4 === 0 && startYear % 100 !== 0) ||
                startYear % 400 === 0
                  ? 29
                  : 28;
              const daysInMonth = [
                31,
                february,
                31,
                30,
                31,
                30,
                31,
                31,
                30,
                31,
                30,
                31,
              ];

              let yearDiff = endDate.getFullYear() - startYear;
              let monthDiff = endDate.getMonth() - startDate.getMonth();
              if (monthDiff < 0) {
                yearDiff--;
                monthDiff += 12;
              }
              let dayDiff = endDate.getDate() - startDate.getDate();
              if (dayDiff < 0) {
                if (monthDiff > 0) {
                  monthDiff--;
                } else {
                  yearDiff--;
                  monthDiff = 11;
                }
                dayDiff += daysInMonth[startDate.getMonth()];
              }
              //console.log(yearDiff + 'Y ' + monthDiff + 'M ' + dayDiff + 'D' , "final datee")

              return yearDiff + "Y " + monthDiff + "M " + dayDiff + "D";
            }
            dbobj.Duration = duration;
            exportall.Duration = duration;
          } else {
            dbobj.Duration = "";
            exportall.Duration = "";
          }

          if (dataList[i].COUNTRY_WIDE != null) {
            dbobj.Countrywide = dataList[i].COUNTRY_WIDE;
            exportall.Countrywide = dataList[i].COUNTRY_WIDE;
          } else {
            dbobj.Countrywide = "";
            exportall.Countrywide = "";
          }
          if (dataList[i].STATUS != null) {
            dbobj.Status = dataList[i].STATUS;
            exportall.Status = dataList[i].STATUS;
          } else {
            dbobj.Status = "";
            exportall.Status = "";
          }
          let createddate = "";
          let createdby = "";
          let updateddate = "";
          let updatedby = "";
          if (dataList[i].CREATED_DATE != null) {
            const date = new Date(dataList[i].CREATED_DATE);
            const dateft = format(date, "dd-MMM-yyyy");
            createddate = dateft;
            exportall.CreatedDate = dateft;
          } else {
            exportall.CreatedDate = null;
          }
          if (dataList[i].CREATED_BY != null) {
            createdby = dataList[i].CREATED_BY;
            exportall.CreatedBy = dataList[i].CREATED_BY;
          } else {
            exportall.CreatedBy = "";
          }
          if (dataList[i].UPDATED_DATE != null) {
            const date = new Date(dataList[i].UPDATED_DATE);
            const dateft = format(date, "dd-MMM-yyyy");

            updateddate = dateft;
            exportall.UpdatedDate = dateft;
          } else {
            exportall.UpdatedDate = null;
          }
          if (dataList[i].UPDATED_BY != null) {
            updatedby = dataList[i].UPDATED_BY;
            exportall.UpdatedBy = dataList[i].UPDATED_BY;
          } else {
            exportall.UpdatedBy = "";
          }
          dbobj.icon = (
            <Popnew
              createddate={createddate}
              createdby={createdby}
              updateddate={updateddate}
              updatedby={updatedby}
            />
          );
          // dbobj.icon=Popnew(createddate= {createddate},createdby= {cryeatedby},updateddate= {updateddate}, updatedby={updatedby})
          //
          i++;
          dbdata.push(dbobj);
          expdt.push(exportall);
        }
        setTableData(dbdata);
         //console.log(db, "db!");
        setCircularDetails(db);
        setSelectedRows(expdt);
        setLoading(false);
      }
      });
    }
    fetchData();
  }, []);

  const exportAllSelectedRowsasXLS = (props) => {
    let arr = [];
    arr = Object.keys(props);
    let k = 0;
    let data = [];
    let subdata = [];
    while (k < arr.length) {
      let ar = arr[k];
      subdata = selectedRows[ar];
      data.push(subdata);
      k++;
    }
    // console.log(data);
    //const data = [{ foo: 'foo'}, { bar: 'bar' }]

    const fileName = "ERC History";
    const exportType = exportFromJSON.types.xls;

    exportFromJSON({ data, fileName, exportType });
  };
  const exportAllSelectedRows = (props) => {
    // console.log(props, "dsds");
    let arr = [];
    arr = Object.keys(props);
    let k = 0;
    let data = [];
    let subdata = [];
    while (k < arr.length) {
      let ar = arr[k];
      subdata = selectedRows[ar];
      data.push(subdata);
      k++;
    }
    // console.log(data);
    //const data = [{ foo: 'foo'}, { bar: 'bar' }]

    const fileName = "ERC History";
    const exportType = exportFromJSON.types.csv;

    exportFromJSON({ data, fileName, exportType });
    // const wb = utils.book_new();
    // const ws = utils. json_to_sheet([]);
    // utils.sheet_add_json(ws, data);
    // utils.book_append_sheet(wb, ws, 'Report');
    // writeFile(wb, 'Movie Report.xlsx');
  };

  // if(loading){
  //   return (<><p>Loading...</p></>)
  // }else{
  return (
    <>
      <div>
        <TableContainer
          columns={columns}
          data={tableData}
          renderRowSubComponent={renderRowSubComponent}
          exportAllSelectedRows={exportAllSelectedRows}
          exportAllSelectedRowsasXLS={exportAllSelectedRowsasXLS}
        />
      </div>
    </>
  );
};

//};

export default ERCHistorytable;
