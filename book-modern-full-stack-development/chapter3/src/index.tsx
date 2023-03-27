// Copyright (C) 2022 Varghese Mathew (Matt)

import React from "react";
import ReactDOM from "react-dom/client";
import Bookmark from "./Bookmark";
import "./index.scss";

// Reference: https://github.com/reactwg/react-18/discussions/5
const container = document.querySelector("#root");
const root = ReactDOM.createRoot(container as HTMLElement);
root.render(
    <>
        <Bookmark title="Google" href="https://www.google.com" description="Google Search Engine" />
        <Bookmark title="Wikipedia" href="https://en.wikipedia.org" description="Wikipedia Internet Encyclopedia" />
        <Bookmark title="GitHub" href="https://github.com/" description="GitHub Source Code Repositories" />
    </>
);
