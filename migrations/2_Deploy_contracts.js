const stockLiquiditator = artifacts.require("stockLiquiditator");
const StockPoolToken = artifacts.require("StockPoolToken");
const StockToken = artifacts.require("StockToken");
const UniswapSwapper = artifacts.require("UniswapSwapper");
const mainnetDAIAddress='0x6b175474e89094c44da98b954eedeac495271d0f';

module.exports = function (deployer) {
  deployer.then(async () => {

  await deployer.deploy(UniswapSwapper);
  await deployer.deploy(StockPoolToken);
  await deployer.deploy(StockToken);
  const instancePoolToken = await StockPoolToken.deployed();
  const instanceStockToken = await StockToken.deployed();
  await deployer.deploy(stockLiquiditator,instancePoolToken.address,mainnetDAIAddress,instanceStockToken.address);
  const instanceStockLiquidator = await stockLiquiditator.deployed();
  instancePoolToken.addMinter(instanceStockLiquidator.address);
});
};
