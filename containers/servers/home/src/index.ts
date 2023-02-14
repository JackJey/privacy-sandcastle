/*
 Copyright 2022 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

import express, { Application, Request, Response } from "express"

const port = "3000"
const host = process.env.HOME_HOST || "home.localhost"
const token = process.env.HOME_TOKEN || ""

const app: Application = express()

app.use((req, res, next) => {
  // res.setHeader("Origin-Trial", token)
  next()
})
app.use(express.static("src/public"))
app.set("view engine", "ejs")
app.set("views", "src/views")

app.get("/", async (req: Request, res: Response) => {
  const hosts = Object.entries(process.env)
    .filter(([k, v]) => {
      if (k.startsWith("HOME_")) {
        return false
      }
      if (k.endsWith("_HOST") || k.endsWith("_DETAIL")) {
        return true
      }
      return false
    })
    .reduce((acc, [k, v]) => {
      const [host, tag] = k.split("_")
      if (acc.has(host) === false) {
        acc.set(host, {})
      }
      acc.get(host)[tag] = v
      return acc
    }, new Map())
    .values()

  console.log({ hosts })
  res.render("index", { hosts })
})

app.listen(port, function () {
  console.log(`Listening on port ${port}`)
})
