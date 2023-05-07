import React, { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const AuthContext = createContext()

export const AuthContextProvider = (props) => {
    const [idUser, setIdUser] = useLocalStorage('user_id', '');
    const [surname, setSurname] = useState('');
    const [name, setName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [isActive, setIsActive] = useState('');
    const [token, setToken] = useLocalStorage('token','');
    const [headers, setHeaders] = useLocalStorage('headers', '')
    const [department, setDepartment] = useState('');

    const value = {
        idUser,
        setIdUser,
        surname,
        setSurname,
        name,
        setName,
        middleName,
        setMiddleName,
        login,
        setLogin,
        password,
        setPassword,
        token,
        setToken,
        avatarUrl,
        setAvatarUrl,
        department,
        setDepartment,
        isActive,
        setIsActive,
        headers,
        setHeaders,
    };

    return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
}