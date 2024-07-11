import { input, select } from '@inquirer/prompts';

import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import { version } from '../package.json';

const program = new Command();

program.name('nil');
program.version(version);

program
  .command('config')
  .description('Configure')
  .option('-f, --file', 'Specify the file')
  .option('-t, --title', 'Set the title prefix')
  .action(async options => {
    if (options.file) {
      const answer = await select({
        message: 'How would you like to specify the file you want to work on?',
        choices: [
          { name: 'Enter the absolute path of the file', value: 'path' },
          {
            name: 'Select a file from the current directory',
            value: 'directory',
          },
        ],
      });

      if (answer === 'path') {
        const pathAnswer = await input({
          message: 'Enter the absolute path of the file:',
          validate: input => path.isAbsolute(input) || 'Invalid path',
        });
        console.log(pathAnswer);
      } else if (answer === 'directory') {
        const files = fs.readdirSync(process.cwd()).map(file => ({
          name: file,
          value: path.resolve(process.cwd(), file),
        }));
        const fileAnswer = await select({
          message: 'Select a file:',
          choices: files,
        });
        console.log(fileAnswer);
      }
    } else if (options.title) {
      const answer = await input({ message: 'Enter the title prefix:' });
      console.log(answer);
    } else {
      console.log('No valid option selected');
    }
  });

program
  .command('create')
  .description('Create')
  .action(async () => {
    const answer = await input({ message: 'Enter anything' });
    console.log(answer);
  });

program
  .command('update')
  .description('Update')
  .action(async () => {
    const answer = await input({ message: 'Enter anything' });
    console.log(answer);
  });

program.on('command:*', () => {
  console.error('Invalid command: %s\n', program.args.join(' '));
  program.help();
  process.exit(1);
});

if (process.argv.length === 2) {
  console.log('Welcome to NIL!\n');
  program.help();
  process.exit(1);
}

program.parse(process.argv);
