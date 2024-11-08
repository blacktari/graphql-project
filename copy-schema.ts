import { mkdirSync, copyFileSync } from 'fs';
import { existsSync } from 'fs';
import { join } from 'path';

const srcPath = join(__dirname, 'src', 'schema', 'schema.graphql');
const distDir = join(__dirname, 'dist', 'schema');
const distPath = join(distDir, 'schema.graphql');

// Ensure the dist directory exists
if (!existsSync(distDir)) {
  mkdirSync(distDir, { recursive: true });
}

// Copy the schema file
copyFileSync(srcPath, distPath);
console.log('schema.graphql copied to dist/schema');