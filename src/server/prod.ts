import { lookup } from "es-mime-types"

import express from "express"
import ViteExpress from "vite-express"

import routes from "./routes/router"

const app = express()

// Use the routes from the routes.js file
app.use(routes)

ViteExpress.config({ mode: "production" })

ViteExpress.listen(app, 3000, () =>
  console.log(`Prod Server is listening on port http://localhost:3000...`)
)
