'use client'
import React, { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [buttonText, setButtonText] = useState('Withdraw liquidity');

  const handleButtonClick = () => {
    // Do something when the button below the textboxes is clicked
    console.log('Button below the textboxes clicked!');
    console.log('First Input:', inputValue1);
    console.log('Second Input:', inputValue2);
  };
  const getButtonText = () => {
    return buttonText;
  }
  const handleTopRightButtonClick = () => {
    // Do something when the button on the top right is clicked
    console.log('Top right button clicked!');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', justifyContent: 'center' }}>
      <Head>
        <title>Simple Next.js Page</title>
      </Head>

      <button 
        onClick={handleTopRightButtonClick} 
        style={{ position: 'absolute', top: '10px', right: '10px' }}
      >
        Top Right Button
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
