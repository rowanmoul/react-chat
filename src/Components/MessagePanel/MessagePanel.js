import React from "react";

import styles from "./MessagePanel.css";

const messagePanel = props => (
    <div className={styles.MessagePanel} ref={elem => { if (elem !== null) elem.scrollTop = elem.scrollHeight; }} >
        <div className={styles.BottomSnapper}>
            <ul className={styles.MessageList}>
                {props.messages.map(message =>
                    <li key={[message.user, message.date.toTimeString()].join("_")}>
                        <p>
                            <span style={{color: "slategrey"}}>{message.date.toTimeString().substring(0, 5)}</span>
                            &nbsp;
                            <span style={{color: props.users[message.user], fontWeight: message.user === props.currentUser ? "bold" : null}}>
                                {message.user}
                            </span>
                            <br/>
                            {message.text}
                        </p>
                    </li>
                )}
            </ul>
        </div>
    </div>
);

export default messagePanel;
