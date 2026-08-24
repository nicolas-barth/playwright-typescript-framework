import { test, expect } from '../../fixtures/pages';
import { clickByText } from '../../support/navigation';

test('drags an item into a droppable target', { tag: '@Smoke' }, async ({ page, loginPage, interactionsPage }) => {
  await loginPage.open();
  await clickByText(page, 'Interactions');
  await clickByText(page, 'Droppable');
  await interactionsPage.dragAndDrop();
  await expect(interactionsPage.droppable).toContainText('Dropped');
});
