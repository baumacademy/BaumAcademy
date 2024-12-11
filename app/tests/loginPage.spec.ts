//12/7/24
import { test, expect } from "@playwright/test";
import { login } from "./utils/testHelpers";

test.beforeEach(async ({ page }) => {
  await login(page);
});
test.describe("login page", () => {
  test("should render login page", async ({ page }) => {
    // await page.goto("http://localhost:3000");
    const loginText = page.locator("h2", { hasText: "Login" });
    const email = page.getByText("email");
    const password = page.getByText("Password");
    const loginButton = page.getByRole("button", { name: "Login" });
    const signupButton = page.getByRole("link", { name: "Sign up" });
    await expect(loginText).toBeVisible();
    await expect(email).toBeVisible();
    await expect(password).toBeVisible();
    await expect(loginButton).toBeVisible();
    await expect(signupButton).toBeVisible();
    // create an array of elements we want to check 이렇게 쓰는 것을 좋아한다
    // const values = [loginText, email, password, loginButton];
    //loop over the elements and assert they are visible
    // for (const value of values) {
    //     await expect(value).toBeVisible
    // }
  });
  // test("should login in with valid credentals", async ({ page }) => {
  //   // await page.goto("http://localhost:3000");
  //   // //await login(page);으로도 할수 있다
  //   // await login(page);

  //   // const emailInput = page.getByTestId("email-input");
  //   // const passwordInput = page.getByTestId("password-input");
  //   // const loginStart = page.getByRole("button", { name: "Login" });
  //   // await emailInput.fill("testuser@example.com");
  //   // await passwordInput.fill("password123");
  //   // await expect(loginStart).toBeVisible();
  //   // await loginStart.click();
  //   const loginTestUser = page.locator("h2", { hasText: "Test User" });
  //   const emailAddress = page.getByText("testuser@example.com");
  //   const location = page.getByText("Location");
  //   const gender = page.getByText("Male");
  //   const occupation = page.getByText("Student");
  //   const batch = page.getByText("2024");
  //   const enrolledCourse = page.getByText("Enrolled Course: QA");
  //   const courseDes = page.getByText("5months QA bootcamp");
  //   const editButton = page.getByRole("button", { name: "Edit" });
  //   const logoutButton = page.getByRole("button", { name: "Log out" });
  //   const viewAvailButton = page.getByRole("button", {
  //     name: "View Available Courses",
  //   });

  //   await expect(loginTestUser).toBeVisible();
  //   await expect(emailAddress).toBeVisible();
  //   await expect(location).toBeVisible();
  //   await expect(gender).toBeVisible();
  //   await expect(occupation).toBeVisible();
  //   await expect(batch).toBeVisible();
  //   await expect(enrolledCourse).toBeVisible();
  //   await expect(courseDes).toBeVisible();
  //   await expect(editButton).toBeVisible();
  //   await expect(logoutButton).toBeVisible();
  //   await expect(viewAvailButton).toBeVisible();
  // });

  //12/12/2024
  test("should be able to log out", async ({ page }) => {
    // await page.goto("http://localhost:3000");

    // await login(page);

    const logoutButton = page.getByRole("button", { name: "Log Out" });
    await expect(logoutButton).toBeVisible();
    await logoutButton.click();

    const signupButton = page.getByText("Sign up");
    await expect(signupButton).toBeVisible();
  });

  test("should update profile", async ({ page }) => {
    //login
    //click edit
    //expect save btn to be visible
    //update location to 'New Test City'
    //press save
    //expect that 'New Test City' is visible
    const editButton = page.getByRole("button", { name: "Edit" });
    await expect(editButton).toBeVisible();
    await editButton.click();

    const saveButton = page.getByRole("button", { name: "Save" });
    await expect(saveButton).toBeVisible();

    const location = page.getByTestId("profile-city");
    await expect(location).toBeVisible();
    await location.fill("New Test City");

    const gender = page.getByTestId("profile-gender");
    await expect(gender).toBeVisible();
    await gender.fill("Female");

    const occupation = page.getByTestId("profile-occupation");
    await expect(occupation).toBeVisible();
    await occupation.fill("QA Tester");

    const batch = page.getByLabel("Batch #:");
    await expect(batch).toBeVisible();
    await batch.fill("2025");

    const kidsCoding = page.getByTestId("profile-radio-1");
    await expect(kidsCoding).toBeVisible();
    await kidsCoding.check();

    await saveButton.click();

    //after click page

    const newLocation = page.getByText("New Test City");
    await expect(newLocation).toBeVisible();

    const newGender = page.getByText("Female");
    await expect(newGender).toBeVisible();

    const newOccupation = page.getByText("QA Tester");
    await expect(newOccupation).toBeVisible();

    const newBatch = page.getByText("2025");
    await expect(newBatch).toBeVisible();

    const enrolledCourse = page.getByText("Kids Coding");
    await expect(enrolledCourse).toBeVisible();

    // const saveButton = getByRole('button', {name: "Save"});
    // await
  });
  test("should render course page", async ({ page }) => {
    const courses = page.getByRole("button", { name: "View Available Course" });
    await expect(courses).toBeVisible();
    await courses.click();

    const coursePage = page.locator("h1", { hasText: "Courses" });
    await expect(coursePage).toBeVisible();
    const QA5 = page.getByText("5months QA bootcamp");
    await expect(QA5).toBeVisible();
    const kidsCoding = page.locator("h3", { hasText: "Kids Coding" });
    await expect(kidsCoding).toBeVisible();
    const basicComputer = page.getByText(
      "very basic to advanced computer skills"
    );
    await expect(basicComputer).toBeVisible();
    const koreanClass = page.locator("h3", { hasText: "Korean Class" });
    await expect(koreanClass).toBeVisible();

    const goBackButton = page.getByRole("button", { name: "Go Back" });
    await expect(goBackButton).toBeVisible();
    await goBackButton.click();

    const email = page.getByText("Email");
    await expect(email).toBeVisible();
  });
});
