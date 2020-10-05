import React, { useState } from "react";
import "./css/body.css";
import "./css/index.scss";
import swal from "sweetalert";
import $ from "jquery";
import Cookies from "universal-cookie";
import Switch from "react-bootstrap/esm/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

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
  CashSymbol,
}) => {
  const [sellstockvalue, setsellstockvalue] = useState("");
  const [sellmintvalue, setsellmintvalue] = useState("");
  const [sellredeemvalue, setsellredeemvalue] = useState("");
  const [owner, setowner] = useState("");
  const [updatestockprice, setupdatestockprice] = useState("");
  const [urll, seturll] = useState("");
  const [YYY, setYYY] = useState(
    parseFloat(sellredeemvalue) -
      parseFloat(contractstockTokenBalance) * parseFloat(stocktocash)
  );
  const [YYY1, setYYY1] = useState(
    parseFloat(sellredeemvalue) / parseFloat(stocktocash)
  );
  // console.log(data);

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const onchangestockvalue = (e) => {
    setsellstockvalue(e.target.value);
  };

  const onchangemintvalue = (e) => {
    setsellmintvalue(e.target.value);
  };

  const onchangeredeemvalue = (e) => {
    setYYY(
      parseFloat(e.target.value) -
        parseFloat(contractstockTokenBalance) * parseFloat(stocktocash)
    );

    setYYY1(parseFloat(e.target.value) / parseFloat(stocktocash));
    setsellredeemvalue(e.target.value);
  };

  const onchangeowner = (e) => {
    setowner(e.target.value);
  };

  const onupdatestockprice = (e) => {
    setupdatestockprice(e.target.value);
  };

  const onsubmitredeemtoken = () => {
    let z = parseFloat(sellredeemvalue);
    let x = parseFloat(contractstockTokenBalance);
    let y;
    let xy = parseFloat(contractstockTokenBalance) * parseFloat(stocktocash);

    if (parseFloat(sellredeemvalue) > xy) {
      y = z - x * parseFloat(stocktocash);
      swal(
        "You should receive " +
          x.toString() +
          " " +
          " Asset Token" +
          " and " +
          y.toString() +
          " " +
          CashSymbol.toString()
      );
    } else {
      y = z / parseFloat(stocktocash);

      swal("You will receive " + y.toString() + " Asset Token");
    }

    burnPoolToken(sellredeemvalue.toString());
  };

  const onsubmitminttoken = () => {
    let marketCap = parseFloat(
      pooltokenTotalSupply * (contractCashValuation / pooltokenTotalSupply)
    );
    let totalValue = parseFloat(marketCap) + parseFloat(sellmintvalue);
    if (totalValue >= dcashValauationCap) {
      swal("CashBox is full, no more deposits!");
    } else {
      swal(
        "You will receive " +
          sellmintvalue.toString() +
          " CashBox tokens for depositing " +
          sellmintvalue.toString() +
          " DAI"
      );
    }

    mintPoolToken(sellmintvalue.toString());
  };

  const onsubmitsellstock = () => {
    let x = parseFloat(sellstockvalue) * parseFloat(stocktocash);

    if (contractCashBalance < x) {
      swal("Not enough DAI in CashBox");
    } else {
      swal(
        "You will receive " +
          x.toString() +
          " " +
          CashSymbol.toString() +
          " for " +
          sellstockvalue.toString() +
          " Asset Token"
      );
    }
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

  const showModal = () => {
    $("#previewModal").modal("show");
  };

  // const cookies = new Cookies();
  // let cookieExists = cookies.get('first_visit_cashbox');
  // console.log(cookies.get('first_visit_cashbox'));
  // if(!cookieExists) {
  //   showModal();
  //   console.log(cookies.get('first_visit_cashbox'));
  // }
  // cookies.set('first_visit_cashbox', 'True', { path: '/' });

  // cookies.set('first_visit_cashbox', 'True', { path: '/' });
  // console.log(cookies.get('first_visit_cashbox'));
  // if(cookies.get('first_visit_cashbox')) {
  //   showModal();
  // }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2 text-center">
          <div>
            <div className="row mt-md-3">
              <div className="col-md-6">
                <input
                  id="inputvalue"
                  type="text"
                  name="sellmintvalue"
                  value={sellmintvalue}
                  onChange={onchangemintvalue}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6">
                <button
                  className="btn btn-main btn-block"
                  onClick={onsubmitminttoken}
                >
                  Deposit {CashSymbol} and get CashBox tokens
                </button>
              </div>
            </div>
            <br></br>

            <div className="row">
              <div className="col-md-6">
                <input
                  id="inputvalue"
                  type="text"
                  name="sellredeemvalue"
                  value={sellredeemvalue}
                  onChange={onchangeredeemvalue}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6">
                <button
                  className="btn btn-main btn-block"
                  onClick={onsubmitredeemtoken}
                >
                  Redeem CashBox tokens for Asset tokens
                </button>
              </div>
            </div>
            <br></br>

            <div className="row">
              <div className="col-md-6">
                <input
                  id="inputvalue"
                  type="text"
                  name="sellstockvalue"
                  value={sellstockvalue}
                  onChange={onchangestockvalue}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6">
                <button
                  className="btn btn-main btn-block"
                  onClick={onsubmitsellstock}
                >
                  Sell Asset tokens to get {CashSymbol}
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
                        <td>{CashSymbol} in Cashbox:</td>
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
                        <td>Asset token price in {CashSymbol}:</td>
                        <td>{stocktocash}</td>
                      </tr>
                      <tr>
                        <td>
                          {" "}
                          {sellredeemvalue} {""}CashBox token gives:
                        </td>
                        <td style={{ wordBreak: "break-word" }}>
                          {/* {Number(
                            contractCashValuation / pooltokenTotalSupply
                          ).toFixed(2)} */}
                          {sellredeemvalue === ""
                            ? "You will receive _____ Asset Token"
                            : parseFloat(sellredeemvalue) >
                              parseFloat(contractstockTokenBalance) *
                                parseFloat(stocktocash)
                            ? "You will recieve " +
                              contractstockTokenBalance +
                              " " +
                              "Asset Token" +
                              " and " +
                              YYY.toString() +
                              " " +
                              CashSymbol.toString()
                            : "You will receive " +
                              YYY1.toString() +
                              " " +
                              CashSymbol.toString()}
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
                            <a href={urlll} target="_blank" className="link">
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

            <div className="col-md-6">
              <div className="row">
                <div className="col-md-10 offset-md-1 section">
                  <h3 className="section-heading">YOUR BALANCES</h3>
                  <table className="table text-left width-lg">
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
                        <td>{CashSymbol} in your wallet:</td>
                        <td>{mycashbalance}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <br></br>
              <br></br>
              <br></br>

              <div className="row">
                <div className="col-md-10 offset-md-1 section">
                  <h3 className="section-heading">CONTRACT ADDRESSES</h3>
                  <table className="table text-left">
                    <tbody>
                      <tr>
                        <td>{CashSymbol} Address:</td>
                        <td>0x58eCf1a6B2af462E69765261e15536ddef8A8C41</td>
                      </tr>
                      <tr>
                        <td className="text-break">Pool Token Address: </td>
                        <td>0x9312b558cA3659909a38C27802bB46C5AC541552</td>
                      </tr>
                      <tr>
                        <td className="text-break">Asset Token Address:</td>
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

      <div className="modal" id="previewModal" role="dialog" aria-hidden="true">
        <div
          className="modal-dialog modal-lg modal-dialog-centered"
          role="document"
        >
          <div className="modal-content" style={{ backgroundColor: "#FFFFFF" }}>
            <div className="modal-body py0 px0">
              <div className="row my0 mx0">
                <div
                  className="col-lg-12 py0 px0"
                  style={{ backgroundColor: "#FFFFFF", height: "480px" }}
                >
                  <div className="py20 px20 d-block">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div
                    id="onboardingCarousel"
                    className="carousel slide"
                    data-interval="false"
                  >
                    <div className="carousel-inner">
                      <div
                        className="carousel-item active onboarding"
                        style={{ padding: "2rem", paddingTop: "1rem" }}
                      >
                        <img
                          className="d-block intro-slideshow-img mx-auto"
                          src="images/onboarding/1.PNG"
                          alt="First slide"
                          style={{ maxWidth: "260px" }}
                        />
                        <br></br>
                        <h3 className="intro-slideshow-text">
                          What is a Cashbox?
                        </h3>
                      </div>
                      <div className="carousel-item">
                        <img
                          className="d-block intro-slideshow-img mx-auto"
                          src="images/onboarding/2.PNG"
                          alt="Second slide"
                        />
                        <h3 className="intro-slideshow-text">
                          Cash boxes are a perpetual buying counterparty pool to
                          a specific tokenized asset. Think of it as an open buy
                          order on a centralized exchange.
                        </h3>
                      </div>
                      <div className="carousel-item">
                        <img
                          className="d-block intro-slideshow-img mx-auto"
                          src="images/onboarding/3.PNG"
                          alt="Third slide"
                        />
                        <h3 className="intro-slideshow-text">
                          What that means is if someone has an Asset token, they
                          can always sell it to the cash box in return of a
                          stable coin at a predefined price.
                        </h3>
                      </div>
                      <div className="carousel-item">
                        <img
                          className="d-block intro-slideshow-img mx-auto"
                          src="images/onboarding/4.PNG"
                          alt="Fourth slide"
                        />
                        <h3 className="intro-slideshow-text">
                          Those who deposit stable coins in the pool become
                          owners of the Asset tokens that are redeemed against
                          the pool. Their ownership of the pool is represented
                          by Cash Box tokens, aka Pool tokens.
                        </h3>
                      </div>
                      <div className="carousel-item">
                        <img
                          className="d-block intro-slideshow-img mx-auto"
                          src="images/onboarding/5.PNG"
                          alt="Fifth slide"
                        />
                        <h3 className="intro-slideshow-text">
                          The pool tokens can be redeemed for the Asset tokens
                          in the Cash box plus cash (if there are not enough
                          Assets).
                        </h3>
                      </div>
                      <div className="carousel-item">
                        <br></br>
                        <img
                          className="d-block intro-slideshow-img mx-auto"
                          src="images/onboarding/6.PNG"
                          alt="Sixth slide"
                        />
                        <h3 className="intro-slideshow-text">
                          The Asset tokens can then be redeemed against real
                          world shares or equivalents via the off-ramp partners.
                        </h3>
                      </div>
                      <div className="carousel-item">
                        <img
                          className="d-block intro-slideshow-img mx-auto"
                          src="images/onboarding/7.PNG"
                          alt="Seventh slide"
                        />
                        <h3 className="intro-slideshow-text">
                          The performance of the cash box tokens therefore are
                          similar to the Asset tokens they act as counterparty
                          to, providing a permissionless mechanism for exposure
                          to the performance of real world assets.
                        </h3>
                      </div>
                      <div className="carousel-item">
                        <img
                          className="d-block intro-slideshow-img mx-auto"
                          src="images/onboarding/8.PNG"
                          alt="Fifth slide"
                        />
                        <h3 className="intro-slideshow-text">
                          The cash box tokens also serve as a backstop for
                          onchain liquidation of real world collateral.
                        </h3>
                      </div>
                      <div className="carousel-item">
                        <br></br>
                        <img
                          className="d-block intro-slideshow-img mx-auto"
                          src="images/onboarding/9.PNG"
                          alt="Sixth slide"
                        />
                        <h3 className="intro-slideshow-text">
                          As an additional incentive for providing this service,
                          pool token holders can stake them and earn OPEN tokens
                          as reward.
                        </h3>
                      </div>
                      <a
                        className="carousel-control-prev"
                        href="#onboardingCarousel"
                        role="button"
                        data-slide="prev"
                      >
                        <span
                          className="carousel-control-prev-icon"
                          aria-hidden="true"
                        ></span>
                      </a>
                      <a
                        className="carousel-control-next"
                        href="#onboardingCarousel"
                        role="button"
                        data-slide="next"
                      >
                        <span
                          className="carousel-control-next-icon"
                          aria-hidden="true"
                        ></span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
