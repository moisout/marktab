import archiver from 'archiver';
import fs from 'fs';
import pkg from '../package.json' assert { type: 'json' };
import dayjs from 'dayjs';

extractInlineScripts();
createArchive();

function extractInlineScripts() {
  let html = fs.readFileSync('./dist/index.html', 'utf8');

  const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/g;
  const scripts = [];

  let match;
  while ((match = scriptRegex.exec(html))) {
    if (match[1]?.length) {
      html = html.replace(
        match[0],
        `<script type="module" src="script${scripts.length}.js"></script>`,
      );

      fs.writeFileSync(`./dist/script${scripts.length}.js`, match[1]);
    }
  }

  fs.writeFileSync('./dist/index.html', html);
}

function createArchive() {
  const date = dayjs().format('YYYY-MM-DD');
  const seconds = dayjs().get('second') + dayjs().get('minute') * 60 + dayjs().get('hour') * 3600;
  const filename = `marktab-${pkg.version}-${date}-${seconds}.zip`;
  const output = fs.createWriteStream(`./build/${filename}`);
  const archive = archiver('zip', {
    zlib: { level: 9 },
  });

  output.on('close', () => {
    console.log('Build complete');
    console.log(`Filename:  ${filename}`);
    console.log(`Size:      ${archive.pointer()}`);
  });

  archive.pipe(output);

  archive.directory('dist/', false);
  archive.finalize();
}
