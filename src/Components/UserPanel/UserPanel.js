import React from "react";

import styles from "./UserPanel.css";

const userPanel = props => (
    <div className={styles.UserPanel}>
        <ul className={styles.UserList}>
            {Object.keys(props.users).map(userNick =>
                <li key={userNick} style={{color: props.users[userNick], fontWeight: userNick === props.currentUser ? "bold" : null}}>
                    {userNick}
                </li>
            )}
        </ul>
    </div>
);

export default userPanel;
