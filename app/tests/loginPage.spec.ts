//12/7/24
import { test, expect } from "@playwright/test";

test.describe("login page", () => {
  test("should render login page", async ({ page }) => {
    await page.goto("http://localhost:3000");
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
  test("should login in with valid credentals", async ({ page }) => {
    await page.goto("http://localhost:3000");
    //await login(page);으로도 할수 있다
    const emailInput = page.getByTestId("email-input");
    const passwordInput = page.getByTestId("password-input");
    const loginStart = page.getByRole("button", { name: "Login" });
    const loginTestUser = page.locator("h2", { hasText: "Test User" });
    const emailAddress = page.getByText("testuser@example.com");
    const location = page.getByText("Location");
    const gender = page.getByText("Male");
    const occupation = page.getByText("Student");
    const batch = page.getByText("2024");
    const enrolledCourse = page.getByText("Enrolled Course: QA");
    const courseDes = page.getByText("5months QA bootcamp");
    const editButton = page.getByRole("button", { name: "Edit" });
    const logoutButton = page.getByRole("button", { name: "Log out" });
    const viewAvailButton = page.getByRole("button", {
      name: "View Available Courses",
    });

    await emailInput.fill("testuser@example.com");
    await passwordInput.fill("password123");
    await expect(loginStart).toBeVisible();
    await loginStart.click();
    await expect(loginTestUser).toBeVisible();
    await expect(emailAddress).toBeVisible();
    await expect(location).toBeVisible();
    await expect(gender).toBeVisible();
    await expect(occupation).toBeVisible();
    await expect(batch).toBeVisible();
    await expect(enrolledCourse).toBeVisible();
    await expect(courseDes).toBeVisible();
    await expect(editButton).toBeVisible();
    await expect(logoutButton).toBeVisible();
    await expect(viewAvailButton).toBeVisible();
  });
});
