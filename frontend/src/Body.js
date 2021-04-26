import React, { useState } from "react";
import "./css/body.css";
import "./css/index.scss";
import swal from "sweetalert";
import $ from "jquery";
import Cookies from "universal-cookie";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {IconButton} from "@material-ui/core";

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
  InfiniteApprovalCash,
  InfiniteApprovalStock,
  stockliquidatorCashallowance,
  stockliquidatorStockallowance,
  InfiniteApprovalStockLiquidator,
  stockliquidatorallowance,
  decimalexactvalue,
  Stockliqidatoraddress,
  AssetTokenaddress,
  TokenAddress,
  getNetwork,
  getNetworkEtherscanURL,
}) => {
  console.log(Stockliqidatoraddress, AssetTokenaddress, TokenAddress);
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

  // const [checkedA, setcheckedA] = useState(false);

  const CashInfiniteAllowancehandleChange = (event) => {
    // setcheckedA(event.target.checked);
    console.log(stockliquidatorCashallowance);
    if (
      event.target.checked == true &&
      parseInt(stockliquidatorCashallowance) <= 0
    ) {
      InfiniteApprovalCash();
    }
  };

  const StockInfiniteAllowancehandleChange = (event) => {
    // setcheckedA(event.target.checked);
    console.log(stockliquidatorStockallowance);
    if (
      event.target.checked == true &&
      parseInt(stockliquidatorStockallowance) <= 0
    ) {
      InfiniteApprovalStock();
    }
  };

  const stockliquidatorInfiniteAllowancehandleChange = (event) => {
    // setcheckedA(event.target.checked);
    console.log(stockliquidatorallowance);
    if (
      event.target.checked == true &&
      parseInt(stockliquidatorallowance) <= 0
    ) {
      InfiniteApprovalStockLiquidator();
    }
  };

  const onchangestockvalue = (e) => {
    let { value, min, max } = e.target;
    // value = Math.max(Number(min), Math.min(Number(max), Number(value)));
    console.log(Number(value),Number(min), value, min, max);
    if(isNaN(parseInt(value))){
      swal("Please enter validate amount");
      return;
    }
    if(Number(min) > Number(value)){
      swal("you can enter the amount from "+min+" to "+max+".");
      return;
    }
    if(Number(max) < Number(value)){
      swal("you can enter the amount from "+min+" to "+max+".");
      return;
    }
    console.log(value, min, max);
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

    if (isNaN(parseInt(sellredeemvalue))) {
      swal("please enter something to perform this function");
      return;
    }
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
    try {
      burnPoolToken(sellredeemvalue.toString());
    } catch (e) {
      swal("please enter something to perform this function");
    }
  };

  const onsubmitminttoken = () => {
    let marketCap = parseFloat(
      pooltokenTotalSupply * (contractCashValuation / pooltokenTotalSupply)
    );
    // console.log(parseInt(sellmintvalue));
    if (isNaN(parseInt(sellmintvalue))) {
      swal("please enter something to perform this function");
      return;
    }
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
    try {
      mintPoolToken(sellmintvalue.toString());
    } catch (e) {
      swal("please enter something to perform this function");
    }
  };

  const onsubmitsellstock = () => {
    let x = parseFloat(sellstockvalue) * parseFloat(stocktocash);

    if (isNaN(parseInt(sellstockvalue))) {
      swal("please enter something to perform this function");
      return;
    }
    if (contractCashBalance < x) {
      swal(
        "CashBox does not have enough liquidity, please reduce amount for redemption and try again"
      );
    } else {
      swal(
        "You will receive " +
          x.toString() +
          " " +
          CashSymbol.toString() +
          " for " +
          sellstockvalue.toString() +
          " bOPEN Token"
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
  $(".carousel").carousel({
    interval: false,
  });
  checkitem();
  $("#onboardingCarousel").on("slid.bs.carousel", checkitem);
  function checkitem() {
    var $this = $("#onboardingCarousel");
    if ($(".carousel-inner .carousel-item:first").hasClass("active")) {
      // Hide left arrow
      $(".carousel-control-prev").hide();
      // But show right arrow
      $(".carousel-control-next").show();
    } else if ($(".carousel-inner .carousel-item:last").hasClass("active")) {
      // Hide right arrow
      $(".carousel-control-next").hide();
      // But show left arrow
      $(".carousel-control-prev").show();
    } else {
      $(".carousel-control-prev, .carousel-control-next").show();
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <div>
            <div className="row">
              <div className="col-md-6 my-auto">
                <input
                  id="inputvalue"
                  type="text"
                  name="sellstockvalue"
                  value={sellstockvalue}
                  onChange={onchangestockvalue}
                  className="form-control input-main"
                  placeholder="0"
                  min="1"
                  max={contractCashBalance}
                  required
                />
              </div>
              <div className="col-md-6 ">
                <button
                  className="btn btn-main btn-block"
                  onClick={onsubmitsellstock}
                >
                  Convert bOPEN to {CashSymbol}
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
            <div className="col-md-10 offset-md-1">
              <div className="row" style={{ height: "100%" }}>
                <div className="col-md-10 offset-md-1 section">
                  <h3 className="section-heading">STATISTICS</h3>
                  <table className="table text-left width-lg">
                    <tbody>
                      <tr>
                        <td>{CashSymbol} available to convert</td>
                        <td>{contractCashBalance}</td>
                      </tr>
                      <tr>
                        <td>bOPEN in your wallet</td>
                        <td>{mystockbalance}</td>
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
      <div className="row footer " style={{paddingTop:"2em"}}>
      <div className="col-md-12 text-center">
      <h3 className="section-heading text-center">Request the OPEN DAO team to add more pOPEN
        <IconButton
          style={{ marginRight: `8px`,marginLeft: `16px` }}
          target="_blank"
          href="https://discord.com/invite/SpFwJRr"
          size="medium"
        >
          <img
            src="/images/discord.png"
            className="social-media-icons text-center"
          />
        </IconButton>
        <IconButton
          style={{ marginRight: `8px` }}
          target="_blank"
          href="https://t.me/opendao" size="medium">
          <img
            src="/images/telegram.png"
            className="social-media-icons"
          />
        </IconButton>
        <IconButton
          style={{ marginRight: `8px` }}
          target="_blank"
          href={"mailto: info@opendao.io" } size="medium">
          <img
            src="/images/mail.png"
            className="social-media-icons"
          />
        </IconButton>
        </h3>
      </div>
      </div>
    </div>
  );
};

export default Body;
