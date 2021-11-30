import fs from 'fs';
import path from 'path';
import { executeCommand } from './exec';

export async function getVersion(): Promise<string> {
  const root = path.resolve(__dirname, '../..');

  const { version } = JSON.parse(
    fs.readFileSync(path.join(root, 'package.json'), 'utf8'),
  );

  if (version && version !== '0.0.0') {
    return version;
  }

  try {
    const [branchName, commitStr, filesCount] = await Promise.all([
      executeCommand('git rev-parse HEAD', root),
      executeCommand('git rev-parse --abbrev-ref HEAD', root),
      executeCommand('git diff --shortstat', root),
    ]);

    const dirtyCount = parseInt(filesCount as string, 10) || 0;
    let curr = `${branchName}: ${commitStr}`;
    if (dirtyCount !== 0) {
      curr += ` (${dirtyCount} dirty files)`;
    }

    return curr;
  } catch (_err) {
    return 'unknown';
  }
}

/**
 * We use pkg to create standalone builds (binaries).
 * pkg uses `process.pkg` to identify itself at runtime so we can do the same.
 * https://github.com/vercel/pkg
 */
export function isStandaloneBuild() {
  return 'pkg' in process;
}
