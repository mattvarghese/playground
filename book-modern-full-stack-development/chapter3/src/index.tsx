// Copyright (C) 2022 Varghese Mathew (Matt)

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Reference: https://github.com/reactwg/react-18/discussions/5
const container = document.querySelector("#root");
const root = ReactDOM.createRoot(container as HTMLElement);
root.render(<App heading="Hello React" body="Hope you have a ton of fun!" />,);
