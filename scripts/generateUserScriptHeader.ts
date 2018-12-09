
function generateUserScriptHeader (metadata: IMetadata) {
  const lines: string[] = [];
  const padLength = Math.max(...Object.keys(metadata).map((k) => k.length));
  const makeLine = (key: string, value: string) => `// @${pad(key, padLength)} ${value}`;

  lines.push('// ==UserScript==');
  for (const key of Object.keys(metadata)) {
    if (key[0] === '$') { continue; }
    const value = metadata[key];
    if (Array.isArray(value)) {
      for (const subValue of value) {
        lines.push(makeLine(key, subValue));
      }
    } else if (typeof (value) === 'string') {
      lines.push(makeLine(key, value));
    } else if (typeof (value) === 'boolean' && value) {
      lines.push(makeLine(key, ''));
    }
  }
  lines.push('// ==/UserScript==\n');

  return lines.join('\n');
}
