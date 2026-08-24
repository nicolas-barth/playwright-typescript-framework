import path from 'path';
import { test, expect } from '../../fixtures/pages';
import { extractPdfText } from '../../support/pdf';

test('extracts text from a PDF file', { tag: '@Smoke' }, async () => {
  const filePath = path.join(__dirname, 'assets', 'sample.pdf');
  const extractedText = await extractPdfText(filePath);
  expect(extractedText).toContain('A Simple PDF File');
});
