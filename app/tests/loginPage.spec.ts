import { test, expect } from '@playwright/test'

test.describe('login page', () => {
    test('should render login page', async ({page}) => {
        await page.goto('http://localhost:3000');
        const loginText = page.locator('h2',{hasText: "Login"});
        const email = page.getByText('email');
        const password = page.getByText('Password');
        const login = page.getByRole('button', {name:"Login"});
        const signUp = page.locator('a', {hasText: "Sign up"});
        const fName = page.getByText("First Name")
        await expect(loginText).toBeVisible();
        await expect(email).toBeVisible();
        await expect (password).toBeVisible();
        await expect (login).toBeVisible();
        await expect (signUp).toBeVisible();
        await (login).click();
        await (signUp).click();
        await expect (fName).toBeVisible();
    });
        // create an array of elements we want to check
        // const values = [loginText, email, password, login, signUp];
        // // // loop over the elements and assert they are visible
        //  for (const value of values) {
        //     await expect(value).toBeVisible();
        test('should login in with valid credentials', async ({page}) => {
            await page.goto("http://localhost:3000");
            const emailInput = page.getByTestId('email-input');
            const passwordInput = page.getByTestId('password-input');
            const login = page.getByRole('button', {name: "Login"});
            // const logOut = page.getByRole('button', {name: "Log Out"});
            const userEmail = page.getByText('Email')
            const location = page.getByText('Location')
            const gender = page.getByText('Gender')
            const occupation = page.getByText('Occupation')
            const batch = page.getByText('Batch')
            const enrolled = page.getByText('Enroll')
            const cDecs = page.getByText('Course Description')
            const vac = page.getByRole('button', {name: "View Available Courses"})
            const qa = page.locator('h3', {hasText:"QA"})
            const goBack = page.getByRole('button', {name:"Go Back"})
            const edit = page.getByRole('button', {name:"Edit"})
            const uEmail = page.getByText('Email')
            const uLocation = page.getByText('Location')
            const uGender = page.getByText('Gender')
            const uOccupation = page.getByText('Occupation')
            const uBatch = page.getByText('Batch #')
            const sac = page.getByText('Select an Course')
            const sacQA = page.getByText('QA')
            const sacKC = page.getByText('Kids codin')
            const sacBCS = page.getByText('Basic Computer Skill')
            const sacKClass = page.getByText('Korean Class')
            const save = page.getByRole('button', {name:"Save"})
            await emailInput.fill('testuser@example.com')
            await passwordInput.fill('password123')
            await (login).click()
            await expect (userEmail).toBeVisible()
            await expect (location).toBeVisible()
            await expect (gender).toBeVisible()
            await expect (occupation).toBeVisible()
            await expect (batch).toBeVisible()
            await expect (enrolled).toBeVisible()
            await expect (cDecs).toBeVisible()
            await expect (vac).toBeVisible()
            await (vac).click()
            await expect (qa).toBeVisible()
            await expect (goBack).toBeVisible()
            await (goBack).click()
            await expect (edit).toBeVisible()
            await (edit).click()
            await expect (uEmail).toBeVisible()
            await expect (uLocation).toBeVisible()
            await expect (uGender).toBeVisible()
            await expect (uOccupation).toBeVisible()
            await expect (uBatch).toBeVisible()
            await expect (sac).toBeVisible()
            await expect (sacQA).toBeVisible()
            await expect (sacKC).toBeVisible()
            await expect (sacBCS).toBeVisible()
            await expect (sacKClass).toBeVisible()
            await expect (save).toBeVisible()
            await (save).click()
            await expect (edit).toBeVisible()

            // await expect (logOut).toBeVisible()
        })
})