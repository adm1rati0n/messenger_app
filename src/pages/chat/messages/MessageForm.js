import React, { useContext, useState } from "react"
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { AuthContext } from "../../../context/AuthContext"
import { ActiveChatContext } from "../../../context/ActiveChatContext"
import { PictureOutlined, SendOutlined, SmileOutlined } from "@ant-design/icons"
import apiClient from "../../../data/constants"
const MessageForm = () => {

    // const localization = {
    //     search: 'Поиск',
    //     categories: {
    //         search: 'Результаты поиска',
    //         recent: 'Недавние',
    //         smileys: 'Эмоции',
    //         people: 'Жесты и люди',
    //         nature: 'Животные и природа',
    //         foods: 'Еда и напитки',
    //         activities: 'Занятия',
    //         places: 'Места и путешествия',
    //         objects: 'Предметы',
    //         symbols: 'Символы',
    //         flags: 'Флаги',
    //     },
    // }

    // const [file, setFile] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [showEmoji, setShowEmoji] = useState(false);

    const {
        currentChat
    } = useContext(ActiveChatContext)
    const {
        headers,
        token
    } = useContext(AuthContext)
    const [value, setValue] = useState('')

    const handleChange = (event) => {

        setValue(event.target.value);
        // isTyping(props, chatId);
    };

    const handleUpload = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', event.target.files[0])
        try {
            const response = await apiClient.post('upload', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data)
            setImageUrl(response.data.url)
        } catch (error) {
            console.log(error);
        }
        // apiClient.post('upload', {
        //     body: formData
        // }, headers)
        //     .then((res) => {
        //         setImageUrl(res.url)
        //     })
        //     .catch(function (error) {
        //         if (error.response) {
        //             alert(error)
        //         }
        //     })
    }

    const handleShowEmoji = (event) => {
        event.preventDefault();
        setShowEmoji(!showEmoji)
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
        <div style={{ position: 'relative' }}>
            {imageUrl && <img src={imageUrl} alt='uploaded-file' style={{ height: '40px', width: '40px' }} />}
            {showEmoji ? (
                <div className="emoji-picker">
                    <Picker
                        data={data}
                        locale="ru"
                        searchPosition="none"
                        previewPosition="none"
                        onEmojiSelect={(e) => setValue((value) => value + e.native)}
                        theme="dark"
                        set="native"
                    />
                </div>
            )
                :
                <></>
            }
            <form className="message-form" onSubmit={handleSubmit}>
                <button className="emoji-button" onClick={handleShowEmoji}>
                    <SmileOutlined className="emoji-icon" />
                </button>
                <input
                    type="text"
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
        </div>
    )
}
export default MessageForm