import React, { useEffect, useContext } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { SidebarContext } from '../SidebarContext'; // Ajusta la ruta según sea necesario

function Home() {
  const navigate = useNavigate();
  const { hideMenuButton, showMenuButton } = useContext(SidebarContext);

  useEffect(() => {
    hideMenuButton(); // Oculta el botón de menú al montar el componente
    return () => {
      showMenuButton(); // Muestra el botón de menú al desmontar el componente
    };
  }, [hideMenuButton, showMenuButton]);

  return (
    <>
      <div className="content">
        <h2> Best Crypto Wallet</h2>
        <h4 className="h4">Secure, Self Custodial, Decentralized</h4>
        <Button
          onClick={() => navigate("/yourwallet")}
          className="frontPageButton"
          type="primary"
        >
          Create A Wallet
        </Button>
        <Button
          onClick={() => navigate("/recover")}
          className="frontPageButton"
          type="default"
        >
          Sign In With Seed Phrase
        </Button>
      </div>
    </>
  );
}

export default Home;
