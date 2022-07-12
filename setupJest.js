/* eslint-disable no-undef */
import JestFetchMock from 'jest-fetch-mock';

global.fetch = JestFetchMock;

fetch.dontMock();
