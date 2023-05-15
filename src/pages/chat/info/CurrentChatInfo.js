import React, { useContext, useState } from "react";
import { ActiveChatContext } from "../../../context/ActiveChatContext";
import { EditOutlined } from "@ant-design/icons";
import apiClient from "../../../data/constants";
import { AuthContext } from "../../../context/AuthContext";

const CurrentChatInfo = () => {


    const {
        currentChatTitle,
        currentChat,
        currentChatAvatar,
        setCurrentChatTitle,
        setCurrentChatAvatar,
    } = useContext(ActiveChatContext)

    const {
        headers
    } = useContext(AuthContext)

    const [title, setTitle] = useState(`${currentChatTitle}`)
    const [errorMessage, setErrorMessage] = useState('')
    const [image, setImage] = useState(currentChatAvatar)

    const updateChatInfo = (title, image) => {
        apiClient.put(`chats/${currentChat}`, {
            title: title,
            conversation_avatar_url: image,
        }, headers
        ).then(() => {
            setCurrentChatAvatar(image)
            setCurrentChatTitle(title)
            document.getElementById('id_title').readOnly = true
        }).catch(function (error) {
            console.log(error)
        })
    }
    const handleChange = (e) => {
        e.preventDefault();
        setTitle(e.target.value)
        setErrorMessage('')
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        updateChatInfo(title, currentChatAvatar)
    }
    const handleEditTitle = (e) => {
        e.preventDefault()
        document.getElementById('id_title').readOnly = false
    }

    const handleUpload = (e) => {
        e.preventDefault();
        var file = e.target.value
        var filename = file.name
        var extension = file.type.replace(/(.*)\//g, '')
        if (extension !== 'png' || extension !== 'jpg' || extension !== 'gif' || extension !== 'jpeg') {
            setErrorMessage('Аватар беседы должен быть изображением')
        }
        else {
            updateChatInfo(currentChatTitle, `${filename}.${extension}`)
        }
    }

    return (
        <div className="chat-info-main">
            <div className="chat-avatar-container">
                <label className="error-label">
                    {errorMessage}
                </label>
                <img
                    src={`http://127.0.0.1:8888/uploads/${currentChatAvatar}`}
                    alt="avatar-attachment"
                    className="chat-avatar"
                />
                <label htmlFor="upload-chat-avatar">
                    <span className="edit-avatar-button">
                        <EditOutlined className="edit-avatar-icon" />
                    </span>
                </label>
                <input
                    type="file"
                    accept="image/*"
                    multiple={false}
                    id="upload-chat-avatar"
                    style={{ display: 'none' }}
                    onChange={handleUpload}
                />
            </div>
            <div className="chat-info-title-container">
                <input className="chat-info-title" readOnly="readonly" id="id_title"
                    onChange={handleChange} onSubmit={handleSubmit} value={currentChatTitle}>
                </input>
                <button className="edit-title-button" onClick={handleEditTitle}>
                    <EditOutlined className="edit-title-icon" />
                </button>
            </div>
        </div>
    )
}
export default CurrentChatInfo