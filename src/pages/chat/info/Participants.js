import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { ActiveChatContext } from "../../../context/ActiveChatContext";
import apiClient from "../../../data/constants";

const Participants = () => {
    const {
        headers
    } = useContext(AuthContext)

    const {
        currentChat,
    } = useContext(ActiveChatContext)

    const [participantData, setParticipantData] = useState([])

    useEffect(() => {
        if (currentChat !== 0) {
            // const interval = setTimeout(() => setTime(Date.now()), 10000);
            apiClient.get(`chats/${currentChat}/participants`, headers)
                .then((res) => {
                    setParticipantData(res.data)
                }).catch(err => console.log(err))
            // return () => {
            //     clearTimeout(interval)
            // }
        }
    }, [currentChat, headers])

    if (participantData !== null) {
        return participantData.map((data, index) => {
            return (
                <div key={`${data.id_user}`}>
                    <div className="participant-container">
                        <div className="participant-avatar-container">
                            <img
                                src={`http://127.0.0.1:8888/uploads/${data.avatar_url}`}
                                alt="user-avatar"
                                className="participant-avatar"
                            />
                        </div>
                        <div className="participant-username-container">
                            <div className="participant-username">
                                {data.surname} {data.name} {data.middle_name}
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }
}
export default Participants