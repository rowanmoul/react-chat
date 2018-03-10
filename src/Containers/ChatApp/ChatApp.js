import React, {Component} from "react";

import MessagePanel from "../../Components/MessagePanel/MessagePanel";
import UserPanel from "../../Components/UserPanel/UserPanel";
import InputBar from "../../Components/InputBar/InputBar";
import Header from "../../Components/Header/Header";

import styles from "./ChatApp.css";

class ChatArea extends Component {
    render() {
        return (
            <div className={styles.ChatApp}>
                <Header/>
                <MessagePanel/>
                <UserPanel/>
                <InputBar/>
            </div>
        );
    }
}

export default ChatArea;
