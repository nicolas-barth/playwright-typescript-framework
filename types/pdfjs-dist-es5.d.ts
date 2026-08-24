declare module 'pdfjs-dist-es5' {
  export interface PdfTextItem {
    str: string;
  }

  export interface PdfPage {
    getTextContent(): Promise<{ items: PdfTextItem[] }>;
  }

  export interface PdfDocument {
    numPages: number;
    getPage(pageNumber: number): Promise<PdfPage>;
  }

  export interface GetDocumentParams {
    data: Buffer;
    standardFontDataUrl?: string;
  }

  export function getDocument(source: Buffer | GetDocumentParams): { promise: Promise<PdfDocument> };
}
