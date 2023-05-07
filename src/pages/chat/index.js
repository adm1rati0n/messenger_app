import React from "react";
import ChatList from "./ChatList";
import ChatFeed from "./ChatFeed";
import ChatInfo from "./ChatInfo";
const Chats = () => {
    return (
        <div>
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