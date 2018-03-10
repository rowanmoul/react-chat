import React from "react";

import styles from "./InputBar.css";

const inputBar = props => (
    <div className={styles.InputBar}>
        <label style={{color: props.colour}}>{props.currentUser}</label>
        <input
            placeholder="What do you want to say?"
            value={props.currentInput}
            onChange={props.inputHandler}
            onKeyPress={props.enterHandler}/>
        <button onClick={props.submitHandler}>Send</button>
    </div>
);

export default inputBar;
