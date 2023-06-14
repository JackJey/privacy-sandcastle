/*
 * @license
 * Copyright 2023 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License
 */

// init project
import express from "express"
import session from "express-session"
import hbs from "hbs"
import { auth } from "./libs/auth.mjs"
const app = express()
import useragent from "express-useragent"

app.set("view engine", "html")
app.engine("html", hbs.__express)
app.set("views", "./views")
app.use(express.json())
app.use(useragent.express())
app.use(express.static("public"))
app.use(express.static("dist"))
app.use(
  session({
    secret: "secret", // You should specify a real secret here
    resave: true,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    }
  })
)

const RP_NAME = "Passkeys Codelab"

process.env.HOSTNAME = process.env.TMP_HOST
process.env.ORIGIN = `https://${process.env.HOSTNAME}`
process.env.RP_NAME = RP_NAME

app.get("/", (req, res) => {
  // Check session
  if (req.session.username) {
    // If username is known, redirect to `/reauth`.
    return res.redirect(307, "/reauth")
  }
  // If the user is not signed in, show `index.html` with id/password form.
  res.render("index.html", {
    title: RP_NAME
  })
})

app.get("/reauth", (req, res) => {
  if (!req.session.username) {
    return res.redirect(302, "/")
  }
  // Show `reauth.html`.
  // User is supposed to enter a password (which will be ignored)
  // Make XHR POST to `/signin`
  res.render("reauth.html", {
    username: req.session.username,
    project_name: process.env.PROJECT_NAME,
    title: RP_NAME
  })
})

app.get("/home", (req, res) => {
  if (!req.session.username || req.session["signed-in"] != "yes") {
    // If user is not signed in, redirect to `/`.
    res.redirect(307, "/")
    return
  }
  // `home.html` shows sign-out link
  res.render("home.html", {
    displayName: req.session.username,
    project_name: process.env.PROJECT_NAME,
    title: RP_NAME
  })
})

app.get("/.well-known/assetlinks.json", (req, res) => {
  const assetlinks = []
  const relation = ["delegate_permission/common.handle_all_urls", "delegate_permission/common.get_login_creds"]
  assetlinks.push({
    relation: relation,
    target: {
      namespace: "web",
      site: process.env.ORIGIN
    }
  })
  if (process.env.ANDROID_PACKAGENAME && process.env.ANDROID_SHA256HASH) {
    const package_names = process.env.ANDROID_PACKAGENAME.split(",").map((name) => name.trim())
    const hashes = process.env.ANDROID_SHA256HASH.split(",").map((hash) => hash.trim())
    for (let i = 0; i < package_names.length; i++) {
      assetlinks.push({
        relation: relation,
        target: {
          namespace: "android_app",
          package_name: package_names[i],
          sha256_cert_fingerprints: [hashes[i]]
        }
      })
    }
  }
  res.json(assetlinks)
})

app.get("/test", (req, res) => {
  if (!req.session.username || req.session["signed-in"] != "yes") {
    // If user is not signed in, redirect to `/`.
    res.redirect(307, "/")
    return
  }
  res.render("test.html")
})

app.use("/auth", auth)

// listen for req :)
const port = process.env.GLITCH_DEBUGGER ? null : 80
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port)
})
