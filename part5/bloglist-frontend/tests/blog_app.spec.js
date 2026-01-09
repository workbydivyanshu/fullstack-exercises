const { test, expect, beforeEach, describe } = require('@playwright/test');
const { loginWith, createBlog } = require('./helper');

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset');
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen',
      },
    });

    await page.goto('http://localhost:5173');
  });

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('Log in to application')).toBeVisible();
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible();
  });

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen');
      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible();
    });

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'mluukkai', 'wrong');

      const errorDiv = page.locator('.error');
      await expect(errorDiv).toContainText('Wrong username or password');
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)');

      await expect(
        page.getByText('Matti Luukkainen logged in')
      ).not.toBeVisible();
    });
  });

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'mluukkai', 'salainen');
    });

    test('a new blog can be created', async ({ page }) => {
      await createBlog(
        page,
        'Test Blog Title',
        'Test Author',
        'http://testurl.com'
      );
      await expect(page.getByText('Test Blog Title Test Author')).toBeVisible();
    });

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'First blog', 'Test Author', 'http://first.com');
      });

      test('blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click();
        await expect(page.getByText('likes 0')).toBeVisible();

        await page.getByRole('button', { name: 'like' }).click();
        await expect(page.getByText('likes 1')).toBeVisible();
      });

      test('user who created a blog can delete it', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click();

        page.on('dialog', (dialog) => dialog.accept());
        await page.getByRole('button', { name: 'remove' }).click();

        await expect(
          page.getByText('First blog Test Author')
        ).not.toBeVisible();
      });

      test('only the creator can see the delete button', async ({
        page,
        request,
      }) => {
        // Create another user
        await request.post('http://localhost:3003/api/users', {
          data: {
            name: 'Another User',
            username: 'anotheruser',
            password: 'password',
          },
        });

        // Logout
        await page.getByRole('button', { name: 'logout' }).click();

        // Login as another user
        await loginWith(page, 'anotheruser', 'password');

        await page.getByRole('button', { name: 'view' }).click();
        await expect(
          page.getByRole('button', { name: 'remove' })
        ).not.toBeVisible();
      });
    });

    describe('and multiple blogs exist', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'First blog', 'Author 1', 'http://first.com');
        await createBlog(page, 'Second blog', 'Author 2', 'http://second.com');
        await createBlog(page, 'Third blog', 'Author 3', 'http://third.com');
      });

      test('blogs are ordered by likes with most likes first', async ({
        page,
      }) => {
        // Expand all blogs
        const viewButtons = await page
          .getByRole('button', { name: 'view' })
          .all();
        for (const button of viewButtons) {
          await button.click();
        }

        // Like second blog twice
        const blogs = await page.locator('.blog').all();
        await blogs[1].getByRole('button', { name: 'like' }).click();
        await page.getByText('likes 1').waitFor();
        await blogs[1].getByRole('button', { name: 'like' }).click();
        await page.getByText('likes 2').waitFor();

        // Like third blog once
        await blogs[2].getByRole('button', { name: 'like' }).click();
        await page.getByText('likes 1').nth(1).waitFor();

        // Reload to see sorted order
        await page.reload();

        // Check order: Second (2 likes), Third (1 like), First (0 likes)
        const blogsAfterSort = await page.locator('.blog').all();
        await expect(blogsAfterSort[0]).toContainText('Second blog');
        await expect(blogsAfterSort[1]).toContainText('Third blog');
        await expect(blogsAfterSort[2]).toContainText('First blog');
      });
    });
  });
});
