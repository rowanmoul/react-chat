import React from "react";

import styles from "./Header.css";

const title = props => (
    <div className={styles.Title}>
        <h3>React Chat!</h3>
        <h3>Active Users</h3>
    </div>
);

export default title;
