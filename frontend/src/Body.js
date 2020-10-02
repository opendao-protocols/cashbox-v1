import React, { useState } from "react";
import "./css/body.css";
import "./css/index.scss";
import swal from 'sweetalert';

const Body = ({
  redeemStockToken,
  mintPoolToken,
  burnPoolToken,
  updateCashValuationCap,
  changeOwner,
  pooltokenTotalSupply,
  contractCashBalance,
  contractstockTokenBalance,
  contractCashValuation,
  stocktocash,
  mycashbalance,
  mypoolbalance,
  mystockbalance,
  pooltocash,
  updateurl,
  dcashValauationCap,
  urlll,
  data,
}) => {
  const [sellstockvalue, setsellstockvalue] = useState("");
  const [sellmintvalue, setsellmintvalue] = useState("");
  const [sellredeemvalue, setsellredeemvalue] = useState("");
  const [owner, setowner] = useState("");
  const [updatestockprice, setupdatestockprice] = useState("");
  const [urll, seturll] = useState("");
  // console.log(data);
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
    let marketCap = (pooltokenTotalSupply * (contractCashValuation / pooltokenTotalSupply)).toFixed(2);
    if(marketCap >= dcashValauationCap) {
      swal("CashBox is full, no more deposits!")
    }
    else{
        swal("You will receive "+ sellmintvalue.toString() + " CashBox tokens for depositing " + sellmintvalue.toString() + " DAI");
    }

    mintPoolToken(sellmintvalue.toString());
  };

  const onsubmitsellstock = () => {
    console.log(sellstockvalue.toString());
    redeemStockToken(sellstockvalue.toString());
  };

  const onsubmitupdateCashValuationCap = () => {
    updateCashValuationCap(updatestockprice.toString());
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
        <div class="col-md-8 offset-md-2 text-center">
          <div>
            <div className="row mt-md-3">
              <div class="col-md-6">
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
              <div class="col-md-6">
                <button
                  class="btn btn-main btn-block"
                  onClick={onsubmitminttoken}
                >
                  Deposit Cash and get CashBox tokens
                </button>
              </div>
            </div>
            <br></br>

            <div className="row">
              <div class="col-md-6">
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
              <div class="col-md-6">
                <button
                  class="btn btn-main btn-block"
                  onClick={onsubmitsellstock}
                >
                  Sell Asset tokens to get Cash
                </button>
              </div>
            </div>
            <br></br>

            <div className="row">
              <div class="col-md-6">
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
              <div class="col-md-6">
                <button
                  class="btn btn-main btn-block"
                  onClick={onsubmitredeemtoken}
                >
                  Redeem CashBox tokens for Asset tokens
                </button>
              </div>
            </div>
            <br></br>
            <br></br>
          </div>
        </div>
      </div>

      <br></br>
      <br></br>
      <div className="row">

        <div className="col-md-12">
          <div className="row">
          <div className="col-md-6">
            <div className="row" style={{ height: "100%" }}>
              <div className="col-md-10 offset-md-1 section">
                <h3 className="section-heading">STATISTICS</h3>
                  <table className="table text-left width-lg">
                    <tbody>
                      <tr>
                        <td>Cash in Cashbox:</td>
                        <td>{contractCashBalance}</td>
                      </tr>
                      <tr>
                        <td>Asset tokens in CashBox:</td>
                        <td>{contractstockTokenBalance}</td>
                      </tr>
                      <tr>
                        <td>Total CashBox tokens in circulation:</td>
                        <td>{pooltokenTotalSupply}</td>
                      </tr>
                      <tr>
                        <td>Asset token price in Cash:</td>
                        <td>{stocktocash}</td>
                      </tr>
                      <tr>
                        <td>CashBox token price in Cash:</td>
                        <td>
                          {Number(
                            contractCashValuation / pooltokenTotalSupply
                          ).toFixed(2)}
                        </td>
                      </tr>
                      <tr>
                        <td>CashBox market cap ceiling:</td>
                        <td>{dcashValauationCap}</td>
                      </tr>
                      <tr>
                        <td>CashBox current market cap:</td>
                        <td>
                          {Number(
                            pooltokenTotalSupply *
                              (contractCashValuation / pooltokenTotalSupply)
                          ).toFixed(2)}
                        </td>
                      </tr>
                      <tr>
                        <td>URL:</td>
                        <td>
                          <span>
                            <a href={urlll} target="_blank" class="link">
                              {urlll}
                            </a>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="col-md-6">
              <div class="row">
                <div class="col-md-10 offset-md-1 section">
                  <h3 class="section-heading">YOUR BALANCES</h3>
                  <table class="table text-left width-lg">
                    <tbody>
                      <tr>
                        <td>Asset token in your wallet:</td>
                        <td>{mystockbalance}</td>
                      </tr>
                      <tr>
                        <td>CashBox token in your wallet:</td>
                        <td>{mypoolbalance}</td>
                      </tr>
                      <tr>
                        <td>Cash in your wallet:</td>
                        <td>{mycashbalance}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <br></br>
              <br></br>

              <div class="row">
                <div class="col-md-10 offset-md-1 section">
                  <h3 class="section-heading">CONTRACT ADDRESSES</h3>
                  <table class="table text-left">
                    <tbody>
                      <tr>
                        <td>Cash Address:</td>
                        <td>0x58eCf1a6B2af462E69765261e15536ddef8A8C41</td>
                      </tr>
                      <tr>
                        <td class="text-break">Pool Token Address: </td>
                        <td>0x9312b558cA3659909a38C27802bB46C5AC541552</td>
                      </tr>
                      <tr>
                        <td class="text-break">Asset Token Address:</td>
                        <td>0x1e615aF65Ab0183A0CEbAa4Dc709e8a030F4a5E9</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <br></br>
      <br></br>
    </div>
  );
};

export default Body;
