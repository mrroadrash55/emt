import React from "react";

function Uploadspopup(props) {
  const { createddate, createdby, updateddate, updatedby } = props;

  return (
    <>
      <div style={{ display: "flex", gap: "15px" }}>
        <div class="tank">
          <img src="images/info_blue.png"></img>
          <div className="popup">
            <ul>
              <li
                style={{
                  listStyle: "none",
                  margin: "2px auto",
                  textAlign: "left",
                }}
              >
                Created Date :{" "}
                <span style={{ fontWeight: "bold", paddingLeft: "14px" }}>
                  {createddate}
                </span>{" "}
              </li>
              <li
                style={{
                  listStyle: "none",
                  margin: "2px auto",
                  textAlign: "left",
                }}
              >
                Created By :{" "}
                <span style={{ fontWeight: "bold", paddingLeft: "28px" }}>
                  {" "}
                  {createdby}{" "}
                </span>
              </li>
              <li
                style={{
                  listStyle: "none",
                  margin: "2px auto",
                  textAlign: "left",
                }}
              >
                Updated Date :{" "}
                <span style={{ fontWeight: "bold", paddingLeft: "10px" }}>
                  {updateddate}
                </span>{" "}
              </li>
              <li
                style={{
                  listStyle: "none",
                  margin: "2px auto",
                  textAlign: "left",
                }}
              >
                Updated By :{" "}
                <span style={{ fontWeight: "bold", paddingLeft: "24px" }}>
                  {updatedby}
                </span>
              </li>
            </ul>
          </div>
        </div>
        {/* <div
          tooltip="Release Notes"
          style={{ cursor: "pointer", paddingRight: "10px" }}
        >
          <img
            title="Release Notes"
            src="images/release-export.png"
            width={"12px"}
            height={"15px"}
          ></img>
        </div> */}
      </div>
    </>
  );
}

export default Uploadspopup;
