export interface ParsedCSV {
  headers: string[];
  rows: string[][];
}

export function parseCSV(text: string): ParsedCSV {
  const lines: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') {
      if (inQuotes && text[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if ((ch === "\n" || ch === "\r") && !inQuotes) {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      if (current.trim() || lines.length > 0) {
        lines.push(current);
        current = "";
      }
    } else {
      current += ch;
    }
  }
  if (current.trim()) lines.push(current);

  if (lines.length === 0) return { headers: [], rows: [] };

  const parseLine = (line: string): string[] => {
    const fields: string[] = [];
    let field = "";
    let quoted = false;

    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        if (quoted && line[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          quoted = !quoted;
        }
      } else if (ch === "," && !quoted) {
        fields.push(field.trim());
        field = "";
      } else {
        field += ch;
      }
    }
    fields.push(field.trim());
    return fields;
  };

  const headers = parseLine(lines[0]);
  const rows = lines.slice(1).map(parseLine);

  return { headers, rows };
}

export function mapCSVToObjects<T extends Record<string, unknown>>(
  parsed: ParsedCSV,
  mapping: Record<string, string> // csv header -> object key
): Partial<T>[] {
  return parsed.rows.map((row) => {
    const obj: Record<string, unknown> = {};
    parsed.headers.forEach((header, i) => {
      const key = mapping[header];
      if (key && row[i] !== undefined) {
        obj[key] = row[i];
      }
    });
    return obj as Partial<T>;
  });
}
