// contracts/MyNFT.sol
// SPDX-License-Identifier: MIT

pragma solidity >=0.4.21 <0.7.0;

import "./ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/EnumerableSet.sol";

contract RMB is ERC1155, AccessControl {

    // Add the library methods
    using EnumerableSet for EnumerableSet.UintSet;

    // 保存已经产生的人民币冠字号，不能重复创建
    EnumerableSet.UintSet IdsSet;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    // 初始发行量, 每一个rmb都是非同质化代币，又不可以复制，所以发行量为1
    uint256 constant CIRCULATION = 1;


    constructor() public ERC1155("https://game.example/api/item/{1}.json") {
        // Grant the contract deployer the default admin role: it will be able
        // to grant and revoke any roles
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, _msgSender());
    }

    modifier onlyMintNewOne(uint256 id)  {
        require(hasRole(MINTER_ROLE, _msgSender()), "RMB: must have minter role to mint");
        checkDuplicatedID(id);
        _;
    }
    function checkDuplicatedID(uint256 id) view internal {
        require(!IdsSet.contains(id), "RMB: id is duplicated");

    }
    /**
     * @dev Creates `amount` new tokens for `to`, of token type `id`.
     *
     * See {ERC1155-_mint}.
     *
     * Requirements:
     *
     * - the caller must have the `MINTER_ROLE`.
     */
    function mint(address to, uint256 id) public virtual onlyMintNewOne(id) {
        IdsSet.add(id);
        _mint(to, id, CIRCULATION, "0x0");
    }

    function mintBatch(address to, uint256[] memory ids) public virtual {
        uint256[] memory amounts = new uint256[](ids.length);
        for (uint i = 0; i < ids.length; i++) {
            checkDuplicatedID(ids[i]);
            IdsSet.add(ids[i]);
            amounts[i] = CIRCULATION;
        }
        _mintBatch(to, ids, amounts, "0x0");
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 id
    )
    public
    {
        super.safeTransferFrom(from, to, id, CIRCULATION, "0x0");
    }

    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids
    )
    public
    {
        uint256[] memory amounts = new uint256[](ids.length);
        for (uint i = 0; i < ids.length; i++) {
            amounts[i] = CIRCULATION;
        }
        super.safeBatchTransferFrom(from, to, ids, amounts, "0x0");

    }
}