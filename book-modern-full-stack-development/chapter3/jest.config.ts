// Copyright (C) 2022 Varghese Mathew (Matt)

import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    // resource files will get replaced by a constant string when testing
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/src/tests/__mocks__/fileMock.ts",

    // style imports will get replaced by an empty object when testing
    "\\.(scss|sass|css)$": "<rootDir>/src/tests/__mocks__/styleMock.ts"
  }
};

export default config;
