import React, {useState,useEffect} from 'react';
import Web3 from 'web3'
import DaiToken from '../abis/DaiToken.json'
import DappToken from '../abis/DappToken.json'
import TokenFarm from '../abis/TokenFarm.json'
import Navbar from './Navbar'
import './App.css'


function App(){
  /* eslint-disable */
  const [account,setAccount] = useState()
  const [daiToken,setDai] = useState()
  const [dappToken,setDapp] = useState()
  const [tokenFarm,setTokenFarm] = useState()
  const [daiTokenBalance,setDaiTokenBalance] = useState(0)
  const [dappTokenBalance,setDappTokenBalance] = useState(0)
  const [loading,setloading] = useState(true)

  
  useEffect(async ()=>{
    await loadWeb3()
    await loadBlockchainData()
  },[account])
  async function loadBlockchainData(){
    const web3 = window.web3
    const accounts= await web3.eth.getAccounts()
    setAccount(accounts[0])
    const networkId = await web3.eth.net.getId()
    // Load daiToken
    const daiTokenData = DaiToken.networks[networkId]
    if(daiTokenData) {
     
      const daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address)
      setDai(daiToken)

      if(account){
        let daiTokenBalance = await daiToken.methods.balanceOf(account).call()
      }
      setDaiTokenBalance(daiTokenBalance.toString())
    } else {
      window.alert('DaiToken contract not deployed to detected network.')
    }


    //Load dappToken
    const dappTokenData=DappToken.networks[networkId]
    if(dappTokenData){
      const dappToken = new web3.eth.Contract(DappToken.abi,dappTokenData.address)
      setDapp(dappToken)
      if(account){
      let dappTokenBalance=await dappToken.methods.balanceOf(account).call()
      }
      setDappTokenBalance(dappTokenBalance)
    }else{
      window.alert('Dapp Token contract not deployed to detected network')
    }
    

    //Load TokenFarm
    const tokenFarmData=DappToken.networks[networkId]
    if(tokenFarmData){
      const tokenFarm  = new web3.eth.Contract(TokenFarm.abi,tokenFarmData.address)
      setDapp(tokenFarm)
      if(account){
      let stakingBalance=await tokenFarm.methods.stakingBalance(account).call()
      }
      setTokenFarmBalance(stakingBalance)
    }else{
      window.alert('TokenFarm  contract not deployed to detected network')
    }
    setloading(false)
  }

  async function loadWeb3() {
    if(window.ethereum){
      window.web3=new Web3(window.ethereum)
      await window.ethereum.enable() 
      
    }
    else if(window.web3){
      
      window.web3=new Web3(window.web3.currentProvider)
    }
    else{
      window.alert('Non-ethereum browser detected. You should consider trying Metamask!')
    }
  }


  return (
    <div>
      <Navbar account={account} />
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
            <div className="content mr-auto ml-auto">
           

              <h1>Hello,World</h1>

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
    
 

export default App;
