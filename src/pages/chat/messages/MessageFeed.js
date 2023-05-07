import React, { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../context/AuthContext"
import { ActiveChatContext } from "../../../context/ActiveChatContext"
import apiClient from "../../../data/constants"
import MyMessage from "./MyMessage"
import TheirMessage from "./TheirMessage"

const MessageFeed = (props) => {
    const [time, setTime] = useState(Date.now());
    const {
        idUser,
        headers
    } = useContext(AuthContext)
    const {
        currentChat,
    } = useContext(ActiveChatContext)
    const [messageData, setMessageData] = useState([])

    useEffect(() => {
        if (currentChat !== 0) {
            const interval = setTimeout(() => setTime(Date.now()), 3000);
            apiClient.get(`chats/${currentChat}`, headers)
                .then((res) => {
                    setMessageData(res.data)
                }).catch(err => console.log(err))
            return () => {
                clearTimeout(interval)
            }
        }
    }, [time])
    if (messageData !== null) {
        return messageData.map((data, index) => {
            const lastMessage = index === 0 ? null : messageData[index - 1];
            return (
                <div key={`msg_${data.id_message}`}>
                    {
                        lastMessage !== null ?
                            data.date !== lastMessage.date ?
                                <div className="chat-feed-new-date">
                                    {data.date}
                                </div>
                                :
                                <div />
                            :
                            <div className="chat-feed-new-date">
                                {data.date}
                            </div>
                    }
                    <div className="message-block">
                        {
                            data.sender.id_user === idUser
                                ? <MyMessage message={data} />
                                : <TheirMessage message={data} lastMessage={lastMessage} />
                        }
                    </div>
                </div>
            )
        })
    }
}
export default MessageFeed;