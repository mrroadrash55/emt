import React from "react";

function CircularInfoTable(props) {
  // console.log(circularDetails , "circular details inside the circular table!!")

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
          }}
        >
          <thead style={{ color: "black", background: "#25468c" }}>
            <tr style={{ color: "#fff", background: "#25468c" }}>
              <td style={{ textAlign: "center", paddingLeft: "30px" }}>
                Circular Id
              </td>
              <td style={{ textAlign: "center" }}> Description</td>
              <td style={{ textAlign: "center" }}>Release Date</td>
              <td style={{ textAlign: "center" }}>Type</td>
              <td style={{ textAlign: "center" }}> Filing Reference</td>
            </tr>
          </thead>
          <tbody>
            <tr style={{ color: "black", height: "30px" }}>
              <td
                style={{
                  color: "#25468C",
                  paddingLeft: "30px",
                  textAlign: "left",
                  height: "30px",
                }}
              >
                <a href="" style={{ textDecoration: "none" }}>
                  {" "}
                  LI-CA-2020-083
                </a>{" "}
              </td>
              <td style={{ textAlign: "left" }}>
                ALASKA REVISION OF COMMERCIAL AUTOMOBILE LIABILITY INCREASED
                LIMIT FACTORS TO BE IMPLEMENTED
              </td>
              <td style={{ textAlign: "left" }}>02-Jun-2020</td>
              <td style={{ textAlign: "left" }}>Rules</td>
              <td style={{ textAlign: "left" }}>CA-2020-IALL1</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CircularInfoTable;
