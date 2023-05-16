import React, { useContext, useEffect, useState } from "react";
import apiClient from "../../../data/constants";
import { AuthContext } from "../../../context/AuthContext";
import { ActiveChatContext } from "../../../context/ActiveChatContext";

const ChatListItems = () => {

    const returnDate = (dateString, time) => {

        const options = {
            day: '2-digit',
            month: 'short',
            locale: 'ru-RU'
        }
        const yearOptions = {
            day: '2-digit',
            month: 'short',
            year: '4-digit',
            locale: 'ru-RU'
        }

        const dateParts = dateString.split('.')
        const dateObject = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
        const today = new Date();
        const yesterday = new Date(today.setDate(today.getDate() - 1))
        const oneYearAgo = new Date()
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        if (dateObject.toDateString() === yesterday.toDateString()) {
            return 'вчера'
        }
        else if (dateObject < yesterday) {
            return dateObject.toLocaleString('ru-RU', options)
        }
        else if (dateObject.getFullYear() < oneYearAgo.getFullYear()) {
            return dateObject.toLocaleString('ru-RU', yearOptions)
        }
        else {
            return time
        }
    }

    const [data, setData] = useState([]);
    const [time, setTime] = useState(Date.now());
    const {
        setCurrentChat,
        setCurrentChatTitle,
        setCurrentChatAvatar,
        currentChat,
    } = useContext(ActiveChatContext)

    const {
        headers,
        idUser
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
    }, [time, headers])

    if (data != null) {
        return data.map((data, index) => {
            const isChatSelected = currentChat === data.id_conversation
            return (
                <div key={`chat_${data.id_conversation}`} >
                    <div style={{ backgroundColor: isChatSelected ? '#726dfe' : '#4a5162' }} className="chatlist-card-container" key={`chat_${index}`} onClick={() => { setCurrentChat(data.id_conversation); setCurrentChatTitle(data.title); setCurrentChatAvatar(data.conversation_avatar_url) }}>
                        <div className="chatlist-card-image">
                            <div
                                className="chatlist-card-icon"
                                style={{ backgroundSize: 'cover', backgroundImage: `url(${`http://127.0.0.1:8888/uploads/${data.conversation_avatar_url}`})` }}
                            >
                            </div>
                        </div>
                        <div className="chatlist-card-title">
                            {data.title}
                        </div>
                        {(data.unread_number !== 0 ?
                            <div className="chatlist-unread-number-container">
                                <div className="chatlist-unread-number">
                                    {data.unread_number}
                                </div>
                            </div>
                            :
                            <></>
                        )
                        }
                        {
                            data.last_message === null ?
                                <div />
                                :
                                <div className="chatlist-card-time">
                                    {returnDate(data.last_message.date, data.last_message.time)}
                                </div>
                        }
                        {
                            data.last_message === null ?
                                <div className="chatlist-card-message">
                                    Напишите первое сообщение
                                </div>
                                :
                                <div className="chatlist-card-message">
                                    {
                                        data.last_message.sender.id_user === idUser ?
                                            <div>
                                                Вы : {data.last_message.text}
                                            </div>
                                            :
                                            <div>
                                                {data.last_message.sender.name}: {data.last_message.text}
                                            </div>
                                    }
                                </div>
                        }
                    </div>
                </div >
            )
        })
    }
}
export default ChatListItems;