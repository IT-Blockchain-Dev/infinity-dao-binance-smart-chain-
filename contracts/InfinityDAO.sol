// SPDX-License-Identifier: MIT
pragma solidity ^0.7.5;

import "./TWAPOracleUpdater.sol";
import "hardhat/console.sol";
import "./IBEP20.sol";


contract InfinityDAO is TWAPOracleUpdater {
    using SafeMath for uint256;
    address[] public nonCirculatingAddresses;
    bool public _tradeEnabled = false;
    address public busdaddress;
    // address public liquidityAddress = address(0x2Fe20Cb1451c9B195A003B98bDD5Df361d467D52);
    address public liquidityAddress = address(0x811E29C7f306f08180D3d48FB04095578CD79E10);

    event TradeEnabled(uint256 timestamp, bool enabled);

    constructor(address busd) TWAPOracleUpdater("Infinity DAO", "INF", 9) {
        busdaddress = busd;
    }

    function mint(address account_, uint256 amount_) external onlyMinter() {
        _mint(account_, amount_);
    }

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) public virtual override returns (bool) {

        console.log("here is I want");
        console.log(owner());

        if(sender != owner() && recipient != owner())
        {
            console.log("really want");
            require(_tradeEnabled, "Trade is not yet open.");    
        }
        
        this.tax(sender, recipient, amount, busdaddress);
        _transfer(sender, recipient, amount);
        
        return true;
    }

    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _transfer(msg.sender, recipient, amount);
        return true;
    }

    /**
     * @dev Destroys `amount` tokens from the caller.
     *
     * See {ERC20-_burn}.
     */
    function burn(uint256 amount_) external virtual {
        _burn(msg.sender, amount_);
    }

    /*
     * @dev Destroys `amount` tokens from `account`, deducting from the caller's
     * allowance.
     *
     * See {ERC20-_burn} and {ERC20-allowance}.
     *
     * Requirements:
     *
     * - the caller must have allowance for ``accounts``'s tokens of at least
     * `amount`.
     */
    function burnFrom(address account_, uint256 amount_) external virtual {
        _burnFrom(account_, amount_);
    }

    function _burnFrom(address account_, uint256 amount_) internal virtual {
        uint256 decreasedAllowance =
            allowance(account_, msg.sender).sub(amount_, "ERC20: burn amount exceeds allowance");

        _approve(account_, msg.sender, decreasedAllowance);
        _burn(account_, amount_);
    }

    function circulatingSupply() external view returns (uint256) {
        uint256 circulating = totalSupply().sub(_nonCirculatingSupply());

        return circulating;
    }

    function getNonCirculatingSupply() public view returns (uint256) {
        return _nonCirculatingSupply();
    }

    function _nonCirculatingSupply() internal view returns (uint256) {
        uint256 nonCirculatingInf;

        for (uint256 i = 0; i < nonCirculatingAddresses.length; i = i.add(1)) {
            nonCirculatingInf = nonCirculatingInf.add(balanceOf(nonCirculatingAddresses[i]));
        }

        return nonCirculatingInf;
    }

    function setNonCirculatingAddresses(address[] calldata nonCirculatingAddresses_)
        external
        onlyOwner()
        returns (bool)
    {
        nonCirculatingAddresses = nonCirculatingAddresses_;

        return true;
    }

    

    function presale(uint256 amount, address busdAddressClone) public {
                
        uint256 balance = this.balanceOf(msg.sender);
        console.log("amount", amount);
        require((30*(10 ** 9)-balance) > amount * (10**9), "Your INF exceed 30");
        
        _mint(msg.sender, amount*(10**9));
        
        console.log("balance", IBEP20(busdAddressClone).balanceOf(msg.sender));
        
        require(IBEP20(busdAddressClone).balanceOf(msg.sender) > amount*50*(10**18), "Your BUSD exceed allowance");
        IBEP20(busdAddressClone).transferFrom(msg.sender, liquidityAddress, amount*50*(10**18));
    }

    function tax(address sender, address recipient, uint256 amount, address busdAddressClone) public {
                
        uint256 balance = this.balanceOf(sender);
        console.log("tax");
        console.log("balance", balance);
        console.log("balance", amount);
        require(balance > amount * (10**9), "Your amount exceeds your balance");
       
        this.transferFrom(sender, recipient, amount * (10**9));  

        require(IBEP20(busdAddressClone).balanceOf(recipient) > amount*50*(10**18), "Your USDT exceed allowance");
        
        IBEP20(busdAddressClone).transferFrom(recipient, sender, amount*50*(10**18)*97/100);
        IBEP20(busdAddressClone).transferFrom(recipient, liquidityAddress, amount*50*(10**18)*3/100);
        // IBEP20(busdAddressClone).transferFrom(msg.sender, liquidityAddress, amount*50*(10**18)/100*3);
        
    }

    function tradeEnabled() public onlyOwner 
    {
        _tradeEnabled = true;
        emit TradeEnabled(block.timestamp, true);
    }  

}
 