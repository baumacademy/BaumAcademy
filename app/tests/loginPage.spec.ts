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
    await login(page);

    const loginOutBtn = page.getByRole("button", { name: "Log out" });
    await expect(loginOutBtn).toBeVisible();
  });

  test("should see error message", async ({ page }) => {
    const userPage = page.getByRole("button", { name: "Edit" });
    await expect(userPage).toBeVisible();
    await userPage.click();
    const locationInput = page.getByTestId("profile-city");
    await locationInput.fill("");
    await expect(locationInput).toBeVisible();
    const genderInput = page.getByTestId("profile-gender");
    await genderInput.fill("");
    await expect(genderInput).toBeVisible();
    const occupationInput = page.getByTestId("profile-occupation");
    await occupationInput.fill("");
    await expect(occupationInput).toBeVisible();
    const batchInput = page.getByTestId("profile-batch");
    await batchInput.fill("");
    await expect(batchInput).toBeVisible();
    const radio_1 = page.getByTestId("profile-radio-0");
    await expect(radio_1).not.toBeChecked();
    const saveButton = page.getByRole("button", { name: "Save" });
    await expect(saveButton).toBeVisible();
    await saveButton.click();
    const errorMsg = page.getByText("Gender can be either Male or Female");
    await expect(errorMsg).toBeVisible();
  });

  test("gender should be either male or female", async ({ page }) => {
    const editButton = page.getByRole("button", { name: "Edit" });
    await expect(editButton).toBeVisible();
    await editButton.click();
    const profile = page.getByTestId("profile-gender");
    await expect(profile).toBeVisible();
    await profile.fill("him");
    const saveButton = page.getByRole("button", { name: "Save" });
    await expect(saveButton).toBeVisible();
    await saveButton.click();
    const errorMsg = page.getByText("Gender can be either Male or Female");
    await expect(errorMsg).toBeVisible();
  });

  test("should update users course data", async ({ page }) => {
    const coursesButton = page.getByRole("button", {
      name: "View Available Courses",
    });
    await expect(coursesButton).toBeVisible();
    await coursesButton.click();
    const qa = page.locator("h3", { hasText: "QA" });
    await expect(qa).toBeVisible();
    await qa.click();
    const enrollButton = page.getByRole("button", { name: "Enroll Course" });
    await expect(enrollButton).toBeVisible();
    await enrollButton.click();
    const courseDesc = page.getByText("5months QA bootcamp");
    await expect(courseDesc).toBeVisible();
  });
});
