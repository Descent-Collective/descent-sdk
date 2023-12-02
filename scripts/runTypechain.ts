import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import { glob, runTypeChain } from 'typechain';

async function main() {
  const cwd = process.cwd();

  if (!fs.existsSync('./cache/json-abis'))
    await fsp.mkdir('./cache/json-abis', { recursive: true });

  if (fs.existsSync('./src/generated'))
    await fsp.rm('./src/generated', { recursive: true, force: true });
  await fsp.mkdir('./src/generated');

  const importABIs = glob(cwd, [
    '../src/contracts/abis/MultiStaticcall.json',
    '../src/contracts/abis/usdc.json',
    '../src/contracts/abis/Vault.json',
    '../src/contracts/abis/VaultGetters.json',
    '../src/contracts/abis/VaultRouter.json',
    '../src/contracts/abis/Currency.json',
  ]);

  const copiedABIs: string[] = [];

  for (const file of importABIs) {
    const dest = `${cwd}/cache/json-abis/${file.split('/').pop()}`;

    const content = await fsp.readFile(file, 'utf8');

    const obj = JSON.parse(content) as Record<string, any>;
    obj.bytecode = '0x';
    obj.deployedBytecode = '0x';
    await fsp.writeFile(dest, JSON.stringify(obj));

    copiedABIs.push(dest);
  }

  await runTypeChain({
    cwd,
    filesToProcess: importABIs,
    allFiles: copiedABIs,
    outDir: './src/generated',
    target: 'ethers-v6',
  });
}

main()
  .catch(console.error)
  .finally(async () => {
    if (fs.existsSync('./cache/json-abis'))
      await fsp.rm('./cache/json-abis', { recursive: true, force: true });
  });
