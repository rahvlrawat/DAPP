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
  })
  async function loadBlockchainData(){
    
    const web3 = window.web3
    const accounts= await web3.eth.getAccounts()
    const netId=await web3.eth.net.getId()
    console.log(netId)
    
    // Load daiToken
    const daiTokenData=DaiToken.networks[netId]
    if(daiTokenData){
      const daiToken = new web3.eth.Contract(DaiToken.abi,daiTokenData.address)
      setDai(daiToken)
      let daiTokenBalance=await daiToken.methods.balanceOf(account).call()
      setDaiTokenBalance(daiTokenBalance)
    }else{
      window.alert('Dai Token contract not deployed to detected network')
    }

    //Load dappToken
    const dappTokenData=DappToken.networks[netId]
    if(dappTokenData){
      const dappToken = new web3.eth.Contract(DappToken.abi,dappTokenData.address)
      setDapp(dappToken)
      let dappTokenBalance=await dappToken.methods.balanceOf(account).call()
      setDappTokenBalance(dappTokenBalance)
    }else{
      window.alert('Dapp Token contract not deployed to detected network')
    }
    

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
           

              <h1>DApp</h1>

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
    
 

export default App;
