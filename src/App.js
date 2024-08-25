import "./App.css";
import { useState, useRef, useEffect, useContext } from "react";
import logo from "./ethereumLogo.svg";
import { Select } from "antd";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CreateAccount from "./components/CreateAccount";
import RecoverAccount from "./components/RecoverAccount";
import WalletView from "./components/WalletView";
import Sidebar from "./components/Sidebar"; // Asegúrate de que la ruta sea correcta
import { SidebarProvider, SidebarContext } from './SidebarContext'; // Importa el contexto
import { MenuOutlined } from "@ant-design/icons"; // Importa el ícono de menú

function App() {
  const [wallet, setWallet] = useState(null);
  const [seedPhrase, setSeedPhrase] = useState(null);
  const [selectedChain, setSelectedChain] = useState("0x1");
  const sidebarRef = useRef(null);

  return (
    <SidebarProvider>
      <AppContent
        wallet={wallet}
        setWallet={setWallet}
        seedPhrase={seedPhrase}
        setSeedPhrase={setSeedPhrase}
        selectedChain={selectedChain}
        setSelectedChain={setSelectedChain}
        sidebarRef={sidebarRef}
      />
    </SidebarProvider>
  );
}

function AppContent({
  wallet,
  setWallet,
  seedPhrase,
  setSeedPhrase,
  selectedChain,
  setSelectedChain,
  sidebarRef
}) {
  const { isSidebarVisible, toggleSidebar } = useContext(SidebarContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleSidebar();
      }
    };

    if (isSidebarVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarVisible, toggleSidebar]);

  return (
    <div className="App">
      <button className="menuButton" onClick={toggleSidebar}>
        <MenuOutlined />
      </button>
      {isSidebarVisible && <div className="overlay" onClick={toggleSidebar}></div>}
      <div ref={sidebarRef}>
        <Sidebar onClose={toggleSidebar} isVisible={isSidebarVisible} />
      </div>
      <header>
        <img src={logo} className="headerLogo" alt="logo" />
        <Select
          onChange={(val) => setSelectedChain(val)}
          value={selectedChain}
          options={[
            {
              label: "Ethereum",
              value: "0x1",
            },
            {
              label: "Sepolia Testnet",
              value: "0xaa36a7",
            },
          ]}
          className="dropdown"
        ></Select>
      </header>
      {wallet && seedPhrase ? (
        <Routes>
          <Route
            path="/yourwallet"
            element={
              <WalletView
                wallet={wallet}
                setWallet={setWallet}
                seedPhrase={seedPhrase}
                setSeedPhrase={setSeedPhrase}
                selectedChain={selectedChain}
              />
            }
          />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/recover"
            element={
              <RecoverAccount
                setSeedPhrase={setSeedPhrase}
                setWallet={setWallet}
              />
            }
          />
          <Route
            path="/yourwallet"
            element={
              <CreateAccount
                setSeedPhrase={setSeedPhrase}
                setWallet={setWallet}
              />
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
