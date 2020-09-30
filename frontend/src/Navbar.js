import React from "react";

const trucateAddress = (address) => {
  if (address === null || address === undefined) { return; }
  const start4Digits = address.slice(0, 6);
  const separator = '...';
  const last4Digits = address.slice(-4);
  return (start4Digits.padStart(2, '0') + separator.padStart(2, '0') + last4Digits.padStart(2, '0'));
}

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow mb-5"  style={{ backgroundColor: "#000 !important"  }}>
      <a href="/">
        <img src="../otl-cashbox-logo.png" style={{ maxWidth: "200px", marginRight: "0.8em" }} class="img-fluid"></img>
      </a>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item text-white ml-auto">
        <a href="https://opendao.io/beta" target="_blank">
        <div class="asset btn btn-grey-box">
              <span style={{ color: "#ff8686" }}>BETA</span>
           </div>
      </a>
        </li>
        <a href="/deploy" style={{ color: "#ffffff" }}>
          <li className="nav-item text-white">
          <div class="asset btn btn-grey-box">            
              <span>Deploy Smart Contracts</span>
          </div>
          </li>
        </a>
        <li className="nav-item text-white">
        <div class="asset btn btn-grey-box" style={{ cursor: "default", boxShadow: "none" }}>
              <span>{trucateAddress(props.account)}</span>
          </div>
       </li>
      </ul>
    </nav>
  );
};

export default Navbar;
