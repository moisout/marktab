import archiver from 'archiver';
import fs from 'fs';
import pkg from '../package.json' assert { type: 'json' };

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
        `<script type="module" src="script${scripts.length}.js"></script>`
      );

      fs.writeFileSync(`./dist/script${scripts.length}.js`, match[1]);
    }
  }

  fs.writeFileSync('./dist/index.html', html);
}

function createArchive() {
  const output = fs.createWriteStream(
    `./build/marktab-${pkg.version}-${Date.now()}.zip`
  );
  const archive = archiver('zip', {
    zlib: { level: 1 },
  });

  output.on('close', () => {
    console.log(archive.pointer() + ' total bytes');
    console.log(
      'archiver has been finalized and the output file descriptor has closed.'
    );
  });

  output.on('end', () => {
    console.log('Data has been drained');
  });

  archive.on('warning', err => {
    if (err.code === 'ENOENT') {
    } else {
      throw err;
    }
  });

  archive.on('error', err => {
    throw err;
  });

  archive.pipe(output);

  archive.directory('dist/', false);
  archive.finalize();
}
