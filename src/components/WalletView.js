// WalletView.js
import React, { useEffect, useState, useContext } from "react";
import {
  Divider,
  Tooltip,
  Spin,
  Tabs,
  Select
} from "antd";
import { LogoutOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import logo from "../noImg.png";
import Passwords from './Passwords';
import Tokens from './Tokens';
import NFTs from './NFTs';
import Transfer from './Transfer';
import { sendTransaction, getAccountTokens, setContractsConfiguration, fetchVaults } from '../utils/walletUtils';
import { CHAINS_CONFIG } from "../chains";
import { SidebarContext } from '../SidebarContext';

const { Option } = Select;

const contractAddressSepolia = '0xaF91f6b78C63956d7d0100414cb65552EC259555';

function WalletView({
  wallet,
  setWallet,
  seedPhrase,
  setSeedPhrase,
  selectedChain,
}) {
  const navigate = useNavigate();
  const { toggleSidebar } = useContext(SidebarContext);
  const [vaults, setVaults] = useState([]);
  const [tokens, setTokens] = useState(null);
  const [nfts, setNfts] = useState(null);
  const [balance, setBalance] = useState(0);
  const [fetching, setFetching] = useState(true);
  const [amountToSend, setAmountToSend] = useState(null);
  const [sendToAddress, setSendToAddress] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [hash, setHash] = useState(null);
  const [selectedVault, setSelectedVault] = useState("all");
  const [contract, setContract] = useState(null);
  const [isAddingPassword, setIsAddingPassword] = useState(false);
  const [newCredential, setNewCredential] = useState({
    username: "",
    password: "",
    url: "",
  });

  const handleAddPassword = () => {
    setIsAddingPassword(true);
  };

  const handleSavePassword = async () => {
    setFetching(true);

    const tx = await contract.addCredential(newCredential.username, newCredential.password, newCredential.url);
    await tx.wait();
    fetchVaults(contract, setVaults, setFetching);

    setIsAddingPassword(false);
    setNewCredential({ username: "", password: "", url: "" });

    setFetching(false);
  };

  const handleCancelAddPassword = () => {
    setIsAddingPassword(false);
    setNewCredential({ username: "", password: "", url: "" });
  };

  const items = [
    {
      key: "4",
      label: `Passwords`,
      children: (
        <Passwords
          isAddingPassword={isAddingPassword}
          vaults={vaults}
          selectedVault={selectedVault}
          setSelectedVault={setSelectedVault}
          handleAddPassword={handleAddPassword}
          handleSavePassword={handleSavePassword}
          handleCancelAddPassword={handleCancelAddPassword}
          newCredential={newCredential}
          setNewCredential={setNewCredential}
        />
      ),
    },
    {
      key: "3",
      label: `Tokens`,
      children: <Tokens tokens={tokens} logo={logo} />,
    },
    {
      key: "2",
      label: `NFTs`,
      children: <NFTs nfts={nfts} />,
    },
    {
      key: "1",
      label: `Transfer`,
      children: (
        <Transfer
          balance={balance}
          CHAINS_CONFIG={CHAINS_CONFIG}
          selectedChain={selectedChain}
          sendToAddress={sendToAddress}
          setSendToAddress={setSendToAddress}
          amountToSend={amountToSend}
          setAmountToSend={setAmountToSend}
          sendTransaction={(to, amount) => sendTransaction(to, amount, seedPhrase, selectedChain, setProcessing, setHash, setAmountToSend, setSendToAddress, () => getAccountTokens(wallet, selectedChain, setBalance, setFetching))}
          processing={processing}
          hash={hash}
        />
      ),
    },
  ];

  function logout() {
    setSeedPhrase(null);
    setWallet(null);
    setVaults(null);
    setNfts(null);
    setTokens(null);
    setBalance(0);
    navigate("/");
  }

  useEffect(() => {
    if (!wallet) return;
    setVaults(null);
    setNfts(null);
    setTokens(null);
    setBalance(0);
    getAccountTokens(wallet, selectedChain, setBalance, setFetching);
    setContractsConfiguration(seedPhrase, selectedChain, setContract, () => fetchVaults(contract, setVaults, setFetching), setFetching);
  }, [selectedChain]);

  return (
    <>
      <div className="content">
        {/* Elimina el botón de menú */}
        <div className="logoutButton" onClick={logout}>
          <LogoutOutlined />
        </div>
        <div className="walletName">Wallet</div>
        <Tooltip title={wallet}>
          <div className="walletAddress">
            {wallet.slice(0, 4)}...{wallet.slice(38)}
          </div>
        </Tooltip>
        <Divider />
        {fetching ? (
          <Spin />
        ) : (
          <Tabs defaultActiveKey="1" items={items} className="walletView" />
        )}
      </div>
    </>
  );
}

export default WalletView;
