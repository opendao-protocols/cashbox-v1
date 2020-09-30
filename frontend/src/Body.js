import React, { useState } from "react";
import "./css/body.css";
import "./css/index.scss";


const Body = ({
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

        <div class="col-md-6">

        <div>

          <div className="row mt-md-5">
            <div class="">
              <input
                id="inputvalue"
                type="text"
                
                name="sellmintvalue"
                value={sellmintvalue}
                onChange={onchangemintvalue}
                class="form-control"
                required
              />
            </div>
            <span style={{ paddingLeft: "20px" }}></span>

            <button class="btn btn-main" onClick={onsubmitminttoken}>
              Deposit DAI and get pool tokens
            </button>
          </div>
          <br></br>

          <div className="row">
            <div class="">
              <input
                id="inputvalue"
                type="text"
                
                name="sellstockvalue"
                value={sellstockvalue}
                onChange={onchangestockvalue}
                class="form-control"
                required
              />
            </div>
            <span style={{ paddingLeft: "20px" }}></span>

            <button class="btn btn-main" onClick={onsubmitsellstock}>
              Sell Asset tokens to get DAI
            </button>
          </div>
          <br></br>

          <div className="row">
          <div class="">
            <input
              id="inputvalue"
              type="text"
              
              name="sellredeemvalue"
              value={sellredeemvalue}
              onChange={onchangeredeemvalue}
              class="form-control"
              required
            />
            </div>
            <span style={{ paddingLeft: "20px" }}></span>
            <button class="btn btn-main" onClick={onsubmitredeemtoken}>
              Redeem Pool tokens for Asset tokens
            </button>
          </div>
          <br></br><br></br>
        </div>


      </div>

        <div class="col-md-6 text-left"> 

        <div class="row">
          <div class="col-md-6">
            <p class="label">Cash box content:</p>
          </div>
          <div class="col-md-6">
            <span>{contractDaIBalance} DAI</span>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <p class="label">No. of stocks:</p>
          </div>
          <div class="col-md-6">
            <span>{contractstockTokenBalance} stock</span>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <p class="label">Total supply of Pool Tokens:</p>
          </div>
          <div class="col-md-6">
            <span>{pooltokenTotalSupply} token</span>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <p class="label">Stock price:</p>
          </div>
          <div class="col-md-6">
            <span>1 stock = {stocktodai} DAI</span>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <p class="label">Pool token price:</p>
          </div>
          <div class="col-md-6">
            <span>
              1 pool ={" "}
              {Number(contractDaIValuation / pooltokenTotalSupply).toFixed(2)}{" "}
              DAI
            </span>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <p class="label">Your stock</p>
          </div>
          <div class="col-md-6">
            <span>{mystockbalance} stock</span>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <p class="label">Your pool token</p>
          </div>
          <div class="col-md-6">
            <span>{mypoolbalance} token</span>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <p class="label">Balance of DAI:</p>
          </div>
          <div class="col-md-6">
            <span>{mydaibalance} DAI</span>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <p class="label">DAI Valuation Cap:</p>
          </div>
          <div class="col-md-6">
            <span>{ddaiValauationCap}</span>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <p class="label">Pool Market Cap:</p>
          </div>
          <div class="col-md-6">
            <span>{Number(pooltokenTotalSupply * (contractDaIValuation / pooltokenTotalSupply)).toFixed(2)}</span>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <p class="label">URL:</p>
          </div>
          <div class="col-md-6">
            <span>
              <a href={urlll} target="_blank" class="link">
                  {urlll}
              </a>
            </span>
          </div>
        </div>

        <br></br><br></br>

          
        </div>

      </div>
    </div>
  );
};

export default Body;
