import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "../App.js";
import { Provider } from "react-redux";
import store from "../store/store.js";
import puppeteer from 'puppeteer'


describe("App.js", () => {
  let browser;
  let page;

  beforeAll(async () => {
    const browser = await puppeteer.launch({
      headless:false,
      args: ["--no-sandbox"]
    })
    page = await browser.newPage();
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    const root = ReactDOM.createRoot(div);
    root.render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    root.unmount();
  });

  it("display login page after registering", async () => {
    await page.goto("http://localhost:3001");
    await page.waitForSelector(".register");
    await page.click(".register");

    await page.click("input[name='email']");
    await page.type("input[name='email']", "test@test.com");
    
    await page.click("input[name='password']");
    await page.type("input[name='password']", "mYsECUREpA$$W0rD!");

    await page.click("input[name='confirmPassword']");
    await page.type("input[name='confirmPassword']", "mYsECUREpA$$W0rD!");

    await page.click("button[type='submit']");

    await page.waitForSelector("#loginButton");

    const buttonText = await page.$eval(
      "loginButton",
      (e) => e.textContent
    );
    expect(buttonText).toContain("Login");
  });

  
  it("display characters list after login", async () => {
    await page.goto("http://localhost:3001");
    await page.waitForSelector(".login");
    await page.click(".login");

    await page.click("input[name='email']");
    await page.type("input[name='email']", "test@test.com");
    
    await page.click("input[name='password']");
    await page.type("input[name='password']", "mYsECUREpA$$W0rD!");

    await page.click("button[type='submit']");

    await page.waitForSelector(".characters-list");

    const characterList = await page.$eval(
      ".characters-list",
      (e) => e.textContent
    );
  });

  afterAll(() => browser.close());
});