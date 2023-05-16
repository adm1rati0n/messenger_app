import React, { useContext, useEffect, useState } from "react";
import apiClient from "../../../data/constants";
import { AuthContext } from "../../../context/AuthContext";
import { ActiveChatContext } from "../../../context/ActiveChatContext";

const Gallery = () => {

    const [imageData, setImageData] = useState([])
    const [videoData, setVideoData] = useState([])
    const [audioData, setAudioData] = useState([])
    const [fileData, setFileData] = useState([])
    const [extension, setExtension] = useState('image')

    const {
        headers
    } = useContext(AuthContext)

    const {
        currentChat
    } = useContext(ActiveChatContext)

    useEffect(() => {
        apiClient.get(`chats/${currentChat}/attachments`, headers)
            .then((res) => {
                const data = res.data
                setImageData([])
                data.forEach((item) => {
                    const fileName = item.file_url
                    const extension = fileName.substring(item.file_url.lastIndexOf('.') + 1)
                    switch (extension) {
                        case 'jpg':
                        case 'jpeg':
                        case 'png':
                        case 'gif':
                            setImageData((prevImages) => [...prevImages, item])
                            console.log('хуйня вызвалась')
                            break;
                        case 'mp4':
                        case 'webm':
                        case 'avi':
                            setVideoData((prevVideos) => [...prevVideos, item])
                            break;
                        case 'mp3':
                        case 'wav':
                            setAudioData((prevAudios) => [...prevAudios, item])
                            break;
                        default:
                            setFileData((prevFiles) => [...prevFiles, item])
                    }
                })
            }).catch(err => console.log(err))
    }, [currentChat, headers])

    function renderImageData() {
        if (imageData !== null) {
            return imageData.map((data, index) => {
                return (
                    <div key={`${data.id_attachment}/${index}`}>
                        <img
                            src={`http://127.0.0.1:8888/uploads/${data.file_url}`}
                            alt="pic"
                            className="gallery-image"
                        />
                    </div>
                )
            })
        }
    }

    function renderVideoData() {
        if (videoData !== null) {
            return videoData.map((data, index) => {
                return (
                    <div key={`${data.id_attachment}/${index}`}>
                        <video
                            src={`http://127.0.0.1:8888/uploads/${data.file_url}`}
                            className="gallery-video"
                        />
                    </div>
                )
            })
        }
    }

    function renderAudioData() {
        if (audioData !== null) {
            return audioData.map((data, index) => {
                return (
                    <div key={`${data.id_attachment}/${index}`}>
                        <audio
                            src={`http://127.0.0.1:8888/uploads/${data.file_url}`}
                            className="gallery-audio"
                        />
                    </div>
                )
            })
        }
    }

    function renderFileData() {
        if (fileData !== null) {
            return audioData.map((data, index) => {
                return (
                    <div key={`${data.id_attachment}/${index}`}>
                        <iframe title="unique-title"
                            src={`http://127.0.0.1:8888/uploads/${data.file_url}`}
                            className="gallery-file"
                        />
                    </div>
                )
            })
        }
    }

    return (
        <div>
            <div className="extension-picker">
                <div className="extension-pick" onClick={() => setExtension('image')}>
                    Изображения
                </div>
                <div className="extension-pick" onClick={() => setExtension('video')}>
                    Видео
                </div>
                <div className="extension-pick" onClick={() => setExtension('audio')}>
                    Музыка
                </div>
                <div className="extension-pick" onClick={() => setExtension('file')}>
                    Файлы
                </div>
            </div>
            {extension === 'image' &&
                <div className="gallery-grid">
                    {renderImageData()}
                </div>
            }
            {extension === 'video' &&
                <div className="gallery-grid">
                    {renderVideoData()}
                </div>
            }
            {extension === 'audio' &&
                <div className="gallery-list">
                    {renderAudioData()}
                </div>
            }
            {extension === 'file' &&
                <div className="gallery-list">
                    {renderFileData()}
                </div>
            }
        </div >
    )
}
export default Gallery