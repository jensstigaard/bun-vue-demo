import { resolve } from "path"

import express from "express"
import ViteExpress from "vite-express"

import routes from "./routes/router"

const app = express()

// Use the routes from the routes.js file
app.use(routes)

app.get("/maps.pmtiles", (req, res) => {
  const filePath = resolve(process.cwd(), "./maps.pmtiles")
  // const filePath = resolve(__dirname, "../maps.pmtiles")
  // console.log("Serving file:", filePath)
  res.sendFile(filePath)
})

ViteExpress.config({ mode: "development" })

ViteExpress.listen(app, 3000, () =>
  console.log(`Dev Server is listening on port http://localhost:3000...`)
)
