const fs = require('fs');
const path = require('path');

// Get the project root (one level up from expenses-frontend)
const projectRoot = path.resolve(__dirname, '..');
const sourceDir = path.join(projectRoot, 'src/main/resources/static/browser');
const targetDir = path.join(projectRoot, 'src/main/resources/static');

console.log('Project root:', projectRoot);
console.log('Source directory:', sourceDir);
console.log('Target directory:', targetDir);

// Copy all files from browser/ to static root
function copyRecursive(src, dest) {
  try {
    const exists = fs.existsSync(src);
    if (!exists) {
      console.error(`Source does not exist: ${src}`);
      process.exit(1);
    }
    
    const stats = fs.statSync(src);
    const isDirectory = stats.isDirectory();

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
      // Ensure destination directory exists
      const destDir = path.dirname(dest);
      if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
      }
      fs.copyFileSync(src, dest);
    }
  } catch (error) {
    console.error(`Error copying ${src} to ${dest}:`, error.message);
    process.exit(1);
  }
}

try {
  if (!fs.existsSync(sourceDir)) {
    console.log('Browser directory not found. Make sure to build Angular first.');
    console.log(`Looking for: ${sourceDir}`);
    // Check if files are already in target (maybe Angular output changed)
    if (fs.existsSync(path.join(targetDir, 'index.html'))) {
      console.log('index.html found in target directory. Skipping copy.');
      process.exit(0);
    }
    process.exit(1);
  }

  console.log('Copying files from browser/ to static root...');
  
  // Ensure target directory exists
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const files = fs.readdirSync(sourceDir);
  let copiedCount = 0;
  
  files.forEach(file => {
    const srcPath = path.join(sourceDir, file);
    const destPath = path.join(targetDir, file);
    
    try {
      if (fs.statSync(srcPath).isDirectory()) {
        copyRecursive(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
      copiedCount++;
    } catch (error) {
      console.error(`Failed to copy ${file}:`, error.message);
      throw error;
    }
  });
  
  // Verify index.html was copied
  const indexHtmlPath = path.join(targetDir, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('ERROR: index.html was not copied successfully!');
    process.exit(1);
  }
  
  console.log(`Files copied successfully! (${copiedCount} items)`);
  process.exit(0);
} catch (error) {
  console.error('Error in copy-build.js:', error.message);
  console.error(error.stack);
  process.exit(1);
}

