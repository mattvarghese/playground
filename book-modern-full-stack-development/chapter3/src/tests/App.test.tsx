// Copyright (C) 2022 Varghese Mathew (Matt)

import React from "react";
import App from "../App";
import { render } from '@testing-library/react';

describe("App", () => {
    beforeEach(() => {
        render(<App heading="Hello React" body="Hope you have a ton of fun!" />);
    });

    // These tests below are rather trivial and flaky
    // There are here only to verify that the template supports unit testing

    it("containes heading Hello React", () => {
        const h1Element = document.getElementsByTagName("h1");
        expect(h1Element.item(0)?.firstChild?.textContent).toBe("Hello React");
    });

    it("contains paragraph Hope you have a ton of fun!", () => {
        const pElement = document.getElementsByTagName("p");
        expect(pElement.item(0)?.firstChild?.textContent).toBe("Hope you have a ton of fun!");
    });
});