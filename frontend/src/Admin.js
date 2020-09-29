import React, { useState } from "react";
import "./css/body.css";

const Admin = ({
  redeemStockToken,
  mintPoolToken,
  burnPoolToken,
  updateStockTokenRate,
  changeOwner,
  pooltokenTotalSupply,
  contractDaIBalance,
  contractstockTokenBalance,
  contractDaIValuation,
  stocktodai,
  mydaibalance,
  mypoolbalance,
  mystockbalance,
  pooltodai,
  updateurl,
  ddaiValauationCap,
  urlll,
  data,
}) => {
  const [sellstockvalue, setsellstockvalue] = useState("");
  const [sellmintvalue, setsellmintvalue] = useState("");
  const [sellredeemvalue, setsellredeemvalue] = useState("");
  const [owner, setowner] = useState("");
  const [updatestockprice, setupdatestockprice] = useState("");
  const [urll, seturll] = useState("");
  console.log(data);
  const onchangestockvalue = (e) => {
    setsellstockvalue(e.target.value);
  };

  const onchangemintvalue = (e) => {
    setsellmintvalue(e.target.value);
  };

  const onchangeredeemvalue = (e) => {
    setsellredeemvalue(e.target.value);
  };

  const onchangeowner = (e) => {
    setowner(e.target.value);
  };

  const onupdatestockprice = (e) => {
    setupdatestockprice(e.target.value);
  };

  const onsubmitredeemtoken = () => {
    burnPoolToken(sellredeemvalue.toString());
  };

  const onsubmitminttoken = () => {
    mintPoolToken(sellmintvalue.toString());
  };

  const onsubmitsellstock = () => {
    redeemStockToken(sellstockvalue.toString());
  };

  const onsubmitupdateStockTokenRate = () => {
    updateStockTokenRate(updatestockprice.toString());
  };

  const onchangeurll = (e) => {
    seturll(e.target.value);
  };
  const onsubmitupdateurl = () => {
    updateurl(urll.toString());
  };

  const onsubmitchangeowner = () => {
    changeOwner(owner.toString());
  };
  return (
    <div className="container">
      <div class="row">
        <div>
          <p>cash box content</p>
          <div class="row">
            <span>{contractDaIBalance} Dai</span>
            <span style={{ paddingLeft: "40px" }}>
              {contractstockTokenBalance} stock
            </span>
          </div>
        </div>

        <div>
          <p style={{ "padding-left": "100px" }}>Total supply of Pool Tokens</p>
          <div class="row">
            <span style={{ paddingLeft: "150px" }}>
              {pooltokenTotalSupply} token
            </span>
          </div>
        </div>
        <div>
          <p style={{ "padding-left": "100px" }}>STOCK price</p>
          <div class="row">
            <span style={{ paddingLeft: "100px" }}>
              1 stock = {stocktodai} dai
            </span>
          </div>
        </div>
        <div>
          <p style={{ "padding-left": "100px" }}>pool take</p>
          <div class="row">
            <span style={{ paddingLeft: "100px" }}>
              1 pool ={" "}
              {/* {Number(contractDaIValuation / pooltokenTotalSupply).toFixed(
                2
              ) !== null
                ? 0
                : Number(contractDaIValuation / pooltokenTotalSupply).toFixed(
                    2
                  )} */}
              {Number(contractDaIValuation / pooltokenTotalSupply).toFixed(2)}
              dai
            </span>
          </div>
        </div>
        <div className="row" style={{ paddingTop: "50px" }}>
          <div>
            <p>your stock</p>
            <div class="row">
              <span style={{ paddingLeft: "20px" }}>
                {mystockbalance} stock
              </span>
            </div>
          </div>
          <div>
            <p style={{ "padding-left": "100px" }}>your pool token</p>
            <div class="row">
              <span style={{ paddingLeft: "120px" }}>
                {mypoolbalance} token
              </span>
            </div>
          </div>
          <div>
            <p style={{ "padding-left": "100px" }}>balance of dai</p>
            <div class="row">
              <span style={{ paddingLeft: "120px" }}>{mydaibalance} dai</span>
            </div>
          </div>
          <div>
            <p style={{ "padding-left": "100px" }}>daiValauationCap</p>
            <div class="row">
              <span style={{ paddingLeft: "120px" }}>{ddaiValauationCap} </span>
            </div>
          </div>
          <div>
            <p style={{ "padding-left": "100px" }}>URL</p>
            <div class="row">
              <span style={{ paddingLeft: "120px" }}>
                <a href={urlll}>{urlll}</a>

                {data}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ paddingTop: "150px" }}>
        <div className="row">
          <input
            id="inputvalue"
            type="text"
            placeholder="value"
            name="sellstockvalue"
            value={sellstockvalue}
            onChange={onchangestockvalue}
            required
          />
          <span style={{ paddingLeft: "20px" }}></span>

          <button class="btn-primary" onClick={onsubmitsellstock}>
            sell stock
          </button>
        </div>
        <br></br>
        <div className="row">
          <input
            id="inputvalue"
            type="text"
            placeholder="set url"
            name="urll"
            value={urll}
            onChange={onchangeurll}
            required
          />
          <span style={{ paddingLeft: "20px" }}></span>

          <button class="btn-primary" onClick={onsubmitupdateurl}>
            update url
          </button>
        </div>
        <br></br>
        <div className="row">
          <input
            id="inputvalue"
            type="text"
            placeholder="value"
            name="owner"
            value={owner}
            onChange={onchangeowner}
            required
          />
          <span style={{ paddingLeft: "20px" }}></span>

          <button class="btn-primary" onClick={onsubmitchangeowner}>
            Change owner
          </button>
        </div>
        <br></br>
        <div className="row">
          <input
            id="inputvalue"
            type="text"
            placeholder="value"
            name="updatestockprice"
            value={updatestockprice}
            onChange={onupdatestockprice}
            required
          />
          <span style={{ paddingLeft: "20px" }}></span>

          <button class="btn-primary" onClick={onsubmitupdateStockTokenRate}>
            update stock price
          </button>
        </div>
        <br></br>
        <div className="row">
          <input
            id="inputvalue"
            type="text"
            placeholder="value"
            name="sellmintvalue"
            value={sellmintvalue}
            onChange={onchangemintvalue}
            required
          />
          <span style={{ paddingLeft: "20px" }}></span>

          <button class="btn-primary" onClick={onsubmitminttoken}>
            mint pool tokens
          </button>
        </div>
        <br></br>
        <div className="row">
          <input
            id="inputvalue"
            type="text"
            placeholder="value"
            name="sellredeemvalue"
            value={sellredeemvalue}
            onChange={onchangeredeemvalue}
            required
          />
          <span style={{ paddingLeft: "20px" }}></span>
          <button class="btn-primary" onClick={onsubmitredeemtoken}>
            redeem pool tokens
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
