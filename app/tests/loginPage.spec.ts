import { test, expect } from "@playwright/test";
import { login } from "./utils/testHelpers";

test.describe("login page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test("should render login page", async ({ page }) => {
    const loginText = page.locator("h2", { hasText: "Login" });
    const email = page.getByText("email");
    const password = page.getByText("Password");
    const loginBtn = page.getByRole("button", { name: "Login" });

    // create an array of elements we want to check
    const values = [loginText, email, password, loginBtn];

    // loop over the elements and assert they are visble
    for (const value of values) {
      await expect(value).toBeVisible();
    }
  });

  test("should login in with valid credentials", async ({ page }) => {
    await login(page);

    const loginOutBtn = page.getByRole("button", { name: "Log out" });
    await expect(loginOutBtn).toBeVisible();
  });
});
