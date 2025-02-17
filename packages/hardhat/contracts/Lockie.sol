// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

import "contracts/IERC20.sol";
import "@openzeppelin/contracts@3.1.0/access/Ownable.sol";
import "./ILendingPool.sol";

contract Lockie is Ownable {
    address public moola = 0x970b12522CA9b4054807a2c5B736149a5BE6f670; //moola lending pool
    address public cusdAddress = 0x765DE816845861e75A25fCA122bb6898B8B1282a; //cUSD
    address public mcusdAddress = 0x918146359264C492BD6934071c6Bd31C854EDBc3; //interest token

    struct Save {
        address owner;
        uint256 amount;
        string rate;
        uint256 createdAt;
    }

    //tracks all user's succesful savings
    mapping(address => Save[]) public savings;

    //tracks all users account balance
    mapping(address => uint) public balances;

    event Saved(
        address indexed owner,
        uint256 amount,
        string indexed rate,
        uint256 indexed createdAt
    );

    event Withdrawn(address indexed owner, uint256 amount, uint256 createdAt);

    function deposit(uint256 _amount, string calldata _rate) external {
        require(_amount > 0, "Invalid values");
        
        //calculate charge
        uint256 balanceAfterCharge = _amount -
                deductCharge(_amount);

        //get the fund
        IERC20(cusdAddress).transferFrom(msg.sender, address(this), _amount);

        //approve Moola 
        IERC20(cusdAddress).approve(moola, balanceAfterCharge);

        //lend balance on Moola onbehalf of the user
        ILendingPool(moola).deposit(
            cusdAddress,
            balanceAfterCharge,
            msg.sender,
            0
        );

        //save details
        savings[msg.sender].push(Save({
            owner: msg.sender,
            amount: balanceAfterCharge,
            rate: _rate,
            createdAt: block.timestamp
        }));

        //update balance record
        balances[msg.sender] += balanceAfterCharge;

        emit  Saved(msg.sender, balanceAfterCharge, _rate, block.timestamp);
        
    }
    
    function deductCharge(uint256 _amount) internal pure returns (uint256) {
        uint256 fee = _amount / 100; // 1%

        return fee;
    }

    //get rate for calculating APY
    function getRate() external view returns (DataTypes.ReserveData memory){
        DataTypes.ReserveData memory state = ILendingPool(moola).getReserveData(cusdAddress);
        return  state;
    }

    function getSavingsBal(address _user) external view returns (uint256 bal) {
        return balances[_user];
    }

    // function withdraw (uint256 _amount) external{
    //     uint interestBal = IERC20(mcusdAddress).balanceOf(msg.sender);

    //     require(_amount <= interestBal, "Insufficient balance");

    //     //withdraw saver's earnings
    //     ILendingPool(moola).withdraw(
    //         cusdAddress,
    //         _amount,
    //         msg.sender
    //     );

    //     balances[msg.sender] -= _amount;

    //     emit Withdrawn(msg.sender, _amount, block.timestamp);
    // }

    function getSavings(address _owner)
        external
        view
        returns (Save[] memory)
    {
        return savings[_owner];
    }

    //recover service charge
    function withdrawCharges () external onlyOwner {
        IERC20(cusdAddress).transfer(owner(), IERC20(cusdAddress).balanceOf(address(this)));
    }
}
