import React, { useState } from "react";

const Footer = () => {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div>
        <div className={show ? "Footer-Main" : "Footer-Main show1"}>
          {/*RC-Footer-Main Start*/}
          <div className="Copy-Rights-Left">
            © 2022 Solartis. All Rights Reserved.{" "}
          </div>
          <div className="Version-Right">RC - MT V 1.0</div>
        </div>
      </div>
    </>
  );
};

export default Footer;
