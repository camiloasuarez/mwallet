import React from 'react';
import '../App.css'; // Asegúrate de que la ruta sea correcta
import { CloseOutlined } from '@ant-design/icons'; // Importa el ícono de cierre

const Sidebar = ({ onClose, isVisible }) => {
    return (
        <div className={`sidebar ${isVisible ? 'show' : ''}`}>
            <div className="sidebarHeader">
                <div className="closeButton" onClick={onClose}>
                    <CloseOutlined />
                </div>
            </div>
            <div className="nk-sidebar-content">
                <div className="nk-sidebar-menu">
                    <ul className="nk-menu">
                        <li>
                            <a href="html/index.html" className="menu-item" style={{ color: 'white', display: 'block' }}>
                                <span className="menu-icon"><em className="icon ni ni-dashlite"></em></span>
                                <span className="menu-text">Vault</span>
                            </a>
                        </li>
                        <li>
                            <a href="html/index-crypto.html" className="menu-item" style={{ color: 'white', display: 'block' }}>
                                <span className="menu-icon"><em className="icon ni ni-bitcoin-cash"></em></span>
                                <span className="menu-text">Share</span>
                            </a>
                        </li>
                        <li>
                            <a href="html/index-analytics.html" className="menu-item" style={{ color: 'white', display: 'block' }}>
                                <span className="menu-icon"><em className="icon ni ni-growth"></em></span>
                                <span className="menu-text">Settings</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
