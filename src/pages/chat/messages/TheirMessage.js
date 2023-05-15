import { DeleteFilled } from "@ant-design/icons";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import apiClient from "../../../data/constants";

const TheirMessage = ({ lastMessage, message }) => {
    const [showDelete, setShowDelete] = useState(false)

    const {
        headers
    } = useContext(AuthContext)

    const handleDeleteClick = () => {
        setShowDelete(true)
    }

    const handleConfirmClick = () => {
        apiClient.get(`chats/messages/${message.id_message}/delete`, headers)
            .catch(err => console.log(err))
        setShowDelete(false)
    }

    const handleCancelClick = () => {
        setShowDelete(false)
    }


    const isFirstMessageByUser = !lastMessage || lastMessage.sender.id_user !== message.sender.id_user;
    return (
        <div className="message-row">
            {isFirstMessageByUser && (
                <div
                    className="message-avatar"
                    style={{ backgroundImage: `url(${`http://127.0.0.1:8888/uploads/${message?.sender?.avatar_url}`})` }}
                />
            )}
            {message?.attachments?.length > 0
                ? (
                    <div className="message" style={{ float: 'left', backgroundColor: '#CABCDC', marginLeft: isFirstMessageByUser ? '4px' : '48px' }}>
                        {isFirstMessageByUser && (
                            <div className="chat-feed-message-sender">
                                {message.sender.name}
                            </div>
                        )}
                        {message.text}
                        {message?.attachments?.map((data, index) => {
                            return (
                                <img key={index}
                                    src={`http://127.0.0.1:8888/uploads/${data.file_url}`}
                                    alt="message-attachment"
                                    className="message-image"
                                    style={{ marginTop: '10px' }}
                                />
                            )
                        })}
                        <div className="their-message-time">
                            {message.time}
                        </div>
                        <button className="delete-their-message" onClick={handleDeleteClick}>
                            <DeleteFilled className="delete-message-icon" />
                        </button>
                        {showDelete && (
                            <div className="modal">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        Удалить сообщение
                                    </div>
                                    <div className="modal-text">
                                        Вы точно хотите удалить это сообщение?
                                    </div>
                                    <div className="modal-buttons">
                                        <button style={{ color: '#e53935' }} className="modal-button" onClick={handleConfirmClick}>Удалить</button>
                                        <button style={{ color: '#9a97fc' }} className="modal-button" onClick={handleCancelClick}>Отмена</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="message" style={{ float: 'left', backgroundColor: '#CABCDC', marginLeft: isFirstMessageByUser ? '4px' : '48px' }}>
                        {isFirstMessageByUser && (
                            <div className="chat-feed-message-sender">
                                {message.sender.name}
                            </div>
                        )}
                        {message.text}
                        <div className="their-message-time">
                            {message.time}
                        </div>
                        <button className="delete-their-message" onClick={handleDeleteClick}>
                            <DeleteFilled className="delete-message-icon" />
                        </button>
                        {showDelete && (
                            <div className="modal">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        Удалить сообщение
                                    </div>
                                    <div className="modal-text">
                                        Вы точно хотите удалить это сообщение?
                                    </div>
                                    <div className="modal-buttons">
                                        <button style={{ color: '#e53935' }} className="modal-button" onClick={handleConfirmClick}>Удалить</button>
                                        <button style={{ color: '#9a97fc' }} className="modal-button" onClick={handleCancelClick}>Отмена</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )
            }
        </div>
    )
}
export default TheirMessage