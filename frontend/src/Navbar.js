import React from "react";
import $ from "jquery";
import 'bootstrap';
import Web3 from "web3";


const trucateAddress = (address) => {
  if (address === null || address === undefined) { return; }
  const start4Digits = address.slice(0, 6);
  const separator = '...';
  const last4Digits = address.slice(-4);
  return (start4Digits.padStart(2, '0') + separator.padStart(2, '0') + last4Digits.padStart(2, '0'));
}

 const showModal = () => {
    $('#previewModal').modal('show');
  };

  // const loadWeb3 = async () => {
  //   if (window.ethereum) {
  //     window.web3 = new Web3(window.ethereum);
  //     await window.ethereum.enable();
  //   } else if (window.web3) {
  //     window.web3 = new Web3(window.web3.currentProvider);
  //   } else {
  //     window.alert(
  //       "Non-Ethereum browser detected. You should consider trying MetaMask!"
  //     );
  //   }
  // };
  // loadWeb3();

  // const getNetworkDetails = async () => {
  //   const web3 = window.web3;
  //   // console.log(web3);
  //   const networkId = await web3.eth.net.getId();
  //   let networkName;
  //   if (networkId === 1) {
  //     networkName = "Main Net";
  //   } else if (networkId === 42) {
  //     networkName = "Kovan";
  //   } else {
  //     networkName = "Unknown";
  //   }
  //   return networkName;
  // };
  // console.log(getNetworkDetails());

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow mb-5"  style={{ backgroundColor: "#000 !important"  }}>
      <a href="/">
        <img src="../otl-cashbox-logo.png" style={{ maxWidth: "200px", marginRight: "0.8em" }} className="img-fluid"></img>
      </a>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item text-white ml-auto">
        <a href="https://opendao.io/beta" target="_blank">
          <div className="asset btn btn-grey-box">
              <span style={{ color: "#ff8686" }}>BETA</span>
           </div>
        </a>
        </li>
        <a href="#" onClick={showModal}>
        <li className="nav-item text-white">
          <div className="asset btn btn-grey-box">
            <span>HELP </span>
          </div>
        </li>
        </a>
        <li className="nav-item text-white">
        <div className="asset btn btn-grey-box" style={{ cursor: "default", boxShadow: "none" }}>
              <span>{trucateAddress(props.account)}</span>
          </div>
       </li>
      </ul>
    </nav>
  );
};

export default Navbar;
