import "./App.css";
import pepe from "../public/img/pepe.png";
import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

// Import the contract ABI
import AirdropContractABI from "../AirdropContractABI.json";


const provider = new ethers.providers.Web3Provider(window.ethereum);

// Contract address
const contractAddress = "0x2ca08c5Bc11449c7Bd07Cb9Ce4A66632Db34d977";

// // Contract ABI - replace with the actual ABI of your deployed contract
// const contractABI = [
//   [
//     {
//       "inputs": [],
//       "stateMutability": "nonpayable",
//       "type": "constructor"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "owner",
//           "type": "address"
//         },
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "spender",
//           "type": "address"
//         },
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "value",
//           "type": "uint256"
//         }
//       ],
//       "name": "Approval",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "previousOwner",
//           "type": "address"
//         },
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "newOwner",
//           "type": "address"
//         }
//       ],
//       "name": "OwnershipTransferred",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "from",
//           "type": "address"
//         },
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "to",
//           "type": "address"
//         },
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "value",
//           "type": "uint256"
//         }
//       ],
//       "name": "Transfer",
//       "type": "event"
//     },
//     {
//       "inputs": [],
//       "name": "airdropAllocation",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "airdropClaimAmount",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "airdropClaimed",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "airdropFirstPhasePercentage",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "airdropSecondPhasePercentage",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "owner",
//           "type": "address"
//         },
//         {
//           "internalType": "address",
//           "name": "spender",
//           "type": "address"
//         }
//       ],
//       "name": "allowance",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "spender",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "amount",
//           "type": "uint256"
//         }
//       ],
//       "name": "approve",
//       "outputs": [
//         {
//           "internalType": "bool",
//           "name": "",
//           "type": "bool"
//         }
//       ],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "account",
//           "type": "address"
//         }
//       ],
//       "name": "balanceOf",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "amount",
//           "type": "uint256"
//         }
//       ],
//       "name": "burn",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "account",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "amount",
//           "type": "uint256"
//         }
//       ],
//       "name": "burnFrom",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "claimAirdrop",
//       "outputs": [],
//       "stateMutability": "payable",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "closeFirstPhase",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "collectedBNB",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "collectionAddress",
//       "outputs": [
//         {
//           "internalType": "address payable",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "decimals",
//       "outputs": [
//         {
//           "internalType": "uint8",
//           "name": "",
//           "type": "uint8"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "spender",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "subtractedValue",
//           "type": "uint256"
//         }
//       ],
//       "name": "decreaseAllowance",
//       "outputs": [
//         {
//           "internalType": "bool",
//           "name": "",
//           "type": "bool"
//         }
//       ],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "spender",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "addedValue",
//           "type": "uint256"
//         }
//       ],
//       "name": "increaseAllowance",
//       "outputs": [
//         {
//           "internalType": "bool",
//           "name": "",
//           "type": "bool"
//         }
//       ],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "name",
//       "outputs": [
//         {
//           "internalType": "string",
//           "name": "",
//           "type": "string"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "owner",
//       "outputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "renounceOwnership",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "price",
//           "type": "uint256"
//         }
//       ],
//       "name": "setAirdropClaimPrice",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "price",
//           "type": "uint256"
//         }
//       ],
//       "name": "startSecondPhase",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "symbol",
//       "outputs": [
//         {
//           "internalType": "string",
//           "name": "",
//           "type": "string"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "tokenDecimals",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "totalSupply",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "pure",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "recipient",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "amount",
//           "type": "uint256"
//         }
//       ],
//       "name": "transfer",
//       "outputs": [
//         {
//           "internalType": "bool",
//           "name": "",
//           "type": "bool"
//         }
//       ],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "sender",
//           "type": "address"
//         },
//         {
//           "internalType": "address",
//           "name": "recipient",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "amount",
//           "type": "uint256"
//         }
//       ],
//       "name": "transferFrom",
//       "outputs": [
//         {
//           "internalType": "bool",
//           "name": "",
//           "type": "bool"
//         }
//       ],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "newOwner",
//           "type": "address"
//         }
//       ],
//       "name": "transferOwnership",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     }
//   ]
  
// ];

const signer = provider.getSigner();



// Create an instance of the contract
const contract = new ethers.Contract(contractAddress, AirdropContractABI, signer);
function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [airdropContract, setAirdropContract] = useState(null);

  const connectWallet = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((result) => {
          accountChanged(result[0]);
        })
        .catch((error) => {
          console.error(error);
          setErrorMessage('Failed to connect to the wallet.');
        });
    } else {
      setErrorMessage('Please install Metamask to connect.');
    }
  };

  const accountChanged = (accountName) => {
    setDefaultAccount(accountName);
    setIsConnected(true);
  };

  const claimAirdrop = async () => {
    try {
      // Prepare the transaction parameters
      const price = ethers.utils.parseEther('0.003');
      const transactionParameters = {
        value: price
      };

      // Call the claimAirdrop method
      const transaction = await contract.claimAirdrop(transactionParameters);

      // Wait for the transaction to be mined
      await transaction.wait();

      console.log('Airdrop claimed successfully!');
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to claim the airdrop.');
    }
  };

  useEffect(() => {
    if (isConnected) {
      // Perform any actions or fetch data you need when the wallet is connected
      console.log('Wallet connected');
    } else {
      // Perform any actions or cleanup when the wallet is disconnected
      console.log('Wallet disconnected');
      setAirdropContract(null);
    }
  }, [isConnected]);

  useEffect(() => {
    if (defaultAccount) {
      // Perform any actions or fetch data you need when the account is switched
      console.log(`Account switched to ${defaultAccount}`);
    } else {
      // Perform any actions or cleanup when the account is disconnected
      console.log('Account disconnected');
    }
  }, [defaultAccount]);

  const clearErrorMessage = () => {
    setErrorMessage(null);
  };

// CSS styles
const styles = {
  notification: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    backgroundColor: '#ff6961',
    color: '#fff',
    padding: '10px',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    fontFamily: 'Poppins, sans-serif', // Apply Poppins font to the notification
  },
  message: {
    marginBottom: '5px',
  },
  dismissButton: {
    backgroundColor: '#fff',
    color: '#ff6961',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontFamily: 'Poppins, sans-serif', // Apply Poppins font to the dismiss button
  },
};
  return (
    <div className="app">
      <div className="container">
        <img src={pepe} alt="Pepe" />
        <div className="buttons">
          <button onClick={connectWallet} className="btn" disabled={isConnected}>
            {isConnected ? 'Connected' : 'Connect to wallet'}
          </button>
          <button onClick={claimAirdrop} className="btn" disabled={!isConnected}>
            Claim airdrop
          </button>
        </div>
      </div>
      {errorMessage && (
        <div className="notification" style={styles.notification}>
          <p style={styles.message}>{errorMessage}</p>
          <button onClick={clearErrorMessage} style={styles.dismissButton}>Dismiss</button>
        </div>
      )}
    </div>
  );
}

export default App;
