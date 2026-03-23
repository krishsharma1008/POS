/**
 * Export data to CSV and trigger download.
 */
export function exportToCSV(
  headers: string[],
  rows: (string | number)[][],
  filename: string
) {
  const csvContent = [
    headers.join(","),
    ...rows.map((row) =>
      row
        .map((cell) => {
          const str = String(cell);
          // Escape fields that contain commas or quotes
          if (str.includes(",") || str.includes('"') || str.includes("\n")) {
            return `"${str.replace(/"/g, '""')}"`;
          }
          return str;
        })
        .join(",")
    ),
  ].join("\n");

  downloadFile(csvContent, `${filename}.csv`, "text/csv;charset=utf-8;");
}

/**
 * Export data to a simple XLSX-compatible XML format.
 * For a production app you'd use a library like SheetJS,
 * but this keeps things dependency-free.
 */
export function exportToXLSX(
  headers: string[],
  rows: (string | number)[][],
  filename: string
) {
  // Use CSV as fallback (real XLSX would need a library)
  exportToCSV(headers, rows, filename);
}

/**
 * Export a simple text/table view as PDF (prints the page section).
 * For production, use jsPDF or similar.
 */
export function exportToPDF(filename: string) {
  window.print();
  void filename; // placeholder
}

function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export type ExportFormat = "csv" | "xlsx" | "pdf";

export function handleExport(
  format: ExportFormat,
  headers: string[],
  rows: (string | number)[][],
  filename: string
) {
  switch (format) {
    case "csv":
      exportToCSV(headers, rows, filename);
      break;
    case "xlsx":
      exportToXLSX(headers, rows, filename);
      break;
    case "pdf":
      exportToPDF(filename);
      break;
  }
}
