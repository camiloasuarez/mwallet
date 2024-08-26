import React from 'react';
import { Input, Button } from 'antd'; // Importa Input y Button de antd
import { Link, useNavigate } from 'react-router-dom'; // Importa Link y useNavigate de react-router-dom
import { PlusOutlined } from '@ant-design/icons'; // Importa el ícono de Plus
import '../App.css'; // Importa App.css para usar los estilos globales

const Vault = ({ selectedChain, setSelectedChain }) => {
    const [searchQuery, setSearchQuery] = React.useState('');
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/yourwallet');
    };

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
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <Link to="/new-record" style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <PlusOutlined style={{ marginRight: '8px' }} />
                    New Record
                </Link>
            </div>
            <Button
                style={{ width: "100%", marginTop: "20px", marginBottom: "20px" }}
                type="primary"
                onClick={handleGoBack}
            >
                Go Back
            </Button>
        </div>
    );
};

export default Vault;
