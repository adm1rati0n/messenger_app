import React, { useContext } from "react"
import { ActiveChatContext } from "../../../context/ActiveChatContext"
import MessageFeed from "./MessageFeed"
import MessageForm from "./MessageForm"
const ChatFeed = () => {
    const {
        currentChat,
        currentChatTitle
    } = useContext(ActiveChatContext)
    return (
        <div>
            {
                currentChat !== 0 ?
                    <div className="chat-container">
                        <div className="chat-title-container">
                            <div className="chat-title">
                                {currentChatTitle}
                            </div>
                        </div>
                        <div className="chat-feed">
                            <MessageFeed />
                        </div>
                        <div className="message-form-container">
                            <MessageForm />
                        </div>
                    </div>
                    :
                    <div />
            }
        </div>
    )
}
export default ChatFeed