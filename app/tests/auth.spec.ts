import { test } from "@playwright/test";

test("Login and save storage state", async ({ page }) => {
  // Navigate to login page
  await page.goto("http://localhost:3000");

  const emailInput = page.getByTestId("email-input");
  await emailInput.fill("testuser@example.com");
  const passwordInput = page.getByTestId("password-input");
  await passwordInput.fill("password123");
  const loginBtn = page.getByRole("button", { name: "Login" });
  await loginBtn.click();

  // Save storage state (cookies, localStorage, sessionStorage, etc.)
  await page.context().storageState({ path: "storage/auth.json" });
});
