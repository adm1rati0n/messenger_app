import React from "react";
import ChatList from "./chats/ChatList";
import ChatFeed from "./messages/ChatFeed";
import ChatInfo from "./info/ChatInfo";
const Chats = () => {
    return (
        <div className="column">
            <div className="column-left">
                <ChatList />
            </div>
            <div className="column-middle">
                <ChatFeed/>
            </div>
            <div className="column-right">
                <ChatInfo />
            </div>
        </div>
    )
}
export default Chats;