#!/usr/bin/env node

import { Command } from 'commander';
import { readFile } from 'fs/promises';
import genDiff from '../src/gendiff.js';

const { version } = JSON.parse(await readFile(new URL('../package.json', import.meta.url)));

const program = new Command();

program
  .version(version)
  .description('Compare two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((firstConfig, secondConfig, options) => {
    const result = genDiff(firstConfig, secondConfig, options.format);

    console.log(result);
  })
  .parse(process.argv);
