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

const port = process.env.INTERNAL_PORT as string
const host = process.env.NEWS_HOST as string
const token = process.env.NEWS_TOKEN as string
const app: Application = express()

app.use((req, res, next) => {
  res.setHeader("Origin-Trial", token)
  next()
})
app.use(express.static("src/public"))
app.set("view engine", "ejs")
app.set("views", "src/views")

app.get("/", async (req: Request, res: Response) => {
  const home = new URL(`https://${process.env.HOME_HOST}:${process.env.PORT}`)
  const ssp = new URL(`https://${process.env.SSP_HOST}:${process.env.PORT}`)
  const title = process.env.NEWS_DETAIL
  const lorem =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

  const params = {
    title,
    token,
    lorem,
    home,
    ssp
  }
  res.render("index", params)
})

app.listen(port, async () => {
  console.log(`Listening on port ${port}`)
})
