pragma solidity >=0.4.21 <0.6.0;
import "./DappToken.sol";
import "./DaiToken.sol";

contract TokenFarm{
    string  public name = "Dapp TokenFarm";
    DappToken public dappToken;
    DaiToken public daiToken;
    address  public owner;
    address[] public stakers;
    mapping(address=>uint) public stakingBalance;
    mapping(address=>bool) public hasStaked;
    mapping(address=>bool) public isStaking;
    

    constructor(DappToken _dappToken,DaiToken _daiToken) public {
        dappToken=_dappToken;
        daiToken=_daiToken;
        owner=msg.sender;
    }

    // Stakes Tokens i.e. Deposit
    function stakeTokens(uint _amount) public{
        // Transfers mock dai Tokens to this contract for stacking
        require(_amount>0,'amount cannot be 0');
        daiToken.transferFrom(msg.sender, address(this), _amount);
        //Update staking balance 
        stakingBalance[msg.sender]+= _amount;
        
        //Add user to stakers group  if not already present 
        if(!hasStaked[msg.sender]){
            stakers.push(msg.sender);
        }
        // Update staking status 
        hasStaked[msg.sender]=true;
        isStaking[msg.sender]=true;

    }


    // Unstaking Tokens i.e. Withdraw




    // Issuing Tokens
    function issueToken() public{
        require(msg.sender == owner,"caller must be owner");
        //Looping to issue tokens to each issuer
        for(uint i=0;i<stakers.length;i++){
            address recipient = stakers[i];
            uint balance=stakingBalance[recipient];
            if(balance>0){
                dappToken.transfer(recipient,balance);
            }
        }
    }

}