const sizeSuffixes = new Map<string, number>([
  ['B', 1],
  ['KB', 1000],
  ['KIB', 1024],
  ['MB', 1000 ** 2],
  ['MIB', 1024 ** 2],
  ['GB', 1000 ** 3],
  ['GIB', 1024 ** 3],
  ['TB', 1000 ** 4],
  ['TIB', 1024 ** 4],
  ['PB', 1000 ** 5],
  ['PIB', 1024 ** 5]
]);

const sizeSuffixesInverse = new Map<number, string>([
  [1, 'B'],
  // [1000, 'KB'],
  [1024, 'KiB'],
  // [1000 ** 2, 'MB'],
  [1024 ** 2, 'MiB'],
  // [1000 ** 3, 'GB'],
  [1024 ** 3, 'GiB'],
  // [1000 ** 4, 'TB'],
  [1024 ** 4, 'TiB'],
  // [1000 ** 5, 'PB'],
  [1024 ** 5, 'PiB']
]);

export function parseSize(sizeStr: string): number {
  const regex = /^(\d+(?:\.\d+)?)\s*([a-zA-Z]+)$/;
  const match = sizeStr.toUpperCase().match(regex);

  if (!match) {
    throw new Error(`Invalid size string: ${sizeStr}`);
  }

  const value = parseFloat(match[1]);
  const unit = match[2];

  if (!sizeSuffixes.has(unit)) {
    throw new Error(`Unknown unit: ${unit}`);
  }

  return value * sizeSuffixes.get(unit)!;
}

export function formatSize(bytes: number): string {
  if (bytes === 0) return '0 B';

  let value = bytes;
  let unit = 'B';

  for (const [size, suffix] of sizeSuffixesInverse) {
    if (bytes >= size) {
      value = bytes / size;
      unit = suffix;
    } else {
      break;
    }
  }

  return `${value.toFixed(2)}${unit}`;
}
