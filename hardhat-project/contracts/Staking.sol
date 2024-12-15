
// pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// contract StBLS is ERC20 {
//     address public BLS;

//     constructor(address _bls) ERC20("Staked Blume Liquid Staking", "stBLS") {
//         BLS = _bls;
//     }

//     function stake(uint256 amount) external {
//         require(IERC20(BLS).transferFrom(msg.sender, address(this), amount), "Transfer failed");
//         _mint(msg.sender, amount);
//     }

//     function unstake(uint256 amount) external {
//         require(balanceOf(msg.sender) >= amount, "Insufficient stBLS balance");
//         _burn(msg.sender, amount);
//         require(IERC20(BLS).transfer(msg.sender, amount), "Transfer failed");
//     }
// }
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract StBLS is ERC20 {
    using SafeERC20 for IERC20;

    address public BLS;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);

    constructor(address _bls) ERC20("Staked Blume Liquid Staking", "stBLS") {
        BLS = _bls;
    }

    function stake(uint256 amount) external {
        IERC20(BLS).safeTransferFrom(msg.sender, address(this), amount);  // Safe transfer
        _mint(msg.sender, amount);
        emit Staked(msg.sender, amount);  // Emit staking event
    }

    function unstake(uint256 amount) external {
        require(balanceOf(msg.sender) >= amount, "Insufficient stBLS balance");
        _burn(msg.sender, amount);
        IERC20(BLS).safeTransfer(msg.sender, amount);  // Safe transfer
        emit Unstaked(msg.sender, amount);  // Emit unstaking event
    }
}
