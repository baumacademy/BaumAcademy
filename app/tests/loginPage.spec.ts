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
  //12/21/2024
  //Classmate page Feature pages

  //-search by classmate name
  //-should only see classmates that are in the user's enrolled class
  //-click on view profile should how user profile
  //-go back button works

  //12/17/2024
  //create a test case for courses serach engine bar
  test("Make chages to classmate page feature", async ({ page }) => {
    //Search enrolled class:QA
    const enrolledCourse = page.getByText("QA");
    await expect(enrolledCourse).toBeVisible();
    //Ensure vie classmates are there and click
    const profile = page.getByRole("button", { name: "View Classmates" });
    await expect(profile).toBeVisible();
    await profile.click();
    //Ensure Class QA is visible
    const qaClass = page.locator("h1", { hasText: "QA" });
    await expect(qaClass).toBeVisible();
    //Ensure search bar is visible
    const searchInput = page.getByPlaceholder("Search Classmates");
    await expect(searchInput).toBeVisible();
    //search by classmate name
    await searchInput.fill("sophia");
    await expect(searchInput).toBeVisible();
  });
  // test("Search bar gives the correct list of classes", async ({ page }) => {
  //   const profile = page.getByRole("button", {
  //     name: "View Available Courses",
  //   });
  //   //Ensure the 'view available courses' button is visible and click it
  //   await expect(profile).toBeVisible();
  //   await profile.click();
  //   //Get the search input field and ensure it is visible
  //   const searchInput = page.getByPlaceholder(
  //     "Search by name or description..."
  //   );
  //   await expect(searchInput).toBeVisible();
  //   //Get all the list items before filling in the search input
  //   const listsBeforeFill = await page.locator("li").all();
  //   console.log("listsBeforeFill", listsBeforeFill.length); //Fix the console log here
  //   await expect(listsBeforeFill.length).toBe(4); //Expect 4 items initially
  //   //Fill the search input with 'qa'
  //   await searchInput.fill("qa");
  //   //Get the QA element that should appear after the search
  //   const qa = page.locator("h3", { hasText: "QA" });
  //   //Get all the list items after filling in the search input
  //   const lists = await page.locator("li").all();
  //   console.log("lists", lists.length); //Log the new number of ist items
  //   //Check if only 1 list item matches the search result
  //   await expect(lists.length).toBe(1);
  //   await expect(qa).toBeVisible(); //Ensure QA course appears in the list
  // });

  //   Today's automation test cases 12/12/2024

  // 1 - cannot update user's profile with empty input(all fields), and expect to see the error message
  // 2 - gender can be "male" "female, "Male", "Female" otherwise expect to see the error message
  // 3 - go to view courses page, select a course, click enroll course button and expect to update user's
  // course data
  // });
  // test("should expect the error message wwhen profile empty input", async ({
  //   page,
  // }) => {
  //   const editButton = page.getByRole("button", { name: "Edit" });
  //   await expect(editButton).toBeVisible();
  //   await editButton.click();
  //   await page.pause();

  //   const locationInput = page.getByTestId("profile-city");
  //   await expect(locationInput).toBeVisible();
  //   await locationInput.fill("");
  //   await page.pause();

  //   const saveButton = page.getByRole("button", { name: "Save" });
  //   await expect(saveButton).toBeVisible();
  //   await saveButton.click();
  //   await page.pause();

  //   const errorMsg = page.getByText(
  //     "fields cannot be empty, please fill out all fields"
  //   );
  //   await expect(errorMsg).toBeVisible();
  //   await page.pause();
  // });
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

  // //12/12/2024
  // test("should be able to log out", async ({ page }) => {
  //   // await page.goto("http://localhost:3000");

  //   // await login(page);

  //   const logoutButton = page.getByRole("button", { name: "Log Out" });
  //   await expect(logoutButton).toBeVisible();
  //   await logoutButton.click();

  //   const signupButton = page.getByText("Sign up");
  //   await expect(signupButton).toBeVisible();
  // });

  // test("should update profile", async ({ page }) => {
  //   //login
  //   //click edit
  //   //expect save btn to be visible
  //   //update location to 'New Test City'
  //   //press save
  //   //expect that 'New Test City' is visible
  //   const editButton = page.getByRole("button", { name: "Edit" });
  //   await expect(editButton).toBeVisible();
  //   await editButton.click();

  //   const saveButton = page.getByRole("button", { name: "Save" });
  //   await expect(saveButton).toBeVisible();

  //   const location = page.getByTestId("profile-city");
  //   await expect(location).toBeVisible();
  //   await location.fill("New Test City");

  //   const gender = page.getByTestId("profile-gender");
  //   await expect(gender).toBeVisible();
  //   await gender.fill("Female");

  //   const occupation = page.getByTestId("profile-occupation");
  //   await expect(occupation).toBeVisible();
  //   await occupation.fill("QA Tester");

  //   const batch = page.getByLabel("Batch #:");
  //   await expect(batch).toBeVisible();
  //   await batch.fill("2025");

  //   const kidsCoding = page.getByTestId("profile-radio-1");
  //   await expect(kidsCoding).toBeVisible();
  //   await kidsCoding.check();

  //   await saveButton.click();

  //   //after click page

  //   const newLocation = page.getByText("New Test City");
  //   await expect(newLocation).toBeVisible();

  //   const newGender = page.getByText("Female");
  //   await expect(newGender).toBeVisible();

  //   const newOccupation = page.getByText("QA Tester");
  //   await expect(newOccupation).toBeVisible();

  //   const newBatch = page.getByText("2025");
  //   await expect(newBatch).toBeVisible();

  //   const enrolledCourse = page.getByText("Kids Coding");
  //   await expect(enrolledCourse).toBeVisible();

  //   // const saveButton = getByRole('button', {name: "Save"});
  //   // await
  // });
  // test("should render course page", async ({ page }) => {
  //   const courses = page.getByRole("button", { name: "View Available Course" });
  //   await expect(courses).toBeVisible();
  //   await courses.click();

  //   const coursePage = page.locator("h1", { hasText: "Courses" });
  //   await expect(coursePage).toBeVisible();
  //   const QA5 = page.getByText("5months QA bootcamp");
  //   await expect(QA5).toBeVisible();
  //   const kidsCoding = page.locator("h3", { hasText: "Kids Coding" });
  //   await expect(kidsCoding).toBeVisible();
  //   const basicComputer = page.getByText(
  //     "very basic to advanced computer skills"
  //   );
  //   await expect(basicComputer).toBeVisible();
  //   const koreanClass = page.locator("h3", { hasText: "Korean Class" });
  //   await expect(koreanClass).toBeVisible();

  //   const goBackButton = page.getByRole("button", { name: "Go Back" });
  //   await expect(goBackButton).toBeVisible();
  //   await goBackButton.click();

  //   const email = page.getByText("Email");
  //   await expect(email).toBeVisible();
});
