import React, { useContext, useEffect, useState } from "react";
import apiClient from "../../data/constants";
import { AuthContext } from "../../context/AuthContext";
import { ActiveChatContext } from "../../context/ActiveChatContext";

const ChatListItems = () => {
    const [data, setData] = useState([]);
    const [time, setTime] = useState(Date.now());
    const {
        setCurrentChat,
        setCurrentChatTitle,
        currentChat,
    } = useContext(ActiveChatContext)

    const {
        headers,
    } = useContext(AuthContext)

    useEffect(() => {
        const interval = setTimeout(() => setTime(Date.now()), 3000);
        apiClient.get('chats', headers)
            .then((res) => {
                setData(res.data)
            }).catch(err => console.log(err))
        return () => {
            clearTimeout(interval)
        }
    }, [time])

    if (data != null) {
        return data.map((data, index) => {
            const isChatSelected = currentChat === data.id_conversation
            return (
                <div>
                    <div style={{ backgroundColor: isChatSelected ? '#726dfe' : '#4a5162' }} className="chatlist-card-container" key={`chat_${index}`} onClick={() => { setCurrentChat(data.id_conversation); setCurrentChatTitle(data.title) }}>
                        {/* <div className="chatlist-card-image">
                            {data.conversation_avatar_url}
                        </div> */}
                        <div className="chatlist-card-title">
                            {data.title}
                        </div>
                        {
                            data.last_message === null ?
                                <div />
                                :
                                <div className="chatlist-card-time">
                                    {data.last_message.time}
                                </div>
                        }
                        {
                            data.last_message === null ?
                                <div className="chatlist-card-message">
                                    Напишите первое сообщение
                                </div>
                                :
                                <div className="chatlist-card-message">
                                    {data.last_message.sender.name}: {data.last_message.text}
                                </div>
                        }
                        <div className="chatlist-card-message">
                        </div>
                    </div>
                </div>
            )
        })
    }
}
export default ChatListItems;