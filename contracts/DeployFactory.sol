pragma solidity 0.5.12;

import "./StockLiquidator.sol";

contract DeployFactory {
    event CashBoxAdded(
        address indexed cashBoxAddress,
        address indexed cashBoxOwner,
        address indexed assetTokenAddress,
        address cashTokenAddress,
        string url
    );

    address[] public cashBoxes;

    function createCashBox(
        address cashTokenAddress,
        address assetTokenAddress,
        uint256 assetToCashRate,
        uint256 cashCap,
        string memory name,
        string memory symbol,
        string memory url
    ) public returns (address newCashBox) {
        StockLiquiditator cashBox = new StockLiquiditator(
            cashTokenAddress,
            assetTokenAddress,
            assetToCashRate,
            cashCap,
            name,
            symbol,
            url
        );
        cashBox.changeOwner(msg.sender);

        cashBoxes.push(address(cashBox));
        emit CashBoxAdded(
            address(cashBox),
            msg.sender,
            assetTokenAddress,
            cashTokenAddress,
            url
        );
        return address(cashBox);
    }

    function getAllCashBoxes() public view returns (address[] memory) {
        return cashBoxes;
    }

    function getCashBoxesByUser(address account)
        external
        view
        returns (address[] memory)
    {
        uint256 len = cashBoxes.length;
        address[] memory cashBoxesByUser = new address[](len);
        uint256 index = 0;

        for (uint256 i = 0; i < len; i++) {
            address payable cashBoxAddress = address(uint160(cashBoxes[i]));
            StockLiquiditator cashbox = StockLiquiditator(cashBoxAddress);

            if (cashbox.owner() == account) {
                cashBoxesByUser[index] = cashBoxes[i];
                index++;
            }
        }

        // to remove zero addresses from the result
        address[] memory result = new address[](index);
        for (uint256 i = 0; i < result.length; i++) {
            result[i] = cashBoxesByUser[i];
        }

        return result;
    }
}
