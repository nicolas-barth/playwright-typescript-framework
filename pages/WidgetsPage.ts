import { Locator, Page } from '@playwright/test';

export class WidgetsPage {
  readonly page: Page;
  readonly autocompleteInput: Locator;
  readonly blueColourText: Locator;
  readonly hoverButton: Locator;
  readonly tooltipText: Locator;
  readonly oldSelectMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.autocompleteInput = page.locator('#autoCompleteSingleInput');
    this.blueColourText = page.getByText('Blue', { exact: true });
    this.hoverButton = page.getByRole('button', { name: 'Hover me to see' });
    this.tooltipText = page.getByRole('tooltip');
    this.oldSelectMenu = page.locator('#oldSelectMenu');
  }

  async selectAutocompleteOption(textValue: string): Promise<void> {
    await this.autocompleteInput.fill(textValue);
    await this.blueColourText.click();
  }

  async hoverForTooltip(): Promise<void> {
    await this.hoverButton.hover();
  }

  async selectLegacyColour(colourName: string): Promise<void> {
    await this.oldSelectMenu.selectOption(colourName);
  }
}
