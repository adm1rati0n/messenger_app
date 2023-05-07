import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import apiClient from "../../data/constants";
const LoginForm = () => {

    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')
    const {
        setIdUser,
        setSurname,
        setName,
        setMiddleName,
        login,
        setLogin,
        password,
        setPassword,
        setToken,
        setAvatarUrl,
        setDepartment,
        setHeaders,
    } = useContext(AuthContext)

    const handleLoginChange = (e) => {
        e.preventDefault();
        setLogin(e.target.value)
        setErrorMessage('')
    }

    const handlePasswordChange = (e) => {
        e.preventDefault();
        setPassword(e.target.value)
        setErrorMessage('')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        apiClient
            .post('auth/login', {
                login: login,
                password: password
            }).then((res) => {
                setToken(res.data.token);
                setIdUser(res.data.user.id_user)
                setSurname(res.data.user.surname)
                setName(res.data.user.name)
                setMiddleName(res.data.user.middle_name)
                setAvatarUrl(res.data.user.avatar_url)
                setDepartment(res.data.user.department)
                setHeaders({
                    headers: {
                        Authorization: `Bearer ${res.data.token}`,
                    }
                })
                navigate('/chats')
            }).catch(function (error) {
                if (error.response) {
                    if (error.response.status === 400) {
                        setErrorMessage('Неправильный логин или пароль')
                    }
                    else alert("Иф не работает")
                }
            })
    };
    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <div className='auth-title'>Авторизация</div>
            <div className='error-label'>{errorMessage}</div>
            <div className='input-container'>
                <input
                    placeholder='Логин'
                    className='text-input'
                    value={login}
                    onChange={handleLoginChange}
                />
            </div>
            <div className='input-container'>
                <input
                    type='password'
                    placeholder='Пароль'
                    className='text-input'
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
            <button type='sumbit' className='submit-button'>
                Войти
            </button>
            <a href='http://localhost:3000/register' className='link'>
                Нет учетной записи? Создать
            </a>
        </form>
    )
}
export default LoginForm;