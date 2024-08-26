import React from 'react';
import { Input } from 'antd'; // Importa Input de antd
import '../App.css'; // Importa App.css para usar los estilos globales
import { Link } from 'react-router-dom'; // Importa Link de react-router-dom

const Vault = ({ selectedChain, setSelectedChain }) => {
    const [searchQuery, setSearchQuery] = React.useState('');

    return (
        <div className="vault-content">
            <h1>Vault</h1>
            <div className="sendRow">
                <p style={{ width: "90px", textAlign: "left" }}>Search:</p>
                <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                />
            </div>
            <div style={{ marginTop: '20px' }}>
                <Link to="/new-record" style={{ color: 'white' }}>New Record</Link>
            </div>
        </div>
    );
};

export default Vault;
