import React, { useContext, useState } from "react"
import Menu from "../../../components/Menu"
import CurrentChatInfo from "./CurrentChatInfo"
import Participants from "./Participants"
import Gallery from "./Gallery"
import { ActiveChatContext } from "../../../context/ActiveChatContext"
import { DownOutlined, UpOutlined } from "@ant-design/icons"
const ChatInfo = () => {
    const {
        currentChat
    } = useContext(ActiveChatContext)

    const [showParticipants, setShowParticipants] = useState(true)
    const [showGallery, setShowGallery] = useState(true)

    const handleParticipantsClick = () => {
        setShowParticipants(!showParticipants)
    }

    const handleGalleryClick = () => {
        setShowGallery(!showGallery)
    }

    return (
        <div className="chat-info-container">.
            <Menu />
            {
                currentChat !== 0 ?
                    <div className="chat-info-container-main">
                        <div className="info-container">
                            <CurrentChatInfo />
                        </div>
                        <div className="info-section" onClick={handleParticipantsClick}>
                            <div className="info-section-title">
                                Участники
                            </div>
                            <div className="info-section-button">
                                {showParticipants ?
                                    <UpOutlined className="info-section-icon" />
                                    :
                                    <DownOutlined className="info-section-icon" />
                                }
                            </div>
                        </div>
                        {showParticipants ?
                            <div className="participants-container">
                                <Participants />
                            </div>
                            :
                            <div className="section-stub">
                            </div>
                        }
                        <div className="info-section" onClick={handleGalleryClick}>
                            <div className="info-section-title">
                                Вложения
                            </div>
                            <div className="info-section-button">
                                {showGallery ?
                                    <UpOutlined className="info-section-icon" />
                                    :
                                    <DownOutlined className="info-section-icon" />
                                }
                            </div>
                        </div>
                        {showGallery ?
                            <div className="chat-gallery-main">
                                <div className="chat-gallery">
                                    <Gallery />
                                </div>
                            </div>
                            :
                            <div className="section-stub" />
                        }
                    </div>
                    :
                    <div />
            }

        </div>
    )
}
export default ChatInfo