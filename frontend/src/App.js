import React, { useEffect, useState, Fragment } from "react";
import Web3 from "web3";
import Navbar from "./Navbar";
// const EthereumTx = require("ethereumjs-tx").Transaction;
import Body from "./Body";
import MainContractDetails from "./contractsDetails/MainContractDetails.json";
import BSCContractDetails from "./contractsDetails/BSCContractDetails.json";
import ContractDetails from "./contractsDetails/ContractDetails.json";
import ContractDeployment from "./ContractDeployment";
import Admin from "./Admin";
// import { BigInt } from "BigInt";
// import "BigInt";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect,
  // useHistory,
} from "react-router-dom";

const App = () => {
  const [refresh, setrefresh] = useState(0);

  let content;

  const [loading2, setloading2] = useState(false);

  const [account, setAccount] = useState("");
  const [CashSymbol, setCashSymbol] = useState("");
  const [loading, setLoading] = useState(true);
  const [stocksc, setstocksc] = useState();
  const [cashDecimals, setCashDecimals] = useState();
  const [stockDecimals, setStockDecimals] = useState();
  const [cashsc, setcashsc] = useState();
  const [stocktokensc, setstocktokensc] = useState();
  const [stockpooltokensc, setstockpooltokensc] = useState();

  const [pooltokenTotalSupply, setpooltokenTotalSupply] = useState(0);
  const [contractstockTokenBalance, setcontractstockTokenBalance] = useState(0);
  const [contractCashBalance, setcontractCashBalance] = useState(0);
  const [contractCashValuation, setcontractCashValuation] = useState(0);
  // const [stockTokenAddress, setstockTokenAddress] = useState("");
  // const [stockPoolTokenAddress, setstockPoolTokenAddress] = useState("");
  const [dcashValauationCap, setdcashValauationCap] = useState();
  const [urlll, seturll] = useState();
  const [data, setdata] = useState({
    url: "",
    cashcap: 0,
  });
  const [mystockbalance, setmystockbalance] = useState(0);
  const [mypoolbalance, setmypoolbalance] = useState(0);
  const [mycashbalance, setmycashbalance] = useState(0);
  const [pooltocash, setpooltocash] = useState(0);
  const [stocktocash, setstocktocash] = useState(0);
  const [contract, setContract] = useState({});

  const [Stockliqidatoraddress, setStockliqidatoraddress] = useState("");
  const [AssetTokenaddress, setAssetTokenaddress] = useState("");
  const [TokenAddress, setTokenAdress] = useState("");
  const [
    stockliquidatorCashallowance,
    setstockliquidatorCashallowance,
  ] = useState("");

  const [
    stockliquidatorStockallowance,
    setstockliquidatorStockallowance,
  ] = useState("");

  const [decimalexactvalue, setdecimalexactvalue] = useState("");

  const [stockliquidatorallowance, setstockliquidatorallowance] = useState("");

  const [getNetwork, setNetwork] = useState("");
  const [getNetworkEtherscanURL, setNetworkEtherscanURL] = useState("");

  const loadWeb3 = async () => {
    try {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        window.alert(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );

        setLoading(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const loadBlockchainData = async () => {
    setLoading(true);
    if (
      typeof window.ethereum == "undefined" ||
      typeof window.web3 == "undefined"
    ) {
      return;
    }
    const web3 = window.web3;

    let url = window.location.href;
    // console.log(url);

    const accounts = await web3.eth.getAccounts();
    // console.log(accounts.length);

    if (accounts.length == 0) {
      return;
    }

    setAccount(accounts[0]);
    const networkId = await web3.eth.net.getId();

    if (networkId === 56) {
      const contract = new web3.eth.Contract(
        BSCContractDetails.stockLiquidatorABI
      );
      setContract(contract);

      setNetwork("BSC");
      setNetworkEtherscanURL("https://bscscan.com");
      // console.log(getNetwork);
      // console.log(getNetworkEtherscanURL);

      const Stock = new web3.eth.Contract(
        BSCContractDetails.stockLiquidatorABI,
        BSCContractDetails.stockLiquidatorAddress
      );

      const allowances = await Stock.methods
        .allowance(accounts[0], BSCContractDetails.stockLiquidatorAddress)
        .call()
        .then((result) => {
          // console.log("cash result " + result);
          setstockliquidatorallowance(result);
        });

      const cashtoken = new web3.eth.Contract(
        BSCContractDetails.cashAddressABI,
        BSCContractDetails.cashAddress
      );
      // console.log(cashtoken.methods);
      const cashallowances = await cashtoken.methods
        .allowance(accounts[0], BSCContractDetails.stockLiquidatorAddress)
        .call()
        .then((result) => {
          // console.log("cash result " + result);
          setstockliquidatorCashallowance(result);
        });
      setcashsc(cashtoken);
      const stocktoken = new web3.eth.Contract(
        BSCContractDetails.stockTokenAddressABI,
        BSCContractDetails.stockTokenAddress
      );
      const stockallowances = await stocktoken.methods
        .allowance(accounts[0], BSCContractDetails.stockLiquidatorAddress)
        .call()
        .then((result) => {
          // console.log("stock result " + result);
          setstockliquidatorStockallowance(result);
        });

      setstocktokensc(stocktoken);
      setstocksc(Stock);
      setStockliqidatoraddress(BSCContractDetails.stockLiquidatorAddress);
      setAssetTokenaddress(BSCContractDetails.stockTokenAddress);
      setTokenAdress(BSCContractDetails.cashAddress);

      ///// have to add name ticker
      let cashsymbol = await cashtoken.methods.symbol().call();
      setCashSymbol(cashsymbol);
      let cashDecimals = await Stock.methods.cashDecimals().call();
      let stockDecimals = await stocktoken.methods.decimals().call();
      setCashDecimals(cashDecimals);
      setStockDecimals(stockDecimals);

      const cashbalance = await cashtoken.methods.balanceOf(accounts[0]).call();
      let cashbalanceupdate = await (cashbalance / 10 ** cashDecimals).toFixed(18);

      setmycashbalance(cashbalanceupdate.toString().match(/^-?\d+(?:\.\d{0,3})?/)[0]);
      const pooltokenbalance = await Stock.methods
        .balanceOf(accounts[0])
        .call();
      let pooltokenbalanceupdate = await web3.utils.fromWei(pooltokenbalance);

      setmypoolbalance(pooltokenbalanceupdate);

      const stockbalance = await stocktoken.methods
        .balanceOf(accounts[0])
        .call();
      let stockbalanceupdate = await (stockbalance / 10 ** stockDecimals).toFixed(18);
      setmystockbalance(stockbalanceupdate.toString().match(/^-?\d+(?:\.\d{0,3})?/)[0]);

      let cashvalauationcap = await Stock.methods.cashValauationCap().call();
      let updatedonecashcap = await (cashvalauationcap / 10 ** cashDecimals);
      setdcashValauationCap(updatedonecashcap);

      let geturl = await Stock.methods.url().call();
      seturll(geturl);
      // await setdata({
      //   url: geturl.toString(),
      //   cashcap: cashvalauationcap,
      // });

      const poolTokenTotalSupply = await Stock.methods
        .totalSupply()
        .call()
        .then(function (result) {
          let updatedone = web3.utils.fromWei(result);
          setpooltokenTotalSupply(updatedone);
        });
      const contractStockTokenBalance = await Stock.methods
        .contractStockTokenBalance()
        .call()
        .then(function (result) {
          let updatedone = result / 10 ** stockDecimals;
          setcontractstockTokenBalance(updatedone);
        });
      const contractCashBalance = await Stock.methods
        .contractCashBalance()
        .call()
        .then(function (result) {
          let updatedone = (result / 10 ** cashDecimals).toFixed(18);
          setcontractCashBalance(updatedone.toString().match(/^-?\d+(?:\.\d{0,3})?/)[0]);
        });
      const contractCashValuation = await Stock.methods
        .contractCashValuation()
        .call()
        .then(function (result) {
          let updatedone = result / 10 ** cashDecimals;
          setcontractCashValuation(updatedone);
        });

      const pooltocashupdate = Stock.methods
        .poolToCashRate()
        .call()
        .then(function (result) {
          setpooltocash(result);
        });

      const stocktocashupdate = Stock.methods
        .stockToCashRate()
        .call()
        .then(async function (result) {
          let updatedone = result / 10 ** cashDecimals;
          setstocktocash(updatedone);
        });
      var a = "5000";
      let valueWei = window.web3.utils.toWei(a).toString();

      var b = parseInt(cashDecimals);
      let c, d;
      if (b < 18) {
        d = 18 - b;
        d = 10 ** d;
        valueWei = parseInt(valueWei) / d;
      }
      valueWei = valueWei.toString();
      // console.log(valueWei);
      setdecimalexactvalue(valueWei);

      // console.log(geturl);
      // console.log(poolTokenTotalSupply);
      // console.log(contractStockTokenBalance);
      // console.log(contractCashBalance);
      // // console.log(stockTokenRate);
      // console.log(StockTokenAddress);
      // console.log(StockPoolTokenAddress);

      // const a = await fetch("https://oracleprov.herokuapp.com/get")
      //   .then((response) => response.json())
      //   .then((data) => console.log(data));

      setLoading(false);
    } else {
      window.alert("The Contract not deployed to detected network. Please swith to Smart Chain (BSC)");
      setloading2(true);
    }
  };

  const InfiniteApprovalCash = async () => {
    var a = "1000000";
    let valueWei = window.web3.utils.toWei(a).toString();

    var b = parseInt(cashDecimals);
    let c, d;
    if (b < 18) {
      d = 18 - b;
      d = 10 ** d;
      valueWei = parseInt(valueWei) / d;
    }

    // console.log(valueWei, b, c, d);
    valueWei = valueWei.toString();
    await cashsc.methods
      .approve(Stockliqidatoraddress, valueWei)
      .send({ from: account })
      .once("receipt", async (receipt) => {
        setrefresh(1);
      })
      .on("error", (error) => {
        setrefresh(1);
      });
  };

  const InfiniteApprovalStock = async () => {
    var a = "1000000";
    let valueWei = window.web3.utils.toWei(a).toString();

    var b = parseInt(cashDecimals);
    let c, d;
    if (b < 18) {
      d = 18 - b;
      d = 10 ** d;
      valueWei = parseInt(valueWei) / d;
    }

    // console.log(valueWei, b, c, d);
    valueWei = valueWei.toString();
    await stocktokensc.methods
      .approve(Stockliqidatoraddress, valueWei)
      .send({ from: account })
      .once("receipt", async (receipt) => {
        setrefresh(1);
      })
      .on("error", (error) => {
        setrefresh(1);
      });
  };


  const redeemStockToken = async (a) => {
    let valueWei = window.web3.utils.toWei(a).toString();

    var b = parseInt(cashDecimals);
    let c, d;
    if (b < 18) {
      d = 18 - b;
      d = 10 ** d;
      valueWei = parseInt(valueWei) / d;
    }

    // console.log(valueWei, b, c, d);
    valueWei = valueWei.toString();
    if (parseInt(stockliquidatorStockallowance) >= parseInt(valueWei)) {
    } else {
      await stocktokensc.methods
        .approve(Stockliqidatoraddress, valueWei)
        .send({ from: account })
        .once("receipt", async (receipt) => {
          setLoading(false);
        })
        .on("error", (error) => {
          setrefresh(1);
        });
    }

    await stocksc.methods
      .redeemStockToken(valueWei)
      .send({ from: account })
      .once("receipt", async (receipt) => {
        setLoading(false);
        setrefresh(1);
      })
      .on("error", (error) => {
        setrefresh(1);
      });
  };

  const mintPoolToken = async (a) => {
    let valueWei = window.web3.utils.toWei(a).toString();

    var b = parseInt(cashDecimals);
    let c, d;
    if (b < 18) {
      d = 18 - b;
      d = 10 ** d;
      valueWei = parseInt(valueWei) / d;
    }

    // console.log(valueWei, b, c, d);
    valueWei = valueWei.toString();
    if (parseInt(stockliquidatorCashallowance) >= parseInt(valueWei)) {
    } else {
      await cashsc.methods
        .approve(Stockliqidatoraddress, valueWei)
        .send({ from: account })
        .once("receipt", async (receipt) => {})
        .on("error", (error) => {
          setrefresh(1);
        });
    }

    await stocksc.methods
      .mintPoolToken(valueWei)
      .send({ from: account })
      .once("receipt", async (receipt) => {
        setLoading(false);
        setrefresh(1);
        setrefresh(1);
      })
      .on("error", (error) => {
        setrefresh(1);
      });
  };

  const burnPoolToken = async (a) => {
    let valueWei = window.web3.utils.toWei(a).toString();

    var b = parseInt(cashDecimals);
    let c, d;
    if (b < 18) {
      d = 18 - b;
      d = 10 ** d;
      valueWei = parseInt(valueWei) / 100;
    }

    // console.log(valueWei, b, c, d);
    valueWei = valueWei.toString();
    // console.log(a);
    // console.log(Stockliqidatoraddress);
    if (parseInt(stockliquidatorallowance) >= parseInt(valueWei)) {
    } else {
      await stocksc.methods
        .approve(ContractDetails.stockLiquidatorAddress, valueWei)
        .send({ from: account })
        .once("receipt", async (receipt) => {})
        .on("error", (error) => {
          setrefresh(1);
        });
    }

    await stocksc.methods
      .burnPoolToken(valueWei)
      .send({ from: account })
      .once("receipt", async (receipt) => {
        setLoading(false);
        setrefresh(1);
      })
      .on("error", (error) => {
        setrefresh(1);
      });
  };

  const updateCashValuationCap = async (a) => {
    let valueWei = window.web3.utils.toWei(a).toString();

    var b = parseInt(cashDecimals);
    let c, d;
    if (b < 18) {
      d = 18 - b;
      d = 10 ** d;
      valueWei = parseInt(valueWei) / 100;
    }

    // console.log(valueWei, b, c, d);
    valueWei = valueWei.toString();
    await stocksc.methods
      .updateCashValuationCap(valueWei)
      .send({ from: account })
      .once("receipt", async (receipt) => {
        setLoading(false);
        setrefresh(1);
      })
      .on("error", (error) => {
        setrefresh(1);
      });
  };

  const changeOwner = async (a) => {
    await stocksc.methods
      .changeOwner(a.toString())
      .send({ from: account })
      .once("receipt", async (receipt) => {
        setLoading(false);
        setrefresh(1);
      })
      .on("error", (error) => {
        setrefresh(1);
      });
  };

  const updateurl = async (url) => {
    await stocksc.methods
      .updateURL(url)
      .send({ from: account })
      .once("receipt", async (receipt) => {
        setLoading(false);
        setrefresh(1);
      })
      .on("error", (error) => {
        setrefresh(1);
      });
  };


  useEffect(() => {
    try {
      loadWeb3();
      loadBlockchainData();
    } catch (e) {
      return <div>Helllo</div>;
    }
    if (refresh == 1) {
      setrefresh(0);
      loadBlockchainData();
    }
    //esl
  }, [refresh]);

  if (loading === true) {
    content = (
      <p className="text-center">
        Loading ...
        {loading2 ? <div>load on mainnet </div> : ""}
      </p>
    );
  } else {
    content = (
      <div>
        <Router>
          <Switch>
            <Route
              path="/admin"
              render={() => (
                <Fragment>
                  <Admin
                    redeemStockToken={redeemStockToken}
                    mintPoolToken={mintPoolToken}
                    burnPoolToken={burnPoolToken}
                    updateCashValuationCap={updateCashValuationCap}
                    changeOwner={changeOwner}
                    pooltokenTotalSupply={pooltokenTotalSupply}
                    contractCashBalance={contractCashBalance}
                    contractstockTokenBalance={contractstockTokenBalance}
                    contractCashValuation={contractCashValuation}
                    mycashbalance={mycashbalance}
                    mystockbalance={mystockbalance}
                    mypoolbalance={mypoolbalance}
                    pooltocash={pooltocash}
                    stocktocash={stocktocash}
                    updateurl={updateurl}
                    dcashValauationCap={dcashValauationCap}
                    urlll={urlll}
                    getNetworkEtherscanURL={getNetworkEtherscanURL}
                  />
                </Fragment>
              )}
            />

            <Route
              path="/"
              render={() => (
                <Fragment>
                  <Body
                    redeemStockToken={redeemStockToken}
                    mintPoolToken={mintPoolToken}
                    burnPoolToken={burnPoolToken}
                    updateCashValuationCap={updateCashValuationCap}
                    changeOwner={changeOwner}
                    pooltokenTotalSupply={pooltokenTotalSupply}
                    contractCashBalance={contractCashBalance}
                    contractstockTokenBalance={contractstockTokenBalance}
                    contractCashValuation={contractCashValuation}
                    mycashbalance={mycashbalance}
                    mystockbalance={mystockbalance}
                    mypoolbalance={mypoolbalance}
                    pooltocash={pooltocash}
                    stocktocash={stocktocash}
                    updateurl={updateurl}
                    dcashValauationCap={dcashValauationCap}
                    urlll={urlll}
                    CashSymbol={CashSymbol}
                    InfiniteApprovalCash={InfiniteApprovalCash}
                    stockliquidatorCashallowance={stockliquidatorCashallowance}
                    stockliquidatorStockallowance={
                      stockliquidatorStockallowance
                    }
                    InfiniteApprovalStock={InfiniteApprovalStock}
                    stockliquidatorallowance={stockliquidatorallowance}
                    decimalexactvalue={decimalexactvalue}
                    Stockliqidatoraddress={Stockliqidatoraddress}
                    AssetTokenaddress={AssetTokenaddress}
                    TokenAddress={TokenAddress}
                    getNetwork={getNetwork}
                    getNetworkEtherscanURL={getNetworkEtherscanURL}
                  />
                </Fragment>
              )}
            />
            <Route
              path="*"
              render={() => (
                <Fragment>
                  <Body
                    redeemStockToken={redeemStockToken}
                    mintPoolToken={mintPoolToken}
                    burnPoolToken={burnPoolToken}
                    updateCashValuationCap={updateCashValuationCap}
                    changeOwner={changeOwner}
                    pooltokenTotalSupply={pooltokenTotalSupply}
                    contractCashBalance={contractCashBalance}
                    contractstockTokenBalance={contractstockTokenBalance}
                    contractCashValuation={contractCashValuation}
                    mycashbalance={mycashbalance}
                    mystockbalance={mystockbalance}
                    mypoolbalance={mypoolbalance}
                    pooltocash={pooltocash}
                    stocktocash={stocktocash}
                    dcashValauationCap={dcashValauationCap}
                    urlll={urlll}
                    data={data}
                    CashSymbol={CashSymbol}
                    InfiniteApprovalCash={InfiniteApprovalCash}
                    stockliquidatorCashallowance={stockliquidatorCashallowance}
                    stockliquidatorStockallowance={
                      stockliquidatorStockallowance
                    }
                    InfiniteApprovalStock={InfiniteApprovalStock}
                    stockliquidatorallowance={stockliquidatorallowance}
                    decimalexactvalue={decimalexactvalue}
                    Stockliqidatoraddress={Stockliqidatoraddress}
                    Stockliqidatoraddress={Stockliqidatoraddress}
                    AssetTokenaddress={AssetTokenaddress}
                    TokenAddress={TokenAddress}
                    getNetwork={getNetwork}
                    getNetworkEtherscanURL={getNetworkEtherscanURL}
                  />
                </Fragment>
              )}
            />
          </Switch>
        </Router>
      </div>
    );
  }

  return (
    <div>
      <Navbar account={account} getNetwork={getNetwork} />
      {loading === true ? (
        <p className="text-center">
          {account == "" ? (
            <div>
              {" "}
              Connect your wallet to application{"   "}{" "}
              {/* <div className="asset btn btn-grey-box" onClick={loadWeb3}>
                <span>Connect </span>
              </div>{" "} */}
            </div>
          ) : (
            "Loading ...."
          )}
        </p>
      ) : (
        <div>
          <Router>
            <Switch>
              <Route
                path="/admin"
                render={() => (
                  <Fragment>
                    <Admin
                      redeemStockToken={redeemStockToken}
                      mintPoolToken={mintPoolToken}
                      burnPoolToken={burnPoolToken}
                      updateCashValuationCap={updateCashValuationCap}
                      changeOwner={changeOwner}
                      pooltokenTotalSupply={pooltokenTotalSupply}
                      contractCashBalance={contractCashBalance}
                      contractstockTokenBalance={contractstockTokenBalance}
                      contractCashValuation={contractCashValuation}
                      mycashbalance={mycashbalance}
                      mystockbalance={mystockbalance}
                      mypoolbalance={mypoolbalance}
                      pooltocash={pooltocash}
                      stocktocash={stocktocash}
                      updateurl={updateurl}
                      dcashValauationCap={dcashValauationCap}
                      urlll={urlll}
                      Stockliqidatoraddress={Stockliqidatoraddress}
                      AssetTokenaddress={AssetTokenaddress}
                      TokenAddress={TokenAddress}
                      getNetwork={getNetwork}
                      getNetworkEtherscanURL={getNetworkEtherscanURL}
                    />
                  </Fragment>
                )}
              />

              <Route
                path="/"
                render={() => (
                  <Fragment>
                    <Body
                      redeemStockToken={redeemStockToken}
                      mintPoolToken={mintPoolToken}
                      burnPoolToken={burnPoolToken}
                      updateCashValuationCap={updateCashValuationCap}
                      changeOwner={changeOwner}
                      pooltokenTotalSupply={pooltokenTotalSupply}
                      contractCashBalance={contractCashBalance}
                      contractstockTokenBalance={contractstockTokenBalance}
                      contractCashValuation={contractCashValuation}
                      mycashbalance={mycashbalance}
                      mystockbalance={mystockbalance}
                      mypoolbalance={mypoolbalance}
                      pooltocash={pooltocash}
                      stocktocash={stocktocash}
                      updateurl={updateurl}
                      dcashValauationCap={dcashValauationCap}
                      urlll={urlll}
                      CashSymbol={CashSymbol}
                      InfiniteApprovalCash={InfiniteApprovalCash}
                      stockliquidatorCashallowance={
                        stockliquidatorCashallowance
                      }
                      stockliquidatorStockallowance={
                        stockliquidatorStockallowance
                      }
                      InfiniteApprovalStock={InfiniteApprovalStock}
                      stockliquidatorallowance={stockliquidatorallowance}
                      decimalexactvalue={decimalexactvalue}
                      Stockliqidatoraddress={Stockliqidatoraddress}
                      AssetTokenaddress={AssetTokenaddress}
                      TokenAddress={TokenAddress}
                      getNetwork={getNetwork}
                      getNetworkEtherscanURL={getNetworkEtherscanURL}
                    />
                  </Fragment>
                )}
              />
              <Route
                path="*"
                render={() => (
                  <Fragment>
                    <Body
                      redeemStockToken={redeemStockToken}
                      mintPoolToken={mintPoolToken}
                      burnPoolToken={burnPoolToken}
                      updateCashValuationCap={updateCashValuationCap}
                      changeOwner={changeOwner}
                      pooltokenTotalSupply={pooltokenTotalSupply}
                      contractCashBalance={contractCashBalance}
                      contractstockTokenBalance={contractstockTokenBalance}
                      contractCashValuation={contractCashValuation}
                      mycashbalance={mycashbalance}
                      mystockbalance={mystockbalance}
                      mypoolbalance={mypoolbalance}
                      pooltocash={pooltocash}
                      stocktocash={stocktocash}
                      dcashValauationCap={dcashValauationCap}
                      urlll={urlll}
                      data={data}
                      CashSymbol={CashSymbol}
                      InfiniteApprovalCash={InfiniteApprovalCash}
                      stockliquidatorCashallowance={
                        stockliquidatorCashallowance
                      }
                      stockliquidatorStockallowance={
                        stockliquidatorStockallowance
                      }
                      InfiniteApprovalStock={InfiniteApprovalStock}
                      stockliquidatorallowance={stockliquidatorallowance}
                      decimalexactvalue={decimalexactvalue}
                      Stockliqidatoraddress={Stockliqidatoraddress}
                      AssetTokenaddress={AssetTokenaddress}
                      TokenAddress={TokenAddress}
                      getNetwork={getNetwork}
                      getNetworkEtherscanURL={getNetworkEtherscanURL}
                    />
                  </Fragment>
                )}
              />
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
};

export default App;
