import { AuthContextProvider } from "./context/AuthContext";
import { ContextProvider } from "./context/ActiveChatContext";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Auth from "./pages/login";
// eslint-disable-next-line
import Chats from './pages/chat';
import './assets/login.css';
import './assets/global.css';
import './assets/chat-feed.css';
import './assets/chat-info.css';
import './assets/chat-list.css';
import './assets/menu.css';
import './assets/sign-up.css';
import './assets/message-form.css';


function App() {
  return (
    <AuthContextProvider>
      <ContextProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Auth />} />
            <Route path='/chats' element={<Chats />} />
          </Routes>
        </Router>
      </ContextProvider>
    </AuthContextProvider>
  );
};
export default App;
