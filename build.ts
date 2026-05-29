// build.ts
// Deno script to bundle and compile frontend using esbuild
import * as esbuild from "npm:esbuild@0.20.2";

console.log("⚡ Starting Frontend Compiling & Bundling with Esbuild...");
try {
  await esbuild.build({
    entryPoints: ["frontend/app-loader.js"],
    bundle: true,
    outfile: "frontend/dist/bundle.js",
    format: "esm",
    minify: true,
    jsx: "automatic",
    jsxImportSource: "https://esm.sh/react@18.2.0",
    external: [
      "https://esm.sh/react@18.2.0",
      "https://esm.sh/react-dom@18.2.0/client",
    ],
  });
  console.log("✅ Compilation Completed successfully! Output: frontend/dist/bundle.js");
} catch (err) {
  console.error("❌ Compilation Failed:", err);
  Deno.exit(1);
} finally {
  esbuild.stop();
}
