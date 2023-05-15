import { DeleteFilled } from "@ant-design/icons"
import React, { useContext, useState } from "react"
import apiClient from "../../../data/constants"
import { AuthContext } from "../../../context/AuthContext"
const MyMessage = ({ message }) => {
    const [showDelete, setShowDelete] = useState(false)
    const [isChecked, setIsChecked] = useState(false)

    const {
        headers
    } = useContext(AuthContext)

    const handleCheckbox = () => {
        setIsChecked(!isChecked)
    }

    const handleDeleteClick = () => {
        setShowDelete(true)
    }

    const handleConfirmClick = () => {
        if (isChecked) {
            apiClient.delete(`chats/messages/${message.id_message}/delete`, headers)
                .catch(err => console.log(err))
        }
        else {
            apiClient.get(`chats/messages/${message.id_message}/delete`, headers)
                .catch(err => console.log(err))
        }
        setShowDelete(false)
        setIsChecked(false)
    }

    const handleCancelClick = () => {
        setShowDelete(false)
        setIsChecked(false)
    }

    if (message?.attachments?.length > 0) {
        return (
            <div className="message" style={{ float: 'right', marginRight: '18px', color: 'white', backgroundColor: '#3B2A50' }}>
                {message.text}
                <img
                    src={`http://127.0.0.1:8888/uploads/${message.attachments[0].file_url}`}
                    alt="message-attachment"
                    className="message-image"
                    style={{ float: 'right' }}
                />
                <div className="my-message-time">
                    {message.time}
                </div>
                <button className="delete-my-message" onClick={handleDeleteClick}>
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
                            <div className="modal-flag-container">
                                <input
                                    type="checkbox"
                                    className="modal-flag"
                                    onChange={handleCheckbox}
                                />
                                <label htmlFor="modal-flag">
                                    Удалить для всех
                                </label>
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
    return (
        <div className="message" style={{ float: 'right', marginRight: '18px', color: 'white', backgroundColor: '#3B2A50' }}>
            {message.text}
            <div className="my-message-time">
                {message.time}
            </div>
            <button className="delete-my-message" onClick={handleDeleteClick}>
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
                        <div className="modal-flag-container">
                            <input
                                type="checkbox"
                                className="modal-flag"
                                onChange={handleCheckbox}
                            />
                            <label htmlFor="modal-flag">
                                Удалить для всех
                            </label>
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
export default MyMessage