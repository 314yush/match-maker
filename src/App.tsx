/// <reference types="vite/client" />

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PrivyProvider } from '@privy-io/react-auth';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Frame } from '@farcaster/frame-sdk';
import React, { useEffect } from 'react';
import Game from './components/Game';
import Navbar from './components/Navbar';
import Leaderboard from './components/Leaderboard';
import Airdrop from './components/Airdrop';
import { GameProvider } from './context/GameContext';
import './App.css';

// Create wagmi config
const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http()
  }
});

// Create a client for React Query
const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    // Initialize Farcaster Frame metadata
    const frame = new Frame({
      buttons: [
        {
          label: "Play Game",
          action: "post"
        },
        {
          label: "View Leaderboard",
          action: "post"
        }
      ],
      image: "https://match-maker-lemon.vercel.app/og-image.png",
      post_url: "https://match-maker-lemon.vercel.app/api/frame",
      input: {
        text: "Enter your username"
      }
    });

    // Add metadata to document head
    const metaElement = frame.toMetaElement();
    document.head.appendChild(metaElement);

    return () => {
      document.head.removeChild(metaElement);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <PrivyProvider
          appId={import.meta.env.VITE_PRIVY_APP_ID}
          config={{
            loginMethods: ['farcaster','email','wallet'],
            defaultChain: {
              id: 8453,  // Base Mainnet
              name: 'Base',
              network: 'base',
              rpcUrls: {
                default: {
                  http: ['https://mainnet.base.org']
                }
              },
              nativeCurrency: {
                name: 'Ethereum',
                symbol: 'ETH',
                decimals: 18
              }
            },
            appearance: {
              theme: 'light',
              accentColor: '#FF8B8B',
              showWalletLoginFirst: false,
              walletList: ['rabby_wallet','detected_wallets','wallet_connect'],
            }
          }}
        >
          <GameProvider>
            <Router>
              <Navbar />
              <Routes>
                <Route path="/" element={<Game />} />
                <Route path="/play" element={<Game />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/airdrop" element={<Airdrop />} />
              </Routes>
            </Router>
          </GameProvider>
        </PrivyProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}

export default App; 