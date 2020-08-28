// contracts/MyNFT.sol
// SPDX-License-Identifier: MIT

pragma solidity >=0.4.21 <0.7.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract RMB is ERC1155 {
    //共有1角、5角、1元、5元、10元、20元、50元、100元八种面额
    uint256 public constant ONE_HUNDRED = 0;
    uint256 public constant FIFTY = 1;
    uint256 public constant TWENTY = 2;
    uint256 public constant TEN = 3;
    uint256 public constant FIVE = 4;
    uint256 public constant ONE = 5;
    uint256 public constant FIVE_JIAO = 6;
    uint256 public constant ONE_JIAO = 7;


    constructor() public ERC1155("https://game.example/api/item/{1}.json") {
        _mint(msg.sender, ONE_HUNDRED, 10**18, "");
        _mint(msg.sender, FIFTY, 10**27, "");
        _mint(msg.sender, TWENTY, 1, "");
        _mint(msg.sender, TEN, 10**9, "");
        _mint(msg.sender, FIVE, 10**9, "");
        _mint(msg.sender, ONE, 10**9, "");
        _mint(msg.sender, FIVE_JIAO, 10**9, "");
        _mint(msg.sender, ONE_JIAO, 10**9, "");

    }
}