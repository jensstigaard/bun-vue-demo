import express from "express"
import ViteExpress from "vite-express"

import routes from "./routes/router"

const app = express()

// Use the routes from the routes.js file
app.use(routes)


app.use(express.static('public'))

// app.use((req, res, next) => {
//   // Check if the request is for a static file
//     const url = new URL(req.url, `http://${req.headers.host}`)
//     const path = url.pathname
//     console.log("Request for static file:", path)

//     next()
// })


// ViteExpress.config({ mode: "production" })

ViteExpress.listen(app, 3000, () =>
  console.log(`Dev Server is listening on port http://localhost:3000...`)
)
