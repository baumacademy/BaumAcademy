export const login = async (page) => {
  await page.getByTestId("email-input").fill("testuser@example.com");
  await page.getByTestId("password-input").fill("password123");
  await page.getByRole("button", { name: "Login" }).click();
};
