import React, { useState } from "react";

const ContractDeployment = ({ onsubmitdetails }) => {
  const [UppercapLimit, setUppercapLimit] = useState(0);
  const [stockTokenAddress, setstockTokenAddress] = useState("");
  const [stockPoolTokenAddress, setstockPoolTokenAddress] = useState("");
  const [tokenname, settokenname] = useState("");
  const [tokensybol, settokensymbol] = useState("");
  const [URL, setURL] = useState("");

  const [daiaddress, setdaiaddress] = useState("");
  const onchangestockTokenAddress = (e) => {
    setstockTokenAddress(e.target.value);
    console.log(e.target.value);
  };

  const onchangeUppercapLimit = (e) => {
    setUppercapLimit(e.target.value);
  };

  const onchangestockPoolTokenAddress = (e) => {
    setstockPoolTokenAddress(e.target.value);
    console.log(e.target.value);
  };

  const onchangedaiaddress = (e) => {
    setdaiaddress(e.target.value);
    console.log(e.target.value);
  };

  const onchangetokenname = (e) => {
    settokenname(e.target.value);
    console.log(e.target.value);
  };

  const onchangeURL = (e) => {
    setURL(e.target.value);
    console.log(e.target.value);
  };

  const onchangetokensymbol = (e) => {
    settokensymbol(e.target.value);
    console.log(e.target.value);
  };

  const onsubmitdet = async () => {
    await onsubmitdetails(
      daiaddress,
      stockTokenAddress,
      UppercapLimit,
      tokenname,
      tokensybol,
      URL
    );
  };
  return (
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
         <form onSubmit={onsubmitdet}>
            {/* 
            <div className="row">
               <input
                  id="inputvalue"
                  type="text"
                  className="form-control"
                  placeholder="stock Pool TokenAddress"
                  name="stockPoolTokenAddress"
                  value={stockPoolTokenAddress}
                  onChange={onchangestockPoolTokenAddress}
                  required
                  />
               <span style={{ paddingLeft: "20px" }}></span>
               <button class="btn-main" disabled>
               input token address
               </button> 
            </div>
            */}
            <div className="row">
               <input
                  id="inputvalue"
                  type="text"
                  placeholder="Cash token address"
                  name="daiaddress"
                  className="form-control"
                  value={daiaddress}
                  onChange={onchangedaiaddress}
                  required
                  />
               <span style={{ paddingLeft: "20px" }}></span>
               {/* <button class="btn-main" disabled>
               input stock address
               </button> */}
            </div>
            <br />
            <div className="row">
               <input
                  id="inputvalue"
                  type="text"
                  placeholder="Asset Token Address"
                  name="stockTokenAddress"
                  className="form-control"
                  value={stockTokenAddress}
                  onChange={onchangestockTokenAddress}
                  required
                  />
               <span style={{ paddingLeft: "20px" }}></span>
               {/* <button class="btn-main" disabled>
               input stock address
               </button> */}
            </div>
            <br />
            <div className="row">
               <input
                  id="inputvalue"
                  type="text"
                  className="form-control"
                  placeholder="Upper cap limit"
                  name="UppercapLimit"
                  value={UppercapLimit}
                  onChange={onchangeUppercapLimit}
                  required
                  />
               <span style={{ paddingLeft: "20px" }}></span>
               {/* <label class="btn-main" disabled>
               input upper cap limit
               </label> */}
            </div>
            <br />
            <div className="row">
               <input
                  id="inputvalue"
                  type="text"
                  placeholder="Token name"
                  name="tokenname"
                  className="form-control"
                  value={tokenname}
                  onChange={onchangetokenname}
                  required
                  />
               <span style={{ paddingLeft: "20px" }}></span>
               {/* <button class="btn-main" disabled>
               input stock address
               </button> */}
            </div>
            <br />
            <div className="row">
               <input
                  id="inputvalue"
                  type="text"
                  placeholder="Token symbol"
                  name="tokensymbol"
                  className="form-control"
                  value={tokensybol}
                  onChange={onchangetokensymbol}
                  required
                  />
               <span style={{ paddingLeft: "20px" }}></span>
               {/* <button class="btn-main" disabled>
               input stock address
               </button> */}
            </div>
            <br />
            <div className="row">
               <input
                  id="inputvalue"
                  type="text"
                  placeholder="Enter URL"
                  name="URL"
                  className="form-control"
                  value={URL}
                  onChange={onchangeURL}
                  required
                  />
               <span style={{ paddingLeft: "20px" }}></span>
               {/* <button class="btn-main" disabled>
               input stock address
               </button> */}
            </div>
            <br></br><br></br>
            <div class="row text-center">
            <button type="submit" class="btn btn-main mx-auto">
            Deploy
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContractDeployment;
