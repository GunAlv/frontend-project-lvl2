#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/gendiff.js';

const program = new Command();

program
  .version('0.0.1')
  .description('Compare two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((firstConfig, secondConfig, options) => {
    const result = genDiff(firstConfig, secondConfig, options.format);

    console.log(result);
  })
  .parse(process.argv);
