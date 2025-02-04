import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from "path"
import wyw from "@wyw-in-js/vite"
import {libInjectCss} from "vite-plugin-lib-inject-css"
import dts from "vite-plugin-dts"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({
      include: ['src/**/*.ts', 'src/**/*.tsx', "node_modules/@acme/tokens/src/**/*.ts", "node_modules/@acme/tokens/src/**/*.tsx"],
      exclude: [],
    }),
    wyw({
      include: ['**/*.{ts,tsx}'],
      babelOptions: {
        presets: ['@babel/preset-typescript', '@babel/preset-react'],
      },
    }),
    react(),
    libInjectCss(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"]
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"]
    }
  },
})
