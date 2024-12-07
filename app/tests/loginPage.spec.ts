import { test, expect } from "@playwright/test";

test.describe("login page", () => {
  test("should render login page", async ({ page }) => {
    await page.goto("http://localhost:3000");
    const loginText = page.locator("h2", { hasText: "Login" });
    const email = page.getByText("email");
    const password = page.getByLabel("Password");
    const loginButton = page.getByRole("button", { name: "Login" });
    await expect(loginText).toBeVisible();
    await expect(email).toBeVisible();
    await expect(password).toBeVisible();
    await expect(loginButton).toBeVisible();
  });
});

test("should login in with valid credentials", async ({ page }) => {
  await page.goto("http://localhost:3000");
  const emailInput = page.getByTestId("email-input");
  await emailInput.fill("testuser@example.com");
  const passwordInput = page.getByTestId("password-input");
  await passwordInput.fill("password123");
  const loginBtn = page.getByRole("button", { name: "Login" });
  await loginBtn.click();

  const loginOutBtn = page.getByRole("button", { name: "Log out" });
  await expect(loginOutBtn).toBeVisible();
});

test("should see test user informaion", async ({ page }) => {
  await page.goto("http://localhost:3000/landing/13");
  const editBtn = page.getByText("edit");
  await editBtn.click();
  const logOutBtn = page.getByText("Log out");
  await logOutBtn.click();
});
