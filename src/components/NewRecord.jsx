import React from 'react';
import { Input, Select, Button } from 'antd'; // Importa Input, Select y Button de antd
import { useNavigate } from 'react-router-dom'; // Importa useNavigate de react-router-dom
import '../App.css'; // Importa App.css para usar los estilos globales

const { Option } = Select;

const NewRecord = () => {
    const [type, setType] = React.useState('');
    const [service, setService] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [website, setWebsite] = React.useState('');
    const [notes, setNotes] = React.useState('');
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/yourwallet');
    };

    return (
        <div className="new-record-content">
            <h1>New Record</h1>
            <div className="inputRow">
                <label style={{ width: "100%", textAlign: "left" }}>Type:</label>
                <Select
                    value={type}
                    onChange={(value) => setType(value)}
                    className="typeSelect" // Aplica la clase específica para el selector
                >
                    <Option value="login">Login</Option>
                    <Option value="files">Files</Option>
                </Select>
            </div>
            <div className="inputRow">
                <label style={{ width: "100%", textAlign: "left" }}>Service:</label>
                <Input
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    placeholder="Service..."
                    style={{ width: '100%' }} // Asegura que el input ocupe todo el ancho disponible
                />
            </div>
            <div className="inputRow">
                <label style={{ width: "100%", textAlign: "left" }}>Username:</label>
                <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username..."
                    style={{ width: '100%' }} // Asegura que el input ocupe todo el ancho disponible
                />
            </div>
            <div className="inputRow">
                <label style={{ width: "100%", textAlign: "left" }}>Password:</label>
                <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password..."
                    style={{ width: '100%' }} // Asegura que el input ocupe todo el ancho disponible
                />
            </div>
            <div className="inputRow">
                <label style={{ width: "100%", textAlign: "left" }}>Website:</label>
                <Input
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="Website..."
                    style={{ width: '100%' }} // Asegura que el input ocupe todo el ancho disponible
                />
            </div>
            <div className="inputRow">
                <label style={{ width: "100%", textAlign: "left" }}>Notes:</label>
                <Input
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Notes..."
                    style={{ width: '100%' }} // Asegura que el input ocupe todo el ancho disponible
                />
            </div>
            <div className="buttonRow">
                <Button type="default" className="saveButton">Save</Button>
                <Button type="primary" className="goBackButton" onClick={handleGoBack}>Go Back</Button>
            </div>
        </div>
    );
};

export default NewRecord;
