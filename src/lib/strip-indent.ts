const stripIndent = (strings: TemplateStringsArray): string => {
  const string = strings.join('');
  const lines = string
    .replace(/^\n/, '')
    .replace(/\n$/, '')
    .split('\n');

  const firstLineWhitespace = lines[0].match(/^\s+/);
  if (!firstLineWhitespace) return lines.join('\n');

  const stringToReplace = firstLineWhitespace[0];
  const replaceRE = new RegExp(`^${stringToReplace}`);
  return lines.map(line => line.replace(replaceRE, '')).join('\n');
};

export default stripIndent;
