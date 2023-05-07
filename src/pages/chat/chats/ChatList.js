import React, { useContext, useState } from "react"
import { AuthContext } from "../../../context/AuthContext"
import apiClient from "../../../data/constants"
import { PlusOutlined } from '@ant-design/icons';
import ChatListItems from "./ChatListItems";
const ChatList = () => {
    const [showForm, setShowForm] = useState(false)
    const [chatTitle, setChatTitle] = useState('')
    const {
        idUser,
        headers,
    } = useContext(AuthContext)

    const handleTitleChange = (e) => {
        e.preventDefault();
        setChatTitle(e.target.value)
    }

    const addParticipant = (chat_id) => {
        apiClient.post(`chats/${chat_id}/participants/add`, {
            user_id: idUser
        }, headers)
            .catch(function (error) {
                console.log(error)
            })
        setShowForm(!showForm)
    }

    const handleAddSubmit = (e) => {
        e.preventDefault();
        apiClient.post('chats/add-conversation', {
            title: chatTitle,
            conversation_avatar_url: 'default.png'
        }, headers)
            .then((res) => {
                const chat_id = res.data.id_conversation
                console.log(JSON.stringify(res))
                addParticipant(chat_id)
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    const ShowForm = () => {
        setShowForm(!showForm);
    }

    return (
        <div className="chatlist-container">
            {showForm ?
                <form className="add-chat-form" onSubmit={handleAddSubmit}>
                    <input
                        placeholder='Название чата'
                        className='chat-text-input'
                        value={chatTitle}
                        onChange={handleTitleChange}
                    />
                </form>
                :
                <div className="chatlist-header-container">
                    <div className='chatlist-header-title'>
                        коМеТа o_O
                    </div>
                    <button type="submit" onClick={ShowForm} className="chatlist-header-button">
                        <PlusOutlined className="chatlist-header-icon" />
                    </button>
                </div>
            }
            <ChatListItems />
        </div>
    )
}
export default ChatList