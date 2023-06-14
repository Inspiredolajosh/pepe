import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import AirdropContractABI from "../AirdropContractABI.json";
import pepe from "../public/img/pepe.png";
import "./App.css";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const contractAddress = "0x2ca08c5Bc11449c7Bd07Cb9Ce4A66632Db34d977";
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, AirdropContractABI, signer);

function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = () => {
    if (isConnected) {
      disconnectWallet();
    } else {
      if (window.ethereum) {
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((result) => {
            accountChanged(result[0]);
          })
          .catch((error) => {
            console.error(error);
            setErrorMessage("Failed to connect to the wallet.");
          });
      } else {
        setErrorMessage("Please install Metamask or another Ethereum wallet provider to connect.");
      }
    }
  };

  
  const disconnectWallet = () => {
    setDefaultAccount(null);
    setIsConnected(false);
    setErrorMessage(null);
  };




  const accountChanged = (accountName) => {
    setDefaultAccount(accountName);
    setIsConnected(true);
  };

  const claimAirdrop = async () => {
    try {
      const price = ethers.utils.parseEther("0.003");
      const transactionParameters = {
        value: price,
      };
  
      const transaction = await contract.claimAirdrop(transactionParameters);
      await transaction.wait();
  
      console.log("Airdrop claimed successfully!");
    } catch (error) {
      console.error(error);
      if (error.reason === "execution reverted: Already claimed airdrop") {
        setErrorMessage("Airdrop has already been claimed.");
      } else if (error.reason === "Fail with error 'Insufficient BNB to claim airdrop'") {
        setErrorMessage("Insufficient funds to claim the airdrop.");
      } else {
        setErrorMessage("Failed to claim the airdrop. Please check your wallet balance or the connection.");
      }
    }
  };
  
  
  

  useEffect(() => {
    if (isConnected) {
      console.log("Wallet connected");
    } else {
      console.log("Wallet disconnected");
    }
  }, [isConnected]);

  const clearErrorMessage = () => {
    setErrorMessage(null);
  };

  const styles = {
    notification: {
      position: "fixed",
      top: "20px",
      right: "20px",
      backgroundColor: "#ff6961",
      color: "#fff",
      padding: "10px",
      borderRadius: "4px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      fontFamily: "Poppins, sans-serif",
    },
    networkInfo: {
      backgroundColor: '#f5f5f5',
      color: '#333',
      padding: '10px',
      borderRadius: '4px',
      marginBottom: '10px',
      textAlign: 'center',
      fontFamily: 'Poppins, sans-serif',
    },
    message: {
      marginBottom: "5px",
    },
    dismissButton: {
      backgroundColor: "#fff",
      color: "#ff6961",
      border: "none",
      padding: "5px 10px",
      borderRadius: "4px",
      cursor: "pointer",
      fontFamily: "Poppins, sans-serif",
    },
  };

  return (
    <div className="app">
    <div className="container">
      <img src={pepe} alt="Pepe" />
      <div className="network-info" style={styles.networkInfo}>
  Please make sure you are on the Binance Network
</div> <br />
      <div className="buttons">
        <button onClick={connectWallet} className="btn" disabled={!window.ethereum}>
          {isConnected ? "Disconnect Wallet" : "Connect to Wallet"}
        </button>
        <button onClick={claimAirdrop} className="btn" disabled={!isConnected}>
          Claim Airdrop
        </button>
      </div>
    </div>
    {errorMessage && (
      <div className="notification" style={styles.notification}>
        <p style={styles.message}>{errorMessage}</p>
        <button onClick={clearErrorMessage} style={styles.dismissButton}>
          Dismiss
        </button>
      </div>
    )}
  </div>
  
  );
}

export default App;
