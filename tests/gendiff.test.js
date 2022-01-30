import path from 'path';
import fs from 'fs';

import gendiff from '../src/gendiff.js';

import { OUTPUT_FORMATS } from '../src/constants.js';

function getFixtureFile(file) {
  return `${__dirname}/../fixtures/${file}`;
}

function getExpectedFile(file) {
  const expectedPath = path.resolve(getFixtureFile(file));

  return fs.readFileSync(expectedPath, 'utf-8');
}

describe('gendiff stylish format output', () => {
  it('json files', () => {
    const config1 = getFixtureFile('config1.json');
    const config2 = getFixtureFile('config2.json');

    const expected = getExpectedFile('expected-stylish.txt');

    expect(gendiff(config1, config2)).toEqual(expected)
  });

  it('yml files', () => {
    const config1 = getFixtureFile('config1.yml');
    const config2 = getFixtureFile('config2.yml');

    const expected = getExpectedFile('expected-stylish.txt');

    expect(gendiff(config1, config2)).toEqual(expected)
  });

  it('yaml files', () => {
    const config1 = getFixtureFile('config1.yaml');
    const config2 = getFixtureFile('config2.yaml');

    const expected = getExpectedFile('expected-stylish.txt');

    expect(gendiff(config1, config2)).toEqual(expected)
  });
});

describe('gendiff plain format output', () => {
  it('json files', () => {
    const config1 = getFixtureFile('config1.json');
    const config2 = getFixtureFile('config2.json');

    const expected = getExpectedFile('expected-plain.txt');

    expect(gendiff(config1, config2, OUTPUT_FORMATS.PLAIN)).toEqual(expected)
  });

  it('yml files', () => {
    const config1 = getFixtureFile('config1.yml');
    const config2 = getFixtureFile('config2.yml');

    const expected = getExpectedFile('expected-plain.txt');

    expect(gendiff(config1, config2, OUTPUT_FORMATS.PLAIN)).toEqual(expected)
  });

  it('yaml files', () => {
    const config1 = getFixtureFile('config1.yaml');
    const config2 = getFixtureFile('config2.yaml');

    const expected = getExpectedFile('expected-plain.txt');

    expect(gendiff(config1, config2, OUTPUT_FORMATS.PLAIN)).toEqual(expected)
  });
});
