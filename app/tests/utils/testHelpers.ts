import { Page } from "@playwright/test";

export const login = async (page: Page) => {
  await page.goto("http://localhost:3000");
  await page.getByTestId("email-input").fill("testuser@example.com");
  await page.getByTestId("password-input").fill("password123");
  await page.getByRole("button", { name: "Login" }).click();
};
