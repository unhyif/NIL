import { Command } from 'commander';
import { input } from '@inquirer/prompts';
import { version } from '../package.json';

const program = new Command();

program.name('nil');
program.version(version);

program
  .command('config')
  .description('Configure')
  .action(async () => {
    const answer = await input({ message: 'Enter anything' });
    console.log(answer);
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
