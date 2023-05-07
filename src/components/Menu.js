import { MenuOutlined } from "@ant-design/icons";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Menu = () => {
    const navigate = useNavigate()

    const handleViewProfile = () =>{
        navigate('/profile')
    }

    const handleLogout = () => {
        sessionStorage.clear()
        navigate('/')
    }

    const {
        surname,
        name,
        avatarURL
    } = useContext(AuthContext)
    const [showMenu, setShowMenu] = useState(false)
    const ShowMenu = () => {
        setShowMenu(!showMenu)
    }
    return (
        <div>
            <div className="menu-button-container">
                <button type="submit" onClick={ShowMenu} className="user-menu-button">
                    <MenuOutlined className="user-menu-icon" />
                </button>
            </div>
            {
                showMenu ?
                    <div className="menu-container">
                        <div className="username-container">
                            <img src={avatarURL}
                                alt="user-avatar"
                                className="username-avatar"
                            />
                            <div className="username-text">
                                {surname} {name}
                            </div>
                        </div>
                        <button className="menu-button" type="submit" onClick={handleViewProfile}>
                            Профиль
                        </button>
                        <button className="menu-buttom" type="submit" onClick={handleLogout}>
                            Выйти из аккаунта
                        </button>
                    </div>
                    :
                    <div />
            }
        </div>
    )
}
export default Menu