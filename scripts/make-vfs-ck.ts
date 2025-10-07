// This script bundles all files in a directory into a single JavaScript file
// with base64 encoded content. It can be used to create a virtual file system (VFS) for a web application.
// Usage: bunx make-vfs --dir <directory> [--outfile <output_file>]
// Example: bunx make-vfs --dir ./dist --outfile ./src/client-bundle-vfs.js

// THIS IS AN ALTERNATIVE TO MAKE-VFS : https://www.npmjs.com/package/make-vfs

// It is a single file script with no dependencies, and seems to work better!

import { join, relative } from "path"
import { readdir } from "fs/promises"
import { readFile } from "fs/promises"

// Parse command line arguments
const args = process.argv.slice(2)
const argMap: Record<string, string> = {}

/**
 * List of files to ignore and not include in the bundle
 */
const IGNORE_LIST = ["maps.pmtiles"]

// Iterate over args and populate argMap
for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith("--") && i + 1 < args.length) {
    const key = String(args[i].slice(2))
    argMap[key] = args[i + 1]
    i++ // Skip the next argument
  }
}

// Guard no dir
if (!argMap.dir) {
  console.error("Error: --dir argument is required")
  console.error("Usage: bun make-vfs-ck.ts --dir <directory> [--outfile <output_file>]")
  process.exit(1)
}

const targetDir = argMap.dir
const outputFile = argMap.outfile || "bundle-output.js"

// Object to store all files
const bundleObject: Record<string, string> = {}

// Recursive function to traverse directory
async function traverseDirectory(dir: string, baseDir: string = dir) {
  try {
    const entries = await readdir(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = join(dir, entry.name)

      if (entry.isDirectory()) {
        // Recursively traverse subdirectories
        await traverseDirectory(fullPath, baseDir)
      } else {
        // Get relative path
        const relativePath = relative(baseDir, fullPath).replace(/\\/g, "/") // Normalize slashes to forward

        if (IGNORE_LIST.includes(entry.name)) {
          console.log(`Ignored: ${relativePath}`)
          continue
        }

        try {
          // Read file as binary data
          const fileBuffer = await readFile(fullPath)
          // Convert to base64
          const base64Data = fileBuffer.toString("base64")

          // Store in our bundle object with the relative path as key
          bundleObject[relativePath] = base64Data
          console.log(`Added: ${relativePath}`)
        } catch (fileErr) {
          console.error(`Error processing file ${fullPath}:`, fileErr)
        }
      }
    }
  } catch (err) {
    console.error(`Error reading directory ${dir}:`, err)
  }
}

// Main execution
console.log(`Starting to bundle directory: ${targetDir}`)

try {
  // Execute the traversal
  await traverseDirectory(targetDir)

  // Format the output
  let output = "export default {\n"

  for (const [path, data] of Object.entries(bundleObject)) {
    output += `  "${path}": "${data}",\n`
  }

  // Remove trailing comma from the last entry if it exists
  if (output.endsWith(",\n")) {
    output = output.slice(0, -2) + "\n"
  }

  output += "};\n"

  // Write to output file
  await Bun.write(outputFile, output)
  console.log(`Bundle written to: ${outputFile}`)
  console.log(`Total files bundled: ${Object.keys(bundleObject).length}`)
} catch (err) {
  console.error("Fatal error:", err)
  process.exit(1)
}
