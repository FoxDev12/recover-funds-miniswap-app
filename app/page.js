// Messy af code


'use client'
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { ethers } from 'ethers';
import ERC20ABI from '../ABIs/ERC20Abi.json';
import RouterABI from '../ABIs/RouterAbi.json';
import FactoryABI from '../ABIs/FactoryAbi.json';
export default function Home() {
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [buttonText, setButtonText] = useState('Withdraw liquidity');
  const [TRbuttonText, setTRbuttonText] = useState('Connect to metamask');
  const [provider, setProvider] = useState();
  const [accounts, setAccounts] = useState([]);
  const [pairContract, setPairContract] = useState();
  const [factoryContract, setFactoryContract] = useState();
  const [routerContract, setRouterContract] = useState();
  const [approval, setApproval] = useState(0);
  const handleButtonClick = () => {

  };


  useEffect(() => {
    setRouterContract(new ethers.Contract('0x73F7790344815a0e100eb12DBFd55F0D9dF6D171', RouterABI, provider));
  }, [provider]);

  useEffect(() => {
    if(routerContract === undefined) {
      return;
    }

    // You can't make a useEffect async. Instead, declare an async function inside your effect and then call it.
    // All of the above makes perfect sense ofc
    async function reactIsGreat() {
    console.log(routerContract);
    let factoryAddress = await routerContract.factory();
    console.log("factory", factoryAddress);
    setFactoryContract(new ethers.Contract(factoryAddress, FactoryABI, provider));
  }
  reactIsGreat();
}, [routerContract, accounts]);

  useEffect(() => {
    if(factoryContract === undefined || inputValue1 === '' || inputValue2 === '') {
      return;
    }
    async function reactIsReallyGreat() {
      let pairAddress = await factoryContract.getPair(inputValue1, inputValue2);
      console.log("pair", pairAddress);
      setPairContract(new ethers.Contract(pairAddress, ERC20ABI, provider));
    }
    reactIsReallyGreat();
  }, [factoryContract, inputValue1, inputValue2]);

  useEffect(() => {
    if(pairContract === undefined) {
      return;
    }

    async function reactIsReallyReallyGreat() {
      let appr = await pairContract.allowance(accounts[0], routerContract.address);
      if(appr > await pairContract.balanceOf(accounts[0])) {
        setApproval(1);
      } else {
        setApproval(0);
      }
    }
    reactIsReallyReallyGreat();
  }, [pairContract]);
  useEffect(() => {
    if(approval === 1) {
      setButtonText("Withdraw liquidity");
    }
    else {
      setButtonText("Approve");
    }
  }, [approval]);
  const getButtonText = () => {
    return buttonText;
  }
  const getTRButtonText = () => {
    return TRbuttonText;
  }


  // Handles MM connect
  const handleTopRightButtonClick = async() => {
    try {
      const lprovider = new ethers.BrowserProvider(window.ethereum);
      const laccounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setProvider(lprovider);
      setAccounts(laccounts);
      const network = await lprovider.getNetwork();
      if (network.chainId != 1) {
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x1' }],
                });
            } catch (switchError) {
                if (switchError.code === 4902) {
                    alert('Cannot switch to the Ethereum mainnet.');
                } else {
                    console.error(switchError);
                }
            }
          }
      } catch(error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(accounts);
    if(accounts[0] === undefined) {
      setTRbuttonText("Connect to metamask")
    } else {
    setTRbuttonText("Connected " + accounts[0]);
    }
  }, [accounts]);




  useEffect(() => {
    if(window.ethereum === undefined) {
      console.log("install Metamask")
      setTRbuttonText("ERROR: Install Metamask")
    }
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', justifyContent: 'center' }}>
      <Head>
        <title>Simple Next.js Page</title>
      </Head>

      <button 
        onClick={handleTopRightButtonClick} 
        style={{
          position: 'absolute', 
          top: '10px', 
          right: '10px',
          padding: '10px 20px',
          border: '1px solid black',
          backgroundColor: 'lightgray',
          cursor: 'pointer',
          borderRadius: '10px',
          maxWidth: '250px',     
          maxHeight: '50px',     
          overflow: 'hidden',    
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        }}
      >
        {getTRButtonText()}
      </button>
      <h2 style={{ marginBottom: '20px' }}>Enter token addresses</h2> {}
      <div style={{ marginBottom: '10px' }}>
        <input 
          type="text" 
          placeholder="Enter text in first box" 
          value={inputValue1} 
          onChange={e => setInputValue1(e.target.value)}
          style={{ padding: '10px', marginRight: '10px' }}
        />

        <input 
          type="text" 
          placeholder="Enter text in second box" 
          value={inputValue2} 
          onChange={e => setInputValue2(e.target.value)}
          style={{ padding: '10px' }}
        />
      </div>

      <button 
        onClick={handleButtonClick} 
        style={{
          padding: '10px 20px',
          border: '1px solid black',
          backgroundColor: 'lightgray',
          cursor: 'pointer',
          borderRadius: '10px'
        }}>
        {getButtonText()}
      </button>
    </div>
  );
}
