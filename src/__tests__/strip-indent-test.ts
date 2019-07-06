import stripIndent from '../lib/strip-indent';

// Mostly declaring these up here 'cause working with
// whitespace in template tags suuuuucks

const inputSpaces = stripIndent`
  <div>
    <span>Hello</span>
  </div>
`;

const expectedSpaces = `<div>
  <span>Hello</span>
</div>`;

const inputTabs = stripIndent`
\t<div>
\t\t<span>Hello</span>
\t</div>
`;

const expectedTabs = `<div>
\t<span>Hello</span>
</div>`;

const noIndentInput = stripIndent`
<div>
  <span>Hello</span>
</div>
`;

describe('Strip whitespace', () => {
  it('Works with spaces', () => {
    expect(inputSpaces).toBe(expectedSpaces);
  });

  it('Works with tabs', () => {
    expect(inputTabs).toBe(expectedTabs);
  });

  it('Does nothing if indentation is not detected', () => {
    expect(noIndentInput).toBe(expectedSpaces);
  });
});
