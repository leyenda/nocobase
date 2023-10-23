import { expect, test } from '@nocobase/test/client';

async function waitForModalToBeHidden(page) {
  await page.waitForFunction(() => {
    const modal = document.querySelector('.ant-modal');
    if (modal) {
      const computedStyle = window.getComputedStyle(modal);
      return computedStyle.display === 'none' || computedStyle.visibility === 'hidden';
    }
    return true; // 如果找不到modal，也算作不可见
  });
}

test.describe('add plugin in front', () => {
  test('add plugin npm registry,then remove plugin', async ({ page, mockPage }) => {
    await mockPage().goto();
    await page.getByTestId('pm-button').click();
    await expect(await page.getByLabel('sample-custom-collection-template')).not.toBeVisible();
    await page.getByRole('button', { name: 'Add new' }).click();
    await page
      .getByRole('button', { name: '* Npm package name :' })
      .getByRole('textbox')
      .fill('@nocobase/plugin-sample-custom-collection-template');
    await page.getByLabel('Submit').click();
    await page.waitForTimeout(1000); // 等待1秒钟
    //等待页面刷新结束
    await page.waitForFunction(() => {
      const modal = document.querySelector('.ant-modal');
      if (modal) {
        const computedStyle = window.getComputedStyle(modal);
        return computedStyle.display === 'none' || computedStyle.visibility === 'hidden';
      }
      return true; // 如果找不到modal，也算作不可见
    });
    await page.waitForLoadState('load');
    await page.getByPlaceholder('Search plugin').fill('sample-custom-collection-template');
    await expect(await page.getByLabel('sample-custom-collection-template')).toBeVisible();
    //将添加的插件删除
    await await page
      .getByLabel('sample-custom-collection-template')
      .getByRole('button', { name: 'delete Remove' })
      .click();
    await page.getByRole('button', { name: 'Yes' }).click();
    await page.waitForTimeout(2000); // 等待1秒钟
    //等待页面刷新结束
    await waitForModalToBeHidden(page);
    await page.waitForLoadState('load');
    await page.getByPlaceholder('Search plugin').fill('sample-custom-collection-template');
    await expect(await page.getByLabel('sample-custom-collection-template')).not.toBeVisible();
  });
  test.skip('add plugin local upload', async ({ page, mockPage }) => {});
  test.skip('add plugin  file url', async ({ page, mockPage }) => {});
});

test.describe('remove plugin', () => {
  test('remove plugin,then add plugin', async ({ page, mockPage }) => {
    await mockPage().goto();
    await page.getByTestId('pm-button').click();
    //hello插件默认安装未启用
    await page.getByPlaceholder('Search plugin').fill('hello');
    await expect(await page.getByLabel('hello')).toBeVisible();
    const isActive = await page.getByLabel('hello').getByLabel('plugin-enabled').isChecked();
    await expect(isActive).toBe(false);
    //将hello插件remove
    await page.getByLabel('hello').getByRole('button', { name: 'delete Remove' }).click();
    await page.getByRole('button', { name: 'Yes' }).click();
    //等待页面刷新结束
    await page.waitForLoadState('load');
    await page.getByPlaceholder('Search plugin').fill('hello');
    await expect(await page.getByLabel('hello')).not.toBeVisible();
    //将删除的插件加回来
    await page.getByRole('button', { name: 'Add new' }).click();
    await page
      .getByRole('button', { name: '* Npm package name :' })
      .getByRole('textbox')
      .fill('@nocobase/plugin-sample-hello');
    await page.getByLabel('Submit').click();
    await page.waitForTimeout(1000);
    //等待弹窗消失和页面刷新结束
    await page.waitForFunction(() => {
      const modal = document.querySelector('.ant-modal');
      if (modal) {
        const computedStyle = window.getComputedStyle(modal);
        return computedStyle.display === 'none' || computedStyle.visibility === 'hidden';
      }
      return true; // 如果找不到modal，也算作不可见
    });
    await page.waitForLoadState('load');
    await page.getByPlaceholder('Search plugin').fill('hello');
    await expect(await page.getByLabel('hello')).toBeVisible();
    //已启用的插件不能remove，如ACL
    await page.getByPlaceholder('Search plugin').fill('ACL');
    await expect(await page.getByLabel('ACL')).toBeVisible();
    const isAclActive = await page.getByLabel('ACL').getByLabel('plugin-enabled').isChecked();
    await expect(isAclActive).toBe(true);
    await expect(page.getByLabel('ACL').getByRole('button', { name: 'delete Remove' })).not.toBeVisible();
  });
});

test.describe('enable plugin', () => {
  test('enable plugin', async ({ page, mockPage }) => {
    await mockPage().goto();
    await page.getByTestId('pm-button').click();
    await page.getByPlaceholder('Search plugin').fill('hello');
    await expect(await page.getByLabel('hello')).toBeVisible();
    const isActive = await page.getByLabel('hello').getByLabel('plugin-enabled').isChecked();
    await expect(isActive).toBe(false);
    //激活插件
    await page.getByLabel('hello').getByLabel('plugin-enabled').click();
    await page.waitForTimeout(1000); // 等待1秒钟
    //等待弹窗消失和页面刷新结束
    await waitForModalToBeHidden(page);
    await page.waitForLoadState('load');
    await page.getByPlaceholder('Search plugin').fill('hello');
    await expect(await page.getByLabel('hello').getByLabel('plugin-enabled').isChecked()).toBe(true);
    //将激活的插件禁用
    await page.getByLabel('hello').getByLabel('plugin-enabled').click();
    await page.waitForTimeout(1000); // 等待1秒钟
    //等待弹窗消失和页面刷新结束
    await waitForModalToBeHidden(page);
    await page.waitForLoadState('load');
    await expect(await page.getByLabel('hello').getByLabel('plugin-enabled').isChecked()).toBe(false);
  });
});

test.describe('disable plugin', () => {
  test('disable plugin', async ({ page, mockPage }) => {});
});

test.describe('update plugin', () => {
  test('update plugin', async ({ page, mockPage }) => {});
});
