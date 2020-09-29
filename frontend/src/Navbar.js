import React from "react";

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-dark bg-dark shadow mb-5">
      <li>
        <p className="navbar-brand my-auto">
          <a href="/" style={{ color: "#ffffff" }}>
            Stock liquidator
          </a>
        </p>
        <p className="navbar-brand my-auto">
          {" "}
          <a href="/deploy" style={{ color: "#ffffff" }}>
            Deploy smart contracts
          </a>
        </p>
      </li>
      <ul className="navbar-nav horizontal" style={{ float: "left" }}>
        <li className="nav-item text-white horizontal">{props.account}</li>
      </ul>
    </nav>
  );
};

export default Navbar;
