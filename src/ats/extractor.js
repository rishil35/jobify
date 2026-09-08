import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

// Configure pdf.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url
).toString();

/**
 * Extract text from a PDF file
 * Returns { text, pageCount }
 */
async function extractPdfText(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const pageCount = pdf.numPages;
  let fullText = '';

  for (let i = 1; i <= pageCount; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map(item => item.str).join(' ');
    fullText += pageText + '\n';
  }

  return { text: fullText.trim(), pageCount };
}

/**
 * Extract text from a DOCX file
 * Returns { text, pageCount }
 */
async function extractDocxText(file) {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  const text = result.value.trim();

  // Estimate page count from word count (approx 400 words per page)
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const pageCount = Math.max(1, Math.ceil(wordCount / 400));

  return { text, pageCount };
}

/**
 * Extract text from uploaded resume file
 * Supports PDF and DOCX
 */
export async function extractText(file) {
  const type = file.type;

  if (type === 'application/pdf') {
    return extractPdfText(file);
  }

  if (type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    return extractDocxText(file);
  }

  throw new Error('Unsupported file type. Please upload a PDF or DOCX file.');
}
