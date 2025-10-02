// Simple wrapper to run the TypeScript build script
// This is necessary to ensure that ts-node runs with the correct CommonJS settings
// since this project uses "type": "module" in package.json and ts-node  esm loader
// is still experimental and has issues with certain setups.
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import process from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Run ts-node with specific CommonJS settings
const child = spawn('npx', [
  'ts-node',
  '--compiler-options',
  '{"module":"CommonJS"}',
  '-T',
  join(__dirname, 'build', 'index.ts')
], {
  stdio: 'inherit',
  env: {
    ...process.env,
    TS_NODE_COMPILER_OPTIONS: '{"module":"CommonJS"}'
  }
});

child.on('exit', (code) => {
  process.exit(code);
});