import { resolve } from 'url';
import { compilation as CompilationNS, Compiler, Plugin } from 'webpack';
import { ConcatSource, RawSource } from 'webpack-sources';

import { IMetaSchema } from '../src/types/meta';
import { createUserScriptHeader } from './lib';

export type UserscriptConfig = (
  {
    meta: IMetaSchema,
    development?: {
      baseUrl: string;
    },
  }
);

const PLUGIN_NAME = 'WebpackUserscriptPlugin';

export class WebpackUserscriptPlugin implements Plugin {
  constructor (public options: UserscriptConfig) {
    this.options = options;
  }

  apply (compiler: Compiler) {
    compiler.hooks.emit.tap(PLUGIN_NAME, (compilation) => {
      const mainFilename = `${this.options.meta.name}.user.js`;
      const devFilename = `${this.options.meta.name}.dev.user.js`;

      const meta = {
        ...this.options.meta,
        ...(() => {
          if (this.options.development) {
            return {
              updateURL: resolve(this.options.development.baseUrl, devFilename),
            };
          }
        })(),
      };

      const header = createUserScriptHeader(meta);

      compilation.chunks.forEach((chunk: CompilationNS.Chunk) => {
        if (!chunk.canBeInitial()) { return; }

        chunk.files.forEach((filename) => {
          (compilation as any).updateAsset(
            filename,
            (src: string) => new ConcatSource(header, '\n', src),
          );
        });
      });

      if (this.options.development) {
        const devHeaderFile = createUserScriptHeader({
          ...meta,
          require: resolve(this.options.development.baseUrl, mainFilename),
        });

        (compilation as any).emitAsset(devFilename, new RawSource(devHeaderFile));
      }
    });
  }
}
