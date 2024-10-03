"use client"

import React, { useState, useEffect, useCallback } from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider, useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton, useWalletModal } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { Connection, clusterApiUrl } from '@solana/web3.js';

// 1. SolanaWalletConnectButton Component
const SolanaWalletConnectButton = ({ onConnect }) => {
  const { connected } = useWallet();
  const { setVisible } = useWalletModal();

  const handleClick = useCallback(() => {
    if (!connected) {
      setVisible(true);
      onConnect();
    }
  }, [connected, setVisible, onConnect]);

  return (
    <WalletMultiButton
      className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      style={{
        background: 'linear-gradient(to bottom, #4A90E2, #3670B2)',
        border: '1px solid #2A5DB0',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
      onClick={handleClick}
    >
      Connect Wallet
    </WalletMultiButton>
  );
};


// 2. ExxNetworkPresale Component
const ExxNetworkPresale = () => {
  const [saleStatus, setSaleStatus] = useState('Pending');
  const [timer, setTimer] = useState('16:47:05');
  const [progress, setProgress] = useState(100);
  const [amount, setAmount] = useState(50);
  const [balance, setBalance] = useState(0);
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();

  const connectToDevnet = useCallback(async () => {
    if (publicKey) {
      try {
        const balance = await connection.getBalance(publicKey);
        setBalance(balance / 1e9); // Convert lamports to SOL
        console.log('Connected to Solana devnet');
      } catch (error) {
        console.error('Error connecting to Solana devnet:', error);
      }
    }
  }, [connection, publicKey]);

  useEffect(() => {
    if (connected && publicKey) {
      connectToDevnet();
    }
  }, [connected, publicKey, connectToDevnet]);

  useEffect(() => {
    const countdown = setInterval(() => {
      // Logic to update timer goes here
      setTimer('16:47:05');
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const handleBuy = () => {
    console.log(`Buying ${amount} tokens`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-2xl font-bold text-blue-900">$ULABS</h1>
          <div className="flex items-center space-x-4">
            <button className="text-blue-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Download Tokenomics
            </button>
            <SolanaWalletConnectButton onConnect={connectToDevnet} />
          </div>
        </header>

        <main className="flex flex-col md:flex-row justify-between items-start space-y-8 md:space-y-0 md:space-x-12">
           <div className="flex-1">
            <h2 className="text-5xl font-bold text-blue-900 mb-4">Be an early bird</h2>
            <p className="text-lg text-blue-800 mb-8">
              It would take some time before official project launch, so you should buy only if you can wait for the launch to trade your coins.
            </p>

            <div className="space-y-4">
              {['Sale Pending', 'Sale Live', 'Sale Completed', '$ULABS Launched'].map((step, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${index === 0 ? 'bg-blue-500' : 'bg-blue-200'}`}></div>
                  <span className={`${index === 0 ? 'text-blue-900 font-semibold' : 'text-blue-700'}`}>
                    {step}
                    {index === 0 && <span className="text-green-500 ml-2">In Progress</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 w-full md:w-96">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-blue-600">Your $ULABS: {balance} USDT</span>
              <div className="flex items-center space-x-2">
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">Pending</span>
              </div>
            </div>

            <div className="mb-6">
              <span className="text-sm text-blue-900 font-medium">Sale Progress</span>
              <div className="w-full bg-blue-100 rounded-full h-2.5 mt-2">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="amount" className="block text-sm font-medium text-blue-900 mb-2">
                Enter amount to buy
              </label>
              <div className="flex">
                <input
                  type="number"
                  id="amount"
                  className="block w-full rounded-l-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  min="30"
                  max="10000"
                />
                <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  .00
                </span>
              </div>
            </div>

            <div className="flex justify-between text-xs text-blue-700 mb-4">
              <span>Min. Buy: 30 USDT</span>
              <span>Max. Buy: 10,000 USDT</span>
            </div>

            <button
              onClick={handleBuy}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
              disabled={!connected}
            >
              {connected ? 'Buy' : 'Connect Wallet to Buy'}
            </button>

            <p className="mt-4 text-xs text-gray-500">
              Disclaimer: The information provided shall not in any way constitute a recommendation as to whether you should invest in any product discussed. We accept no liability for any loss.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

// 3. Main App Component
const App = () => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = clusterApiUrl(network);
  const wallets = [new PhantomWalletAdapter()];

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <ExxNetworkPresale />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;