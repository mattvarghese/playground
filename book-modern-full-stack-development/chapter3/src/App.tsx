// Copyright (C) 2022 Varghese Mathew (Matt)

import React from "react";
import "./App.css";

interface IProps {
    heading: string;
    body: string;
}

const App: React.FunctionComponent<IProps> = (props: IProps): JSX.Element | null => {
    const { heading, body } = props;
    return (
        <div>
            <h1>{heading}</h1>
            <p>{body}</p>
        </div>
    );
};

export default App;
