const { assert } = require('chai');
const { contracts_build_directory } = require('../truffle-config');

const TokenFarm = artifacts.require("TokenFarm");
const DaiToken =artifacts.require("DaiToken");
const DappToken=artifacts.require("DappToken");

require('chai')
    .use(require('chai-as-promised'))
    .should()

function tokens(n){
    return web3.utils.toWei(n,'ether');
}    
contract('TokenFarm',([owner,investor])=>{
    let daiToken,dappToken,tokenFarm

    before(async()=>{
        //Load Contracts
        daiToken=await DaiToken.new();
        dappToken=await DappToken.new();
        tokenFarm=await TokenFarm.new(dappToken.address,daiToken.address);

        // Transfer all Dapp Tokens to token farm 
        await dappToken.transfer(tokenFarm.address,tokens('1000000'));
        // Transfer 100 Dai to investor 
        // Meta data is also passed  here which give the payee info 
        await daiToken.transfer(investor,tokens('100'),{from:owner});
        


    })

    describe('Mock DAI deployement',async() =>{
        it('has a name',async() =>{
            const name=await daiToken.name()
            assert.equal(name,'Mock DAI Token')
        })
    })

    describe('Dapp Token  deployement',async() =>{
        it('has a name',async() =>{
           
            const name=await dappToken.name()
            assert.equal(name,'DApp Token')
        })
    })
    describe('Token Form  deployement',async() =>{
        it('has a name',async() =>{
            const name=await tokenFarm.name()
            assert.equal(name,'Dapp TokenFarm')
        })
        it('contract has tokens',async()=>{
            let balance=await dappToken.balanceOf(tokenFarm.address)
            assert.equal(balance.toString(),tokens('1000000'))
        })
    })

    describe('Farming Tokens',async()=>{
        it('to check rewards to investors for staking mDai tokens',async()=>{
            let result 
            //check investor balance before staking
            result=await daiToken.balanceOf(investor);
            assert.equal(result.toString(),tokens('100'),'investor Mock DAI wallet balance correct before staking')
            
            //stake mock DAi tokens
            await daiToken.approve(tokenFarm.address,tokens('100'),{from : investor})
            await tokenFarm.stakeTokens(tokens('100'),{from:investor})
        })

        
  
    })
})
    
      