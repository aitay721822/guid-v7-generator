import { uuidv7 } from "uuidv7";

export interface FormatOptions {
  hyphens: boolean;
  braces: boolean;
  uppercase: boolean;
  quotes: boolean;
  commas: boolean;
}

/**
 * Generate a single GUID v7
 */
export function generateGuidV7(): string {
  return uuidv7();
}

/**
 * Generate multiple GUID v7s
 */
export function generateMultipleGuids(count: number): string[] {
  return Array.from({ length: count }, () => generateGuidV7());
}

/**
 * Generate similar GUIDs based on a reference GUID
 * This maintains the timestamp portion and generates new random portions
 */
export function generateSimilarGuids(
  referenceGuid: string,
  count: number,
): string[] {
  // Parse the reference GUID to extract timestamp portion
  // UUID v7 format: xxxxxxxx-xxxx-7xxx-xxxx-xxxxxxxxxxxx
  // First 48 bits (12 hex chars) are timestamp
  const cleaned = referenceGuid.replace(/-/g, "");
  if (cleaned.length !== 32) {
    throw new Error("Invalid GUID format");
  }

  // Extract timestamp portion (first 12 hex chars)
  const timestampPortion = cleaned.substring(0, 12);

  const guids: string[] = [];
  for (let i = 0; i < count; i++) {
    // Generate a new GUID v7 and replace its timestamp with the reference timestamp
    const newGuid = generateGuidV7().replace(/-/g, "");
    const similarGuid = timestampPortion + newGuid.substring(12);

    // Reformat with hyphens
    const formatted = `${similarGuid.substring(0, 8)}-${similarGuid.substring(8, 12)}-${similarGuid.substring(12, 16)}-${similarGuid.substring(16, 20)}-${similarGuid.substring(20)}`;
    guids.push(formatted);
  }

  return guids;
}

/**
 * Format a GUID according to the specified options
 */
export function formatGuid(guid: string, options: FormatOptions): string {
  let formatted = guid;

  // Remove hyphens if needed
  if (!options.hyphens) {
    formatted = formatted.replace(/-/g, "");
  }

  // Apply uppercase
  if (options.uppercase) {
    formatted = formatted.toUpperCase();
  }

  // Apply braces
  if (options.braces) {
    formatted = `{${formatted}}`;
  }

  // Apply quotes
  if (options.quotes) {
    formatted = `"${formatted}"`;
  }

  // Apply commas
  if (options.commas) {
    formatted = `${formatted},`;
  }

  return formatted;
}

/**
 * Format multiple GUIDs
 */
export function formatMultipleGuids(
  guids: string[],
  options: FormatOptions,
): string[] {
  return guids.map((guid) => formatGuid(guid, options));
}

/**
 * Validate GUID format
 */
export function isValidGuid(guid: string): boolean {
  const guidRegex =
    /^[{]?[0-9a-fA-F]{8}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{4}-?[0-9a-fA-F]{12}[}]?$/;
  return guidRegex.test(guid);
}
