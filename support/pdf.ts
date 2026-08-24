import fs from 'fs';
import path from 'path';
import { getDocument, type PdfDocument } from 'pdfjs-dist-es5';

const STANDARD_FONT_DATA_URL = `${path.dirname(require.resolve('pdfjs-dist-es5/package.json'))}/standard_fonts/`;

async function getPageText(pdf: PdfDocument, pageNo: number): Promise<string> {
  const page = await pdf.getPage(pageNo);
  const content = await page.getTextContent();
  return content.items.map((item) => item.str).join('');
}

export async function extractPdfText(filePath: string): Promise<string> {
  const dataBuffer = fs.readFileSync(filePath);
  const pdf = await getDocument({ data: dataBuffer, standardFontDataUrl: STANDARD_FONT_DATA_URL }).promise;
  const pageTexts = await Promise.all(
    Array.from({ length: pdf.numPages }, (_, index) => getPageText(pdf, index + 1)),
  );
  return pageTexts.join(' ');
}
