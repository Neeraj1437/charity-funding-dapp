Sure! Here's the cleaned-up version of the **README.md** without emojis:

---

# Charity Donation DApp

A decentralized web application that enables users to donate ETH to a charity smart contract on the Ethereum blockchain. The app connects with MetaMask, records each donation on-chain, displays total donations, and links to Etherscan for transparency.

## Features

* Connect MetaMask wallet
* Donate ETH securely via smart contract
* View total donations in real-time
* Track donation history with Etherscan links
* Withdraw function restricted to contract owner

---

## Technologies Used

* **Frontend**: React.js, Ethers.js
* **Smart Contract**: Solidity (OpenZeppelin `Ownable`)
* **Blockchain Network**: Ethereum (Testnet or Mainnet)
* **Wallet Integration**: MetaMask
* **Contract Interaction**: `ethers.js`

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/CharityDonationDApp.git
cd CharityDonationDApp
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Smart Contract Deployment

Use [Remix](https://remix.ethereum.org) or Hardhat to deploy `CharityDonation.sol`. Make sure to:

* Use **Solidity 0.8.x**
* Pass your address as the initial owner
* Copy the deployed contract address

### 4. Configure Frontend

* Replace `contractAddress` in `App.js` with your deployed contract address
* Replace the ABI in `CharityDonation.json` if modified

### 5. Run the App

```bash
npm start
```

Open your browser at: [http://localhost:3000](http://localhost:3000)

---

## Usage

1. Connect MetaMask wallet
2. Enter donation amount in ETH
3. Click "Donate"
4. See your transaction reflected in history with a link to Etherscan
5. Owner can withdraw funds via the `withdraw()` function

---

## Security Notes

* Only the contract owner can withdraw funds
* All donations are publicly visible and tracked on-chain
* Ensure you’re on a trusted network before donating

---

## License

MIT License

---

## Acknowledgments

* [OpenZeppelin Contracts](https://github.com/OpenZeppelin/openzeppelin-contracts)
* [Ethers.js](https://docs.ethers.org/)
* [MetaMask](https://metamask.io/)

---

Let me know if you'd like a version that includes deployment instructions with Hardhat or Truffle.
