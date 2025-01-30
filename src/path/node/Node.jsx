import React from "react";
import "./Node.css";

const Node = ({ row, col, isStart, isFinish }) => {
    const extraClass = isStart ? "node-start" : isFinish ? "node-finish" : "";

    return <div className={`node ${extraClass}`} id={`node-${row}-${col}`}></div>;
};

export default Node;

