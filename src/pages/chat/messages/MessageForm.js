import React, { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { ActiveChatContext } from "../../context/ActiveChatContext"
import { PictureOutlined, SendOutlined } from "@ant-design/icons"
import apiClient from "../../data/constants"
const MessageForm = () => {
    const {
        currentChat
    } = useContext(ActiveChatContext)
    const {
        headers
    } = useContext(AuthContext)
    const [value, setValue] = useState('')

    const handleChange = (event) => {

        setValue(event.target.value);
        // isTyping(props, chatId);
    };

    const handleUpload = (event) => {
        event.preventDefault();
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const text = value.trim();

        if (text.length > 0) {
            console.log('value: ' + value)
            console.log('headers: ' + headers)
            apiClient
                .post(`chats/${currentChat}`, {
                    text: value
                }, headers)
                .then((res) => {
                    console.log(res)
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
        setValue('');
    };

    return (
        <form className="message-form" onSubmit={handleSubmit}>
            <input
                className="message-input"
                placeholder="Напишите сообщение..."
                value={value}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
            <label htmlFor="upload-button">
                <span className="image-button">
                    <PictureOutlined className="picture-icon" />
                </span>
            </label>
            <input
                type="file"
                multiple={false}
                id="upload-button"
                style={{ display: 'none' }}
                onChange={handleUpload}
            />
            <button type="submit" className="send-button">
                <SendOutlined classID="send-icon" />
            </button>
        </form>
    )
}
export default MessageForm