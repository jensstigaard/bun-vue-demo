import { $ } from "bun"

// Build front-end related code with Vite
await $`vite build`

// Create a virtual file system (VFS) for the client bundle
await $`bun ./scripts/make-vfs-ck.ts --dir ./dist --outfile ./bundle/client-bundle-vfs.ts`

// Build the server bundle with Bun and output single file executable, including the injected VFS
await $`bun build ./src/server/compilation.ts --compile --outfile my-app`

console.log("Build complete.")
