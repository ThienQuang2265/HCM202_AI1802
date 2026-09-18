import { expect, test, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { branches } from '../../content/branches';
import { builderItems } from '../../content/builder';
import { chapters } from '../../content/chapters';
import { finalQuestions } from '../../content/questions';
const key = 'hanh-trinh-tim-duong:v1';
const start = async (page: Page) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Bắt đầu hành trình' }).click();
};
const next = async (page: Page) =>
  page.getByRole('button', { name: 'Tiếp tục →', exact: true }).click();
async function toBuilder(page: Page) {
  await start(page);
  await page
    .getByRole('button', { name: new RegExp(branches.world.title) })
    .click();
  await page
    .getByRole('button', { name: branches.world.answers[1], exact: false })
    .click();
  await page
    .getByRole('button', { name: 'Tiếp tục theo dòng lịch sử' })
    .click();
  await page
    .getByRole('button', { name: 'Lên tàu và bắt đầu hành trình' })
    .click();
  await page
    .getByRole('button', {
      name: new RegExp(chapters.observe.question.options[1]),
    })
    .click();
  await next(page);
}
async function finish(page: Page, correct = true) {
  for (const item of builderItems)
    await page.locator(`[data-builder="${item.id}"]`).click();
  await page.getByRole('button', { name: 'Kiểm tra chuỗi' }).click();
  await expect(page.getByText('Chuỗi đã hoàn chỉnh')).toBeVisible();
  await page.getByRole('button', { name: 'Đi vào thử thách mới' }).click();
  for (const id of ['challenge', 'liberation', 'independence'] as const) {
    const q = chapters[id].question;
    await page
      .getByRole('button', { name: new RegExp(q.options[q.correct]) })
      .click();
    await next(page);
  }
  for (const q of finalQuestions) {
    await page
      .getByRole('button', {
        name: new RegExp(q.options[correct ? q.correct : (q.correct + 1) % 3]),
      })
      .click();
    await page
      .getByRole('button', { name: /Câu tiếp theo|Xem kết quả/ })
      .click();
  }
}
test('all four branches converge, then the full journey scores 6/6', async ({
  page,
}) => {
  const errors: string[] = [];
  const external: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  page.on('request', (r) => {
    if (
      !r.url().startsWith('http://127.0.0.1:3000') &&
      !r.url().startsWith('data:')
    )
      external.push(r.url());
  });
  await start(page);
  for (const [id, b] of Object.entries(branches)) {
    await page.getByRole('button', { name: new RegExp(b.title) }).click();
    await expect(page.getByText(b.background)).toBeVisible();
    await page
      .getByRole('button', { name: new RegExp(b.answers[(b.correct + 1) % 3]) })
      .click();
    await expect(
      page.getByText('Chưa chính xác.', { exact: true }),
    ).toBeVisible();
    await page
      .getByRole('button', {
        name:
          id === 'world'
            ? 'Tiếp tục theo dòng lịch sử'
            : 'Chọn hướng đã diễn ra: đi để khảo nghiệm',
      })
      .click();
    await expect(page.getByText('Các nhánh hội tụ')).toBeVisible();
    if (id !== 'world')
      await page.getByRole('button', { name: 'Trở lại các nhánh' }).click();
  }
  await page.getByRole('button', { name: 'Trở lại các nhánh' }).click();
  await expect(page.getByText('Đã khám phá', { exact: true })).toHaveCount(4);
  await page
    .getByRole('button', { name: new RegExp(branches.world.title) })
    .click();
  await page
    .getByRole('button', { name: 'Tiếp tục theo dòng lịch sử' })
    .click();
  await page
    .getByRole('button', { name: 'Lên tàu và bắt đầu hành trình' })
    .click();
  await page
    .getByRole('button', {
      name: new RegExp(chapters.observe.question.options[0]),
    })
    .click();
  await next(page);
  await finish(page);
  await expect(page.getByText('6/6', { exact: true })).toBeVisible();
  await expect(page.locator('.result-item')).toHaveCount(6);
  await expect(
    page.getByText('Đã khám phá 4/4 nhánh ở chặng 1911.'),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Xem toàn bộ timeline' }).click();
  await expect(page.locator('.map-card')).toHaveCount(9);
  await page.getByRole('button', { name: 'Trở về kết quả' }).click();
  await page.getByRole('button', { name: 'Chơi lại từ đầu' }).click();
  await expect(
    page.getByRole('heading', { name: 'Hành trình tìm đường', exact: true }),
  ).toBeVisible();
  await expect
    .poll(() => page.evaluate((k) => localStorage.getItem(k), key))
    .toBeNull();
  expect(errors).toEqual([]);
  expect(external).toEqual([]);
});
test('zero score, refresh/resume and clean restart', async ({ page }) => {
  await toBuilder(page);
  await page.locator('[data-builder="theory"]').click();
  await page.reload();
  await page.getByRole('button', { name: 'Tiếp tục lượt trước' }).click();
  await expect(page.locator('[data-slot="0"]')).toContainText(
    builderItems[0].title,
  );
  await page.getByRole('button', { name: 'Xếp lại', exact: true }).click();
  await finish(page, false);
  await expect(page.getByText('0/6', { exact: true })).toBeVisible();
  await page.reload();
  await page.getByRole('button', { name: 'Tiếp tục lượt trước' }).click();
  await expect(page.getByText('0/6', { exact: true })).toBeVisible();
  await page
    .getByRole('button', { name: 'Xóa tiến độ và bắt đầu lại' })
    .click();
  await page.getByRole('button', { name: 'Giữ lại hành trình' }).click();
  await expect(page.getByText('0/6', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Chơi lại từ đầu' }).click();
  await page.reload();
  await expect(
    page.getByRole('button', { name: 'Tiếp tục lượt trước' }),
  ).toHaveCount(0);
});
test('keyboard choices, incorrect builder, drag and drop', async ({
  page,
}, info) => {
  await toBuilder(page);
  for (const item of [...builderItems].reverse()) {
    const button = page.locator(`[data-builder="${item.id}"]`);
    await button.focus();
    await page.keyboard.press('Enter');
  }
  await page.getByRole('button', { name: 'Kiểm tra chuỗi' }).click();
  await expect(page.getByRole('status')).toContainText('Chuỗi chưa hợp lý');
  await page.getByRole('button', { name: 'Xếp lại', exact: true }).click();
  for (const [i, item] of builderItems.entries()) {
    if (info.project.name === 'desktop')
      await page
        .locator(`[data-builder="${item.id}"]`)
        .dragTo(page.locator(`[data-slot="${i}"]`));
    else {
      await page.locator(`[data-builder="${item.id}"]`).focus();
      await page.keyboard.press('Enter');
    }
  }
  await page.getByRole('button', { name: 'Kiểm tra chuỗi' }).click();
  await expect(page.getByText('Chuỗi đã hoàn chỉnh')).toBeVisible();
});
test('invalid storage and unavailable storage do not block the journey', async ({
  page,
}) => {
  await page.addInitScript(
    (k) => localStorage.setItem(k, '{"version":999}'),
    key,
  );
  await page.goto('/');
  await expect(page.getByRole('status')).toContainText('không hợp lệ');
  await page.getByRole('button', { name: 'Bắt đầu hành trình' }).click();
  await expect(
    page.getByRole('heading', { name: chapters.paths.title }),
  ).toBeVisible();
});
test('opt out of saving and handle denied localStorage', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Lưu tiến độ trên thiết bị này').uncheck();
  await page.getByRole('button', { name: 'Bắt đầu hành trình' }).click();
  expect(await page.evaluate((k) => localStorage.getItem(k), key)).toBeNull();
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new DOMException('Blocked', 'SecurityError');
      },
    });
  });
  await page.goto('/');
  await page.getByRole('button', { name: 'Bắt đầu hành trình' }).click();
  await expect(
    page.getByRole('heading', { name: chapters.paths.title }),
  ).toBeVisible();
  await expect(page.getByRole('status')).toContainText('không cho phép lưu');
});
test('sources dialog has a label, traps focus, closes with Escape and restores focus', async ({
  page,
}) => {
  await page.goto('/');
  const opener = page.getByRole('button', {
    name: 'Nguồn tư liệu',
    exact: true,
  });
  await opener.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('link')).toHaveCount(7);
  for (const link of await dialog.getByRole('link').all()) {
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noreferrer');
  }
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press('Tab');
    expect(
      await page.evaluate(() => !!document.activeElement?.closest('dialog')),
    ).toBe(true);
  }
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(opener).toBeFocused();
});
test('responsive layouts and accessibility at 375, 768, 1024 and 1440', async ({
  page,
}) => {
  for (const width of [375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(
      page.getByRole('button', { name: 'Bắt đầu hành trình' }),
    ).toBeEnabled();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const scan = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(scan.violations).toEqual([]);
    await page.screenshot({
      path: `test-results/hero-${width}.png`,
      fullPage: true,
    });
  }
  await toBuilder(page);
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.screenshot({ path: 'test-results/builder.png', fullPage: true });
});
test('static timeline is readable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3000/timeline/');
  await expect(
    page.getByRole('heading', { name: 'Dòng thời gian lịch sử', exact: true }),
  ).toBeVisible();
  await expect(page.getByText('Di chúc', { exact: true })).toBeVisible();
  await context.close();
});
