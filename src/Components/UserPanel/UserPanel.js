import React from "react";

import styles from "./UserPanel.css";

const items = new Array(1000);
items.fill(null);
const userPanel = props => (
    <div className={styles.UserPanel}>
        <ul className={styles.UserList}>{items.map((_, i) => <li key={i}>User{i}</li>)}</ul>
    </div>
);

export default userPanel;
