import { Locator, Page } from '@playwright/test';

export class InteractionsPage {
  readonly page: Page;
  readonly draggable: Locator;
  readonly droppable: Locator;
  readonly droppableReady: Locator;

  constructor(page: Page) {
    this.page = page;
    const simpleTab = page.getByRole('tabpanel', { name: 'Simple' });
    this.draggable = simpleTab.locator('#draggable');
    this.droppable = simpleTab.locator('#droppable');
    this.droppableReady = simpleTab.locator('#droppable.ui-droppable');
  }

  async dragAndDrop(): Promise<void> {
    await this.droppableReady.waitFor();
    await this.draggable.dragTo(this.droppable);
  }
}
