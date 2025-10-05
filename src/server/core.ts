import express from "express"
import ViteExpress from "vite-express"

import routes from "./routes/router"
import { ENV_MODE_TEXT } from "./constants"

export function initApp(in_production: boolean = false) {
  const app = express()

  // Use the routes from the routes.js file
  app.use(routes)

  in_production && ViteExpress.config({ mode: "production" })

  return app
}

export function start(app: express.Express) {
  ViteExpress.listen(app, 3000, () =>
    console.log(`${ENV_MODE_TEXT} Server is listening on port http://localhost:3000...`)
  )
}
