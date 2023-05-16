import React, { useContext, useEffect, useState } from "react";
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
        headers,
        token
    } = useContext(AuthContext)

    const [title, setTitle] = useState(`${currentChatTitle}`)
    const [errorMessage, setErrorMessage] = useState('')
    const [images, setImages] = useState('')

    useEffect(() => {
        setTitle(currentChatTitle)
    }, [currentChatTitle])

    const updateChatInfo = (title, image) => {
        apiClient.put(`chats/${currentChat}`, {
            conversation_avatar_url: image,
            title: title,
        }, headers
        ).then(() => {
            setCurrentChatAvatar(image)
            setCurrentChatTitle(title)
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
        const titleInput = document.getElementById('id_title')
        titleInput.style.backgroundColor = '#5d657a'
        titleInput.select();
        titleInput.focus();
    }

    const handleUpload = async (e) => {
        e.preventDefault();
        var file = e.target.files[0]
        console.log(`file: ${file}`)
        var filename = file.name
        console.log(`filename: ${filename}`)
        var extension = file.type.replace(/(.*)\//g, '')
        console.log(`extension: ${extension}`)
        if (extension !== 'png' && extension !== 'jpg' && extension !== 'gif' && extension !== 'jpeg') {
            setErrorMessage('Аватар беседы должен быть изображением')
        }
        else {
            const formData = new FormData();
            formData.append('file', e.target.files[0])
            try {
                const response = await apiClient.post('upload', formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
                if (response.data[0].file_name) {
                    const newImage = response.data[0].file_name
                    console.log(`newImage: ${newImage}`)
                    setImages(newImage)
                    updateChatInfo(currentChatTitle, newImage)
                }
            } catch (error) {
                console.log(error);
            }
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
                <input className="chat-info-title" id="id_title"
                    onChange={handleChange} onSubmit={handleSubmit} value={title} onClick={handleEditTitle}>
                </input>
                <button className="edit-title-button" onClick={handleEditTitle}>
                    <EditOutlined className="edit-title-icon" />
                </button>
            </div>
        </div>
    )
}
export default CurrentChatInfo