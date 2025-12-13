const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../src/main/resources/static/browser');
const targetDir = path.join(__dirname, '../src/main/resources/static');

// Copy all files from browser/ to static root
function copyRecursive(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursive(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

if (fs.existsSync(sourceDir)) {
  console.log('Copying files from browser/ to static root...');
  const files = fs.readdirSync(sourceDir);
  files.forEach(file => {
    const srcPath = path.join(sourceDir, file);
    const destPath = path.join(targetDir, file);
    if (fs.statSync(srcPath).isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
  console.log('Files copied successfully!');
} else {
  console.log('Browser directory not found. Make sure to build Angular first.');
}

