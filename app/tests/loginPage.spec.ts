import { test, expect } from '@playwright/test';

test.describe('login page', () => {
    test('should render login page', async ({page}) => {
        await page.goto('http://localhost:3000');
        const loginText = page.locator("h2", { hasText: "Login"});
        const email = page.getByText("email");
        const password = page.getByText("password");
        await expect(loginText).toBeVisible();
        await expect(password).toBeVisible();
        await expect(email).toBeVisible();
    });
});

test.describe('login page', () => {
    // test('should click log in button', async ({page}) => {
    //     await page.goto('http://localhost:3000');
    //     const loginText = page.locator("button type = submit", { hasText: "Login"});
        
    //     const signUp = page.getByRole("link", { name: "Sign up"})
        
    //     await expect(signUp).toBeVisible();
        
    // });
    test('should click log in button', async ({page}) => {
        await page.goto('http://localhost:3000');
        const emailInput = page.getByTestId('email-input');
        await emailInput.fill('testuser@example.com')
        const pwInput = page.getByTestId('password-input');
        await pwInput.fill('password123');
        const loginBtn = page.getByRole("button", { name: "login"});
        await loginBtn.click();

        const username = page.getByText('Test User');
        await expect(username).toBeVisible();
        const email = page.getByText('Email: testuser@example.com');
        await expect(email).toBeVisible();
        const location = page.getByText('Location: TestCity');
        await expect(location).toBeVisible();
        const gender = page.getByText('Gender: Male');
        await expect(gender).toBeVisible();
        const occup = page.getByText('Occupation: Student');
        await expect(occup).toBeVisible();
        const batch = page.getByText('Batch #: 2024');
        await expect(batch).toBeVisible();
        const enrollCourse = page.getByText('Enrolled Course: QA');
        await expect (enrollCourse).toBeVisible();
        const courseDes = page.getByText('Course Description: 5months QA bootcamp');
        await expect(courseDes).toBeVisible();

        const view = page.getByRole('button', { name: "View Available Courses"});
        await view.click();
        const coursePage = page.getByText('Courses');
        await expect(coursePage).toBeVisible();
        const qa = page.locator('h3', { hasText: 'QA'});
        await expect(qa).toBeVisible();
        const kidcoding = page.getByText('kids after-school coding class');
        await expect(kidcoding).toBeVisible();
        const basicComputerSkill = page.getByText('Basic Computer Skill');
        await expect(basicComputerSkill).toBeVisible();
        const koreanClass = page.getByText('Korean Class');
        await expect(koreanClass).toBeVisible();






        
        
    });
});

