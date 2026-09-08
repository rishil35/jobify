import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

// Global Cloudflare CDN worker for stable 3.11.174 (Guaranteed HTTP 200, zero 404s, works everywhere)
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

/**
 * Extract text from a PDF file
 * Returns { text, pageCount }
 */
async function extractPdfText(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
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
 * Supports PDF and DOCX (Checks both MIME type and file extension for mobile compatibility)
 */
export async function extractText(file) {
  const fileName = (file.name || '').toLowerCase();
  const fileType = (file.type || '').toLowerCase();

  const isPdf =
    fileType === 'application/pdf' ||
    fileType === 'application/x-pdf' ||
    fileName.endsWith('.pdf');

  const isDocx =
    fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
    fileType === 'application/msword' ||
    fileType.includes('word') ||
    fileName.endsWith('.docx') ||
    fileName.endsWith('.doc');

  if (isPdf) {
    return extractPdfText(file);
  }

  if (isDocx) {
    return extractDocxText(file);
  }

  throw new Error('Unsupported file type. Please upload a PDF or DOCX file.');
}
