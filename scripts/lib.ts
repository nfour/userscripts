import { writeFileSync } from 'fs';
import { cloneDeep } from 'lodash';
import * as pad from 'pad';
import { resolve } from 'path';
import * as webpack from 'webpack';

import { repository } from '../package.json';
import { IMetaSchema } from '../src/types/meta';

const PORT = 9002;

export function WebpackUserScript (base: webpack.Configuration) {
  const directory = base.output!.path!;

  /**
   * Creates a webpack config based on a given userscript meta configuration.
   * - Expects `meta.name` to match the directory name
   */
  return (entry: string, meta: IMetaSchema): webpack.Configuration => {
    const { name: scriptName } = meta;

    writeDevelopmentHeaderFile({ scriptName, meta, directory });
    writeDistributionHeaderFile({ scriptName, meta, directory });

    const clonedBase = cloneDeep(base);
    return {
      ...clonedBase,
      entry: { [scriptName]: entry },
      plugins: [
        ...clonedBase.plugins || [],
        new webpack.BannerPlugin({
          banner: createUserScriptHeader(meta, { omitRequire: true }),
          raw: true,
          entryOnly: true,
        }),
      ],
    };
  };
}

/**
 * Writes a file with just the header, with a @require pointing to the real script
 */
export function writeDevelopmentHeaderFile ({ scriptName, meta, directory }: {
  scriptName: string, meta: IMetaSchema, directory: string,
}) {
  const filePath = resolve(directory, `${scriptName}.dev.user.js`);
  const requireUrl = `http://localhost:${PORT}/build/${scriptName}.js`;

  return writeFileSync(filePath, createUserScriptHeader({
    ...meta,
    require: requireUrl,
  }));
}

/**
 * Writes a file with just the header, with a @require pointing to the real script
 */
export function writeDistributionHeaderFile ({ scriptName, meta, directory }: {
  scriptName: string, meta: IMetaSchema, directory: string,
}) {
  const filePath = resolve(directory, `${scriptName}.dist.user.js`);
  const repoUrl = `${repository.url}/raw/master/build/${scriptName}.js`;
  const updateUrl = `${repository.url}/raw/master/build/${scriptName}.dist.user.js`;

  const header = createUserScriptHeader({
    ...meta,
    require: repoUrl,
    updateURL: updateUrl,
    downloadURL: updateUrl,
  });

  const openUserJsHeader = createUserScriptHeader({ author: meta.author }, { name: 'OpenUserJS' });

  return writeFileSync(filePath, `${header}\n${openUserJsHeader}`);
}

export function createUserScriptHeader (metadata: Partial<IMetaSchema>, { omitRequire = false, name = 'UserScript' } = {}) {
  const lines: string[] = [];
  const padLength = Math.max(...Object.keys(metadata).map((k) => k.length));

  const addProperty = (key: string, value: string) => {
    if (omitRequire && key === 'require') { return; }

    lines.push(`// @${pad(key, padLength)} ${value}`);
  };

  lines.push(`// ==${name}==`);

  for (const key of Object.keys(metadata)) {
    if (key[0] === '$') { continue; }

    const value = metadata[key];

    if (Array.isArray(value)) {
      for (const subValue of value) {
        addProperty(key, subValue);
      }
    } else if (typeof (value) === 'string') {
      addProperty(key, value);
    } else if (typeof (value) === 'boolean' && value) {
      addProperty(key, '');
    }
  }

  lines.push(`// ==/${name}==\n`);

  return lines.join('\n');
}
