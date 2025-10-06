import { $ } from "bun"

await $`vite build`

await $`bun ./scripts/make-vfs-ck.ts --dir ./dist --outfile ./bundle/client-bundle-vfs.ts`

await $`bun build ./src/server/compilation.ts --compile --outfile my-app`

console.log("Build complete.")
