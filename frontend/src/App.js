import React, { useEffect, useState, Fragment } from "react";
import Web3 from "web3";
import Navbar from "./Navbar";
// const EthereumTx = require("ethereumjs-tx").Transaction;
import Body from "./Body";
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
  useEffect(() => {
    loadWeb3();
    loadBlockchainData();

    //esl
  }, []);
  let content;
  const [loading2, setloading2] = useState(false);

  const [account, setAccount] = useState("");
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

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadBlockchainData = async () => {
    setLoading(true);
    const web3 = window.web3;

    let url = window.location.href;
    console.log(url);

    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    const networkId = await web3.eth.net.getId();

    if (networkId === 42) {
      const contract = new web3.eth.Contract(
        ContractDetails.stockLiquidatorABI
      );
      setContract(contract);

      const Stock = new web3.eth.Contract(
        ContractDetails.stockLiquidatorABI,
        ContractDetails.stockLiquidatorAddress
      );

      const cashtoken = new web3.eth.Contract(
        ContractDetails.ERC20ABI,
        ContractDetails.cashAddress
      );
      setcashsc(cashtoken);
      const stocktoken = new web3.eth.Contract(
        ContractDetails.ERC20ABI,
        ContractDetails.stockTokenAddress
      );
      setstocktokensc(stocktoken);
      // const stockpooltoken = new web3.eth.Contract(
      //   ContractDetails.ERC20ABI,
      //   ContractDetails.stockPoolTokenAddress
      // );
      // setstockpooltokensc(stockpooltoken);
      setstocksc(Stock);

      let cashDecimals = await Stock.methods.cashDecimals().call();
      let stockDecimals = await stocktoken.methods.decimals().call();
      setCashDecimals(cashDecimals);
      setStockDecimals(stockDecimals);

      const cashbalance = await cashtoken.methods.balanceOf(accounts[0]).call();
      let cashbalanceupdate = await (cashbalance / 10 ** cashDecimals);

      setmycashbalance(cashbalanceupdate);
      const pooltokenbalance = await Stock.methods
        .balanceOf(accounts[0])
        .call();
      let pooltokenbalanceupdate = await web3.utils.fromWei(pooltokenbalance);

      setmypoolbalance(pooltokenbalanceupdate);

      const stockbalance = await stocktoken.methods
        .balanceOf(accounts[0])
        .call();
      let stockbalanceupdate = await (stockbalance / 10 ** stockDecimals);
      setmystockbalance(stockbalanceupdate);

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
          let updatedone = result / 10 ** cashDecimals;
          setcontractCashBalance(updatedone);
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
      window.alert("the contract not deployed to detected network.");
      setloading2(true);
    }
  };

  const onsubmitdetails = async (
    cashaddress,
    stockTokenAddress,
    UppercapLimit,
    tokenname,
    tokensymbol,
    URl
  ) => {
    const web3 = window.web3;
    let bytecode = ContractDetails.bytecode;

    const uppercapinwei = UppercapLimit * 10 ** cashDecimals;
    let payload = {
      data: bytecode,
      arguments: [
        cashaddress,
        stockTokenAddress,
        uppercapinwei,
        tokenname,
        tokensymbol,
        URl,
      ],
    };

    let parameter = {
      from: account,
      gas: web3.utils.toHex(800000),
      gasPrice: web3.utils.toHex(web3.utils.toWei("30", "gwei")),
    };
    await contract
      .deploy(payload)
      .send(parameter, (err, transactionHash) => {
        console.log("Transaction Hash :", transactionHash);
      })
      .on("confirmation", () => {})
      .then((newContractInstance) => {
        console.log(
          "Deployed Contract Address : ",
          newContractInstance.options.address
        );
      });
  };

  const redeemStockToken = async (a) => {
    let valueWei = window.web3.utils.toWei(a).toString();

    var b = parseInt(cashDecimals);
    let c, d;
    if (b < 18) {
      d = 18 - b;
      d = 10 ** d;
      valueWei = parseInt(valueWei) / 100;
    }

    console.log(valueWei, b, c, d);
    valueWei = valueWei.toString();
    await stocktokensc.methods
      .approve(ContractDetails.stockLiquidatorAddress, valueWei)
      .send({ from: account })
      .once("receipt", async (receipt) => {
        setLoading(false);
      })
      .on("error", (error) => {
        window.location.reload();
      });

    await stocksc.methods
      .redeemStockToken(valueWei)
      .send({ from: account })
      .once("receipt", async (receipt) => {
        setLoading(false);
        window.location.reload();
      })
      .on("error", (error) => {
        window.location.reload();
      });
  };

  const mintPoolToken = async (a) => {
    let valueWei = window.web3.utils.toWei(a).toString();

    var b = parseInt(cashDecimals);
    let c, d;
    if (b < 18) {
      d = 18 - b;
      d = 10 ** d;
      valueWei = parseInt(valueWei) / 100;
    }

    console.log(valueWei, b, c, d);
    valueWei = valueWei.toString();
    await cashsc.methods
      .approve(ContractDetails.stockLiquidatorAddress, valueWei)
      .send({ from: account })
      .once("receipt", async (receipt) => {})
      .on("error", (error) => {
        window.location.reload();
      });

    await stocksc.methods
      .mintPoolToken(valueWei)
      .send({ from: account })
      .once("receipt", async (receipt) => {
        setLoading(false);
      })
      .on("error", (error) => {
        window.location.reload();
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

    console.log(valueWei, b, c, d);
    valueWei = valueWei.toString();
    console.log(a);
    await stocksc.methods
      .approve(ContractDetails.stockLiquidatorAddress, valueWei)
      .send({ from: account })
      .once("receipt", async (receipt) => {})
      .on("error", (error) => {
        window.location.reload();
      });

    await stocksc.methods
      .burnPoolToken(valueWei)
      .send({ from: account })
      .once("receipt", async (receipt) => {
        setLoading(false);
        window.location.reload();
      })
      .on("error", (error) => {
        window.location.reload();
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

    console.log(valueWei, b, c, d);
    valueWei = valueWei.toString();
    await stocksc.methods
      .updateCashValuationCap(valueWei)
      .send({ from: account })
      .once("receipt", async (receipt) => {
        setLoading(false);
        window.location.reload();
      })
      .on("error", (error) => {
        window.location.reload();
      });
  };

  const changeOwner = async (a) => {
    await stocksc.methods
      .changeOwner(a.toString())
      .send({ from: account })
      .once("receipt", async (receipt) => {
        setLoading(false);
        window.location.reload();
      })
      .on("error", (error) => {
        window.location.reload();
      });
  };

  const updateurl = async (url) => {
    await stocksc.methods
      .updateURL(url)
      .send({ from: account })
      .once("receipt", async (receipt) => {
        setLoading(false);
        window.location.reload();
      })
      .on("error", (error) => {
        window.location.reload();
      });
  };

  if (loading === true) {
    content = (
      <p className="text-center">
        Loading...{loading2 ? <div>load on mainnet </div> : ""}
      </p>
    );
  } else {
    content = (
      <div>
        <Router>
          <Switch>
            <Route
              exact
              path="/deploy"
              render={() => (
                <Fragment>
                  <ContractDeployment onsubmitdetails={onsubmitdetails} />
                </Fragment>
              )}
            />
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
      <Navbar account={account} />
      {content}
    </div>
  );
};

export default App;
