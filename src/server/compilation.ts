// THIS ONLY WORKS FOR COMPILED PROJECTS,
// First:
// 1. Compile the project using bun run build
// 2. Once built, run : bunx make-vfs --dir ./dist --content-format string --outfile ./src/client-bundle-vfs.js

import { resolve } from "path"
// First we need to
// @ts-ignore
import staticRoutes from "../../bundle/client-bundle-vfs.ts"

import { lookup } from "es-mime-types"

import express from "express"

import routes from "./routes/router.ts"

const app = express()

// Use the routes from the routes file
app.use(routes)

// // Serve static files from this directory
// app.use(express.static("."))

app.get("/maps.pmtiles", (req, res) => {
  const filePath = resolve(process.cwd(), "./maps.pmtiles")
  // const filePath = resolve(__dirname, "../maps.pmtiles")
  // console.log("Serving file:", filePath)
  res.sendFile(filePath)
  return
})

// Serve the static files from the staticRoutes
app.use((req, res, next) => {
  // Check if the request is for a static file
  const url = new URL(req.url, `http://${req.headers.host}`)
  const path = url.pathname
  // If the request is for a static file, serve it
  // Normalize the path by removing trailing slashes
  // remove the leading slash
  // then remove trailing slashes
  // e.g. "/assets/logo.png/" becomes "assets/logo.png"
  const normalizedPath = path.replace(/^\//, "").replace(/\/$/, "")
  // console.log("Request for static file:", path, "normalized to:", normalizedPath)

  // log true/false if the path exists in staticRoutes
  // @ts-ignore
  // console.log("Path exists in staticRoutes:", staticRoutes[normalizedPath] !== undefined)

  // @ts-ignore
  if (staticRoutes[normalizedPath]) {
    // Serve the static file using Bun.file
    const mimeType = lookup(normalizedPath)
    // @ts-ignore
    const decodedFile = Buffer.from(staticRoutes[normalizedPath], "base64")
    // console.log("returning file", normalizedPath, "with mime type", mimeType)
    return res.status(200).type(mimeType).send(decodedFile)
  }

  // If the request is for the root path, serve index.html
  if (path === "/" && staticRoutes["index.html"]) {
    // Serve the index.html file
    let mimeType = lookup("index.html")
    let decodedFile = Buffer.from(staticRoutes["index.html"], "base64")
    // console.log("returning file", "index.html", "with mime type", mimeType)
    return res.status(200).type(mimeType).send(decodedFile)
  }

  next()
})

// Middleware to catch/handle requests to "maps.pmtiles"
app.use((req, res, next) => {
  // Check if the request is for a static file
  const url = new URL(req.url, `http://${req.headers.host}`)
  const path = url.pathname

  // If the request is for the root path, serve index.html
  if (path === "maps.pmtiles") {
    res.status(404).send("PMTiles file found on host...")
    return
  }
  next()
})

app.listen(3000, () => console.log(`Web Server is listening on port http://localhost:3000...`))
