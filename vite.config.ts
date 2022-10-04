/// <reference types="vitest" />

import * as path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { obfuscator } from 'rollup-obfuscator'
import { viteSingleFile } from './utils/vite_build_single_file'
const config = {
  ui: {
    input: {
      main: path.resolve(__dirname, 'index.html'),
    },
    output: {
      entryFileNames: 'assets/[name].js',
    },
  },
  hook: {
    input: {
      masterGo: path.resolve(__dirname, './hook/code.ts'),
    },
    output: {
      dir: path.resolve(__dirname, './.appscript'),
      entryFileNames: 'code.js',
    },
  },
}

const LIB_NAME = process.env.LIB_NAME || 'ui'
const currentConfig = config[LIB_NAME]

if (currentConfig === undefined)
  throw new Error('LIB_NAME is not defined or is not valid')

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  define: {
    'import.meta.vitest': 'false',
  },
  plugins: process.env.TEST
    ? []
    : [
        Vue(
          {
            reactivityTransform: true,
          },
        ),
        Unocss(),
        AutoImport({
          imports: [
            'vue',
            '@vueuse/core',
          ],
          dts: true,
        }),
        Components({
          resolvers: [NaiveUiResolver()],
          dts: true,
        }),
        viteSingleFile(),
        // obfuscator({
        //   optionsPreset: 'low-obfuscation',
        // }),
      ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          // 'arcoblue-6': '#7ec242',
        },
        javascriptEnabled: true,
      },
    },

  },
  build: {
    assetsInlineLimit: 1000000000000000,
    rollupOptions: {
      ...currentConfig,
      emptyOutDir: false,
    },
    // minify: 'terser',
    // terserOptions: {
    //   compress: {
    //     drop_console: true,
    //   },
    // },
  },
  server: {
    host: '0.0.0.0',
  },
})
