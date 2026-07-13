import { test, expect } from '@playwright/test'

const baseUrl = "http://localhost:3000/";

test('deve carregar home', async ({
  page,
}) => {
  await page.goto(baseUrl)

  const title = page.getByRole('heading', {name: "Olá, Mundo"});

  await expect(title).toBeVisible()
})

test('Deve navegar para about page', async ({page})=> {

    await page.goto(baseUrl)

    await page.getByRole('link', {name: "About"}).click();

    await expect(page).toHaveURL(baseUrl + "about");

    const title = page.getByRole('heading', {name: "About Page"});

    await expect(title).toBeVisible();
})