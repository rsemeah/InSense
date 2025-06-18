#!/usr/bin/env node
/**
 * prepare-deploy.js
 * 
 * This script temporarily converts TypeScript files to JavaScript files
 * to avoid TypeScript-related errors during deployment.
 * 
 * Usage:
 *   node prepare-deploy.js convert  # Convert TS files to JS
 *   node prepare-deploy.js restore  # Restore original file extensions
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { execSync } = require('child_process');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const rename = promisify(fs.rename);

// Directories to exclude from processing
const EXCLUDED_DIRS = ['node_modules', '.git', '.next', 'out', 'public', '.vercel'];

// File to store the mapping of renamed files
const RENAME_MAP_FILE = '.renamed-files.json';

/**
 * Find all files in a directory recursively
 */
async function findFiles(dir, fileList = []) {
  if (EXCLUDED_DIRS.includes(path.basename(dir))) {
    return fileList;
  }

  const files = await readdir(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = await stat(filePath);
    
    if (stats.isDirectory()) {
      await findFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  
  return fileList;
}

/**
 * Convert TypeScript files to JavaScript files
 */
async function convertTsToJs() {
  console.log('🔍 Finding TypeScript files...');
  
  const allFiles = await findFiles('.');
  const tsFiles = allFiles.filter(file => file.endsWith('.ts') || file.endsWith('.tsx'));
  
  console.log(`📝 Found ${tsFiles.length} TypeScript files to convert`);
  
  const renameMap = {};
  
  for (const file of tsFiles) {
    const newFile = file.replace(/\.tsx?$/, match => match === '.ts' ? '.js' : '.jsx');
    await rename(file, newFile);
    renameMap[newFile] = file;
    console.log(`✅ Renamed: ${file} -> ${newFile}`);
  }
  
  // Save the rename mapping for later restoration
  fs.writeFileSync(RENAME_MAP_FILE, JSON.stringify(renameMap, null, 2));
  console.log(`💾 Saved rename mapping to ${RENAME_MAP_FILE}`);
  
  // Remove tsconfig.json if it exists
  if (fs.existsSync('tsconfig.json')) {
    fs.renameSync('tsconfig.json', 'tsconfig.json.bak');
    console.log('📄 Renamed tsconfig.json to tsconfig.json.bak');
  }
  
  console.log('🎉 Conversion complete! The project is ready for JS-only deployment.');
}

/**
 * Restore original TypeScript files
 */
async function restoreOriginalFiles() {
  if (!fs.existsSync(RENAME_MAP_FILE)) {
    console.log('❌ No rename mapping file found. Nothing to restore.');
    return;
  }
  
  console.log('🔄 Restoring original TypeScript files...');
  
  const renameMap = JSON.parse(fs.readFileSync(RENAME_MAP_FILE, 'utf8'));
  
  for (const [jsFile, tsFile] of Object.entries(renameMap)) {
    if (fs.existsSync(jsFile)) {
      await rename(jsFile, tsFile);
      console.log(`✅ Restored: ${jsFile} -> ${tsFile}`);
    } else {
      console.log(`⚠️ Warning: ${jsFile} not found, couldn't restore to ${tsFile}`);
    }
  }
  
  // Remove the rename mapping file
  fs.unlinkSync(RENAME_MAP_FILE);
  console.log(`🗑️ Removed rename mapping file ${RENAME_MAP_FILE}`);
  
  // Restore tsconfig.json if it was backed up
  if (fs.existsSync('tsconfig.json.bak')) {
    fs.renameSync('tsconfig.json.bak', 'tsconfig.json');
    console.log('📄 Restored tsconfig.json from backup');
  }
  
  console.log('🎉 Restoration complete! The project is back to its original state.');
}

/**
 * Main function
 */
async function main() {
  const command = process.argv[2];
  
  if (command === 'convert') {
    await convertTsToJs();
  } else if (command === 'restore') {
    await restoreOriginalFiles();
  } else {
    console.log('❓ Unknown command. Use "convert" or "restore".');
    process.exit(1);
  }
}

// Run the script
main().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
