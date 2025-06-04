import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import CharityDonationABI from "./CharityDonation.json";
import "./App.css";

const contractAddress = "0xe360B96003A3bDa8FEE59d76B9EE295f0B9FB330";

function App() {
  const [account, setAccount] = useState(null);
  const [donationAmount, setDonationAmount] = useState("");
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [donations, setDonations] = useState([]);
  const [totalDonations, setTotalDonations] = useState("0.0");

  // Initialize provider
  useEffect(() => {
    if (window.ethereum) {
      const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(tempProvider);
    } else {
      alert("Please install MetaMask!");
    }
  }, []);

  // Set up contract and fetch total donations
  useEffect(() => {
    if (provider) {
      const tempContract = new ethers.Contract(
        contractAddress,
        CharityDonationABI.abi,
        provider
      );
      setContract(tempContract);
      fetchTotalDonations(tempContract);
    }
  }, [provider]);

  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
    } catch (error) {
      console.error("MetaMask connection error:", error);
    }
  };

  const fetchTotalDonations = async (contractInstance) => {
    try {
      const total = await contractInstance.totalDonations();
      const formatted = ethers.utils.formatEther(total);
      setTotalDonations(formatted);
    } catch (error) {
      console.error("Error fetching total donations:", error);
    }
  };

  const donate = async () => {
    if (!donationAmount || isNaN(donationAmount)) {
      alert("Please enter a valid ETH amount.");
      return;
    }

    try {
      const signer = provider.getSigner();
      const contractWithSigner = contract.connect(signer);

      const tx = await contractWithSigner.donate({
        value: ethers.utils.parseEther(donationAmount),
      });

      const receipt = await tx.wait(1);

      if (receipt.status === 1) {
        alert("✅ Donation successful!");

        const newDonation = {
          amount: donationAmount,
          transactionHash: receipt.transactionHash,
        };

        setDonations([...donations, newDonation]);

        // Fetch updated total
        fetchTotalDonations(contract);
      } else {
        alert("❌ Transaction failed.");
      }
    } catch (err) {
      console.error("Donation error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="heading">Charity Donation</h1>

        <div className="wallet-info">
          {!account ? (
            <button className="connect-button" onClick={connectWallet}>
              Connect MetaMask
            </button>
          ) : (
            <div className="account-info">
              <h2>Connected: {account}</h2>
            </div>
          )}
        </div>

        <div className="donation-form">
          <input
            className="donation-input"
            type="text"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            placeholder="Amount in ETH"
          />
          <button className="donate-button" onClick={donate}>
            Donate
          </button>
        </div>

        <div className="donation-summary">
          <h3>Total Donations: {parseFloat(totalDonations).toFixed(6)} ETH</h3>
        </div>

        <div className="donation-history">
          <h2>Donation History</h2>
          {donations.length > 0 ? (
            <ul>
              {donations.map((donation, index) => (
                <li key={index} className="donation-item">
                  <strong>{donation.amount} ETH</strong> donated.{" "}
                  <a
                    href={`https://etherscan.io/tx/${donation.transactionHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="etherscan-link"
                  >
                    View on Etherscan
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No donations made yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
