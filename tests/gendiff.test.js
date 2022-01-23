import gendiff from '../src/gendiff.js';

test('gendiff', () => {
  const config1 = `${__dirname}/../fixtures/config1.json`;
  const config2 = `${__dirname}/../fixtures/config2.json`;

  const expected = `[
  "- follow: false",
  "  host: hexlet.io",
  "- proxy: 123.234.53.22",
  "- timeout: 50",
  "+ timeout: 20",
  "+ verbose: true"
]`;

  expect(gendiff(config1, config2))
    .toEqual(expected)
});
