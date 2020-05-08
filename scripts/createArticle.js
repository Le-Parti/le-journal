const child_process = require('child_process');

const args = process.argv.slice(2);
const date = args[0];

if(args.length !== 1 || !date) {
    console.log(`Usage: npm run create-article <date>`);
    console.log(`       npm run create-article 2020-05-23`);
    return;
}

const cleanDate = date.trim();

const cmd = `ng g component components/articles/${cleanDate}/article${cleanDate.replace(/(?:\s|-)(\d)/img, '$1')}`;
const prog = child_process.exec(cmd);

prog.stdout.pipe(process.stdout);
prog.stderr.pipe(process.stderr);
process.stdin.pipe(prog.stdin);

prog.on('close', () => {
    process.exit();
})
