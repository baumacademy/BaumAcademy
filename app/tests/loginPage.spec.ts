import { test, expect } from '@playwright/test'
import {login} from './utils/testHelpers'
import { error } from 'console';

test.beforeEach(async ({page}) => {
    await login(page)
});


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
            // await page.goto("http://localhost:3000");
        
            // const emailInput = page.getByTestId('email-input');
            // const passwordInput = page.getByTestId('password-input');
            // const login = page.getByRole('button', {name: "Login"});
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
            // await emailInput.fill('testuser@example.com')
            // await passwordInput.fill('password123')
            // await (login).click()
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
        test("should be able to log out", async ({page}) =>{
            // await page.goto('http://localhost:3000')


            
            const uLogOut = page.getByRole('button', {name:"Log Out"})
            await expect (uLogOut).toBeVisible()
            await (uLogOut).click()

            const uLogIn = page.locator('h2', {hasText:'Login'})
            await expect(uLogIn).toBeVisible()
        });

        test("should update profile", async ({page}) => {
            //login
            //click edit
            const uEdit = page.getByRole('button', {name:'Edit'})
            await expect (uEdit).toBeVisible()
            await (uEdit).click()
            //expect save btn to be visible
            const uSave = page.getByRole('button', {name:'Save'})
            await expect(uSave).toBeVisible()
            // const uLocationData = page.getByTestId('profile-city')
            // const uGenderData = page.getByTestId('profile-gender')
            // const uOccupationData = page.getByTestId('profile-occupation')
            // const uBatchData = page.getByTestId('profile-batch')
            const uSAC = page.getByText('Select an Courses')
            await expect(uSAC).toBeVisible()

            await page.getByTestId('profile-city').fill('New City Test')
            await page.getByTestId('profile-gender').fill('Male')
            await page.getByTestId('profile-occupation').fill('Worker')
            await page.getByTestId('profile-batch').fill('69420')
            // const uSACC = page.getByText('Korean Class')
            // await (uSACC).click
            await page.getByTestId('profile-radio-3').check()

            await (uSave).click()

            const uLV = page.getByText('New City Test')
            const uGM = page.getByText('Male')
            const uOW = page.getByText('Worker')
            const uBN = page.getByText('69420')
            const uCourse = page.getByText('Korean Class')

            await expect(uLV).toBeVisible()
            await expect(uGM).toBeVisible()
            await expect(uOW).toBeVisible()
            await expect(uBN).toBeVisible()
            await expect(uCourse).toBeVisible()
        })

        test("should render courses page", async ({page}) =>{
            const uVAC = page.getByRole('button', {name:'View Available Courses'})
            await expect(uVAC).toBeVisible()
            await (uVAC).click()
            
            const cQA = page.locator('h3', {hasText:'QA'})
            const cKD = page.locator('h3', {hasText:'Kids Coding'})
            const cBCS = page.locator ('h3', {hasText:'Basic Computer Skill'})
            const cKS = page.locator ('h3', {hasText: 'Korean Class'})

            await expect(cQA).toBeVisible()
            await expect(cKD).toBeVisible()
            await expect(cBCS).toBeVisible()
            await expect(cKS).toBeVisible()
        });

        test("should show error for incorrect user ID and/or password", async ({page}) =>{
            // 1 - log out logged-in user
            const logOutBttn = page.getByRole('button', {name:'Log Out'})
            await expect(logOutBttn).toBeVisible()
            await (logOutBttn).click()
            // 2 - expect to be in log-in page and fill out the username and password with incorrect data
            const homepage = page.locator('h2', {hasText:'Login'})
            await expect(homepage).toBeVisible()
            await page.getByTestId('email-input').fill('colonel')
            await page.getByTestId('password-input').fill('dancer')
            // 3 - click log=in button
            const errorLogin = page.getByRole('button', {name:'Login'})
            await (errorLogin).click()
            // 4 - expect to see the error message
            const errorMsg = page.getByText('Incorrect password or username')
            await expect (errorMsg).toBeVisible();
        })

        test.only("URL test, make sure the url is only going towards the user profile", async({page}) => {
            await page.goto("http://localhost:3000/landing/3")
            await page.waitForTimeout(1000)
            const testUserName = page.locator("h2", {hasText: "Test User"})
            await expect(testUserName).toBeVisible()
            // const currentURL = page.url()
            // console.log(currentURL)
            // await expect(currentURL).to("http://localhost:3000/landing/9")
        })
})
