import { test, expect } from '../../fixtures/pages';
import { clickByText } from '../../support/navigation';

test('exercises the Widgets practice components', { tag: '@Smoke' }, async ({ page, loginPage, widgetsPage }) => {
  await loginPage.open();
  await clickByText(page, 'Widgets');

  await test.step('Auto Complete filters matching colours', async () => {
    await clickByText(page, 'Auto Complete');
    await widgetsPage.selectAutocompleteOption('Bl');
    await expect(widgetsPage.blueColourText).toBeVisible();
  });

  await test.step('Tool Tips appear on hover', async () => {
    await clickByText(page, 'Tool Tips');
    await widgetsPage.hoverForTooltip();
    await expect(widgetsPage.tooltipText).toContainText('You hovered over the Button');
  });

  await test.step('Select Menu accepts a native option', async () => {
    await clickByText(page, 'Select Menu');
    await widgetsPage.selectLegacyColour('Aqua');
    await expect(widgetsPage.oldSelectMenu).toHaveValue('10');
  });
});
