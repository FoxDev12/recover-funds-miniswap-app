// Messy af code


'use client'
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { ethers } from 'ethers';

export default function Home() {
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [buttonText, setButtonText] = useState('Withdraw liquidity');
  const [TRbuttonText, setTRbuttonText] = useState('Connect to metamask');
  const [provider, setProvider] = useState();
  const [accounts, setAccounts] = useState([]);

  const handleButtonClick = () => {
    // Do something when the button below the textboxes is clicked
    console.log('Button below the textboxes clicked!');
    console.log('First Input:', inputValue1);
    console.log('Second Input:', inputValue2);
  };
  const getButtonText = () => {
    return buttonText;
  }
  const getTRButtonText = () => {
    return TRbuttonText;
  }
  const handleTopRightButtonClick = async() => {
    // Do something when the button on the top right is clicked
    try {
      setProvider(new ethers.BrowserProvider(window.ethereum));
      setAccounts(await window.ethereum.request({ method: 'eth_requestAccounts' }));
    }
    catch(error) {
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
          maxWidth: '250px',      // Set the maximum width
          maxHeight: '50px',     // Set the maximum height
          overflow: 'hidden',    // Hide any excess content
          textOverflow: 'ellipsis', // Display ellipsis if the content is too long
          whiteSpace: 'nowrap'   // Prevent text from wrapping to the next line
        }}
      >
        {getTRButtonText()}
      </button>
      <h2 style={{ marginBottom: '20px' }}>Enter token addresses</h2> {/* <-- This is the title */}
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
