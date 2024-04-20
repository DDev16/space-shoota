// web3modalConfig.js
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react'

const projectId = '51579e0bfc307e47bf2c53f47a6a394c';

const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com',
};


const polygon = {
  chainId: 137,
  name: 'Polygon',
  currency: 'MATIC',
  explorerUrl: 'https://polygonscan.com',
  rpcUrl: 'https://polygon-rpc.com',
};

const rinkeby = {
  chainId: 4,
  name: 'Rinkeby',
  currency: 'ETH',
  explorerUrl: 'https://rinkeby.etherscan.io',
  rpcUrl: 'https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID',
};

const mumbai = {
  chainId: 80001,
  name: 'Mumbai',
  currency: 'MATIC',
  explorerUrl: 'https://mumbai.polygonscan.com',
  rpcUrl: 'https://polygon-mumbai-bor-rpc.publicnode.com',
};

const localhost = {
  chainId: 31337,
  name: 'Localhost',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'http://localhost:8545',
};

const songbird = {
  name: "Songbird",
  currency: "SGB",
  explorerUrl: "https://explorer-api.songbird.network",
  rpcUrl: "https://songbird-api.flare.network/ext/bc/C/rpc",
  chainId: 19
};
// Add more chains as needed

const metadata = {
  name: 'Trucking Empire',
  description: 'Fractionlized NFTs for Trucking Logistics',
  url: 'https://trucking-empire.vercel.app/',
  icons: ['https://avatars.mywebsite.com/'],
};

const Web3Modal = createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet, polygon, rinkeby, songbird, mumbai, localhost],
  projectId,
  enableAnalytics: true,
  enableEmail: true,
  enableOnramp: true, // Optional - false as default

  themeMode: 'dark', // Override theme mode here
  themeVariables: {
    '--w3m-font-family': 'Arial, sans-serif',
    '--w3m-accent': 'black', // Dark orange, almost red accent color
    '--w3m-color-mix': 'black',
    '--w3m-color-mix-strength': 40,
    '--w3m-font-size-master': '12px',
    '--w3m-border-radius-master': '0px',
    '--w3m-z-index': 1000,
  },
  chainImages: {
    1: 'https://png.pngtree.com/png-vector/20210427/ourmid/pngtree-ethereum-cryptocurrency-coin-icon-png-image_3246438.jpg',
   
    4: 'https://image.pngaaa.com/929/3148929-middle.png',
    137: 'https://altcoinsbox.com/wp-content/uploads/2023/03/matic-logo.webp',
    19: 'https://www.tbstat.com/wp/uploads/2023/10/SGB_512x512.png',
    80001: 'https://altcoinsbox.com/wp-content/uploads/2023/03/matic-logo.webp',
    31337: 'https://cdn.iconscout.com/icon/free/png-256/ethereum-1-283135.png',
  }
  
  
});

export default Web3Modal;
