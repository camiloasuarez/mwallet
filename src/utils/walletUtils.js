// src/utils/walletUtils.js
import { ethers } from "ethers";
import { CHAINS_CONFIG } from "../chains";
import PasswordVault_abi from '../contracts/PasswordVault_abi.json';

const contractAddressSepolia = '0xaF91f6b78C63956d7d0100414cb65552EC259555';

export async function sendTransaction(to, amount, seedPhrase, selectedChain, setProcessing, setHash, setAmountToSend, setSendToAddress, getAccountTokens) {
  const chain = CHAINS_CONFIG[selectedChain];

  const provider = new ethers.JsonRpcProvider(chain.rpcUrl);

  const privateKey = ethers.Wallet.fromPhrase(seedPhrase).privateKey;

  const wallet = new ethers.Wallet(privateKey, provider);

  const tx = {
    to: to,
    value: ethers.parseEther(amount.toString()),
  };

  setProcessing(true);
  try {
    const transaction = await wallet.sendTransaction(tx);

    setHash(transaction.hash);
    const receipt = await transaction.wait();

    setHash(null);
    setProcessing(false);
    setAmountToSend(null);
    setSendToAddress(null);

    if (receipt.status === 1) {
      getAccountTokens();
    } else {
      console.log("failed");
    }
  } catch (err) {
    setHash(null);
    setProcessing(false);
    setAmountToSend(null);
    setSendToAddress(null);
  }
}

export async function getAccountTokens(wallet, selectedChain, setBalance, setFetching) {
  setFetching(true);

  const chain = CHAINS_CONFIG[selectedChain];

  const provider = new ethers.JsonRpcProvider(chain.rpcUrl);

  const balance = await provider.getBalance(wallet);

  const balanceInEth = parseFloat(ethers.formatEther(balance));

  setBalance(balanceInEth);

  setFetching(false);
}

export async function setContractsConfiguration(seedPhrase, selectedChain, setContract, fetchVaults, setFetching) {
  setFetching(true);

  const chain = CHAINS_CONFIG[selectedChain];

  const provider = new ethers.JsonRpcProvider(chain.rpcUrl);

  const privateKey = ethers.Wallet.fromPhrase(seedPhrase).privateKey;

  const signer = new ethers.Wallet(privateKey, provider);

  let tempContract = new ethers.Contract(contractAddressSepolia, PasswordVault_abi, signer);
  setContract(tempContract);

  fetchVaults();

  setFetching(false);
}

export async function fetchVaults(contract, setVaults, setFetching) {
  setFetching(true);

  if (contract) {
    try {
      const retrievedVaults = await contract.getVaults();
      setVaults(retrievedVaults);
    } catch (error) {
      //setErrorMessage(error.message);
    }
  }

  setFetching(false);
}
