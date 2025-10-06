# compile.sh
#!/bin/bash

# First we build the client bundle (This is the vue/vite part)
echo " "
echo " "
echo "--------------------------------------"
echo "Starting Vite build...."
vite build
echo "Client bundle built successfully."
echo "--------------------------------------"
echo " "
echo " "
echo "--------------------------------------"
echo "Starting VFS build...."
# Then we take the whole dist folder and create a vfs bundle. this is required so that we can embed the client bundle into the server bundle.
bun ./scripts/make-vfs-ck.ts --dir ./dist --outfile ./bundle/client-bundle-vfs.ts
# Log the output of the vfs bundle
echo "VFS bundle built successfully."
echo "--------------------------------------"
echo " "
echo " "
echo "--------------------------------------"
echo "Starting BUN build...."
# finaly we build the server bundle. this is the bun part.
bun build ./src/server/compilation.ts --compile --outfile my-app
echo "Bun server+VFS bundle built successfully."
echo "--------------------------------------"