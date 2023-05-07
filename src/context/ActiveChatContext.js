import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const ActiveChatContext = createContext()

export const ContextProvider = (props) => {
    const [currentChat, setCurrentChat] = useLocalStorage('currentChat', 0);
    const [currentChatTitle, setCurrentChatTitle] = useLocalStorage('currentChatTitle', '')
    const [currentChatAvatar, setCurrentChatAvatar] = useLocalStorage('currentChatAvatar', '')

    const value = {
        currentChat,
        setCurrentChat,
        currentChatTitle,
        setCurrentChatTitle,
        currentChatAvatar,
        setCurrentChatAvatar
    };
    return <ActiveChatContext.Provider value={value}>{props.children}</ActiveChatContext.Provider>
}