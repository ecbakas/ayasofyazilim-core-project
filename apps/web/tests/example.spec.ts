import { test, expect } from "@playwright/test";
import dotenv from 'dotenv';

dotenv.config();

test.describe("Login page main functionalities", () => {
  test("has title", async ({ page }) => {
    await page.goto("/");

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Unirefund/);
  });

  test("get started link", async ({ page }) => {
    await page.goto("/");
    await page.url();
    await page.getByPlaceholder("name@example.com").click();
    await page
      .getByPlaceholder("name@example.com")
      .fill(process.env.TEST_USERNAME as string);
    await page.getByPlaceholder("name@example.com").press("Tab");
    await page
      .getByPlaceholder("Password")
      .fill(process.env.TEST_PASSWORD as string);
    await page.getByRole("button", { name: "Login" }).click();
    await page.url();
    await page.getByRole("heading", { name: "admin", exact: true }).click();
  });
});
