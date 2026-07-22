import { expect, test } from "@playwright/test";

test("main experience loads", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: /turn complex data/i })).toBeVisible();
});

test("dashboard filters opportunities", async ({ page }) => {
  await page.goto("/#dashboard");
  const search = page.getByPlaceholder("Search intelligence");
  await search.fill("Expansion");
  await expect(page.getByText("Expansion readiness")).toBeVisible();
});

test("automation can be reviewed", async ({ page }) => {
  await page.goto("/#automation");
  await page.getByRole("button", { name: /review workflow/i }).click();
  await expect(page.getByText("Notify account owners")).toBeVisible();
});
