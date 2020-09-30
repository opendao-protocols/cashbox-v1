import React, { useEffect, useState, Fragment } from "react";
import Web3 from "web3";
import Navbar from "./Navbar";
// const EthereumTx = require("ethereumjs-tx").Transaction;
import Body from "./Body";
import ContractDetails from "./contracts/ContractDetails.json";
import ContractDeployment from "./ContractDeployment";
import Admin from "./Admin";
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
  const [daisc, setdaisc] = useState();
  const [stocktokensc, setstocktokensc] = useState();
  const [stockpooltokensc, setstockpooltokensc] = useState();

  const [pooltokenTotalSupply, setpooltokenTotalSupply] = useState(0);
  const [contractstockTokenBalance, setcontractstockTokenBalance] = useState(0);
  const [contractDaIBalance, setcontractDaIBalance] = useState(0);
  const [contractDaIValuation, setcontractDaIValuation] = useState(0);
  // const [stockTokenAddress, setstockTokenAddress] = useState("");
  // const [stockPoolTokenAddress, setstockPoolTokenAddress] = useState("");
  const [ddaiValauationCap, setddaiValauationCap] = useState();
  const [urlll, seturll] = useState();
  const [data, setdata] = useState({
    url: "",
    daicap: 0,
  });
  const [mystockbalance, setmystockbalance] = useState(0);
  const [mypoolbalance, setmypoolbalance] = useState(0);
  const [mydaibalance, setmydaibalance] = useState(0);
  const [pooltodai, setpooltodai] = useState(0);
  const [stocktodai, setstocktodai] = useState(0);
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
      const contract = new web3.eth.Contract(ContractDetails.stockLiquidatorABI);
      setContract(contract);

      const Stock = new web3.eth.Contract(
        ContractDetails.stockLiquidatorABI,
        ContractDetails.stockLiquidatorAddress
      );

      const daitoken = new web3.eth.Contract(ContractDetails.ERC20ABI, ContractDetails.daiAddress);
      setdaisc(daitoken);
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

      const daibalance = await daitoken.methods.balanceOf(accounts[0]).call();
      let daibalanceupdate = await web3.utils.fromWei(daibalance);

      setmydaibalance(daibalanceupdate);
      const pooltokenbalance = await Stock.methods
        .balanceOf(accounts[0])
        .call();
      let pooltokenbalanceupdate = await web3.utils.fromWei(pooltokenbalance);

      setmypoolbalance(pooltokenbalanceupdate);

      const stockbalance = await stocktoken.methods
        .balanceOf(accounts[0])
        .call();
      let stockbalanceupdate = await web3.utils.fromWei(stockbalance);
      setmystockbalance(stockbalanceupdate);

      let daivalauationcap = await Stock.methods.daiValauationCap().call();
      let updatedonedaicap = web3.utils.fromWei(daivalauationcap);
      setddaiValauationCap(updatedonedaicap);

      let geturl = await Stock.methods.URL().call();
      console.log(geturl, daivalauationcap);
      seturll(geturl);
      // await setdata({
      //   url: geturl.toString(),
      //   daicap: daivalauationcap,
      // });

      const poolTokenTotalSupply = await Stock.methods
        .poolTokenTotalSupply()
        .call()
        .then(function (result) {
          let updatedone = web3.utils.fromWei(result);
          setpooltokenTotalSupply(updatedone);
        });
      const contractStockTokenBalance = await Stock.methods
        .contractStockTokenBalance()
        .call()
        .then(function (result) {
          let updatedone = web3.utils.fromWei(result);
          setcontractstockTokenBalance(updatedone);
        });
      const contractDAIBalance = await Stock.methods
        .contractDAIBalance()
        .call()
        .then(function (result) {
          let updatedone = web3.utils.fromWei(result);
          setcontractDaIBalance(updatedone);
        });
      const contractDAIValuation = await Stock.methods
        .contractDAIValuation()
        .call()
        .then(function (result) {
          let updatedone = web3.utils.fromWei(result);
          setcontractDaIValuation(updatedone);
        });

      // const stockTokenRate = Stock.methods.stockTokenRate().call();
      // const StockTokenAddress = Stock.methods
      //   .StockTokenAddress()
      //   .call()
      //   .then(function (result) {
      //     setstockTokenAddress(result);
      //   });
      // const StockPoolTokenAddress = Stock.methods
      //   .StockPoolTokenAddress()
      //   .call()
      //   .then(function (result) {
      //     setstockPoolTokenAddress(result);
      //   });

      const pooltodaiupdate = Stock.methods
        .PooltoDAI_rate()
        .call()
        .then(function (result) {
          setpooltodai(result);
        });

      const stocktodaiupdate = Stock.methods
        .StocktoDAI_rate()
        .call()
        .then(function (result) {
          let updatedone = web3.utils.fromWei(result);
          setstocktodai(updatedone);
        });

      // console.log(geturl);
      // console.log(poolTokenTotalSupply);
      // console.log(contractStockTokenBalance);
      // console.log(contractDAIBalance);
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
    daiaddress,
    stockTokenAddress,
    UppercapLimit,
    tokenname,
    tokensymbol,
    URl
  ) => {
    const web3 = window.web3;
    let bytecode = ContractDetails.bytecode;

    const uppercapinwei = window.web3.utils.toWei(UppercapLimit.toString());
    console.log(uppercapinwei);
    let payload = {
      data: bytecode,
      arguments: [
        daiaddress,
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
    let valueWei = window.web3.utils.toWei(a.toString());
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
    let valueWei = window.web3.utils.toWei(a.toString());
    await daisc.methods
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
    let valueWei = window.web3.utils.toWei(a.toString());
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

  const updateDAIValuationCap = async (a) => {
    let valueWei = window.web3.utils.toWei(a.toString());
    await stocksc.methods
      .updateDAIValuationCap(valueWei)
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
                    updateDAIValuationCap={updateDAIValuationCap}
                    changeOwner={changeOwner}
                    pooltokenTotalSupply={pooltokenTotalSupply}
                    contractDaIBalance={contractDaIBalance}
                    contractstockTokenBalance={contractstockTokenBalance}
                    contractDaIValuation={contractDaIValuation}
                    mydaibalance={mydaibalance}
                    mystockbalance={mystockbalance}
                    mypoolbalance={mypoolbalance}
                    pooltodai={pooltodai}
                    stocktodai={stocktodai}
                    updateurl={updateurl}
                    ddaiValauationCap={ddaiValauationCap}
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
                    updateDAIValuationCap={updateDAIValuationCap}
                    changeOwner={changeOwner}
                    pooltokenTotalSupply={pooltokenTotalSupply}
                    contractDaIBalance={contractDaIBalance}
                    contractstockTokenBalance={contractstockTokenBalance}
                    contractDaIValuation={contractDaIValuation}
                    mydaibalance={mydaibalance}
                    mystockbalance={mystockbalance}
                    mypoolbalance={mypoolbalance}
                    pooltodai={pooltodai}
                    stocktodai={stocktodai}
                    updateurl={updateurl}
                    ddaiValauationCap={ddaiValauationCap}
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
                    updateDAIValuationCap={updateDAIValuationCap}
                    changeOwner={changeOwner}
                    pooltokenTotalSupply={pooltokenTotalSupply}
                    contractDaIBalance={contractDaIBalance}
                    contractstockTokenBalance={contractstockTokenBalance}
                    contractDaIValuation={contractDaIValuation}
                    mydaibalance={mydaibalance}
                    mystockbalance={mystockbalance}
                    mypoolbalance={mypoolbalance}
                    pooltodai={pooltodai}
                    stocktodai={stocktodai}
                    ddaiValauationCap={ddaiValauationCap}
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
