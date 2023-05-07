import React, { useContext } from "react"
import Menu from "../../../components/Menu"
import CurrentChatInfo from "./CurrentChatInfo"
import Participants from "./Participants"
import Gallery from "./Gallery"
import { ActiveChatContext } from "../../../context/ActiveChatContext"
const ChatInfo = () => {
    const {
        currentChat
    } = useContext(ActiveChatContext)
    return (
        <div className="chat-info-container">
            <Menu />
            {
                currentChat !== 0 ?
                    <div>
                        <div className="info-container">
                            <CurrentChatInfo />
                        </div>
                        <div className="participants-container">
                            <Participants />
                        </div>
                        <div className="chat-gallery">
                            <Gallery />
                        </div>
                    </div>
                    :
                    <div />
            }

        </div>
    )
}
export default ChatInfo