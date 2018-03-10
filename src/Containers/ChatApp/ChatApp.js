import React, {Component} from "react";
import io from "socket.io-client";

import MessagePanel from "../../Components/MessagePanel/MessagePanel";
import UserPanel from "../../Components/UserPanel/UserPanel";
import InputBar from "../../Components/InputBar/InputBar";
import Header from "../../Components/Header/Header";

import styles from "./ChatApp.css";

class ChatApp extends Component {
    state = {
        messages: [],
        users: {},
        currentUser: "",
        currentInput: ""
    }

    socket = io("localhost:3001");

    componentDidMount = () => {
        this.socket.on("connect", () => {
            const allCookies = document.cookie.split("; ");
            const nickIndex = allCookies.findIndex(el => el.search("nick=") === 0);
            const nickColourIndex = allCookies.findIndex(el => el.search("nickColour=") === 0);
            if (nickIndex >= 0 && nickColourIndex >= 0) {
                this.socket.emit("reconn", {
                    nick: allCookies[nickIndex].split("=")[1],
                    colour: allCookies[nickColourIndex].split("=")[1]
                });
            } else {
                this.socket.emit("conn");
            }
        });
        this.socket.on("nick", payload => {
            document.cookie = "nick=" + payload.nick + ";max-age:172800";
            document.cookie = "nickColour=" + payload.colour + ";max-age:172800";
            this.setState({currentUser: payload.nick});
        });
        this.socket.on("userUpdate", payload => this.setState({users: payload.users}));
        this.socket.on("message", payload => {
            this.setState({messages: [...this.state.messages, {...payload.message, date: new Date(payload.message.date)}]});
        }
        );
        this.socket.on("chatLog", payload =>
            this.setState({messages:
                payload.chatLog.map(message => {
                    return {...message, date: new Date(message.date)};
                })
            })
        );
    }

    handleInput = event => this.setState({currentInput: event.target.value});

    handleSubmit = () => {
        this.socket.emit("message", {text: this.state.currentInput, user: this.state.currentUser});
        this.setState({currentInput: ""});
    }

    handleEnter = event => {
        if (event.key === "Enter") {
            this.handleSubmit();
        }
    }

    render() {
        return (
            <div className={styles.ChatApp}>
                <Header/>
                <MessagePanel messages={this.state.messages} users={this.state.users} currentUser={this.state.currentUser}/>
                <UserPanel users={this.state.users} currentUser={this.state.currentUser}/>
                <InputBar
                    currentUser={this.state.currentUser}
                    colour={this.state.users[this.state.currentUser]}
                    currentInput={this.state.currentInput}
                    inputHandler={this.handleInput}
                    submitHandler={this.handleSubmit}
                    enterHandler={this.handleEnter}/>
            </div>
        );
    }
}

export default ChatApp;
