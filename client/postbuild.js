const fs = require('node:fs');
const path = require('node:path');
try {
    const currentFolder = process.cwd()
    fs.renameSync(path.join(currentFolder, 'build'), path.join(currentFolder, '..', 'server', 'public'));
} catch (err) {
    console.error(err);
}