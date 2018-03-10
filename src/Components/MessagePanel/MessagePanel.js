import React from "react";

import styles from "./MessagePanel.css";

const items = new Array(50);
items.fill(null);
const messagePanel = props => (
    <div className={styles.MessagePanel}>
        <div className={styles.BottomSnapper}>
            <ul className={styles.MessageList}>{items.map((_, i) => <li key={i}><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.{i}</p></li>)}</ul>
        </div>
    </div>
);

export default messagePanel;
