"use client";

import { TextItem } from "pdfjs-dist/types/src/display/api";

type PDFJSStatic = typeof import("pdfjs-dist");

let pdfjsLib: PDFJSStatic | null = null;
let loadPromise: Promise<PDFJSStatic> | null = null;

async function loadPdfJs(): Promise<PDFJSStatic> {
  if (pdfjsLib) {
    return pdfjsLib;
  }
  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = import("pdfjs-dist").then((lib) => {
    lib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
    pdfjsLib = lib;
    return lib;
  });

  return loadPromise;
}

export async function convertPdfToText(file: File) {
  const lib = await loadPdfJs();

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await lib.getDocument({ data: arrayBuffer }).promise;

  let fullText = "";
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();
    const textItems = content.items.filter(
      (item): item is TextItem => "str" in item,
    );
    fullText += textItems.map((item) => item.str).join(" ");
  }

  return fullText;
}

export interface PdfToImageResult {
  imageUrl: string;
  imageDataUrl: string;
  file: File | null;
  error?: string;
}

export async function convertPdfToImage(file: File): Promise<PdfToImageResult> {
  try {
    const lib = await loadPdfJs();

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await lib.getDocument({ data: arrayBuffer }).promise;
    const page = await pdf.getPage(1);

    const viewport = page.getViewport({ scale: 4 });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    if (context) {
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
    }

    await page.render({ canvasContext: context!, viewport }).promise;

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            // Create a File from the blob with the same name as the pdf
            const originalName = file.name.replace(/\.pdf$/i, "");
            const imageFile = new File([blob], `${originalName}.png`, {
              type: "image/png",
            });

            resolve({
              imageUrl: URL.createObjectURL(blob),
              imageDataUrl: canvas.toDataURL(),
              file: imageFile,
            });
          } else {
            resolve({
              imageUrl: "",
              imageDataUrl: "",
              file: null,
              error: "Failed to create image blob",
            });
          }
        },
        "image/png",
        // Set quality to maximum (1.0)
        1.0,
      );
    });
  } catch (err) {
    return {
      imageUrl: "",
      imageDataUrl: "",
      file: null,
      error: `Failed to convert PDF: ${err}`,
    };
  }
}
