import React, { useState } from "react";
import "./css/body.css";

const Admin = ({
  redeemStockToken,
  mintPoolToken,
  burnPoolToken,
  updateDAIValuationCap,
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

  const onsubmitupdateDAIValuationCap = () => {
    updateDAIValuationCap(updatestockprice.toString());
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

        <div className="row">
            <div class="col-md-6">
              <input
                id="inputvalue"
                type="text"
                
                name="owner"
                value={owner}
                onChange={onchangeowner}
                class="form-control"
                required
              />
            </div>
            <div class="col-md-6">
              <button class="btn btn-main btn-block" onClick={onsubmitchangeowner}>
                Change owner
              </button>
            </div>
          </div>
          <br></br>

          <div className="row">
            <div class="col-md-6">
              <input
                id="inputvalue"
                type="text"
                
                name="updatestockprice"
                value={updatestockprice}
                onChange={onupdatestockprice}
                class="form-control"
                required
              />
            </div>
            <div class="col-md-6">
              <button class="btn btn-main btn-block" onClick={onsubmitupdateDAIValuationCap}>
                Update DAI Valuation Cap
              </button>
            </div>
          </div>
          <br></br>

          <div className="row">
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
              <button class="btn btn-main btn-block" onClick={onsubmitminttoken}>
                Deposit DAI and get CashBox tokens
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
              <button class="btn btn-main btn-block" onClick={onsubmitsellstock}>
                Sell Asset tokens to get DAI
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
              <button class="btn btn-main btn-block" onClick={onsubmitredeemtoken}>
                Redeem CashBox tokens for Asset tokens
              </button>
            </div>
          </div>
          <br></br><br></br>
        </div>


      </div>



      </div>

      <br></br><br></br>

      <div class="row">

        <div class="col-md-12">
          <div class="row">
          <div class="col-md-6">
            <div class="row">
              <div class="col-md-10 offset-md-1 section">
                <h3 class="section-heading">STATISTICS</h3>
                  <table class="table text-left width-lg">
                    <tbody>
                      <tr>
                        <td>DAI in Cashbox:</td>
                        <td>{contractDaIBalance}</td>
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
                        <td>Asset token price in DAI:</td>
                        <td>{stocktodai}</td>
                      </tr>
                      <tr>
                        <td>CashBox token price in DAI:</td>
                        <td>{Number(contractDaIValuation / pooltokenTotalSupply).toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td>CashBox market cap ceiling:</td>
                        <td>{ddaiValauationCap}</td>
                      </tr>
                      <tr>
                        <td>CashBox current market cap:</td>
                        <td>{Number(pooltokenTotalSupply * (contractDaIValuation / pooltokenTotalSupply)).toFixed(2)}</td>
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
                      <td>DAI in your wallet:</td>
                      <td>{mydaibalance}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <br></br>
            <br></br>
            <br></br>

            <div class="row">
              <div class="col-md-10 offset-md-1 section">
                <h3 class="section-heading">CONTRACT ADDRESSES</h3>
                <table class="table text-left">
                  <tbody>
                    <tr>
                      <td>DAI Address:</td>
                      <td>0x6b175474e89094c44da98b954eedeac495271d0f</td>
                    </tr>
                    <tr>
                      <td class="text-break">Pool Token Address: </td>
                      <td>0x405594E2379f393F9A00ceF2f2f0A844Efcfd6eC</td>
                    </tr>
                    <tr>
                      <td class="text-break">Asset Token Address:</td>
                      <td>0x86361E8b7900D7E819A471d712eF25A9c05b5588</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          </div>
        </div>

      </div>

      <br></br><br></br> 

    </div>
  );
};

export default Admin;
