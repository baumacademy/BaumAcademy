import { test, expect } from "@playwright/test";
import { login } from "./utils/testHelpers";

test.describe("login page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
    await login(page);
  });

  // test("should render login page", async ({ page }) => {
  //   const loginText = page.locator("h2", { hasText: "Login" });
  //   const email = page.getByText("email");
  //   const password = page.getByText("Password");
  //   const loginBtn = page.getByRole("button", { name: "Login" });

  //   // create an array of elements we want to check
  //   const values = [loginText, email, password, loginBtn];

  //   // loop over the elements and assert they are visble
  //   for (const value of values) {
  //     await expect(value).toBeVisible();
  //   }
  // });

  test("should login in with valid credentials", async ({ page }) => {
    // const loginOutBtn = page.getByRole("button", { name: "Log out" });
    // await expect(loginOutBtn).toBeVisible();
    const ediBtn = page.getByRole('button', {name: "edit"})
    await expect(ediBtn).toBeVisible()
    await ediBtn.click()

    const locationInput = page.getByLabel('location')
    await locationInput.fill("")

    const saveBtn = page.getByRole('button', {name: "save"})
    await expect(saveBtn).toBeVisible()
    await saveBtn.click()

    await expect(page.getByText("fields cannot be empty, please fill out all fields")).toBeVisible()
  });

//   test.only("URL test, make sure the url is only going towards the user profile", async({page}) => {
//     // await page.goto("http://localhost:3000/landing/3")
//     // await page.waitForTimeout(1000)
//     // await page.waitForTimeout(2000);
//     // await page.waitForURL('**/landing');
//     // await expect(page).toHaveURL("http://localhost:3000/landing/13")
//     // const testUserName = page.locator("h2", {hasText: "Test User"})
//     // await expect(testUserName).toBeVisible()
//     // const currentURL = page.url()
//     // console.log(currentURL)
//     // await expect(currentURL).to("http://localhost:3000/landing/9")
// })
});
