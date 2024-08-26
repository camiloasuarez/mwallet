import React, { useContext } from 'react';
import '../App.css'; // Asegúrate de que la ruta sea correcta
import { CloseOutlined } from '@ant-design/icons'; // Importa el ícono de cierre
import { FaLock, FaShareAlt, FaCog } from 'react-icons/fa'; // Importa los íconos que necesitas
import { Link } from 'react-router-dom'; // Importa Link de react-router-dom
import { SidebarContext } from '../SidebarContext'; // Ajusta la ruta según sea necesario
import { MenuOutlined } from '@ant-design/icons'; // Importa el ícono de menú

const Sidebar = ({ onClose, isVisible }) => {
    const { isMenuButtonVisible, toggleSidebar } = useContext(SidebarContext);

    return (
        <>
            {isMenuButtonVisible && (
                <button onClick={toggleSidebar} className="menuButton">
                    <MenuOutlined />
                </button>
            )}
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
                                <Link to="/vault" className="menu-item" style={{ color: 'white', display: 'block' }} onClick={onClose}>
                                    <span className="menu-icon"><FaLock /></span>
                                    <span className="menu-text">Vault</span>
                                </Link>
                            </li>
                            <li>
                                <a href="html/index-crypto.html" className="menu-item" style={{ color: 'white', display: 'block' }}>
                                    <span className="menu-icon"><FaShareAlt /></span>
                                    <span className="menu-text">Share</span>
                                </a>
                            </li>
                            <li>
                                <a href="html/index-analytics.html" className="menu-item" style={{ color: 'white', display: 'block' }}>
                                    <span className="menu-icon"><FaCog /></span>
                                    <span className="menu-text">Settings</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
