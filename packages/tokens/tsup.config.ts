import { defineConfig } from "tsup";

export default defineConfig(options => ({
  minify: !options.watch,
  entryPoints: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  // external: ["react"],
  ...options,
}));
